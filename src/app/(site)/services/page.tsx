import type { Metadata } from "next";
import ServicesContent from "./services-content";

export const metadata: Metadata = {
  title: "서비스 — 홈페이지 제작, 반응형 웹, 유지보수",
  description:
    "홈페이지 제작부터 모바일 최적화, 반응형 웹, 유지보수까지. 상담 당일 실시간 빌드를 시작하는 치로웹디자인의 서비스를 확인하세요.",
  openGraph: {
    title: "서비스 — 홈페이지 제작, 반응형 웹, 유지보수 | 치로웹디자인",
    description:
      "홈페이지 제작부터 모바일 최적화, 반응형 웹, 유지보수까지. 상담 당일 실시간 빌드를 시작합니다.",
    url: "https://chiroweb.co.kr/services",
  },
  alternates: {
    canonical: "https://chiroweb.co.kr/services",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
