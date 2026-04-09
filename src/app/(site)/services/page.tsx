import type { Metadata } from "next";
import { sql } from "@/lib/db";
import ServicesHubContent from "./services-hub-content";

export const metadata: Metadata = {
  title: "서비스 — 홈페이지 제작, 리모델링, SEO/AEO 최적화",
  description:
    "치로웹디자인의 세 가지 핵심 서비스. 심리학 기반 웹사이트 제작, 기존 사이트 리모델링, SEO/AEO 자동화 최적화를 제공합니다.",
  alternates: { canonical: "https://chiroweb.co.kr/services" },
  openGraph: {
    title: "서비스 — 치로웹디자인",
    description: "홈페이지 제작, 리모델링, SEO/AEO 최적화",
    url: "https://chiroweb.co.kr/services",
  },
};

interface PortfolioProject {
  name: string;
  slug: string;
  category: string;
  image_url: string;
}

export default async function ServicesPage() {
  let portfolioProjects: PortfolioProject[] = [];

  try {
    const result = await sql`
      SELECT name, slug, category, image_url
      FROM portfolio_projects
      WHERE published = true
      ORDER BY sort_order ASC, created_at DESC
      LIMIT 3
    `;
    portfolioProjects = result.rows as PortfolioProject[];
  } catch {
    // DB unavailable — content component handles empty state
  }

  return <ServicesHubContent portfolioProjects={portfolioProjects} />;
}
