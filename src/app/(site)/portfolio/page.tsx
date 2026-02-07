import type { Metadata } from "next";
import PortfolioContent from "./portfolio-content";

export const metadata: Metadata = {
  title: "포트폴리오 — 엄선된 프로젝트",
  description:
    "치로웹디자인이 몰입했던 프로젝트들입니다. 각 프로젝트는 고유한 문제를 해결하고, 측정 가능한 결과를 만들어냈습니다.",
  openGraph: {
    title: "포트폴리오 — 엄선된 프로젝트 | 치로웹디자인",
    description:
      "치로웹디자인이 몰입했던 프로젝트들입니다. 각 프로젝트는 고유한 문제를 해결하고, 측정 가능한 결과를 만들어냈습니다.",
    url: "https://chiroweb.co.kr/portfolio",
  },
  alternates: {
    canonical: "https://chiroweb.co.kr/portfolio",
  },
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
