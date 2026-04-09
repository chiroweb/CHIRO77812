import type { Metadata } from "next";
import { sql } from "@/lib/db";
import PortfolioHubContent from "./portfolio-hub-content";

export const metadata: Metadata = {
  title: "포트폴리오 — 치로웹디자인 프로젝트 모음",
  description:
    "해외 호텔 브랜드, 중견 제조사, 골프 브랜드 등 치로웹디자인이 만든 프로젝트를 확인하세요.",
  alternates: { canonical: "https://chiroweb.co.kr/portfolio" },
  openGraph: {
    title: "포트폴리오 — 치로웹디자인",
    description: "치로가 만든 프로젝트 모음",
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
