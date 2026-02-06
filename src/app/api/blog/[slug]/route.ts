import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// GET: Single published blog post by slug (public)
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const result = await sql`
      SELECT * FROM blog_posts
      WHERE slug = ${slug} AND published = true
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Public blog post error:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}
