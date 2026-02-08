import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const EMAILJS_SERVICE_ID = "service_chiro";
const EMAILJS_TEMPLATE_ID = "template_sd1mg8b";
const EMAILJS_PUBLIC_KEY = "nZdvthms9zRbfn7oq";
const NOTIFY_EMAIL = "chiroweb75@gmail.com";

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

    // Send email via EmailJS
    try {
      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            to_email: NOTIFY_EMAIL,
            from_name: name,
            user_email: email,
            phone: email,
            company: "—",
            project_type: "웹사이트 문의",
            budget: "—",
            timeline: "—",
            message: message,
            send_date: new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
          },
        }),
      });
    } catch (emailError) {
      console.error("EmailJS notification failed:", emailError);
    }

    return NextResponse.json({ success: true, id: result.rows[0].id }, { status: 201 });
  } catch (error) {
    console.error("Contact submit error:", error);
    return NextResponse.json({ error: "Failed to submit contact" }, { status: 500 });
  }
}
