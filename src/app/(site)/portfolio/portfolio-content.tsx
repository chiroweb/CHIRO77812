"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";
import SubCtaBand from "@/components/ui/sub-cta-band";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import FAQSection from "@/components/seo/faq-section";
import InternalLinks from "@/components/seo/internal-links";
import type { PortfolioProject } from "@/lib/types";

interface PortfolioContentProps {
  projects: PortfolioProject[];
}

const portfolioFAQs = [
  {
    question: "포트폴리오에 있는 프로젝트들은 실제 운영 중인 사이트인가요?",
    answer: "네, 치로웹디자인의 포트폴리오에 소개된 프로젝트들은 실제 클라이언트와 함께 작업하여 운영 중인 사이트입니다. 각 프로젝트는 클라이언트의 비즈니스 목표에 맞춰 기획, 디자인, 개발되었습니다.",
  },
  {
    question: "저희 업종과 비슷한 프로젝트 사례가 있나요?",
    answer: "기업 홈페이지, 브랜드 사이트, 이커머스 등 다양한 업종의 프로젝트를 진행해왔습니다. 카테고리 필터를 통해 유사한 프로젝트를 찾아보실 수 있으며, 상담 시 더 자세한 사례를 공유해드립니다.",
  },
  {
    question: "포트폴리오 프로젝트의 제작 기간은 어느 정도인가요?",
    answer: "프로젝트의 규모와 요구사항에 따라 다르지만, 일반적으로 기업 홈페이지는 4~6주, 브랜드 사이트는 6~8주, 이커머스는 8~12주 정도 소요됩니다. 정확한 일정은 무료 상담을 통해 안내해드립니다.",
  },
];

const internalLinks = [
  { title: "서비스 안내", href: "/services", description: "홈페이지 제작, 리모델링, SEO/AEO 등 치로웹디자인의 서비스를 확인하세요." },
  { title: "요금 안내", href: "/pricing", description: "프로젝트 유형별 요금과 포함 사항을 투명하게 안내합니다." },
  { title: "문의하기", href: "/contact", description: "프로젝트 상담부터 견적까지, 편하게 문의해주세요." },
];

export default function PortfolioContent({ projects }: PortfolioContentProps) {
  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ["전체", ...cats];
  }, [projects]);

  const [activeCategory, setActiveCategory] = useState("전체");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "전체") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  function getProjectLink(project: PortfolioProject) {
    return `/portfolio/${project.slug || project.id}`;
  }

  return (
    <>
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-5 md:px-8">
      <div className="max-w-[1280px] mx-auto">
        <Breadcrumbs pathname="/portfolio" />
        <SectionLabel number="01" label="Portfolio" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-20"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[44px] font-light tracking-[0.03em] leading-[1.05] mb-6"
          >
            엄선된 프로젝트<span className="text-[#FF4D00]">.</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-base text-[#6b6b6b] leading-[1.7] max-w-lg"
          >
            치로가 몰입했던 프로젝트들입니다. 각 프로젝트는 고유한 문제를
            해결하고, 측정 가능한 결과를 만들어냈습니다.
          </motion.p>
        </motion.div>

        <Divider />

        {/* Category Filter */}
        <div className="mt-10 md:mt-12 flex flex-wrap gap-2 md:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs tracking-[0.1em] uppercase border transition-colors duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                  : "bg-white text-[#6b6b6b] border-[#E0E0E0] hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.a
              key={project.id}
              href={getProjectLink(project)}
              variants={fadeInUp}
              data-cursor="view"
              className="group relative block overflow-hidden bg-[#f5f5f3]"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                {project.image_url && /\.(mp4|webm|mov)(\?|$)/i.test(project.image_url) ? (
                  <video
                    src={project.image_url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                ) : project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-full bg-[#e8e8e6] flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-light tracking-tight text-[#9b9b9b]">
                      {project.name}
                    </span>
                  </div>
                )}

                {/* Hover Overlay — desktop only */}
                <div className="hidden md:flex absolute inset-0 bg-[#1a1a1a]/0 group-hover:bg-[#1a1a1a]/60 transition-colors duration-500 items-end p-8">
                  <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {project.problem && (
                      <p className="text-xs text-white/70 mb-2 leading-relaxed">
                        {project.problem}
                      </p>
                    )}
                    {project.result && (
                      <p className="text-sm text-white leading-relaxed">
                        {project.result}
                      </p>
                    )}
                  </div>
                  <span className="absolute top-8 right-8 text-white text-lg opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                    &#8599;
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base md:text-lg font-normal tracking-tight text-[#1a1a1a]">
                      {project.name}
                    </h3>
                    <span className="text-xs tracking-[0.15em] uppercase text-[#9b9b9b] mt-1 block">
                      {project.category}
                    </span>
                  </div>
                  <span className="text-xs font-[family-name:var(--font-jetbrains-mono)] text-[#9b9b9b]">
                    {project.year}
                  </span>
                </div>
                {/* Mobile-only: problem/result info */}
                <div className="mt-3 md:hidden">
                  {project.problem && (
                    <p className="text-xs text-[#6b6b6b] leading-[1.6] mb-1">
                      {project.problem}
                    </p>
                  )}
                  {project.result && (
                    <p className="text-xs text-[#1a1a1a] leading-[1.6]">
                      &rarr; {project.result}
                    </p>
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ── Dark Statement ── */}
    <section className="py-[72px] md:py-[100px] px-5 md:px-8 bg-[#1a1a1a]">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.p
            variants={fadeInUp}
            className="font-[family-name:var(--font-space-grotesk)] text-[36px] md:text-[64px] font-extrabold tracking-[-0.03em] leading-[1.1] text-white text-center"
          >
            결과로 <span className="decoration-[#FF4D00] underline underline-offset-[6px] md:underline-offset-[10px] decoration-[3px]">증명</span>합니다<span className="text-[#FF4D00]">.</span>
          </motion.p>
        </motion.div>
      </div>
    </section>

    {/* ── FAQ ── */}
    <FAQSection
      questions={portfolioFAQs}
      sectionNumber="03"
      sectionLabel="FAQ"
      heading="Questions"
    />

    {/* ── Internal Links ── */}
    <InternalLinks links={internalLinks} />

    {/* ── CTA Band ── */}
    <SubCtaBand />
    </>
  );
}
