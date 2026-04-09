import type { Metadata } from "next";
import PricingContent from "./pricing-content";

export const metadata: Metadata = {
  title: "홈페이지 제작 비용 — 거품 없는 정찰제",
  description:
    "99만원부터 시작하는 홈페이지 제작. SEO/AEO 자동화 세팅 기본 포함. 숨은 비용 없는 올인원 패키지.",
  alternates: { canonical: "https://chiroweb.co.kr/pricing" },
  openGraph: {
    title: "요금제 — 치로웹디자인",
    description: "99만원부터 시작하는 정찰제 홈페이지 제작",
    url: "https://chiroweb.co.kr/pricing",
  },
};

export default function PricingPage() {
  return <PricingContent />;
}
