"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/motion";

const posts = [
  {
    title: "홈페이지 제작, 왜 심리학이 필요한가",
    excerpt:
      "사용자의 클릭은 우연이 아닙니다. 심리학 원리로 설계된 동선이 전환율을 만듭니다.",
    href: "/blog",
  },
  {
    title: "SEO vs AEO — 검색의 미래가 바뀌고 있습니다",
    excerpt:
      "구글 AI 오버뷰 시대, 검색엔진 최적화만으로는 부족합니다. AI 엔진 최적화가 필요한 이유.",
    href: "/blog",
  },
  {
    title: "홈페이지 리모델링, 언제 해야 할까",
    excerpt:
      "3년 이상 된 사이트라면 디자인보다 구조가 문제입니다. 리모델링 타이밍 체크리스트.",
    href: "/blog",
  },
];

export default function BlogPreview() {
  return (
    <section className="py-[200px] md:py-[260px] px-5 md:px-8 lg:px-16 bg-[#fafaf8]">
      <div className="max-w-[1280px] mx-auto">
        {posts.map((post, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="border-t border-[#E0E0E0] py-12 md:py-16"
          >
            <Link
              href={post.href}
              className="group flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-16"
            >
              <h3 className="text-[24px] md:text-[32px] lg:text-[40px] font-light tracking-[-0.02em] leading-[1.2] text-[#1a1a1a] md:max-w-[55%] group-hover:text-[#FF4D00] transition-colors duration-300"

              >
                {post.title}
              </h3>

              <div className="md:max-w-[360px] flex flex-col gap-4">
                <p className="text-sm md:text-base text-[#6b6b6b] leading-[1.8]">
                  {post.excerpt}
                  {" "}
                  <span className="inline-flex items-center gap-1 text-[#1a1a1a] group-hover:text-[#FF4D00] transition-colors duration-300">
                    →
                  </span>
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
