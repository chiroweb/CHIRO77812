import type { Metadata } from "next";
import ContactContent from "./contact-content";

export const metadata: Metadata = {
  title: "프로젝트 문의 — 치로웹디자인",
  description:
    "홈페이지 제작, 리모델링, SEO/AEO 프로젝트를 문의하세요. 치로웹디자인이 24시간 이내에 응답합니다.",
  alternates: { canonical: "https://chiroweb.co.kr/contact" },
  openGraph: {
    title: "프로젝트 문의 — 치로웹디자인",
    description:
      "홈페이지 제작·리모델링·SEO 프로젝트 문의. 24시간 이내 응답.",
    url: "https://chiroweb.co.kr/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
