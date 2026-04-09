"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SubpageHero from "@/components/sections/subpage-hero";
import SubNav from "@/components/ui/sub-nav";
import ContactCtaSection from "@/components/sections/contact-cta-section";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string;
  created_at: string;
}

export default function BlogContent({ posts }: { posts: BlogPost[] }) {
  const categories = ["전체", ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))];
  const [activeCategory, setActiveCategory] = useState("전체");

  const filtered = activeCategory === "전체" ? posts : posts.filter((p) => p.category === activeCategory);
  const featured = posts[0];

  return (
    <>
      <SubpageHero
        title="BLOG"
        label="( Insights )"
      />

      <SubNav pageLabel="BLOG MENU" items={[
        { label: "FEATURED", href: "#featured" },
        { label: "ALL POSTS", href: "#posts" },
      ]} />

      {/* Featured Post */}
      {featured && (
        <section id="featured" className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 py-[160px] md:py-[200px]">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-[11px] tracking-[0.08em] uppercase text-[#999] mb-4 font-[family-name:var(--font-jetbrains-mono)]">
              ( FEATURED )
            </p>
            <p className="text-[14px] text-[#999] mt-0 mb-8">추천 아티클</p>
            <Link href={`/blog/${featured.slug}`} className="group block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="border-t-2 border-[#111] pt-8"
              >
                <span className="text-[11px] text-[#999] font-[family-name:var(--font-jetbrains-mono)] tracking-[0.06em]">
                  {featured.category} · {new Date(featured.created_at).toLocaleDateString("ko-KR")}
                </span>
                <h2 className="mt-3 text-[28px] md:text-[40px] lg:text-[48px] font-extrabold text-[#111] tracking-[-0.02em] leading-[1.1] group-hover:text-[#555] transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-4 text-[15px] text-[#666] leading-[1.8] max-w-[600px]">
                  {featured.excerpt}
                </p>
                <span className="mt-6 inline-block text-[13px] text-[#111] tracking-[0.04em] uppercase group-hover:text-[#FF4D00] transition-colors">
                  Read More →
                </span>
              </motion.div>
            </Link>
          </div>
        </section>
      )}

      {/* Filter + Post List */}
      <section id="posts" className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 pb-[200px] md:pb-[260px]">
        <div className="max-w-[1400px] mx-auto">
          {/* Category Tabs */}
          <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[13px] rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#111] text-white"
                    : "bg-white text-[#666] border border-[#e5e5e5] hover:border-[#111]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10"
            >
              {filtered.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block border-t border-[#ddd] pt-6">
                    <span className="text-[11px] text-[#999] font-[family-name:var(--font-jetbrains-mono)] tracking-[0.06em]">
                      {post.category} · {new Date(post.created_at).toLocaleDateString("ko-KR")}
                    </span>
                    <h3 className="mt-2 text-[18px] md:text-[20px] font-semibold text-[#111] leading-[1.4] group-hover:text-[#555] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-[14px] text-[#888] leading-[1.7] line-clamp-2">
                      {post.excerpt}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-center text-[14px] text-[#999] py-20">해당 카테고리의 글이 없습니다.</p>
          )}
        </div>
      </section>

      <ContactCtaSection />
    </>
  );
}
