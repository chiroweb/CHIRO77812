import type { Metadata } from "next";
import { sql } from "@/lib/db";
import ServicesHubContent from "./services-hub-content";

export const metadata: Metadata = {
  title: "서비스 — 홈페이지 제작 · 리모델링 · AEO·SEO 통합 설계",
  description:
    "홈페이지 제작, 리모델링, SEO/AEO 통합 설계를 하나의 팀에서 완성합니다. ChatGPT·Perplexity가 인용하는 구조를 코드 레벨에서 설계합니다.",
  alternates: { canonical: "https://chiroweb.co.kr/services" },
  openGraph: {
    title: "서비스 — 홈페이지 제작 · 리모델링 · AEO·SEO 통합 설계",
    description: "홈페이지 제작, 리모델링, SEO/AEO 통합 설계를 하나의 팀에서 완성합니다. ChatGPT·Perplexity가 인용하는 구조를 코드 레벨에서 설계합니다.",
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
