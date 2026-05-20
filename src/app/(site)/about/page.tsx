import type { Metadata } from "next";
import AboutContent from "./about-content";

export const metadata: Metadata = {
  title: "회사 소개 — AEO·SEO 통합 설계 웹 에이전시 치로웹디자인",
  description:
    "심리학 전공 디렉터가 이끄는 AEO·SEO 통합 설계 웹 스튜디오. 기획부터 디자인, 개발, SEO/AEO 최적화까지 코드 레벨에서 구현합니다.",
  alternates: { canonical: "https://chiroweb.co.kr/about" },
  openGraph: {
    title: "회사 소개 — AEO·SEO 통합 설계 웹 에이전시 치로웹디자인",
    description:
      "심리학 전공 디렉터가 이끄는 AEO·SEO 통합 설계 웹 스튜디오. 기획부터 디자인, 개발, SEO/AEO 최적화까지 코드 레벨에서 구현합니다.",
    url: "https://chiroweb.co.kr/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
