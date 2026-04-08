"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Post {
  id: number;
  slug: string;
  title: string;
  category: string;
  created_at: string;
}

const fallbackPosts: Post[] = [
  { id: 1, slug: "why-custom-website", title: "아임웹, 카페24를 넘어서: 커스텀 웹사이트가 필요한 순간", category: "웹사이트 제작", created_at: "2025-01-15" },
  { id: 2, slug: "web-performance-matters", title: "3초의 법칙: 웹사이트 속도가 매출에 미치는 영향", category: "마케팅", created_at: "2025-01-08" },
  { id: 3, slug: "design-trust", title: "디자인이 신뢰를 만드는 방법", category: "홈페이지 관리법", created_at: "2024-12-20" },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

export default function NewsList() {
  const [posts, setPosts] = useState<Post[]>(fallbackPosts);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => {
        if (data.posts && data.posts.length > 0) {
          setPosts(data.posts.slice(0, 5));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-[#f5f5f0] px-5 md:px-20 py-[120px] md:py-[160px]">
      <div className="max-w-[1400px] mx-auto">
        {/* ( NEWS ) caption */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-[13px] md:text-[14px] tracking-[0.08em] text-[#111] mb-12 font-[family-name:var(--font-jetbrains-mono)]"
        >
          ( &nbsp;NEWS&nbsp; )
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
                <span className="md:w-[160px] shrink-0 flex gap-2">
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
