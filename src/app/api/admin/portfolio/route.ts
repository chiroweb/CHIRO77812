import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET: List all portfolio projects (admin)
export async function GET() {
  try {
    const result = await sql`
      SELECT * FROM portfolio_projects
      ORDER BY sort_order ASC, created_at DESC
    `;
    return NextResponse.json({ projects: result.rows });
  } catch (error) {
    console.error("Portfolio list error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

// POST: Create a new portfolio project
export async function POST(request: NextRequest) {
  try {
    const { name, category, problem, result: projectResult, year, image_url, published } = await request.json();

    if (!name || !category) {
      return NextResponse.json({ error: "Name and category are required" }, { status: 400 });
    }

    // Get next sort_order
    const maxOrder = await sql`SELECT COALESCE(MAX(sort_order), 0) + 1 as next_order FROM portfolio_projects`;
    const sortOrder = maxOrder.rows[0].next_order;

    const result = await sql`
      INSERT INTO portfolio_projects (name, category, problem, result, year, image_url, sort_order, published)
      VALUES (${name}, ${category}, ${problem || null}, ${projectResult || null}, ${year || null}, ${image_url || null}, ${sortOrder}, ${published ?? true})
      RETURNING *
    `;

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Portfolio create error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
