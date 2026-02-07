import type { Metadata } from "next";
import ContactContent from "./contact-content";

export const metadata: Metadata = {
  title: "문의 — 무료 진단 및 프로세스 체험",
  description:
    "프로젝트 문의를 남겨 주세요. 무료 진단과 함께 실시간 빌드 프로세스를 직접 체험할 수 있는 링크를 보내드립니다.",
  openGraph: {
    title: "문의 — 무료 진단 및 프로세스 체험 | 치로웹디자인",
    description:
      "프로젝트 문의를 남겨 주세요. 무료 진단과 함께 실시간 빌드 프로세스를 직접 체험하세요.",
    url: "https://chiroweb.co.kr/contact",
  },
  alternates: {
    canonical: "https://chiroweb.co.kr/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
