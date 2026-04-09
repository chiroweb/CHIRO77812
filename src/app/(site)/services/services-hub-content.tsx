"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SubpageHero from "@/components/sections/subpage-hero";
import SubNav from "@/components/ui/sub-nav";
import NumberedSection from "@/components/sections/numbered-section";
import ProcessTimeline from "@/components/sections/process-timeline";
import FaqTwoColumn from "@/components/sections/faq-two-column";
import ContactCtaSection from "@/components/sections/contact-cta-section";

interface PortfolioProject {
  name: string;
  slug: string;
  category: string;
  image_url: string;
}

interface ServicesHubContentProps {
  portfolioProjects: PortfolioProject[];
}

const serviceCards = [
  {
    number: "01",
    slug: "website",
    title: "WEB\nDESIGN.",
    label: "홈페이지 제작",
    description:
      "브랜드의 첫 인상을 설계합니다. 반응형 디자인부터 SEO/AEO까지 포함된 올인원 홈페이지. 평균 3.8일 완성.",
    dark: true,
  },
  {
    number: "02",
    slug: "remodeling",
    title: "REMODELING.",
    label: "홈페이지 리모델링",
    description:
      "낡은 디자인과 느린 속도를 개선합니다. 기존 콘텐츠를 살리면서 최신 기술과 SEO 구조로 전환합니다.",
    dark: false,
  },
  {
    number: "03",
    slug: "seo-aeo",
    title: "SEO &\nAEO.",
    label: "SEO/AEO 최적화",
    description:
      "검색엔진과 AI 모두에게 발견되는 사이트를 만듭니다. 코드 레벨에서 SEO/AEO를 자동화합니다.",
    dark: false,
    accent: true,
  },
];

const includedItems = [
  {
    title: "반응형 웹 디자인",
    description:
      "모든 디바이스에서 완벽하게 작동하는 반응형 설계. 데스크톱, 태블릿, 모바일 최적화.",
  },
  {
    title: "SEO 초기 세팅",
    description:
      "메타 태그, 사이트맵, robots.txt, 시맨틱 HTML 구조 기본 포함.",
  },
  {
    title: "AEO 스키마 마크업",
    description:
      "Organization, FAQPage, BreadcrumbList 스키마와 llms.txt를 코드 레벨에서 직접 작성.",
  },
  {
    title: "구글·네이버 검색 등록",
    description:
      "구글 서치 콘솔과 네이버 웹마스터 도구 등록 가이드 제공.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "상담 & 기획",
    description:
      "프로젝트 목표와 타겟 사용자를 파악합니다. 심리학 기반 사용자 여정을 설계합니다.",
  },
  {
    number: "02",
    title: "디자인",
    description:
      "기획 결과를 시각화합니다. 실시간 링크로 진행 상황을 확인하실 수 있습니다.",
  },
  {
    number: "03",
    title: "개발 & 최적화",
    description:
      "코드를 직접 작성합니다. SEO/AEO 구조를 코드 레벨에서 설계합니다.",
  },
  {
    number: "04",
    title: "런칭 & 유지보수",
    description:
      "검수 후 런칭합니다. 무상 유지보수 기간과 분기별 SEO 점검을 제공합니다.",
  },
];

const faqs = [
  {
    q: "어떤 업종의 홈페이지를 만들 수 있나요?",
    a: "B2B 제조업, 호텔, 환경 산업, 스타트업, 이커머스, 포트폴리오 등 다양한 업종을 다룹니다.",
  },
  {
    q: "제작 기간은 얼마나 걸리나요?",
    a: "평균 3.8일입니다. 실시간 빌드 방식으로 일정을 단축합니다.",
  },
  {
    q: "유지보수는 어떻게 되나요?",
    a: "무상 유지보수 기간이 포함되며, 분기별 SEO/AEO 점검 옵션을 제공합니다.",
  },
  {
    q: "해외 사이트도 제작 가능한가요?",
    a: "가능합니다. 영문 사이트, 다국어 사이트 모두 제작 경험이 있습니다.",
  },
];

export default function ServicesHubContent({
  portfolioProjects,
}: ServicesHubContentProps) {
  return (
    <>
      {/* Hero */}
      <SubpageHero
        title="SERVICES"
        label="( What We Do )"
      />

      <SubNav pageLabel="SERVICE MENU" items={[
        { label: "SERVICES", href: "#services" },
        { label: "INCLUDED", href: "#included" },
        { label: "PROCESS", href: "#process" },
        { label: "WORK", href: "#work" },
        { label: "FAQ", href: "#faq" },
      ]} />

      {/* Service Cards */}
      <section
        id="services"
        className="py-[200px] md:py-[260px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#f5f5f0" }}
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Section label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-12 md:mb-16"
          >
            ( SERVICES )
          </motion.p>

          {/* Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
          >
            {/* Card 01 — Large dark card */}
            <motion.div variants={fadeInUp} className="md:col-span-6">
              <Link href="/services/website" className="block group">
                <div
                  className="rounded-2xl p-8 md:p-12 h-full min-h-[420px] flex flex-col justify-between transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl"
                  style={{ backgroundColor: "#1a1a1a" }}
                >
                  {/* Top */}
                  <div className="flex items-start justify-between">
                    <span
                      className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em]"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                      {serviceCards[0].number}
                    </span>
                    <span
                      className="text-[11px] font-medium tracking-[0.04em] px-3 py-1 rounded-full border"
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        borderColor: "rgba(255,255,255,0.15)",
                      }}
                    >
                      {serviceCards[0].label}
                    </span>
                  </div>

                  {/* Bottom */}
                  <div>
                    <h2
                      className="text-[52px] md:text-[64px] lg:text-[72px] font-extrabold tracking-[-0.03em] leading-[0.92] uppercase mb-6 whitespace-pre-line"
                      style={{ color: "#f5f5f5" }}
                    >
                      {serviceCards[0].title}
                    </h2>
                    <p
                      className="text-[14px] leading-[1.8] mb-8 max-w-[400px]"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {serviceCards[0].description}
                    </p>
                    <span
                      className="text-[13px] font-medium tracking-[0.03em] transition-colors duration-300 group-hover:text-white"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      자세히 보기 →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Right column: cards 02 + 03 stacked */}
            <div className="md:col-span-6 flex flex-col gap-4 md:gap-6">
              {/* Card 02 — Light border card */}
              <motion.div variants={fadeInUp}>
                <Link href="/services/remodeling" className="block group">
                  <div
                    className="rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[200px] border transition-all duration-500 hover:scale-[1.01] hover:shadow-lg"
                    style={{
                      backgroundColor: "#ffffff",
                      borderColor: "#e5e5e0",
                    }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <span
                        className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em]"
                        style={{ color: "rgba(0,0,0,0.2)" }}
                      >
                        {serviceCards[1].number}
                      </span>
                      <span
                        className="text-[11px] font-medium tracking-[0.04em] px-3 py-1 rounded-full border"
                        style={{ color: "#999", borderColor: "#e5e5e0" }}
                      >
                        {serviceCards[1].label}
                      </span>
                    </div>
                    <div>
                      <h2
                        className="text-[36px] md:text-[42px] font-extrabold tracking-[-0.03em] leading-[0.95] uppercase mb-4 whitespace-pre-line"
                        style={{ color: "#111" }}
                      >
                        {serviceCards[1].title}
                      </h2>
                      <p
                        className="text-[13px] leading-[1.8] mb-5"
                        style={{ color: "#666" }}
                      >
                        {serviceCards[1].description}
                      </p>
                      <span
                        className="text-[13px] font-medium tracking-[0.03em] transition-colors duration-300 group-hover:text-[#111]"
                        style={{ color: "#999" }}
                      >
                        자세히 보기 →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Card 03 — Accent border card */}
              <motion.div variants={fadeInUp}>
                <Link href="/services/seo-aeo" className="block group">
                  <div
                    className="rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[200px] transition-all duration-500 hover:scale-[1.01] hover:shadow-lg relative overflow-hidden"
                    style={{ backgroundColor: "#111111" }}
                  >
                    {/* Subtle accent line at top */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{
                        background:
                          "linear-gradient(90deg, #00D2FF 0%, rgba(0,210,255,0.2) 100%)",
                      }}
                    />

                    <div className="flex items-start justify-between mb-6">
                      <span
                        className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em]"
                        style={{ color: "rgba(255,255,255,0.2)" }}
                      >
                        {serviceCards[2].number}
                      </span>
                      <span
                        className="text-[11px] font-medium tracking-[0.04em] px-3 py-1 rounded-full border"
                        style={{
                          color: "#00D2FF",
                          borderColor: "rgba(0,210,255,0.3)",
                        }}
                      >
                        {serviceCards[2].label}
                      </span>
                    </div>
                    <div>
                      <h2
                        className="text-[36px] md:text-[42px] font-extrabold tracking-[-0.03em] leading-[0.95] uppercase mb-4 whitespace-pre-line"
                        style={{ color: "#f5f5f5" }}
                      >
                        {serviceCards[2].title}
                      </h2>
                      <p
                        className="text-[13px] leading-[1.8] mb-5"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        {serviceCards[2].description}
                      </p>
                      <span
                        className="text-[13px] font-medium tracking-[0.03em] transition-colors duration-300 group-hover:text-[#00D2FF]"
                        style={{ color: "rgba(0,210,255,0.5)" }}
                      >
                        자세히 보기 →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Included in every project */}
      <div id="included">
        <NumberedSection
          label="( INCLUDED )"
          heading={"EVERY PROJECT\nINCLUDES."}
          subheading="모든 프로젝트에 기본 포함됩니다."
          items={includedItems}
          dark={true}
        />
      </div>

      {/* Process Timeline */}
      <div id="process">
        <ProcessTimeline
          label="( PROCESS )"
          heading="HOW WE WORK."
          steps={processSteps}
          dark={false}
        />
      </div>

      {/* Selected Portfolio */}
      <section
        id="work"
        className="py-[200px] md:py-[260px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#1a1a1a" }}
        data-theme="dark"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <motion.p
                variants={fadeInUp}
                className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase mb-6"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                ( WORK )
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="text-[36px] md:text-[56px] lg:text-[72px] font-extrabold tracking-[-0.03em] leading-[1.0] uppercase whitespace-pre-line"
                style={{ color: "#f5f5f5" }}
              >
                {"SELECTED\nPROJECTS."}
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-[14px] md:text-[15px] mt-4"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                선정된 프로젝트들을 확인하세요.
              </motion.p>
            </div>
            <motion.div variants={fadeInUp}>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.03em] transition-colors duration-300 hover:text-white"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                전체 포트폴리오 보기 →
              </Link>
            </motion.div>
          </motion.div>

          {/* Portfolio cards or placeholder */}
          {portfolioProjects.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
            >
              {portfolioProjects.map((project, i) => (
                <motion.div key={project.slug || i} variants={fadeInUp}>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="block group"
                  >
                    <div className="rounded-2xl overflow-hidden relative aspect-[4/3] bg-[#111]">
                      {project.image_url ? (
                        <Image
                          src={project.image_url}
                          alt={project.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className="text-[11px] font-[family-name:var(--font-jetbrains-mono)]"
                            style={{ color: "rgba(255,255,255,0.2)" }}
                          >
                            No Image
                          </span>
                        </div>
                      )}
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
                    </div>
                    <div className="mt-4 flex items-start justify-between">
                      <div>
                        <p
                          className="text-[15px] font-semibold leading-[1.3] mb-1"
                          style={{ color: "#f5f5f5" }}
                        >
                          {project.name}
                        </p>
                        <p
                          className="text-[12px] font-[family-name:var(--font-jetbrains-mono)] tracking-[0.04em]"
                          style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                          {project.category}
                        </p>
                      </div>
                      <span
                        className="text-[13px] transition-colors duration-300 group-hover:text-white mt-1"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <p
                className="text-[14px]"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                포트폴리오를 불러오는 중입니다.{" "}
                <Link
                  href="/portfolio"
                  className="underline transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  전체 보기 →
                </Link>
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <div id="faq">
        <FaqTwoColumn
          faqs={faqs}
          sectionLabel="( FAQ )"
          heading={"FREQUENTLY\nASKED."}
          dark={false}
        />
      </div>

      {/* CTA */}
      <ContactCtaSection />
    </>
  );
}
