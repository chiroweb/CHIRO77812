import { MetadataRoute } from "next";
import { sql } from "@/lib/db";

const BASE_URL = "https://chiroweb.co.kr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  let blogPages: MetadataRoute.Sitemap = [];
  let portfolioPages: MetadataRoute.Sitemap = [];

  try {
    const blogResult = await sql`
      SELECT slug, updated_at, created_at FROM blog_posts
      WHERE published = true ORDER BY created_at DESC
    `;
    blogPages = blogResult.rows.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    const portfolioResult = await sql`
      SELECT slug, id, updated_at FROM portfolio_projects
      WHERE published = true ORDER BY sort_order ASC
    `;
    portfolioPages = portfolioResult.rows.map((p) => ({
      url: `${BASE_URL}/portfolio/${p.slug || p.id}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // Fallback: only static pages
  }

  return [...staticPages, ...portfolioPages, ...blogPages];
}
