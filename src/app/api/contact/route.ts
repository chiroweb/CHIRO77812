import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// POST: Submit contact form (public)
export async function POST(request: NextRequest) {
  try {
    const { name, email, company, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO contact_submissions (name, email, company, message)
      VALUES (${name}, ${email}, ${company || null}, ${message})
      RETURNING id
    `;

    return NextResponse.json({ success: true, id: result.rows[0].id }, { status: 201 });
  } catch (error) {
    console.error("Contact submit error:", error);
    return NextResponse.json({ error: "Failed to submit contact" }, { status: 500 });
  }
}
