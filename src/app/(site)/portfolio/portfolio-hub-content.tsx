"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SubpageHero from "@/components/sections/subpage-hero";
import SubNav from "@/components/ui/sub-nav";
import FaqTwoColumn from "@/components/sections/faq-two-column";
import CtaContact from "@/components/sections/cta-contact";

/* ─────────────────────────────────────
   Types & Data
───────────────────────────────────── */

interface PortfolioProject {
  id: number;
  name: string;
  slug: string;
  category: string;
  image_url: string;
  year: string;
}

interface PortfolioHubContentProps {
  projects: PortfolioProject[];
}

const ITEMS_PER_PAGE = 6;

const faqs = [
  {
    q: "포트폴리오에 있는 프로젝트들은 실제 운영 중인 사이트인가요?",
    a: "네. 모든 프로젝트는 실제 클라이언트와 함께 작업하여 운영 중인 사이트입니다. 각 프로젝트는 클라이언트의 비즈니스 목표에 맞춰 기획, 디자인, 개발되었습니다.",
  },
  {
    q: "저희 업종과 비슷한 프로젝트 사례가 있나요?",
    a: "기업 홈페이지, 브랜드 사이트, 이커머스 등 다양한 업종의 프로젝트를 진행해왔습니다. 상담 시 더 자세한 사례를 공유해드립니다.",
  },
  {
    q: "포트폴리오 프로젝트의 제작 기간은 어느 정도인가요?",
    a: "평균 2주입니다. 프로젝트 규모에 따라 달라지지만, 실시간 빌드 방식 덕분에 대형 에이전시보다 빠르게 진행됩니다.",
  },
  {
    q: "포트폴리오와 같은 수준의 결과물을 받을 수 있나요?",
    a: "네. 치로는 1인 에이전시이기 때문에 모든 프로젝트에 동일한 수준의 집중도를 투입합니다. 포트폴리오에 보이는 퀄리티가 곧 치로의 기본 수준입니다.",
  },
];

/* ─────────────────────────────────────
   Component
───────────────────────────────────── */

export default function PortfolioHubContent({ projects }: PortfolioHubContentProps) {
  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ["전체", ...cats];
  }, [projects]);

  const [activeCategory, setActiveCategory] = useState("전체");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filtered = useMemo(() => {
    if (activeCategory === "전체") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  }, []);

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(ITEMS_PER_PAGE);
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <SubpageHero
        title="PORTFOLIO"
        label="( Our Work )"
        image="https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/hero/dark-texture.png"
      />

      {/* ── SubNav ── */}
      <SubNav pageLabel="PORTFOLIO MENU" items={[
        { label: "PROJECTS", href: "#projects" },
        { label: "FAQ", href: "#faq" },
      ]} />

      {/* ══════════════════════════════════════
         01. OPENING — 에디토리얼 선언
      ══════════════════════════════════════ */}
      <section
        className="py-[200px] md:py-[260px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#f5f5f0" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-10 md:mb-14"
          >
            ( SELECTED WORK )
          </motion.p>

          <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-20">
            <div className="flex-1 min-w-0">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="text-[48px] md:text-[72px] lg:text-[96px] font-extrabold tracking-[-0.03em] leading-[0.9] text-[#111] uppercase mb-4"
              >
                EVERY
                <br />
                PROJECT
                <br />
                <span className="text-[#C0C0C0]">MATTERS.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[14px] md:text-[15px] mt-4"
                style={{ color: "#999" }}
              >
                치로가 몰입했던 프로젝트들.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:w-[35%] shrink-0 lg:mt-[120px]"
            >
              <p className="text-[15px] md:text-[16px] font-medium leading-[1.85] text-[#111] mb-5">
                각 프로젝트는 고유한 문제를 해결하고,
                측정 가능한 결과를 만들어냈습니다.
              </p>
              <p className="text-[14px] md:text-[15px] leading-[1.85] text-[#666]">
                예쁜 디자인이 아닌, 전환을 만드는 설계.
                심리학 기반 구조, 코드 레벨 SEO/AEO,
                그리고 비즈니스 목표에 대한 깊은 이해.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         02. PROJECT LIST — 깔끔한 스택 리스트 + 더보기
      ══════════════════════════════════════ */}
      <section
        id="projects"
        className="py-[120px] md:py-[160px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#111" }}
        data-theme="dark"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Header + Filter */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.5 }}
            >
              <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#555] mb-6">
                ( ALL PROJECTS )
              </p>
              <h2 className="text-[48px] md:text-[72px] lg:text-[96px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-white">
                ARCHIVE<span style={{ color: "#C0C0C0" }}>.</span>
              </h2>
            </motion.div>

            {/* Filter pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`text-[11px] tracking-[0.06em] uppercase py-2 px-5 rounded-full border transition-all duration-300 font-[family-name:var(--font-jetbrains-mono)] ${
                    activeCategory === cat
                      ? "bg-white text-[#111] border-white"
                      : "bg-transparent text-[#555] border-[rgba(255,255,255,0.15)] hover:border-white/40 hover:text-white/70"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Project list — clean stacked rows */}
          <AnimatePresence mode="popLayout">
            <motion.div layout className="space-y-0">
              {visible.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                >
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="group block"
                  >
                    <div
                      className="flex flex-col md:flex-row gap-6 md:gap-10 py-10 md:py-12 items-start"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      {/* Image — clean, contained */}
                      <div className="w-full md:w-[320px] lg:w-[400px] shrink-0 aspect-[16/10] rounded-lg overflow-hidden relative">
                        {project.image_url ? (
                          <Image
                            src={project.image_url}
                            alt={project.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 400px"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-[#222] flex items-center justify-center">
                            <span className="text-white/15 text-[11px] font-[family-name:var(--font-jetbrains-mono)]">
                              No Image
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between md:py-2 min-h-[120px]">
                        <div>
                          {/* Meta row */}
                          <div className="flex items-center gap-4 mb-4">
                            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-white/25">
                              {project.category}
                            </span>
                            <span className="w-6 h-px bg-white/15" />
                            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] text-white/25">
                              {project.year}
                            </span>
                          </div>

                          {/* Project name */}
                          <h3 className="text-[28px] md:text-[36px] lg:text-[44px] font-extrabold tracking-[-0.03em] leading-[0.9] uppercase text-white group-hover:text-[#C0C0C0] transition-colors duration-300">
                            {project.name}
                          </h3>
                        </div>

                        {/* View link */}
                        <span className="mt-6 text-[12px] tracking-[0.06em] uppercase font-medium text-white/25 group-hover:text-white transition-colors duration-300 font-[family-name:var(--font-jetbrains-mono)]">
                          View Project →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Load more button */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mt-16 text-center"
            >
              <button
                onClick={handleLoadMore}
                className="inline-block text-[13px] tracking-[0.06em] uppercase font-medium py-3.5 px-12 rounded-full border border-white/20 text-white/50 hover:border-white hover:text-white transition-all duration-300 font-[family-name:var(--font-jetbrains-mono)]"
              >
                더보기 ({filtered.length - visibleCount}개 남음)
              </button>
            </motion.div>
          )}

          {/* Count indicator */}
          <p className="mt-8 text-center font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] text-white/20">
            {visible.length} / {filtered.length}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
         03. STATEMENT
      ══════════════════════════════════════ */}
      <section
        className="py-[160px] md:py-[220px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#f5f5f0" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.7 }}
            className="lg:ml-auto lg:w-[70%]"
          >
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-8 lg:text-right">
              ( PHILOSOPHY )
            </p>
            <h2 className="text-[36px] md:text-[56px] lg:text-[72px] font-extrabold tracking-[-0.03em] leading-[1.05] text-[#111] lg:text-right">
              예쁜 홈페이지를
              <br />
              만들지 않습니다.
            </h2>
            <p className="text-[15px] md:text-[17px] leading-[1.85] text-[#666] mt-8 lg:text-right max-w-[560px] lg:ml-auto">
              방문자가 어디를 보고, 무엇을 클릭하고, 언제 결정하는지 —
              그 모든 과정을 설계합니다. 포트폴리오에 보이는 것은
              그 설계의 결과물입니다.
              <span className="text-[#bbb]"> 결과로 증명합니다.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         04. FAQ
      ══════════════════════════════════════ */}
      <div id="faq">
        <FaqTwoColumn faqs={faqs} sectionLabel="( FAQ )" />
      </div>

      {/* ══════════════════════════════════════
         05. CTA
      ══════════════════════════════════════ */}
      <CtaContact />
    </>
  );
}
