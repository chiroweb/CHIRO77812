import type { Metadata } from "next";
import ServicesContent from "./services-content";

export const metadata: Metadata = {
  title: "서비스 — 홈페이지 제작, 리모델링, SEO/AEO",
  description:
    "치로웹디자인의 3가지 핵심 서비스: 홈페이지 제작, 홈페이지 리모델링, SEO/AEO 자동화. 심리학 기반 설계와 코드 레벨 최적화를 제공합니다.",
  alternates: {
    canonical: "https://chiroweb.co.kr/services",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
