import { MetadataRoute } from "next";

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

  // Dynamic pages from DB
  let blogPages: MetadataRoute.Sitemap = [];
  let portfolioPages: MetadataRoute.Sitemap = [];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

    const blogRes = await fetch(`${baseUrl}/api/blog`, {
      cache: "no-store",
    });
    if (blogRes.ok) {
      const data = await blogRes.json();
      blogPages = (data.posts || []).map(
        (post: { slug: string; updated_at?: string; created_at: string }) => ({
          url: `${BASE_URL}/blog/${post.slug}`,
          lastModified: new Date(post.updated_at || post.created_at),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        })
      );
    }

    const portfolioRes = await fetch(`${baseUrl}/api/portfolio`, {
      cache: "no-store",
    });
    if (portfolioRes.ok) {
      const data = await portfolioRes.json();
      portfolioPages = (data.projects || []).map(
        (p: { slug?: string; id: number; updated_at?: string }) => ({
          url: `${BASE_URL}/portfolio/${p.slug || p.id}`,
          lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })
      );
    }
  } catch {
    // Fallback: only static pages
  }

  return [...staticPages, ...portfolioPages, ...blogPages];
}
