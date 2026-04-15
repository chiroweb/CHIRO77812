"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Post {
  id: number;
  slug: string;
  title: string;
  category: string;
  created_at: string;
  best?: boolean;
}

const bestPosts: Post[] = [
  { id: 1, slug: "why-chatgpt-ignores-your-site", title: "ChatGPT에 우리 회사를 물어보면 아무것도 안 나온다 — 이유는 3가지", category: "AEO/SEO", created_at: "2026-04-10", best: true },
  { id: 2, slug: "website-regrets-after-1year", title: "홈페이지 만든 후 1년 — 사장님들이 가장 후회하는 7가지", category: "웹사이트 제작", created_at: "2026-04-07", best: true },
  { id: 3, slug: "imweb-cafe24-wordpress-comparison", title: "아임웹 vs 카페24 vs 워드프레스 — 2026년 내 사업에 맞는 건?", category: "웹사이트 제작", created_at: "2026-03-22", best: true },
  { id: 4, slug: "hidden-costs-in-website-quotes", title: "홈페이지 견적서에 안 적혀 있는 7가지 추가 비용", category: "웹사이트 제작", created_at: "2026-03-16", best: true },
  { id: 5, slug: "llms-txt-korea-first-mover", title: "llms.txt를 한국에서 먼저 도입하면 생기는 일", category: "AEO/SEO", created_at: "2026-04-09", best: true },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

export default function NewsList() {
  const posts = bestPosts;

  return (
    <section className="bg-[#f5f5f0] px-5 md:px-20 py-[200px] md:py-[260px]">
      <div className="max-w-[1400px] mx-auto">
        {/* ( NEWS ) caption */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-[13px] md:text-[14px] tracking-[0.08em] text-[#111] mb-12 font-[family-name:var(--font-jetbrains-mono)]"
        >
          ( &nbsp;BEST PICKS&nbsp; )
        </motion.p>

        {/* Post rows */}
        <div className="border-t border-[rgba(0,0,0,0.08)]">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-0 py-7 md:py-8 border-b border-[rgba(0,0,0,0.08)] hover:bg-black/[0.02] transition-colors duration-200"
              >
                {/* Date */}
                <span className="text-[13px] tracking-[0.04em] text-[#6B7280] md:w-[140px] shrink-0 font-[family-name:var(--font-jetbrains-mono)]">
                  {formatDate(post.created_at)}
                </span>

                {/* Category tags */}
                <span className="md:w-[200px] shrink-0 flex gap-2">
                  {post.best && (
                    <span className="inline-block px-2.5 py-1 text-[10px] tracking-[0.06em] uppercase font-bold text-white bg-[#FF4D00] rounded-sm font-[family-name:var(--font-jetbrains-mono)]">
                      Best
                    </span>
                  )}
                  <span className="inline-block px-3 py-1 text-[11px] tracking-[0.04em] text-white bg-[#111] rounded-sm">
                    {post.category}
                  </span>
                </span>

                {/* Title */}
                <span className="flex-1 text-[16px] md:text-[17px] text-[#111] leading-[1.5] group-hover:opacity-60 transition-opacity duration-200">
                  {post.title}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[14px] text-[#111] border border-[#111] px-8 py-3 hover:bg-[#111] hover:text-white transition-all duration-300 tracking-[0.04em] uppercase"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
