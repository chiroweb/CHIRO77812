import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT: Mark as read/unread
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { read } = await request.json();

    const result = await sql`
      UPDATE contact_submissions
      SET read = ${read}
      WHERE id = ${parseInt(id)}
      RETURNING *
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Contact update error:", error);
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
  }
}

// DELETE: Delete submission
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const result = await sql`DELETE FROM contact_submissions WHERE id = ${parseInt(id)} RETURNING id`;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact delete error:", error);
    return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 });
  }
}
