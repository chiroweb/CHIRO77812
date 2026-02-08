import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { generateSlug } from "@/lib/slug";

// GET: List all blog posts (admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = (page - 1) * limit;

    const posts = await sql`
      SELECT id, title, slug, excerpt, category, published, created_at, updated_at
      FROM blog_posts
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const countResult = await sql`SELECT COUNT(*) as total FROM blog_posts`;
    const total = parseInt(countResult.rows[0].total);

    return NextResponse.json({
      posts: posts.rows,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Blog list error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

// POST: Create a new blog post
export async function POST(request: NextRequest) {
  try {
    const { title, content, excerpt, category, published } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const slug = generateSlug(title);

    // Check for duplicate slug
    const existing = await sql`SELECT id FROM blog_posts WHERE slug = ${slug}`;
    const finalSlug = existing.rows.length > 0 ? `${slug}-${Date.now()}` : slug;

    const result = await sql`
      INSERT INTO blog_posts (title, slug, excerpt, content, category, published)
      VALUES (${title}, ${finalSlug}, ${excerpt || null}, ${content}, ${category || "Insight"}, ${published ?? false})
      RETURNING *
    `;

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Blog create error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
