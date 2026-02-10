import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET: Single notice
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const result = await sql`SELECT * FROM notices WHERE id = ${parseInt(id)}`;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Notice get error:", error);
    return NextResponse.json({ error: "Failed to fetch notice" }, { status: 500 });
  }
}

// PUT: Update notice
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      title,
      notice_type,
      size,
      content,
      link_url,
      link_text,
      image_url,
      bg_color,
      text_color,
      published,
    } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const result = await sql`
      UPDATE notices
      SET title = ${title},
          notice_type = ${notice_type || "banner"},
          size = ${size || "medium"},
          content = ${content || null},
          link_url = ${link_url || null},
          link_text = ${link_text || null},
          image_url = ${image_url || null},
          bg_color = ${bg_color || "#1a1a1a"},
          text_color = ${text_color || "#ffffff"},
          published = ${published ?? false},
          updated_at = NOW()
      WHERE id = ${parseInt(id)}
      RETURNING *
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Notice update error:", error);
    return NextResponse.json({ error: "Failed to update notice" }, { status: 500 });
  }
}

// DELETE: Delete notice
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const result = await sql`DELETE FROM notices WHERE id = ${parseInt(id)} RETURNING id`;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notice delete error:", error);
    return NextResponse.json({ error: "Failed to delete notice" }, { status: 500 });
  }
}
