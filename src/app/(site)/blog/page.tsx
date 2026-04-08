import type { Metadata } from "next";
import { sql } from "@/lib/db";
import BlogContent from "./blog-content";
import type { BlogPost } from "@/lib/types";

export const metadata: Metadata = {
  title: "웹 디자인 & 마케팅 인사이트 — 블로그",
  description:
    "치로웹디자인의 웹 디자인, SEO, AEO, 마케팅 인사이트를 공유합니다. 홈페이지 제작과 운영에 도움이 되는 실전 지식.",
  openGraph: {
    title: "웹 디자인 & 마케팅 인사이트 — 블로그 | 치로웹디자인",
    description:
      "치로웹디자인의 웹 디자인, SEO, AEO, 마케팅 인사이트를 공유합니다.",
    url: "https://chiroweb.co.kr/blog",
  },
  alternates: {
    canonical: "https://chiroweb.co.kr/blog",
  },
};

const fallbackPosts = [
  {
    id: 1,
    slug: "why-custom-website",
    title: "아임웹, 카페24를 넘어서: 커스텀 웹사이트가 필요한 순간",
    excerpt:
      "템플릿 기반 빌더의 한계와 커스텀 빌드가 브랜드에 가져다주는 실질적인 차이를 이야기합니다.",
    created_at: "2025-01-15",
    category: "웹사이트 제작",
  },
  {
    id: 2,
    slug: "web-performance-matters",
    title: "3초의 법칙: 웹사이트 속도가 매출에 미치는 영향",
    excerpt:
      "로딩 속도 1초 개선이 전환율에 어떤 영향을 미치는지, 실제 데이터를 기반으로 분석합니다.",
    created_at: "2025-01-08",
    category: "마케팅",
  },
  {
    id: 3,
    slug: "design-trust",
    title: "디자인이 신뢰를 만드는 방법",
    excerpt:
      "방문자가 웹사이트에 머무르는 이유와 떠나는 이유. 신뢰를 설계하는 디자인 원칙을 정리합니다.",
    created_at: "2024-12-20",
    category: "홈페이지 관리법",
  },
];

async function getBlogPosts() {
  try {
    const result = await sql`
      SELECT id, slug, title, excerpt, category, created_at
      FROM blog_posts
      WHERE published = true
      ORDER BY created_at DESC
      LIMIT 50
    `;
    if (result.rows.length > 0) {
      return result.rows as BlogPost[];
    }
    return fallbackPosts as unknown as BlogPost[];
  } catch {
    return fallbackPosts as unknown as BlogPost[];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return <BlogContent posts={posts} />;
}
