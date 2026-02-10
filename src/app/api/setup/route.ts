import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Production: require admin token
  if (process.env.NODE_ENV === "production") {
    const token = request.headers.get("x-setup-token");
    if (token !== process.env.JWT_SECRET) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        slug VARCHAR(500) NOT NULL UNIQUE,
        excerpt TEXT,
        content TEXT NOT NULL,
        category VARCHAR(100) DEFAULT 'Insight',
        published BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS portfolio_projects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(300) NOT NULL,
        slug VARCHAR(300) UNIQUE,
        category VARCHAR(200) NOT NULL,
        client_name VARCHAR(300),
        site_url TEXT,
        problem TEXT,
        result TEXT,
        content TEXT,
        year VARCHAR(10),
        image_url TEXT,
        sort_order INTEGER DEFAULT 0,
        published BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS slug VARCHAR(300) UNIQUE`;
    await sql`ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS client_name VARCHAR(300)`;
    await sql`ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS site_url TEXT`;
    await sql`ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS content TEXT`;

    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        email VARCHAR(300) NOT NULL,
        company VARCHAR(300),
        message TEXT NOT NULL,
        read BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        key VARCHAR(200) PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS notices (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        notice_type VARCHAR(20) NOT NULL DEFAULT 'banner',
        size VARCHAR(20) NOT NULL DEFAULT 'medium',
        content TEXT,
        link_url TEXT,
        link_text VARCHAR(200),
        image_url TEXT,
        bg_color VARCHAR(20) DEFAULT '#1a1a1a',
        text_color VARCHAR(20) DEFAULT '#ffffff',
        published BOOLEAN DEFAULT false,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    return NextResponse.json({ message: "Tables created successfully" });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: "Failed to create tables", details: String(error) },
      { status: 500 }
    );
  }
}
