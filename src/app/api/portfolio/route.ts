import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// GET: Published portfolio projects (public)
export async function GET() {
  try {
    const result = await sql`
      SELECT id, name, category, problem, result, year, image_url
      FROM portfolio_projects
      WHERE published = true
      ORDER BY sort_order ASC, created_at DESC
    `;
    return NextResponse.json({ projects: result.rows });
  } catch (error) {
    console.error("Public portfolio list error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
