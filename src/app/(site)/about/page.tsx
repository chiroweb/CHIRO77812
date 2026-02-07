import type { Metadata } from "next";
import AboutContent from "./about-content";

export const metadata: Metadata = {
  title: "소개 — 디렉터의 편지",
  description:
    "치로웹디자인은 소수의 프로젝트에 깊이 집중하는 웹 디자인 스튜디오입니다. 투명함, 몰입, 정제의 가치로 브랜드의 본질을 디지털 위에 옮깁니다.",
  openGraph: {
    title: "소개 — 디렉터의 편지 | 치로웹디자인",
    description:
      "소수의 프로젝트에 깊이 집중하는 웹 디자인 스튜디오. 투명함, 몰입, 정제의 가치로 브랜드의 본질을 디지털 위에 옮깁니다.",
    url: "https://chiroweb.co.kr/about",
  },
  alternates: {
    canonical: "https://chiroweb.co.kr/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
