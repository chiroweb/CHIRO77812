"use client";

import { usePathname } from "next/navigation";

const SITE_URL = "https://chiroweb.co.kr";

/** 경로 세그먼트 → 한국어 라벨 매핑 */
const SEGMENT_LABELS: Record<string, string> = {
  services: "서비스",
  website: "홈페이지 제작",
  remodeling: "홈페이지 리모델링",
  "seo-aeo": "SEO/AEO 통합 설계",
  portfolio: "포트폴리오",
  blog: "블로그",
  about: "회사 소개",
  contact: "문의하기",
  pricing: "요금 안내",
  reviews: "고객 후기",
  "free-diagnosis": "무료 홈페이지 진단",
};

export default function BreadcrumbJsonLd() {
  const pathname = usePathname();

  // 홈에서는 BreadcrumbList 불필요
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  const items = [
    { name: "홈", url: SITE_URL },
    ...segments.map((seg, i) => ({
      name: SEGMENT_LABELS[seg] || decodeURIComponent(seg),
      url: `${SITE_URL}/${segments.slice(0, i + 1).join("/")}`,
    })),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
