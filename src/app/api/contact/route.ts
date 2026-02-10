import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// POST: Submit contact form (public)
export async function POST(request: NextRequest) {
  try {
    const { name, email, message, projectType } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, contact, and message are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: "Message too long (max 5000 chars)" }, { status: 400 });
    }

    // Save to database (company column stores project type)
    const result = await sql`
      INSERT INTO contact_submissions (name, email, company, message)
      VALUES (${name}, ${email}, ${projectType || null}, ${message})
      RETURNING id
    `;

    return NextResponse.json({ success: true, id: result.rows[0].id }, { status: 201 });
  } catch (error) {
    console.error("Contact submit error:", error);
    return NextResponse.json({ error: "Failed to submit contact" }, { status: 500 });
  }
}
