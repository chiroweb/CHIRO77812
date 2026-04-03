import type { Metadata } from "next";
import AboutContent from "./about-content";

export const metadata: Metadata = {
  title: "치로웹디자인은 어떤 회사인가요? — 소개",
  description:
    "심리학 전공 디렉터가 이끄는 웹 에이전시 치로웹디자인. 심리학 기반 UI/UX 기획과 코드 레벨 SEO/AEO 최적화로 차별화된 웹 경험을 설계합니다.",
  alternates: { canonical: "https://chiroweb.co.kr/about" },
  openGraph: {
    title: "치로웹디자인은 어떤 회사인가요?",
    description: "심리학 전공 디렉터가 이끄는 웹 에이전시.",
    url: "https://chiroweb.co.kr/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
