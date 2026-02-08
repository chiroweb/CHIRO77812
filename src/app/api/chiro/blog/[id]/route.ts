import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { generateSlug } from "@/lib/slug";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET: Single blog post
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const result = await sql`SELECT * FROM blog_posts WHERE id = ${parseInt(id)}`;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Blog get error:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

// PUT: Update blog post
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { title, content, excerpt, category, published } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    // Preserve existing slug if title hasn't changed, regenerate if title changed
    const current = await sql`SELECT title, slug FROM blog_posts WHERE id = ${parseInt(id)}`;
    let finalSlug = current.rows[0]?.slug || "";

    if (!current.rows[0] || current.rows[0].title !== title || !finalSlug) {
      const slug = generateSlug(title);
      const existing = await sql`SELECT id FROM blog_posts WHERE slug = ${slug} AND id != ${parseInt(id)}`;
      finalSlug = existing.rows.length > 0 ? `${slug}-${Date.now()}` : slug;
    }

    const result = await sql`
      UPDATE blog_posts
      SET title = ${title}, slug = ${finalSlug}, excerpt = ${excerpt || null},
          content = ${content}, category = ${category || "Insight"},
          published = ${published ?? false}, updated_at = NOW()
      WHERE id = ${parseInt(id)}
      RETURNING *
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Blog update error:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

// DELETE: Delete blog post
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const result = await sql`DELETE FROM blog_posts WHERE id = ${parseInt(id)} RETURNING id`;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Blog delete error:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
