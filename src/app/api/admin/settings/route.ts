import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET: All settings
export async function GET() {
  try {
    const result = await sql`SELECT * FROM site_settings ORDER BY key`;
    const settings: Record<string, string> = {};
    for (const row of result.rows) {
      settings[row.key] = row.value;
    }
    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Settings get error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

// PUT: Update settings
export async function PUT(request: NextRequest) {
  try {
    const { settings } = await request.json();

    if (!settings || typeof settings !== "object") {
      return NextResponse.json({ error: "Settings must be an object" }, { status: 400 });
    }

    for (const [key, value] of Object.entries(settings)) {
      await sql`
        INSERT INTO site_settings (key, value, updated_at)
        VALUES (${key}, ${value as string}, NOW())
        ON CONFLICT (key) DO UPDATE SET value = ${value as string}, updated_at = NOW()
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
