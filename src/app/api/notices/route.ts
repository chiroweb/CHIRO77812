import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// GET: Public - published notices only
export async function GET() {
  try {
    const result = await sql`
      SELECT * FROM notices
      WHERE published = true
      ORDER BY sort_order ASC, created_at DESC
    `;

    return NextResponse.json({ notices: result.rows });
  } catch (error) {
    console.error("Public notices error:", error);
    return NextResponse.json({ notices: [] });
  }
}
