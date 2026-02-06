import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// PUT: Reorder portfolio projects
export async function PUT(request: NextRequest) {
  try {
    const { orderedIds } = await request.json();

    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ error: "orderedIds must be an array" }, { status: 400 });
    }

    // Update sort_order for each project
    for (let i = 0; i < orderedIds.length; i++) {
      await sql`
        UPDATE portfolio_projects
        SET sort_order = ${i}, updated_at = NOW()
        WHERE id = ${orderedIds[i]}
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reorder error:", error);
    return NextResponse.json({ error: "Failed to reorder projects" }, { status: 500 });
  }
}
