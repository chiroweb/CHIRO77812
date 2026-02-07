import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// GET: Single portfolio project by slug (public)
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    // Try slug first, then fall back to id
    let result = await sql`
      SELECT id, name, slug, category, client_name, site_url, problem, result, content, year, image_url
      FROM portfolio_projects
      WHERE slug = ${slug} AND published = true
    `;

    if (result.rows.length === 0) {
      const id = parseInt(slug);
      if (!isNaN(id)) {
        result = await sql`
          SELECT id, name, slug, category, client_name, site_url, problem, result, content, year, image_url
          FROM portfolio_projects
          WHERE id = ${id} AND published = true
        `;
      }
    }

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Portfolio detail error:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}
