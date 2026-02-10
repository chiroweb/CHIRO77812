import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// PUT: Reorder portfolio projects
export async function PUT(request: NextRequest) {
  try {
    const { orderedIds } = await request.json();

    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return NextResponse.json({ error: "orderedIds must be a non-empty array" }, { status: 400 });
    }

    if (!orderedIds.every((id: unknown) => typeof id === "number" && Number.isInteger(id))) {
      return NextResponse.json({ error: "orderedIds must contain only integers" }, { status: 400 });
    }

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
