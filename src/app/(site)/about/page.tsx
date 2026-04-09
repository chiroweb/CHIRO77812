import type { Metadata } from "next";
import AboutContent from "./about-content";

export const metadata: Metadata = {
  title: "치로웹디자인 소개 — 심리학 기반 올인원 웹 에이전시",
  description:
    "심리학 전공 디렉터가 기획부터 개발까지 1인 전담. SEO/AEO 자동화 기본 포함. 런칭 4개월 만에 해외 브랜드 수주.",
  alternates: { canonical: "https://chiroweb.co.kr/about" },
  openGraph: {
    title: "치로웹디자인 소개",
    description:
      "심리학 기반 설계와 코드 레벨 구현의 올인원 웹 에이전시",
    url: "https://chiroweb.co.kr/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
