"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const posts = [
  { date: "2026.04.01", category: "SEO", title: "2026년 구글 SEO 트렌드: AI 검색 시대의 최적화 전략" },
  { date: "2026.03.25", category: "마케팅", title: "중소기업 온라인 마케팅, 어디서부터 시작해야 할까?" },
  { date: "2026.03.18", category: "웹디자인", title: "전환율을 높이는 랜딩페이지 설계 원칙 5가지" },
  { date: "2026.03.10", category: "브랜딩", title: "브랜드 아이덴티티가 매출에 미치는 실질적 영향" },
];

export default function BlogList() {
  return (
    <section className="bg-[#0D1117] px-5 md:px-20 py-[160px]" data-theme="dark">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <span className="text-[11px] tracking-[0.08em] uppercase text-white/20 mb-4 block font-[family-name:var(--font-jetbrains-mono)]">
              ( Blog )
            </span>
            <h2 className="text-[28px] md:text-[36px] font-semibold text-[#F5F5F5] tracking-[-0.01em]">
              Latest Insights
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-[12px] text-white/30 hover:text-white/60 transition-colors duration-300 tracking-[0.08em] font-[family-name:var(--font-jetbrains-mono)]"
          >
            View all →
          </Link>
        </div>

        <div className="border-t border-white/[0.12]">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href="/blog"
                className="group flex items-center h-[80px] md:h-[100px] border-b border-white/[0.12] hover:bg-white/[0.03] transition-colors duration-200 gap-4 md:gap-8"
              >
                <span className="text-[11px] tracking-[0.08em] text-[#6B7280] w-[80px] shrink-0 font-[family-name:var(--font-jetbrains-mono)]">
                  {post.date}
                </span>
                <span className="hidden md:inline text-[11px] tracking-[0.08em] text-[#6B7280] w-[80px] shrink-0">
                  {post.category}
                </span>
                <span className="text-[16px] text-white/70 group-hover:text-white transition-colors duration-200 flex-1 group-hover:underline underline-offset-4 decoration-white/20">
                  {post.title}
                </span>
                <span className="text-white/20 group-hover:text-white/50 transition-colors duration-200 shrink-0">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
