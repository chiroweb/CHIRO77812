"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SubpageHero from "@/components/sections/subpage-hero";
import SubNav from "@/components/ui/sub-nav";
import NumberedSection from "@/components/sections/numbered-section";
import FaqTwoColumn from "@/components/sections/faq-two-column";
import CtaContact from "@/components/sections/cta-contact";

/* ─────────────────────────────────────
   JSON-LD — Service Schema
───────────────────────────────────── */

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://chiroweb.co.kr/services#service",
  name: "치로웹디자인 서비스",
  description:
    "심리학 기반 설계 + 코드 레벨 구현. 홈페이지 제작, 리모델링, SEO/AEO 최적화를 하나의 팀에서 완성합니다.",
  provider: {
    "@type": "Organization",
    "@id": "https://chiroweb.co.kr/#organization",
    name: "치로웹디자인",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "서비스 목록",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "홈페이지 제작",
          url: "https://chiroweb.co.kr/services/website",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "홈페이지 리모델링",
          url: "https://chiroweb.co.kr/services/remodeling",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO/AEO 최적화",
          url: "https://chiroweb.co.kr/services/seo-aeo",
        },
      },
    ],
  },
  areaServed: { "@type": "Country", name: "KR" },
  url: "https://chiroweb.co.kr/services",
};

/* ─────────────────────────────────────
   Data
───────────────────────────────────── */

interface PortfolioProject {
  name: string;
  slug: string;
  category: string;
  image_url: string;
}

interface ServicesHubContentProps {
  portfolioProjects: PortfolioProject[];
}

const subNavItems = [
  { label: "SERVICES", href: "#services" },
  { label: "WHY CHIRO", href: "#why-chiro" },
  { label: "PROCESS", href: "#process" },
  { label: "INCLUDED", href: "#included" },
  { label: "WORK", href: "#work" },
  { label: "FAQ", href: "#faq" },
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
    title: "구조화 데이터 (JSON-LD)",
    description:
      "구글 리치 결과에 노출될 수 있도록 페이지별 구조화 데이터 설계.",
  },
  {
    title: "구글·네이버 검색 등록",
    description:
      "구글 서치 콘솔과 네이버 웹마스터 도구 등록 가이드 제공.",
  },
  {
    title: "llms.txt",
    description:
      "2026년 신규 표준. AI 검색 엔진(ChatGPT, Perplexity)이 사이트를 인식할 수 있도록 설정.",
  },
];

const faqs = [
  {
    q: "어떤 업종의 홈페이지를 만들 수 있나요?",
    a: "B2B 제조업, 호텔, 환경 산업, 스타트업, 이커머스, 포트폴리오, 분양 홍보관 등 다양한 업종을 다룹니다. 업종에 따라 사용자 행동 패턴이 다르고, 치로는 그 차이를 설계에 반영합니다.",
  },
  {
    q: "제작 기간은 얼마나 걸리나요?",
    a: "평균 2주입니다. 실시간 빌드 방식으로 진행하기 때문에 작업 현황을 즉시 확인할 수 있고, 피드백 반영이 빠릅니다. 프로젝트 규모에 따라 달라질 수 있으며, 상담 후 정확한 일정을 안내드립니다.",
  },
  {
    q: "빌더(아임웹, 카페24)와 어떻게 다른가요?",
    a: "치로는 빌더를 사용하지 않습니다. 모든 코드를 직접 작성합니다. 그래야만 가능한 속도, 구조, SEO/AEO 최적화가 있습니다. 구조화 데이터, llms.txt, 커스텀 애니메이션 같은 핵심 요소는 빌더로 구현할 수 없습니다.",
  },
  {
    q: "유지보수는 어떻게 되나요?",
    a: "플랜에 따라 무상 유지보수 기간이 포함됩니다. 이후에는 월 정액제로 운영되며, 분기별 SEO/AEO 점검 옵션도 제공합니다.",
  },
  {
    q: "해외 사이트도 제작 가능한가요?",
    a: "가능합니다. 영문 사이트, 다국어 사이트 모두 제작 경험이 있습니다. 해외 호텔 브랜드 계열사 프로젝트도 수행한 경험이 있습니다.",
  },
  {
    q: "리모델링과 신규 제작의 차이는 무엇인가요?",
    a: "신규 제작은 기획부터 디자인, 개발까지 처음부터 시작합니다. 리모델링은 기존 콘텐츠와 브랜드 자산을 살리면서 디자인, 구조, 속도, SEO를 현대적으로 전환하는 작업입니다.",
  },
  {
    q: "실시간 빌드 링크란 무엇인가요?",
    a: "작업 중인 사이트를 실시간으로 확인할 수 있는 링크입니다. 디자인 시안이 아니라 실제 작동하는 웹사이트를 보면서 피드백을 주실 수 있습니다. 커뮤니케이션 비용을 줄이고 결과물의 정확도를 높입니다.",
  },
  {
    q: "SEO/AEO가 왜 중요한가요?",
    a: "2026년 현재 검색 트래픽의 25% 이상이 AI 검색으로 이동했습니다. 구글뿐 아니라 ChatGPT, Perplexity에서도 발견되어야 합니다. 치로는 모든 프로젝트에 SEO/AEO 기본 세팅을 포함합니다.",
  },
];

/* ─────────────────────────────────────
   Component
───────────────────────────────────── */

export default function ServicesHubContent({
  portfolioProjects,
}: ServicesHubContentProps) {
  return (
    <>
      {/* Service JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* ── Hero ── */}
      <SubpageHero
        title="SERVICES"
        label="( What We Do )"
        image="https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/hero/code-closeup.png"
      />

      {/* ── SubNav ── */}
      <SubNav pageLabel="SERVICE MENU" items={subNavItems} />

      {/* ══════════════════════════════════════
         01. OPENING — 무엇을 하는가
         Editorial: 거대 타이포 좌측 + 우측 컨텍스트
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
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-10 md:mb-14"
          >
            ( WHAT WE DO )
          </motion.p>

          <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-20">
            {/* Left: Display text */}
            <div className="flex-1 min-w-0">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-[48px] md:text-[72px] lg:text-[96px] font-extrabold tracking-[-0.03em] leading-[0.9] text-[#111] uppercase mb-4"
              >
                DESIGNED
                <br />
                TO
                <br />
                <span className="text-[#C0C0C0]">CONVERT.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[14px] md:text-[15px] mt-4"
                style={{ color: "#999" }}
              >
                전환을 위해 설계합니다.
              </motion.p>
            </div>

            {/* Right: Context */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
              className="lg:w-[38%] shrink-0 lg:mt-[120px]"
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="space-y-5"
              >
                <motion.p
                  variants={fadeInUp}
                  className="text-[15px] md:text-[16px] font-medium leading-[1.85] text-[#111]"
                >
                  치로웹디자인은 예쁜 홈페이지를 만드는 회사가 아닙니다.
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  className="text-[14px] md:text-[15px] leading-[1.85] text-[#666]"
                >
                  방문자가 어디를 보고, 무엇을 클릭하고, 언제 결정하는지 —
                  그 모든 과정을 심리학 원리에 기반해 설계합니다.
                  기획부터 디자인, 개발, SEO/AEO 최적화까지
                  하나의 팀에서 처음부터 끝까지.
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  className="text-[14px] md:text-[15px] leading-[1.85] text-[#666]"
                >
                  빌더가 아닌 직접 작성한 코드.
                  구글과 AI가 읽을 수 있는 구조.
                  전환율을 높이는 설계.
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         02. THREE SERVICES — 각 서비스별 에디토리얼 스프레드
         01: 좌정렬 대형타이포 / 02: 우정렬 / 03: 다크 풀와이드
      ══════════════════════════════════════ */}
      <section
        id="services"
        className="px-5 md:px-12 lg:px-20 pb-[40px]"
        style={{ backgroundColor: "#f5f5f0" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.4 }}
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-20 md:mb-28"
          >
            ( OUR SERVICES )
          </motion.p>

          {/* ── Service 01: 홈페이지 제작 — 좌정렬 대형 타이포 + 우측 설명 ── */}
          <div className="mb-32 md:mb-40">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-[56px] md:text-[90px] lg:text-[120px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-[#111]">
                WEB
                <br />
                <span className="text-[#C0C0C0]">DESIGN.</span>
              </h3>
            </motion.div>

            <div className="flex flex-col lg:flex-row lg:items-end gap-8 mt-10 lg:mt-[-40px]">
              {/* Spacer */}
              <div className="lg:w-[40%]" />

              {/* Image placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:w-[25%]"
              >
                <div className="w-full aspect-[4/5] rounded-lg overflow-hidden">
                  <img src="https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/services/web-laptop.png" alt="완성된 웹사이트가 보이는 노트북" className="w-full h-full object-cover" />
                </div>
              </motion.div>

              {/* Description + CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:w-[35%] lg:pb-4"
              >
                <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-4">
                  ( 01 — 홈페이지 제작 )
                </p>
                <p className="text-[15px] md:text-[16px] font-medium leading-[1.85] text-[#111] mb-4">
                  브랜드의 첫 인상을 설계합니다.
                </p>
                <p className="text-[14px] md:text-[15px] leading-[1.85] text-[#666] mb-8">
                  반응형 디자인, 심리학 기반 전환 구조, SEO/AEO 기본 세팅까지
                  포함된 올인원 홈페이지. 빌더가 아닌 직접 작성한 코드로
                  구글과 AI가 읽을 수 있는 구조를 처음부터 갖춥니다.
                </p>
                <Link
                  href="/services/website"
                  className="inline-block text-[13px] tracking-[0.04em] uppercase font-medium text-[#111] hover:text-[#FF4D00] transition-colors duration-300"
                >
                  자세히 보기 →
                </Link>
              </motion.div>
            </div>

            {/* Mini stats */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="flex flex-wrap gap-x-14 gap-y-6 mt-14 pt-8"
              style={{ borderTop: "1px solid #ddd" }}
            >
              {[
                { value: "175만원~", label: "시작 가격" },
                { value: "2주", label: "평균 제작 기간" },
                { value: "12+", label: "SEO/AEO 기본 항목" },
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <span className="text-[28px] md:text-[36px] font-extrabold tracking-[-0.03em] leading-[1.0] text-[#111]">
                    {stat.value}
                  </span>
                  <p className="text-[11px] text-[#999] mt-1 tracking-[0.04em] uppercase font-[family-name:var(--font-jetbrains-mono)]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Service 02: 리모델링 — 이미지 좌측 + 대형 타이포 우측 ── */}
          <div className="mb-32 md:mb-40">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
              {/* Left: Image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.6 }}
                className="lg:w-[35%] shrink-0"
              >
                <div className="w-full aspect-[3/4] rounded-lg overflow-hidden">
                  <img src="https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/services/remodeling-compare.png" alt="리모델링 전후 비교 화면" className="w-full h-full object-cover" />
                </div>
              </motion.div>

              {/* Right: Title + description */}
              <div className="flex-1 lg:pt-12">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.4 }}
                  className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-6"
                >
                  ( 02 — 홈페이지 리모델링 )
                </motion.p>
                <motion.h3
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-[48px] md:text-[72px] lg:text-[100px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-[#111] mb-8"
                >
                  REMO
                  <br />
                  <span className="text-[#C0C0C0]">-DELING.</span>
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="text-[15px] md:text-[16px] font-medium leading-[1.85] text-[#111] mb-4 max-w-[480px]"
                >
                  낡은 디자인과 느린 속도를 현대적으로 전환합니다.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-[14px] md:text-[15px] leading-[1.85] text-[#666] mb-8 max-w-[480px]"
                >
                  기존 콘텐츠와 브랜드 자산을 살리면서 최신 기술 스택과
                  SEO/AEO 구조로 전환합니다. 디자인만 바꾸는 것이 아니라,
                  검색 엔진과 AI가 인식하는 구조부터 다시 설계합니다.
                  속도, 반응형, 접근성까지 한 번에.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.4, delay: 0.25 }}
                >
                  <Link
                    href="/services/remodeling"
                    className="inline-block text-[13px] tracking-[0.04em] uppercase font-medium text-[#111] hover:text-[#FF4D00] transition-colors duration-300"
                  >
                    자세히 보기 →
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service 03: SEO/AEO — 다크 풀와이드 스프레드 ── */}
      <section
        className="px-5 md:px-12 lg:px-20 py-[160px] md:py-[220px]"
        style={{ backgroundColor: "#111" }}
        data-theme="dark"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Label + accent line */}
          <div className="flex items-center gap-4 mb-12 md:mb-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.4 }}
              className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#555]"
            >
              ( 03 — SEO/AEO 최적화 )
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 h-px origin-left"
              style={{ background: "linear-gradient(90deg, #00D2FF 0%, rgba(0,210,255,0) 100%)" }}
            />
          </div>

          {/* Overlapping editorial */}
          <div className="relative">
            <motion.h3
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.7 }}
              className="text-[64px] md:text-[100px] lg:text-[140px] font-extrabold tracking-[-0.04em] leading-[0.82] uppercase text-white"
            >
              SEO &
              <br />
              <span style={{ color: "#C0C0C0" }}>AEO.</span>
            </motion.h3>

            {/* Right-positioned context */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:absolute lg:right-0 lg:top-[30%] mt-10 lg:mt-0 lg:w-[40%]"
            >
              <p className="text-[15px] md:text-[16px] font-medium leading-[1.85] text-white/70 mb-5">
                구글과 AI 모두에게 발견되는 사이트를 만듭니다.
              </p>
              <p className="text-[14px] md:text-[15px] leading-[1.85] text-white/40">
                2026년, 검색 트래픽의 25% 이상이 AI로 이동했습니다.
                구조화 데이터, llms.txt, 시맨틱 HTML — 코드 레벨에서
                SEO/AEO를 설계해야 구글과 ChatGPT, Perplexity 모두에서
                발견됩니다. 빌더로는 불가능한 영역.
              </p>
            </motion.div>
          </div>

          {/* Key items + CTA */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mt-16 md:mt-24 flex flex-col lg:flex-row gap-12 lg:gap-20"
          >
            {/* Left: SEO/AEO items */}
            <motion.div variants={fadeInUp} className="lg:w-[55%] space-y-0">
              {[
                "Organization · FAQPage · BreadcrumbList 스키마",
                "llms.txt — AI 크롤러 전용 사이트맵",
                "시맨틱 HTML + Core Web Vitals 최적화",
                "클린 URL 구조 + Open Graph",
                "Lighthouse 95+ 점 목표",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 py-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span className="text-[#00D2FF] text-[12px]">✓</span>
                  <span className="text-[14px] text-white/50">{item}</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
            </motion.div>

            {/* Right: Stats + CTA */}
            <motion.div variants={fadeInUp} className="lg:w-[45%] flex flex-col justify-end">
              <div className="flex flex-wrap gap-x-12 gap-y-6 mb-12">
                {[
                  { value: "25%+", label: "AI 검색 트래픽 비중" },
                  { value: "95+", label: "Lighthouse 점수" },
                  { value: "12+", label: "기본 SEO/AEO 항목" },
                ].map((stat, i) => (
                  <div key={i}>
                    <span className="text-[32px] md:text-[44px] font-extrabold tracking-[-0.03em] leading-[1.0] text-white">
                      {stat.value}
                    </span>
                    <p className="text-[11px] text-[#555] mt-1 tracking-[0.04em] uppercase font-[family-name:var(--font-jetbrains-mono)]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/services/seo-aeo"
                className="inline-block text-[13px] tracking-[0.04em] uppercase font-medium text-white/40 hover:text-[#00D2FF] transition-colors duration-300"
              >
                자세히 보기 →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         03. WHY CHIRO — 왜 치로인가
         Editorial: 다크→라이트 전환, 좌우 교차 오프셋
      ══════════════════════════════════════ */}
      <section
        id="why-chiro"
        className="py-[160px] md:py-[220px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#f5f5f0" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.4 }}
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-6"
          >
            ( WHY CHIRO )
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
            className="text-[48px] md:text-[72px] lg:text-[96px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-[#111] mb-4"
          >
            WHY
            <br />
            <span className="text-[#C0C0C0]">CHIRO.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[14px] md:text-[15px] text-[#999] mb-20 md:mb-28"
          >
            치로를 선택해야 하는 이유.
          </motion.p>

          {/* Staggered reason blocks */}
          <div className="space-y-20 md:space-y-28">
            {[
              {
                num: "01",
                title: "심리학 기반 설계",
                body: "방문자의 시선, 클릭, 의사결정을 인지 심리학에 기반해 설계합니다. 왜 이 버튼이 여기 있어야 하는지, 왜 이 섹션이 먼저 나와야 하는지 — 모든 선택에 근거가 있습니다. 예쁜 디자인이 아닌, 전환율을 높이는 구조적 설계.",
              },
              {
                num: "02",
                title: "코드 레벨 구현",
                body: "빌더나 템플릿이 아닌 직접 작성한 코드. SEO/AEO 구조를 코드 레벨에서 설계하여 구글, ChatGPT, Perplexity가 읽을 수 있는 사이트를 만듭니다. 구조화 데이터, llms.txt, 시맨틱 HTML — 빌더로는 불가능한 기술적 깊이.",
              },
              {
                num: "03",
                title: "올인원 솔루션",
                body: "기획, 디자인, 개발, SEO/AEO 최적화를 하나의 팀에서 완성합니다. 여러 업체에 흩어져 있던 모든 과정을 치로가 책임집니다. 커뮤니케이션 비용이 없고, 품질이 균일하고, 일정이 빠릅니다.",
              },
              {
                num: "04",
                title: "실시간 빌드",
                body: "디자인 시안이 아닌 실제 작동하는 웹사이트를 보면서 피드백을 주실 수 있습니다. 실시간 빌드 링크로 진행 상황을 즉시 확인. 수정 횟수 무제한. 결과물의 정확도를 높이고 커뮤니케이션 비용을 줄입니다.",
              },
            ].map((item, i) => {
              const isOffset = i % 2 === 1;

              return (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.6 }}
                  className={isOffset ? "lg:ml-auto lg:w-[65%]" : "lg:w-[65%]"}
                >
                  <div className="flex items-start gap-6 md:gap-10">
                    <span
                      className="text-[56px] md:text-[80px] font-extrabold leading-none tabular-nums shrink-0"
                      style={{ color: "rgba(0,0,0,0.06)" }}
                    >
                      {item.num}
                    </span>
                    <div className="pt-3 md:pt-5">
                      <h3 className="text-[20px] md:text-[28px] font-bold text-[#111] leading-[1.2] mb-4">
                        {item.title}
                      </h3>
                      <p className="text-[14px] md:text-[15px] leading-[1.85] text-[#666] max-w-[520px]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         04. PROCESS — 진행 과정
         Editorial: 다크, 타임라인 좌우 교차
      ══════════════════════════════════════ */}
      <section
        id="process"
        className="py-[160px] md:py-[220px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#111" }}
        data-theme="dark"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20 md:mb-28">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.4 }}
              className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#555]"
            >
              ( PROCESS )
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6 }}
              className="text-[48px] md:text-[72px] lg:text-[96px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-white lg:text-right"
            >
              HOW WE
              <br />
              <span style={{ color: "#C0C0C0" }}>WORK.</span>
            </motion.h2>
          </div>

          {/* Process timeline */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {[
              {
                num: "01",
                title: "상담 & 기획",
                time: "1~2일",
                desc: "프로젝트 목표와 타겟 사용자를 파악합니다. 심리학 기반 사용자 여정을 설계하고, 사이트맵과 페이지 구조를 확정합니다. URL 구조, SEO 키워드 전략도 이 단계에서 결정됩니다.",
              },
              {
                num: "02",
                title: "디자인",
                time: "3~5일",
                desc: "기획 결과를 시각화합니다. 실시간 빌드 링크로 진행 상황을 확인하실 수 있습니다. 디자인 시안이 아닌 실제 작동하는 웹사이트를 보면서 피드백을 주세요. 수정 횟수 무제한.",
              },
              {
                num: "03",
                title: "개발 & 최적화",
                time: "3~5일",
                desc: "코드를 직접 작성합니다. SEO/AEO 구조를 코드 레벨에서 설계합니다. JSON-LD 스키마, 시맨틱 HTML, llms.txt, Core Web Vitals 최적화까지 이 단계에서 완성합니다.",
              },
              {
                num: "04",
                title: "런칭 & 유지보수",
                time: "런칭 후",
                desc: "최종 검수 후 런칭합니다. 구글 서치 콘솔 등록, 네이버 웹마스터 설정을 가이드합니다. 무상 유지보수 기간 동안 수정 사항을 즉시 반영하고, 분기별 SEO/AEO 점검 옵션을 제공합니다.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeInUp}
                className="grid grid-cols-1 md:grid-cols-[100px_1fr_1fr] gap-4 md:gap-8 py-8 md:py-10 items-start"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
              >
                {/* Number */}
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[28px] md:text-[36px] font-bold text-white tracking-[-0.02em]">
                  {step.num}
                </span>

                {/* Title + time */}
                <div>
                  <h3 className="text-[18px] md:text-[22px] font-semibold text-white leading-[1.3] mb-2">
                    {step.title}
                  </h3>
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-medium tracking-[0.04em] uppercase"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
                  >
                    {step.time}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[14px] md:text-[15px] leading-[1.85] text-white/40 md:pt-1">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         05. INCLUDED — NumberedSection
      ══════════════════════════════════════ */}
      <div id="included">
        <NumberedSection
          label="( INCLUDED IN ALL )"
          heading={"EVERY PROJECT\nINCLUDES."}
          subheading="모든 프로젝트에 기본 포함됩니다."
          items={includedItems}
          dark={false}
        />
      </div>

      {/* ══════════════════════════════════════
         06. SELECTED PROJECTS — Portfolio
      ══════════════════════════════════════ */}
      <section
        id="work"
        className="py-[160px] md:py-[220px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#1a1a1a" }}
        data-theme="dark"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <motion.p
                variants={fadeInUp}
                className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase mb-6"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                ( WORK )
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="text-[36px] md:text-[56px] lg:text-[72px] font-extrabold tracking-[-0.03em] leading-[1.0] uppercase whitespace-pre-line text-white"
              >
                {"SELECTED\nPROJECTS."}
              </motion.h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.03em] transition-colors duration-300 hover:text-white"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                전체 포트폴리오 보기 →
              </Link>
            </motion.div>
          </div>

          {/* Portfolio cards */}
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
                  <Link href={`/portfolio/${project.slug}`} className="block group">
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
                          <span className="text-[11px] font-[family-name:var(--font-jetbrains-mono)]" style={{ color: "rgba(255,255,255,0.2)" }}>
                            No Image
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
                    </div>
                    <div className="mt-4 flex items-start justify-between">
                      <div>
                        <p className="text-[15px] font-semibold leading-[1.3] mb-1 text-white">
                          {project.name}
                        </p>
                        <p className="text-[12px] font-[family-name:var(--font-jetbrains-mono)] tracking-[0.04em]" style={{ color: "rgba(255,255,255,0.3)" }}>
                          {project.category}
                        </p>
                      </div>
                      <span className="text-[13px] transition-colors duration-300 group-hover:text-white mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
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
              <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                포트폴리오를 불러오는 중입니다.{" "}
                <Link href="/portfolio" className="underline transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>
                  전체 보기 →
                </Link>
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════
         07. FAQ
      ══════════════════════════════════════ */}
      <div id="faq">
        <FaqTwoColumn
          faqs={faqs}
          sectionLabel="( FAQ )"
          heading={"FREQUENTLY\nASKED."}
          dark={false}
        />
      </div>

      {/* ══════════════════════════════════════
         08. CTA
      ══════════════════════════════════════ */}
      <CtaContact />
    </>
  );
}
