import type { Metadata } from "next";
import { sql } from "@/lib/db";
import PortfolioHubContent from "./portfolio-hub-content";

export const metadata: Metadata = {
  title: "포트폴리오 — AEO·SEO 통합 설계 웹 에이전시의 제작 사례",
  description:
    "치로웹디자인이 설계한 프로젝트들. 심리학 기반 전환 구조와 코드 레벨 SEO/AEO가 적용된 실제 운영 사이트.",
  alternates: { canonical: "https://chiroweb.co.kr/portfolio" },
  openGraph: {
    title: "포트폴리오 — AEO·SEO 통합 설계 웹 에이전시의 제작 사례",
    description: "치로웹디자인이 설계한 프로젝트들. 심리학 기반 전환 구조와 코드 레벨 SEO/AEO가 적용된 실제 운영 사이트.",
    url: "https://chiroweb.co.kr/portfolio",
  },
};

interface PortfolioRow {
  id: number;
  name: string;
  slug: string;
  category: string;
  image_url: string;
  year: string;
}

export default async function PortfolioPage() {
  let projects: PortfolioRow[] = [];

  try {
    const result = await sql`
      SELECT id, name, slug, category, image_url, year
      FROM portfolio_projects
      WHERE published = true
      ORDER BY sort_order ASC
    `;
    projects = (result.rows as PortfolioRow[]) ?? [];
  } catch {
    projects = [];
  }

  return <PortfolioHubContent projects={projects} />;
}
