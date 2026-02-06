import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogCount = await sql`SELECT COUNT(*) as count FROM blog_posts`;
    const publishedBlogCount = await sql`SELECT COUNT(*) as count FROM blog_posts WHERE published = true`;
    const portfolioCount = await sql`SELECT COUNT(*) as count FROM portfolio_projects`;
    const contactCount = await sql`SELECT COUNT(*) as count FROM contact_submissions`;
    const unreadContactCount = await sql`SELECT COUNT(*) as count FROM contact_submissions WHERE read = false`;
    const recentContacts = await sql`
      SELECT id, name, email, company, message, read, created_at
      FROM contact_submissions
      ORDER BY created_at DESC
      LIMIT 5
    `;

    return NextResponse.json({
      blogPosts: parseInt(blogCount.rows[0].count),
      publishedBlogPosts: parseInt(publishedBlogCount.rows[0].count),
      portfolioProjects: parseInt(portfolioCount.rows[0].count),
      totalContacts: parseInt(contactCount.rows[0].count),
      unreadContacts: parseInt(unreadContactCount.rows[0].count),
      recentContacts: recentContacts.rows,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
