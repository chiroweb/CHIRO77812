import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET: List all contact submissions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = (page - 1) * limit;

    const submissions = await sql`
      SELECT * FROM contact_submissions
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const countResult = await sql`SELECT COUNT(*) as total FROM contact_submissions`;
    const total = parseInt(countResult.rows[0].total);

    const unreadResult = await sql`SELECT COUNT(*) as unread FROM contact_submissions WHERE read = false`;
    const unread = parseInt(unreadResult.rows[0].unread);

    return NextResponse.json({
      submissions: submissions.rows,
      total,
      unread,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Contacts list error:", error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}
