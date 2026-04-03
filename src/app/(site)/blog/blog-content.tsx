"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";
import SubCtaBand from "@/components/ui/sub-cta-band";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import FAQSection from "@/components/seo/faq-section";
import InternalLinks from "@/components/seo/internal-links";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  created_at: string;
}

interface BlogContentProps {
  posts: BlogPost[];
}

const CATEGORIES = ["전체", "홈페이지 관리법", "마케팅", "웹사이트 제작", "개인이야기"] as const;

const blogFAQ = [
  {
    question: "블로그 글은 얼마나 자주 올라오나요?",
    answer:
      "매주 1-2편의 새로운 인사이트를 공유합니다. 웹 디자인, SEO, 마케팅 트렌드 등 실전에 도움이 되는 주제를 다룹니다.",
  },
  {
    question: "글을 참고해서 직접 적용해도 되나요?",
    answer:
      "물론입니다. 치로웹디자인의 블로그는 직접 적용 가능한 실전 가이드를 지향합니다. 추가 도움이 필요하시면 무료 상담을 신청해 주세요.",
  },
  {
    question: "특정 주제에 대한 글을 요청할 수 있나요?",
    answer:
      "네, 문의 페이지를 통해 다뤄줬으면 하는 주제를 제안해 주시면 우선적으로 작성합니다.",
  },
];

const internalLinks = [
  {
    title: "서비스 안내",
    href: "/services",
    description: "치로웹디자인이 제공하는 웹 디자인, 개발, SEO 서비스를 확인하세요.",
  },
  {
    title: "무료 상담 신청",
    href: "/contact",
    description: "프로젝트에 대해 편하게 이야기 나눠보세요. 무료 상담을 제공합니다.",
  },
  {
    title: "치로웹디자인 소개",
    href: "/about",
    description: "치로웹디자인의 철학과 작업 방식에 대해 알아보세요.",
  },
];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default function BlogContent({ posts }: BlogContentProps) {
  const [activeCategory, setActiveCategory] = useState<string>("전체");

  const filteredPosts =
    activeCategory === "전체"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-5 md:px-8">
        <div className="max-w-[1280px] mx-auto">
          <Breadcrumbs pathname="/blog" />

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

          {/* Category Filter */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mt-10 md:mt-16 mb-10 md:mb-16 flex flex-wrap gap-2"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm tracking-tight transition-colors duration-200 cursor-pointer border ${
                  activeCategory === cat
                    ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                    : "bg-white text-[#6b6b6b] border-[#E0E0E0] hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Featured Post (first) */}
          {filteredPosts.length > 0 && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <Link
                href={`/blog/${filteredPosts[0].slug}`}
                className="group block bg-[#1a1a1a] p-8 md:p-12 -mx-5 md:mx-0"
              >
                <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#FF4D00] mb-4">
                  Latest — {filteredPosts[0].category}
                </p>
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-[22px] md:text-[36px] font-light tracking-[0.03em] leading-[1.15] text-white mb-4 group-hover:opacity-70 transition-opacity duration-300">
                  {filteredPosts[0].title}
                </h2>
                <p className="text-sm text-white/50 leading-[1.7] max-w-lg mb-6">
                  {filteredPosts[0].excerpt}
                </p>
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] text-[#6b6b6b]">
                  {formatDate(filteredPosts[0].created_at)}
                </span>
              </Link>
            </motion.div>
          )}

          {/* Rest of posts */}
          {filteredPosts.length > 1 && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="mt-10 md:mt-16"
            >
              {filteredPosts.slice(1).map((post, index) => (
                <motion.div key={post.id} variants={fadeInUp}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block py-10 border-b border-[#E0E0E0]"
                  >
                    <div className="grid grid-cols-4 md:grid-cols-12 gap-6 items-start">
                      <div className="col-span-4 md:col-span-1">
                        <p className="text-xs tracking-wider text-[#9b9b9b] font-[family-name:var(--font-jetbrains-mono)]">
                          {String(index + 2).padStart(2, "0")}
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
          )}

          {/* Empty state */}
          {filteredPosts.length === 0 && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="mt-10 md:mt-16 py-20 text-center"
            >
              <p className="text-[#9b9b9b] text-sm">
                해당 카테고리의 글이 아직 없습니다.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection
        questions={blogFAQ}
        sectionNumber="02"
        sectionLabel="FAQ"
        heading="Questions"
      />

      {/* ── Internal Links ── */}
      <InternalLinks links={internalLinks} heading="함께 보면 좋은 페이지" />

      {/* ── CTA Band ── */}
      <SubCtaBand />
    </>
  );
}
