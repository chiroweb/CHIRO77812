import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET: Single project
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const result = await sql`SELECT * FROM portfolio_projects WHERE id = ${parseInt(id)}`;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Portfolio get error:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

// PUT: Update project
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { name, category, problem, result: projectResult, year, image_url, published } = await request.json();

    if (!name || !category) {
      return NextResponse.json({ error: "Name and category are required" }, { status: 400 });
    }

    const result = await sql`
      UPDATE portfolio_projects
      SET name = ${name}, category = ${category}, problem = ${problem || null},
          result = ${projectResult || null}, year = ${year || null},
          image_url = ${image_url || null}, published = ${published ?? true},
          updated_at = NOW()
      WHERE id = ${parseInt(id)}
      RETURNING *
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Portfolio update error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

// DELETE: Delete project
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const result = await sql`DELETE FROM portfolio_projects WHERE id = ${parseInt(id)} RETURNING id`;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Portfolio delete error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
