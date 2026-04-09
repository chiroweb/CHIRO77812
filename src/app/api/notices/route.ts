import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

let cache: { data: unknown; ts: number } | null = null;
const CACHE_TTL = 60_000; // 1 minute

// GET: Public - published notices only
export async function GET() {
  // Return cached if fresh
  if (cache && Date.now() - cache.ts < CACHE_TTL) {
    return NextResponse.json({ notices: cache.data });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const result = await sql`
      SELECT * FROM notices
      WHERE published = true
      ORDER BY sort_order ASC, created_at DESC
    `;

    clearTimeout(timeout);
    cache = { data: result.rows, ts: Date.now() };
    return NextResponse.json({ notices: result.rows });
  } catch (error) {
    console.error("Public notices error:", error);
    return NextResponse.json({ notices: cache?.data || [] });
  }
}
