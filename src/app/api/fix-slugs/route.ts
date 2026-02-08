import { sql } from "@/lib/db";
import { NextResponse } from "next/server";
import { generateSlug } from "@/lib/slug";

// POST: Fix empty or broken slugs for existing posts
export async function POST() {
  try {
    const posts = await sql`
      SELECT id, title, slug FROM blog_posts
      WHERE slug IS NULL OR slug = ''
    `;

    const fixed: { id: number; title: string; newSlug: string }[] = [];

    for (const post of posts.rows) {
      const newSlug = generateSlug(post.title);

      // Check for duplicate
      const existing = await sql`SELECT id FROM blog_posts WHERE slug = ${newSlug} AND id != ${post.id}`;
      const finalSlug = existing.rows.length > 0 ? `${newSlug}-${post.id}` : newSlug;

      await sql`UPDATE blog_posts SET slug = ${finalSlug} WHERE id = ${post.id}`;
      fixed.push({ id: post.id, title: post.title, newSlug: finalSlug });
    }

    return NextResponse.json({ fixed, count: fixed.length });
  } catch (error) {
    console.error("Fix slugs error:", error);
    return NextResponse.json({ error: "Failed to fix slugs" }, { status: 500 });
  }
}
