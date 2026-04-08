import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// POST: Submit contact form (public)
export async function POST(request: NextRequest) {
  try {
    const { name, email, message, projectType, type = 'contact', website_url } = await request.json();

    // Validate type against allowlist
    const ALLOWED_TYPES = ['contact', 'diagnosis'];
    const safeType = ALLOWED_TYPES.includes(type) ? type : 'contact';
    const isDiagnosis = safeType === 'diagnosis';

    if (!isDiagnosis && (!name || !email || !message)) {
      return NextResponse.json(
        { error: "Name, contact, and message are required" },
        { status: 400 }
      );
    }

    if (isDiagnosis && !email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Validate field lengths
    if (name && name.length > 200) {
      return NextResponse.json({ error: "Name too long (max 200 chars)" }, { status: 400 });
    }
    if (projectType && projectType.length > 500) {
      return NextResponse.json({ error: "Project type too long (max 500 chars)" }, { status: 400 });
    }

    // Validate website_url format
    if (website_url) {
      if (website_url.length > 2048) {
        return NextResponse.json({ error: "URL too long (max 2048 chars)" }, { status: 400 });
      }
      if (!/^https?:\/\//i.test(website_url)) {
        return NextResponse.json({ error: "Invalid URL format (must start with http:// or https://)" }, { status: 400 });
      }
    }

    const finalMessage = message || (isDiagnosis ? "무료 진단 신청" : "");

    if (finalMessage.length > 5000) {
      return NextResponse.json({ error: "Message too long (max 5000 chars)" }, { status: 400 });
    }

    // Save to database (company column stores project type)
    const result = await sql`
      INSERT INTO contact_submissions (name, email, company, message, type, website_url)
      VALUES (${name || ''}, ${email}, ${projectType || null}, ${finalMessage}, ${safeType}, ${website_url || null})
      RETURNING id
    `;

    return NextResponse.json({ success: true, id: result.rows[0].id }, { status: 201 });
  } catch (error) {
    console.error("Contact submit error:", error);
    return NextResponse.json({ error: "Failed to submit contact" }, { status: 500 });
  }
}
