import type { Metadata } from "next";
import { sql } from "@/lib/db";
import PortfolioContent from "./portfolio-content";
import type { PortfolioProject } from "@/lib/types";

export const metadata: Metadata = {
  title: "포트폴리오 — 치로웹디자인 제작 사례",
  description:
    "치로웹디자인의 포트폴리오. 기업 홈페이지, 브랜드 사이트, 리모델링 등 다양한 프로젝트 사례를 확인하세요.",
  openGraph: {
    title: "포트폴리오 — 치로웹디자인 제작 사례 | 치로웹디자인",
    description:
      "치로웹디자인의 포트폴리오. 기업 홈페이지, 브랜드 사이트, 리모델링 등 다양한 프로젝트 사례를 확인하세요.",
    url: "https://chiroweb.co.kr/portfolio",
  },
  alternates: {
    canonical: "https://chiroweb.co.kr/portfolio",
  },
};

// Fallback data for when DB is unavailable
const fallbackProjects: PortfolioProject[] = [
  { id: 1, name: "NBPKOREA", slug: "nbpkorea", category: "Branding & Web", client_name: "NBPKOREA", site_url: null, problem: "글로벌 시장 진출을 위한 브랜드 사이트 필요", result: "브랜드 아이덴티티 구축 및 웹사이트 런칭", solution: null, content: null, year: "2024", image_url: "/portfolio/nbpkorea.png", sort_order: 0, published: true, created_at: "", updated_at: "" },
  { id: 2, name: "Man Solution", slug: "man-solution", category: "Corporate Site", client_name: "Man Solution", site_url: null, problem: "기업 신뢰도를 전달할 홈페이지 부재", result: "전문성을 강조한 기업 사이트 구축", solution: null, content: null, year: "2024", image_url: "/portfolio/mansolution.png", sort_order: 1, published: true, created_at: "", updated_at: "" },
  { id: 3, name: "FUNI", slug: "funi", category: "E-commerce", client_name: "FUNI", site_url: null, problem: "온라인 판매 채널 확장 필요", result: "브랜드 감성을 살린 이커머스 구축", solution: null, content: null, year: "2024", image_url: "/portfolio/funi.png", sort_order: 2, published: true, created_at: "", updated_at: "" },
  { id: 4, name: "STUDIO", slug: "studio", category: "Portfolio Site", client_name: "STUDIO", site_url: null, problem: "크리에이티브 포트폴리오 사이트 필요", result: "미니멀 디자인의 포트폴리오 사이트 런칭", solution: null, content: null, year: "2025", image_url: "/portfolio/studio.png", sort_order: 3, published: true, created_at: "", updated_at: "" },
];

export default async function PortfolioPage() {
  let projects: PortfolioProject[];
  try {
    const result = await sql`SELECT * FROM portfolio_projects WHERE published = true ORDER BY sort_order ASC, created_at DESC`;
    projects = result.rows as PortfolioProject[];
  } catch {
    projects = fallbackProjects;
  }
  return <PortfolioContent projects={projects} />;
}
