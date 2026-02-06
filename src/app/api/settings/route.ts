import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// GET: Public site settings (read-only)
export async function GET() {
  try {
    const result = await sql`SELECT key, value FROM site_settings`;
    const settings: Record<string, string> = {};
    for (const row of result.rows) {
      settings[row.key] = row.value;
    }
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json({ settings: {} });
  }
}
