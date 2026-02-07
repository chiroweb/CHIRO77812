"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  created_at: string;
}

const fallbackPosts = [
  {
    id: 1,
    slug: "why-custom-website",
    title: "아임웹, 카페24를 넘어서: 커스텀 웹사이트가 필요한 순간",
    excerpt: "템플릿 기반 빌더의 한계와 커스텀 빌드가 브랜드에 가져다주는 실질적인 차이를 이야기합니다.",
    created_at: "2025-01-15",
    category: "Insight",
  },
  {
    id: 2,
    slug: "web-performance-matters",
    title: "3초의 법칙: 웹사이트 속도가 매출에 미치는 영향",
    excerpt: "로딩 속도 1초 개선이 전환율에 어떤 영향을 미치는지, 실제 데이터를 기반으로 분석합니다.",
    created_at: "2025-01-08",
    category: "Performance",
  },
  {
    id: 3,
    slug: "design-trust",
    title: "디자인이 신뢰를 만드는 방법",
    excerpt: "방문자가 웹사이트에 머무르는 이유와 떠나는 이유. 신뢰를 설계하는 디자인 원칙을 정리합니다.",
    created_at: "2024-12-20",
    category: "Design",
  },
];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default function BlogContent() {
  const [posts, setPosts] = useState<Post[]>(fallbackPosts);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => {
        if (data.posts && data.posts.length > 0) {
          setPosts(data.posts);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="pt-24 md:pt-32 pb-24 md:pb-32 px-5 md:px-8">
      <div className="max-w-[1280px] mx-auto">
        <SectionLabel number="01" label="Blog" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-12 md:mb-20"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[44px] font-light tracking-[0.03em] leading-[1.05] mb-6"
          >
            생각을 기록합니다<span className="text-[#FF4D00]">.</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-base text-[#6b6b6b] leading-[1.7] max-w-lg"
          >
            웹 디자인, 브랜딩, 성능 최적화에 대한 치로의 시선을 나눕니다.
          </motion.p>
        </motion.div>

        <Divider />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-10 md:mt-16"
        >
          {posts.map((post, index) => (
            <motion.div key={post.id} variants={fadeInUp}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block py-10 border-b border-[#E0E0E0]"
              >
                <div className="grid grid-cols-4 md:grid-cols-12 gap-6 items-start">
                  <div className="col-span-4 md:col-span-1">
                    <p className="text-xs tracking-wider text-[#9b9b9b] font-[family-name:var(--font-jetbrains-mono)]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                  </div>

                  <div className="col-span-4 md:col-span-7">
                    <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b] mb-3">
                      {post.category}
                    </p>
                    <h2 className="text-lg md:text-xl font-semibold tracking-tight mb-3 group-hover:opacity-50 transition-opacity duration-300">
                      {post.title}
                    </h2>
                    <p className="text-sm text-[#6b6b6b] leading-[1.7]">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="col-span-4 md:col-span-2 md:col-start-11 md:text-right">
                    <p className="text-xs tracking-wider text-[#9b9b9b] font-[family-name:var(--font-jetbrains-mono)]">
                      {formatDate(post.created_at)}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
