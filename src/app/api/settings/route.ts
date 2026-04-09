import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

let cache: { data: Record<string, string>; ts: number } | null = null;
const CACHE_TTL = 60_000; // 1 minute

// GET: Public site settings (read-only)
export async function GET() {
  if (cache && Date.now() - cache.ts < CACHE_TTL) {
    return NextResponse.json({ settings: cache.data });
  }

  try {
    const result = await sql`SELECT key, value FROM site_settings`;
    const settings: Record<string, string> = {};
    for (const row of result.rows) {
      settings[row.key] = row.value;
    }
    cache = { data: settings, ts: Date.now() };
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json({ settings: cache?.data || {} });
  }
}
