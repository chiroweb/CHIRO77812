import { NextRequest, NextResponse } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";
import { SITE_URL } from "@/lib/constants";
import { sql } from "@/lib/db";
import { getMdxSlugs } from "@/lib/mdx";

const STATIC_PATHS = [
  "",
  "/services",
  "/services/website",
  "/services/remodeling",
  "/services/seo-aeo",
  "/portfolio",
  "/about",
  "/blog",
  "/contact",
  "/reviews",
  "/pricing",
  "/free-diagnosis",
];

async function collectAllUrls(): Promise<string[]> {
  const urls = new Set<string>(STATIC_PATHS.map((p) => `${SITE_URL}${p}`));

  for (const slug of getMdxSlugs()) {
    urls.add(`${SITE_URL}/blog/${slug}`);
  }

  try {
    const blogResult = await sql`SELECT slug FROM blog_posts WHERE published = true`;
    for (const row of blogResult.rows) {
      urls.add(`${SITE_URL}/blog/${row.slug}`);
    }
    const portfolioResult = await sql`SELECT slug, id FROM portfolio_projects WHERE published = true`;
    for (const row of portfolioResult.rows) {
      urls.add(`${SITE_URL}/portfolio/${row.slug || row.id}`);
    }
  } catch {
    // DB unavailable — proceed with static + MDX only
  }

  return [...urls];
}

export async function GET() {
  const urls = await collectAllUrls();
  const result = await submitToIndexNow(urls);
  return NextResponse.json({ submitted: urls.length, ...result, urls });
}

export async function POST(request: NextRequest) {
  let body: { urls?: string[] } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.urls || !Array.isArray(body.urls) || body.urls.length === 0) {
    return NextResponse.json({ error: "urls array required" }, { status: 400 });
  }

  const result = await submitToIndexNow(body.urls);
  return NextResponse.json(result);
}
