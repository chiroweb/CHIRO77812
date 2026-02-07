import type { Metadata } from "next";
import BlogContent from "./blog-content";

export const metadata: Metadata = {
  title: "블로그 — 웹 디자인 인사이트",
  description:
    "웹 디자인, 브랜딩, 성능 최적화에 대한 치로웹디자인의 인사이트를 공유합니다. 커스텀 웹사이트가 브랜드에 가져다주는 실질적인 차이를 이야기합니다.",
  openGraph: {
    title: "블로그 — 웹 디자인 인사이트 | 치로웹디자인",
    description:
      "웹 디자인, 브랜딩, 성능 최적화에 대한 치로웹디자인의 인사이트를 공유합니다.",
    url: "https://chiroweb.co.kr/blog",
  },
  alternates: {
    canonical: "https://chiroweb.co.kr/blog",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
