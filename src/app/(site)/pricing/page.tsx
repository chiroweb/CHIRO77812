import type { Metadata } from "next";
import PricingContent from "./pricing-content";

export const metadata: Metadata = {
  title: "요금 안내 — AEO 기본 포함 홈페이지 제작 175만원부터",
  description:
    "모든 플랜에 반응형 웹, SEO/AEO 통합 설계, llms.txt가 기본 포함됩니다. 175만원부터 시작하는 투명한 정찰제.",
  alternates: { canonical: "https://chiroweb.co.kr/pricing" },
  openGraph: {
    title: "요금 안내 — AEO 기본 포함 홈페이지 제작 175만원부터",
    description: "모든 플랜에 반응형 웹, SEO/AEO 통합 설계, llms.txt가 기본 포함됩니다. 175만원부터 시작하는 투명한 정찰제.",
    url: "https://chiroweb.co.kr/pricing",
  },
};

export default function PricingPage() {
  return <PricingContent />;
}
