import type { Metadata } from "next";
import ContactContent from "./contact-content";

export const metadata: Metadata = {
  title: "문의하기 — 프로젝트 상담 및 무료 진단",
  description:
    "홈페이지 제작, 리모델링, SEO/AEO 통합 설계 프로젝트 상담. 무료 사이트 진단도 가능합니다.",
  alternates: { canonical: "https://chiroweb.co.kr/contact" },
  openGraph: {
    title: "문의하기 — 프로젝트 상담 및 무료 진단",
    description:
      "홈페이지 제작, 리모델링, SEO/AEO 통합 설계 프로젝트 상담. 무료 사이트 진단도 가능합니다.",
    url: "https://chiroweb.co.kr/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
