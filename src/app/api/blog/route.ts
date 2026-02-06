import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// GET: Published blog posts (public)
export async function GET() {
  try {
    const result = await sql`
      SELECT id, title, slug, excerpt, category, created_at
      FROM blog_posts
      WHERE published = true
      ORDER BY created_at DESC
    `;
    return NextResponse.json({ posts: result.rows });
  } catch (error) {
    console.error("Public blog list error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
