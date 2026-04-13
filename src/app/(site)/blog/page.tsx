import type { Metadata } from "next";
import { sql } from "@/lib/db";
import { getAllMdxPosts } from "@/lib/mdx";
import BlogHubContent from "./blog-content";
import type { BlogPost } from "@/lib/types";

export const metadata: Metadata = {
  title: "블로그 — 웹 디자인 · SEO/AEO 인사이트",
  description:
    "AEO 자동화, SEO 전략, 웹 디자인 트렌드에 대한 치로웹디자인의 인사이트.",
  openGraph: {
    title: "블로그 — 웹 디자인 · SEO/AEO 인사이트",
    description:
      "AEO 자동화, SEO 전략, 웹 디자인 트렌드에 대한 치로웹디자인의 인사이트.",
    url: "https://chiroweb.co.kr/blog",
  },
  alternates: {
    canonical: "https://chiroweb.co.kr/blog",
  },
};

async function getDbPosts(): Promise<BlogPost[]> {
  try {
    const result = await sql`
      SELECT id, slug, title, excerpt, category, created_at
      FROM blog_posts
      WHERE published = true
      ORDER BY created_at DESC
      LIMIT 50
    `;
    if (result.rows.length > 0) return result.rows as BlogPost[];
  } catch {
    // Fall through
  }
  return [];
}

export default async function BlogPage() {
  // 1. MDX posts
  const mdxPosts = await getAllMdxPosts();
  const mdxAsPosts: BlogPost[] = mdxPosts.map((p, i) => ({
    id: 9000 + i,
    slug: p.frontmatter.slug,
    title: p.frontmatter.title,
    excerpt: p.frontmatter.excerpt,
    content: "",
    category: p.frontmatter.category,
    published: true,
    created_at: p.frontmatter.publishedAt,
    updated_at: p.frontmatter.updatedAt || p.frontmatter.publishedAt,
  }));

  // 2. DB posts
  const dbPosts = await getDbPosts();

  // 3. Merge — MDX first, dedupe by slug, sort by date desc
  const seenSlugs = new Set<string>();
  const merged: BlogPost[] = [];

  for (const post of [...mdxAsPosts, ...dbPosts]) {
    if (!seenSlugs.has(post.slug)) {
      seenSlugs.add(post.slug);
      merged.push(post as BlogPost);
    }
  }

  merged.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Fallback if no posts at all
  const finalPosts = merged.length > 0 ? merged : [
    {
      id: 1,
      slug: "what-is-aeo",
      title: "AEO와 SEO의 차이 — 2026 한국 가이드",
      excerpt: "AEO(Answer Engine Optimization)란 무엇이고, 기존 SEO와 어떻게 다른가.",
      created_at: "2026-04-13",
      category: "AEO/SEO",
    },
  ] as BlogPost[];

  return <BlogHubContent posts={finalPosts} />;
}
