"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";

const posts = [
  {
    title: "홈페이지 제작, 왜 심리학이 필요한가",
    excerpt: "사용자의 클릭은 우연이 아닙니다. 심리학 원리로 설계된 동선이 전환율을 만듭니다.",
    href: "/blog",
  },
  {
    title: "SEO vs AEO — 검색의 미래가 바뀌고 있습니다",
    excerpt: "구글 AI 오버뷰 시대, 검색엔진 최적화만으로는 부족합니다. AI 엔진 최적화가 필요한 이유.",
    href: "/blog",
  },
  {
    title: "홈페이지 리모델링, 언제 해야 할까",
    excerpt: "3년 이상 된 사이트라면 디자인보다 구조가 문제입니다. 리모델링 타이밍 체크리스트.",
    href: "/blog",
  },
];

export default function BlogPreview() {
  return (
    <section className="py-[72px] md:py-[120px] px-5 md:px-8">
      <div className="max-w-[1280px] mx-auto">
        <Divider />
        <div className="pt-16 md:pt-24">
          <SectionLabel number="07" label="Insights" />

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[44px] font-light tracking-[0.03em] leading-[1.05] mb-10 md:mb-16"
          >
            인사이트<span className="text-[#FF4D00]">.</span>
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#E0E0E0]"
          >
            {posts.map((post, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-8 group hover:bg-[#fafaf8] transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-3">
                  {post.title}
                </h3>
                <p className="text-sm text-[#6b6b6b] leading-[1.7] mb-6">
                  {post.excerpt}
                </p>
                <Link
                  href={post.href}
                  className="text-sm font-medium text-[#1a1a1a] group-hover:text-[#FF4D00] transition-colors duration-300"
                >
                  읽어보기 →
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
