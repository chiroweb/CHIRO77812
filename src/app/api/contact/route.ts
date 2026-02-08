import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const NOTIFY_EMAIL = process.env.CONTACT_EMAIL || "hello@chiroweb.kr";

// POST: Submit contact form (public)
export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, contact, and message are required" },
        { status: 400 }
      );
    }

    // Save to database
    const result = await sql`
      INSERT INTO contact_submissions (name, email, company, message)
      VALUES (${name}, ${email}, ${null}, ${message})
      RETURNING id
    `;

    // Send email notification
    if (resend) {
      try {
        await resend.emails.send({
          from: "치로웹 문의알림 <onboarding@resend.dev>",
          to: NOTIFY_EMAIL,
          subject: `[치로웹] 새 문의: ${name}`,
          html: `
            <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1a1a1a; font-weight: 400; border-bottom: 1px solid #E0E0E0; padding-bottom: 16px;">
                새로운 문의가 접수되었습니다
              </h2>
              <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
                <tr>
                  <td style="padding: 12px 0; color: #9b9b9b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 100px;">이름</td>
                  <td style="padding: 12px 0; color: #1a1a1a; font-size: 15px;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #9b9b9b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">연락처</td>
                  <td style="padding: 12px 0; color: #1a1a1a; font-size: 15px;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #9b9b9b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">내용</td>
                  <td style="padding: 12px 0; color: #1a1a1a; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</td>
                </tr>
              </table>
              <p style="color: #9b9b9b; font-size: 12px; margin-top: 32px; border-top: 1px solid #E0E0E0; padding-top: 16px;">
                치로웹디자인 문의 알림 · chiroweb.co.kr
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
        // Don't fail the request if email fails - submission is already saved
      }
    }

    return NextResponse.json({ success: true, id: result.rows[0].id }, { status: 201 });
  } catch (error) {
    console.error("Contact submit error:", error);
    return NextResponse.json({ error: "Failed to submit contact" }, { status: 500 });
  }
}
