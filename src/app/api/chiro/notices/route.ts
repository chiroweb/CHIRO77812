import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET: List all notices (admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // banner | popup | null (all)

    let result;
    if (type) {
      result = await sql`
        SELECT * FROM notices
        WHERE notice_type = ${type}
        ORDER BY sort_order ASC, created_at DESC
      `;
    } else {
      result = await sql`
        SELECT * FROM notices
        ORDER BY sort_order ASC, created_at DESC
      `;
    }

    return NextResponse.json({ notices: result.rows });
  } catch (error) {
    console.error("Notices list error:", error);
    return NextResponse.json({ error: "Failed to fetch notices" }, { status: 500 });
  }
}

// POST: Create a new notice
export async function POST(request: NextRequest) {
  try {
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

    // Auto sort_order
    const maxOrder = await sql`SELECT COALESCE(MAX(sort_order), 0) as max_order FROM notices`;
    const sortOrder = parseInt(maxOrder.rows[0].max_order) + 1;

    const result = await sql`
      INSERT INTO notices (title, notice_type, size, content, link_url, link_text, image_url, bg_color, text_color, published, sort_order)
      VALUES (
        ${title},
        ${notice_type || "banner"},
        ${size || "medium"},
        ${content || null},
        ${link_url || null},
        ${link_text || null},
        ${image_url || null},
        ${bg_color || "#1a1a1a"},
        ${text_color || "#ffffff"},
        ${published ?? false},
        ${sortOrder}
      )
      RETURNING *
    `;

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Notice create error:", error);
    return NextResponse.json({ error: "Failed to create notice" }, { status: 500 });
  }
}
