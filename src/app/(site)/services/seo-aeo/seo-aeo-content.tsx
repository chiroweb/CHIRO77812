"use client";

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
  "@type": "Service",
  "@id": "https://chiroweb.co.kr/services/seo-aeo#service",
  name: "SEO/AEO 최적화",
  description:
    "코드 레벨에서 시작하는 SEO/AEO 최적화. 구글, ChatGPT, Perplexity가 읽을 수 있는 구조를 설계합니다.",
  provider: {
    "@type": "Organization",
    "@id": "https://chiroweb.co.kr/#organization",
    name: "치로웹디자인",
  },
  serviceType: "Search Engine Optimization",
  areaServed: { "@type": "Country", name: "KR" },
  url: "https://chiroweb.co.kr/services/seo-aeo",
  offers: {
    "@type": "Offer",
    description:
      "모든 홈페이지 제작/리모델링 플랜에 기본 포함. 단독 컨설팅은 별도 견적.",
    priceCurrency: "KRW",
    availability: "https://schema.org/InStock",
    url: "https://chiroweb.co.kr/pricing",
  },
};

/* ─────────────────────────────────────
   Data
───────────────────────────────────── */

const subNavItems = [
  { label: "PROBLEM", href: "#problem" },
  { label: "SEO vs AEO", href: "#seo-vs-aeo" },
  { label: "CODE LEVEL", href: "#code-level" },
  { label: "PLATFORMS", href: "#platforms" },
  { label: "INCLUDED", href: "#included" },
  { label: "COMPARE", href: "#compare" },
  { label: "FAQ", href: "#faq" },
];

const includedItems = [
  {
    title: "Organization 스키마 (JSON-LD)",
    description:
      "회사명, 주소, 연락처, 로고, 서비스 영역을 구조화합니다. 구글 지식 패널과 AI 검색의 비즈니스 인식 정확도를 높입니다.",
  },
  {
    title: "FAQPage 스키마",
    description:
      "자주 묻는 질문이 구글 검색 결과에 직접 펼쳐집니다. AI 검색엔진이 답변을 생성할 때 이 구조를 우선 참조합니다.",
  },
  {
    title: "BreadcrumbList 스키마",
    description:
      "사이트 계층 구조를 검색엔진에 명시적으로 전달합니다. 검색 결과에서 경로가 표시되어 클릭률이 올라갑니다.",
  },
  {
    title: "시맨틱 HTML 구조",
    description:
      "article, section, nav, main — 의미 있는 태그로 문서 구조를 설계합니다. 크롤러 가독성과 접근성을 동시에 확보합니다.",
  },
  {
    title: "sitemap.xml & robots.txt",
    description:
      "빌드 시 자동 생성. 크롤링 우선순위를 제어하고, 불필요한 페이지의 크롤링 예산 낭비를 방지합니다.",
  },
  {
    title: "llms.txt",
    description:
      "2025년 등장한 AI 크롤러 전용 표준. GPTBot, PerplexityBot, ClaudeBot에게 사이트 핵심 정보를 구조화해서 전달합니다.",
  },
  {
    title: "Open Graph & Twitter Card",
    description:
      "SNS 공유 시 제목, 설명, 이미지가 정확히 표시됩니다. 카카오톡, 슬랙, 디스코드 미리보기까지 대응합니다.",
  },
  {
    title: "Canonical URL & 메타 태그",
    description:
      "중복 콘텐츠 문제를 방지하고, 각 페이지의 대표 URL을 검색엔진에 명시합니다. 크롤링 효율을 극대화합니다.",
  },
];

const comparisonData = [
  { feature: "커스텀 코드 작성", chiro: "전체 직접 작성", others: "템플릿 기반" },
  { feature: "JSON-LD 스키마", chiro: "6종 이상 기본 포함", others: "미지원 또는 제한적" },
  { feature: "llms.txt", chiro: "기본 포함", others: "지원 안 됨" },
  { feature: "클린 URL 구조", chiro: "/services/seo-aeo", others: "/page?id=123" },
  { feature: "시맨틱 HTML", chiro: "완전 시맨틱 구조", others: "div 중심 구조" },
  { feature: "페이지 속도 (Lighthouse)", chiro: "95+ 점", others: "50~70점대" },
  { feature: "Core Web Vitals", chiro: "전항목 Good", others: "부분 미달" },
  { feature: "AI 크롤러 대응", chiro: "GPTBot·ClaudeBot 최적화", others: "고려하지 않음" },
];

const faqs = [
  {
    q: "AEO와 SEO는 어떻게 다른가요?",
    a: "SEO는 구글 등 전통 검색엔진에서 상위 노출을 목표로 합니다. AEO(Answer Engine Optimization)는 ChatGPT, Perplexity, Gemini 같은 AI 검색엔진이 답변을 생성할 때 내 사이트를 출처로 인용하도록 최적화합니다. 2026년 현재 두 가지를 함께 적용해야 트래픽을 놓치지 않습니다.",
  },
  {
    q: "아임웹·카페24 사이트에는 적용할 수 없나요?",
    a: "빌더 플랫폼은 코드 접근이 제한되어 FAQPage 스키마, 클린 URL, llms.txt 같은 핵심 AEO 요소를 적용할 수 없습니다. 치로는 모든 코드를 직접 작성하기 때문에 기술적 한계 없이 최적화를 구현합니다.",
  },
  {
    q: "llms.txt가 무엇인가요?",
    a: "2025년부터 등장한 새로운 표준 파일입니다. robots.txt가 검색 크롤러에게 지침을 주듯, llms.txt는 AI 크롤러(GPTBot, PerplexityBot, ClaudeBot 등)에게 사이트 정보를 구조화해서 전달합니다. AI 검색 인용률에 직접 영향을 줍니다.",
  },
  {
    q: "SEO/AEO 작업은 별도 비용인가요?",
    a: "아닙니다. 치로의 모든 프로젝트에는 SEO/AEO 기본 세팅이 포함되어 있습니다. Organization 스키마, FAQPage 스키마, BreadcrumbList, 시맨틱 HTML, sitemap.xml, robots.txt, llms.txt, Open Graph까지 추가 비용 없이 기본 제공됩니다.",
  },
  {
    q: "결과가 얼마나 걸리나요?",
    a: "구조화 데이터와 기술적 SEO는 사이트 론칭 즉시 적용됩니다. 구글 리치 결과 반영은 보통 2~6주, AI 검색 인용 증가는 3~8주 내에 확인됩니다. 단, 콘텐츠 품질과 사이트 권위에 따라 달라질 수 있습니다.",
  },
  {
    q: "ChatGPT가 내 사이트를 인용하게 할 수 있나요?",
    a: "완전히 보장할 수는 없지만, llms.txt 적용, 명확한 답변 구조, 권위 시그널 강화를 통해 인용 가능성을 극대화합니다. 치로는 이 세 가지를 모두 기본 세팅에 포함합니다.",
  },
  {
    q: "구조화 데이터가 왜 중요한가요?",
    a: "구조화 데이터(JSON-LD)는 검색엔진이 페이지 내용을 '이해'하게 만드는 코드입니다. 적용하면 구글 리치 결과(별점, FAQ, 가격 등)에 노출되고, AI 검색엔진의 인용 정확도가 올라갑니다.",
  },
  {
    q: "기존 사이트에도 SEO/AEO를 적용할 수 있나요?",
    a: "빌더 기반 사이트는 구조적 한계가 있어 완전한 적용이 어렵습니다. 코드 기반 사이트라면 기존 사이트에도 적용 가능합니다. 정확한 범위는 무료 진단 후 안내드립니다.",
  },
];

/* ─────────────────────────────────────
   Component
───────────────────────────────────── */

export default function SeoAeoContent() {
  return (
    <>
      {/* Service JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* ── Hero ── */}
      <SubpageHero
        title="SEO & AEO"
        label="( Search Optimization )"
        image="https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/services/seo-code.png"
      />

      {/* ── SubNav ── */}
      <SubNav pageLabel="SEO/AEO MENU" items={subNavItems} />

      {/* ══════════════════════════════════════
         01. THE PROBLEM — 검색의 패러다임이 바뀌었다
         Editorial: 거대 타이포 + 우측 컨텍스트
      ══════════════════════════════════════ */}
      <section
        id="problem"
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
            ( THE PROBLEM )
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
                THE SEARCH
                <br />
                HAS
                <br />
                <span className="text-[#C0C0C0]">CHANGED.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[14px] md:text-[15px] mt-4"
                style={{ color: "#999" }}
              >
                검색의 패러다임이 바뀌었습니다.
              </motion.p>
            </div>

            {/* Right: Context paragraphs — positioned lower */}
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
                  2026년, 검색 트래픽의 25% 이상이 AI로 이동했습니다.
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  className="text-[14px] md:text-[15px] leading-[1.85] text-[#666]"
                >
                  사람들은 더 이상 구글에서만 검색하지 않습니다. ChatGPT에게 묻고,
                  Perplexity에서 찾고, Gemini에게 추천을 요청합니다. 당신의 사이트가
                  AI에게 보이지 않는다면, 고객의 4분의 1을 놓치고 있는 것입니다.
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  className="text-[14px] md:text-[15px] leading-[1.85] text-[#666]"
                >
                  문제는 대부분의 홈페이지가 이 변화에 대응하지 못하고 있다는 것입니다.
                  아임웹, 카페24로 만든 사이트는 구조적으로 AI 크롤러가 읽을 수 없습니다.
                </motion.p>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats row — editorial inline */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-wrap gap-x-16 gap-y-8 mt-24 md:mt-32 pt-12"
            style={{ borderTop: "1px solid #ddd" }}
          >
            {[
              { value: "25%+", label: "AI 검색 트래픽 비중 (2026)" },
              { value: "3.2배", label: "AI 인용 사이트의 평균 트래픽 증가" },
              { value: "0%", label: "빌더 사이트의 llms.txt 적용률" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="min-w-[140px]">
                <span className="text-[36px] md:text-[52px] font-extrabold tracking-[-0.03em] leading-[1.0] text-[#111]">
                  {stat.value}
                </span>
                <p className="text-[12px] text-[#999] mt-2 tracking-[0.04em] uppercase font-[family-name:var(--font-jetbrains-mono)]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         02. SEO vs AEO — 두 개의 전쟁터
         Editorial: 다크 배경, 좌우 대비 스프레드
      ══════════════════════════════════════ */}
      <section
        id="seo-vs-aeo"
        className="py-[160px] md:py-[220px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#111" }}
        data-theme="dark"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20 md:mb-28">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.4 }}
              className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#555]"
            >
              ( SEO vs AEO )
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6 }}
              className="text-[48px] md:text-[72px] lg:text-[96px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-white lg:text-right"
            >
              TWO
              <br />
              <span style={{ color: "#C0C0C0" }}>BATTLES.</span>
            </motion.h2>
          </div>

          {/* Two-column editorial spread */}
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* SEO Column */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="lg:w-[50%]"
            >
              <motion.div variants={fadeInUp}>
                <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#555] mb-6">
                  ( SEO )
                </p>
                <h3 className="text-[36px] md:text-[52px] lg:text-[64px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-white mb-8">
                  SEARCH
                  <br />
                  ENGINE.
                </h3>
              </motion.div>
              <motion.p
                variants={fadeInUp}
                className="text-[15px] md:text-[16px] font-medium leading-[1.85] text-white/70 mb-5"
              >
                구글, 네이버, 빙에서 상위에 노출되는 것.
              </motion.p>
              <motion.div variants={fadeInUp} className="space-y-4">
                <p className="text-[14px] md:text-[15px] leading-[1.85] text-white/40">
                  전통적인 SEO는 메타 태그, 사이트맵, 시맨틱 HTML, 페이지 속도,
                  구조화 데이터를 통해 검색 크롤러가 사이트를 정확히 이해하도록
                  만드는 작업입니다.
                </p>
                <p className="text-[14px] md:text-[15px] leading-[1.85] text-white/40">
                  여전히 전체 검색 트래픽의 75%를 차지합니다.
                  SEO 없이는 AI 검색 최적화도 의미가 없습니다.
                </p>
              </motion.div>

              {/* SEO key items */}
              <motion.div variants={fadeInUp} className="mt-10 space-y-0">
                {["메타 태그 & Open Graph", "시맨틱 HTML 구조", "구조화 데이터 (JSON-LD)", "Core Web Vitals 최적화", "sitemap.xml & robots.txt"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 py-3.5"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <span className="text-[#10B981] text-[12px]">✓</span>
                    <span className="text-[14px] text-white/50">{item}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
              </motion.div>
            </motion.div>

            {/* AEO Column */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="lg:w-[50%] lg:pt-24"
            >
              <motion.div variants={fadeInUp}>
                <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#555] mb-6">
                  ( AEO )
                </p>
                <h3 className="text-[36px] md:text-[52px] lg:text-[64px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-white mb-8">
                  ANSWER
                  <br />
                  <span style={{ color: "#C0C0C0" }}>ENGINE.</span>
                </h3>
              </motion.div>
              <motion.p
                variants={fadeInUp}
                className="text-[15px] md:text-[16px] font-medium leading-[1.85] text-white/70 mb-5"
              >
                AI가 답변할 때 출처로 인용되는 것.
              </motion.p>
              <motion.div variants={fadeInUp} className="space-y-4">
                <p className="text-[14px] md:text-[15px] leading-[1.85] text-white/40">
                  AEO는 ChatGPT, Perplexity, Gemini 같은 AI 검색엔진이
                  답변을 생성할 때 당신의 사이트를 출처로 인용하도록 만드는
                  새로운 최적화 영역입니다.
                </p>
                <p className="text-[14px] md:text-[15px] leading-[1.85] text-white/40">
                  AI는 구조화된 데이터를 우선 참조합니다.
                  llms.txt, FAQ 스키마, 명확한 답변 구조가 핵심입니다.
                  이 영역을 선점하는 사이트가 다음 시대의 트래픽을 가져갑니다.
                </p>
              </motion.div>

              {/* AEO key items */}
              <motion.div variants={fadeInUp} className="mt-10 space-y-0">
                {["llms.txt (AI 크롤러 전용)", "FAQPage 스키마 (답변 구조)", "명확한 질의-응답 콘텐츠 구조", "권위 시그널 강화", "AI 크롤러 접근 허용 설정"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 py-3.5"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <span className="text-[#00D2FF] text-[12px]">✓</span>
                    <span className="text-[14px] text-white/50">{item}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[20px] md:text-[28px] font-semibold text-white leading-[1.4] mt-24 md:mt-32 max-w-[700px]"
          >
            치로는 두 전쟁터를 동시에 설계합니다.
            <span className="text-white/30"> 하나의 코드베이스에서.</span>
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════
         03. WHY CODE LEVEL — 빌더의 한계
         Editorial: 왼쪽 이미지 + 오버랩 타이틀 + 우측 본문
      ══════════════════════════════════════ */}
      <section
        id="code-level"
        className="py-[160px] md:py-[220px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#f5f5f0" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.4 }}
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-12 md:mb-16"
          >
            ( WHY CODE-LEVEL )
          </motion.p>

          {/* Overlapping editorial layout */}
          <div className="relative">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
              {/* Left: Image placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.7 }}
                className="relative z-0 w-full lg:w-[38%] shrink-0"
              >
                <div className="w-full aspect-[3/4] rounded-lg overflow-hidden">
                  <img src="https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/services/seo-code.png" alt="SEO 구조화 데이터 코드 화면" className="w-full h-full object-cover" />
                </div>
              </motion.div>

              {/* Right: Body text */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="flex-1 flex flex-col justify-end lg:pb-8"
              >
                <motion.p
                  variants={fadeInUp}
                  className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-6"
                >
                  ( THE LIMIT OF BUILDERS )
                </motion.p>

                <motion.div className="space-y-5 mb-12">
                  <motion.p
                    variants={fadeInUp}
                    className="text-[15px] md:text-[16px] font-medium leading-[1.85] text-[#111]"
                  >
                    빌더 플랫폼의 기술적 한계가 곧 검색 노출의 한계입니다.
                  </motion.p>
                  <motion.p
                    variants={fadeInUp}
                    className="text-[14px] md:text-[15px] leading-[1.85] text-[#666]"
                  >
                    아임웹, 카페24 같은 빌더 위에서는 FAQPage 스키마를 삽입할 수 없습니다.
                    클린 URL(/services/seo-aeo)을 만들 수 없습니다.
                    llms.txt 파일을 생성할 수 없습니다.
                    커스텀 JSON-LD를 페이지별로 작성할 수 없습니다.
                  </motion.p>
                  <motion.p
                    variants={fadeInUp}
                    className="text-[14px] md:text-[15px] leading-[1.85] text-[#666]"
                  >
                    이 모든 것은 코드에 직접 접근할 수 있어야만 가능합니다.
                    치로는 모든 코드를 직접 작성합니다. 그래야만 가능한 구조가 있습니다.
                  </motion.p>
                </motion.div>

                {/* Builder limitations list */}
                <motion.div variants={fadeInUp}>
                  {[
                    { label: "FAQPage 스키마", builder: "삽입 불가", chiro: "기본 포함" },
                    { label: "클린 URL", builder: "자동 생성 불가", chiro: "완전 제어" },
                    { label: "llms.txt", builder: "생성 불가", chiro: "기본 포함" },
                    { label: "커스텀 JSON-LD", builder: "제한적", chiro: "페이지별 설계" },
                    { label: "Core Web Vitals", builder: "50~70점", chiro: "95+ 점" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center gap-4 md:gap-8 py-4"
                      style={{ borderTop: "1px solid #ddd" }}
                    >
                      <span className="text-[13px] font-medium text-[#111] w-[140px] md:w-[160px] shrink-0">
                        {row.label}
                      </span>
                      <span className="text-[12px] text-[#bbb] flex-1">{row.builder}</span>
                      <span className="text-[12px] text-[#111] font-medium">{row.chiro}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: "1px solid #ddd" }} />
                </motion.div>
              </motion.div>
            </div>

            {/* Title — overlaps image */}
            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="absolute top-[18%] md:top-[12%] left-[30%] md:left-[25%] z-10 text-[44px] md:text-[72px] lg:text-[100px] xl:text-[120px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-[#111] bg-[#f5f5f0] px-5 md:px-8 py-4 md:py-6"
            >
              CODE
              <br />
              LEVEL.
            </motion.h2>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         04. PLATFORM STRATEGY — 각 플랫폼별 에디토리얼 스프레드
         Editorial: 플랫폼마다 다른 레이아웃
      ══════════════════════════════════════ */}
      <section
        id="platforms"
        className="py-[160px] md:py-[220px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#111" }}
        data-theme="dark"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.4 }}
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#555] mb-6"
          >
            ( PLATFORM STRATEGY )
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
            className="text-[48px] md:text-[72px] lg:text-[96px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-white mb-24 md:mb-32"
          >
            THREE
            <br />
            <span style={{ color: "#C0C0C0" }}>FRONTS.</span>
          </motion.h2>

          {/* Platform 01 — Google: left-aligned */}
          <div className="mb-28 md:mb-36">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6 }}
              className="lg:w-[70%]"
            >
              <div className="flex items-end gap-6 mb-8">
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#555]">
                  ( 01 )
                </span>
                <h3 className="text-[36px] md:text-[56px] lg:text-[72px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-white">
                  GOOGLE.
                </h3>
              </div>
              <p className="text-[15px] md:text-[16px] font-medium leading-[1.85] text-white/70 mb-5 max-w-[560px]">
                구조화 데이터 + 시맨틱 HTML로 리치 결과 노출.
              </p>
              <p className="text-[14px] md:text-[15px] leading-[1.85] text-white/40 max-w-[560px]">
                Organization, FAQPage, BreadcrumbList 스키마를 코드 레벨에서 직접 작성합니다.
                구글이 페이지를 &lsquo;이해&rsquo;하면 검색 결과에 별점, FAQ, 사이트링크가 함께
                노출됩니다. 클릭률이 올라가고, 신뢰도가 올라갑니다.
              </p>
            </motion.div>
          </div>

          {/* Platform 02 — ChatGPT: right-aligned offset */}
          <div className="mb-28 md:mb-36">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6 }}
              className="lg:ml-auto lg:w-[70%]"
            >
              <div className="flex items-end gap-6 mb-8 lg:justify-end">
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#555]">
                  ( 02 )
                </span>
                <h3 className="text-[36px] md:text-[56px] lg:text-[72px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-white">
                  CHAT<span style={{ color: "#C0C0C0" }}>GPT.</span>
                </h3>
              </div>
              <p className="text-[15px] md:text-[16px] font-medium leading-[1.85] text-white/70 mb-5 max-w-[560px] lg:ml-auto lg:text-right">
                명확한 답변 구조 + llms.txt로 인용 후보 확보.
              </p>
              <p className="text-[14px] md:text-[15px] leading-[1.85] text-white/40 max-w-[560px] lg:ml-auto lg:text-right">
                ChatGPT는 답변을 생성할 때 구조화된 콘텐츠를 우선 참조합니다.
                llms.txt로 사이트 핵심 정보를 전달하고, FAQ 구조로 질의-응답 패턴을
                제공하면 인용 가능성이 올라갑니다. 치로는 이 두 가지를 기본 포함합니다.
              </p>
            </motion.div>
          </div>

          {/* Platform 03 — Perplexity: centered */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6 }}
              className="lg:w-[70%] lg:mx-auto lg:text-center"
            >
              <div className="flex items-end gap-6 mb-8 lg:justify-center">
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#555]">
                  ( 03 )
                </span>
                <h3 className="text-[36px] md:text-[56px] lg:text-[72px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-white">
                  PERPLE<span style={{ color: "#C0C0C0" }}>XITY.</span>
                </h3>
              </div>
              <p className="text-[15px] md:text-[16px] font-medium leading-[1.85] text-white/70 mb-5 max-w-[560px] lg:mx-auto">
                출처 URL + 권위 시그널로 직접 인용 유도.
              </p>
              <p className="text-[14px] md:text-[15px] leading-[1.85] text-white/40 max-w-[560px] lg:mx-auto">
                Perplexity는 답변에 출처 URL을 직접 표시합니다. 사이트의 권위 시그널이
                높을수록 인용 확률이 올라갑니다. 구조화 데이터, 빠른 로딩 속도, 명확한
                도메인 전문성 — 치로가 설계하는 모든 요소가 이 권위 시그널을 구성합니다.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         05. PROCESS — 치로의 SEO/AEO 프로세스
         Editorial: 큰 타이포 + 번호 매긴 프로세스
      ══════════════════════════════════════ */}
      <section
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
            ( PROCESS )
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
            className="text-[48px] md:text-[72px] lg:text-[96px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-[#111] mb-4"
          >
            HOW WE
            <br />
            <span className="text-[#C0C0C0]">BUILD.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[14px] md:text-[15px] text-[#999] mb-20 md:mb-28"
          >
            모든 프로젝트에 적용되는 SEO/AEO 설계 프로세스.
          </motion.p>

          {/* Process steps — alternating layout */}
          <div className="space-y-20 md:space-y-28">
            {[
              {
                num: "01",
                title: "구조 설계",
                body: "URL 구조, 사이트맵 계층, 페이지 간 관계를 먼저 설계합니다. 검색엔진과 AI 크롤러가 사이트를 어떻게 탐색할지를 기획 단계에서 결정합니다.",
              },
              {
                num: "02",
                title: "시맨틱 마크업",
                body: "모든 페이지를 시맨틱 HTML로 작성합니다. article, section, nav, main — 각 태그가 문서에서 어떤 역할을 하는지 명확히 정의합니다. div 나열이 아닌, 의미를 가진 구조.",
              },
              {
                num: "03",
                title: "스키마 삽입",
                body: "Organization, FAQPage, BreadcrumbList, Service, Person — 페이지 성격에 맞는 JSON-LD 스키마를 코드 레벨에서 직접 작성합니다. 자동 생성이 아닌, 수작업 최적화.",
              },
              {
                num: "04",
                title: "AI 크롤러 대응",
                body: "llms.txt 파일을 생성하고, robots.txt에 AI 크롤러(GPTBot, PerplexityBot, ClaudeBot) 접근을 허용합니다. 사이트가 AI 검색 생태계에 존재하도록 설정합니다.",
              },
              {
                num: "05",
                title: "속도 최적화",
                body: "Lighthouse 95+ 점을 목표로 이미지, 폰트, 스크립트를 최적화합니다. Core Web Vitals 전 항목 Good 등급. 빠른 사이트는 검색 순위에서도, AI 인용에서도 유리합니다.",
              },
            ].map((step, i) => {
              const isOffset = i % 2 === 1;

              return (
                <motion.div
                  key={step.num}
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
                      {step.num}
                    </span>
                    <div className="pt-3 md:pt-5">
                      <h3 className="text-[20px] md:text-[28px] font-bold text-[#111] leading-[1.2] mb-4">
                        {step.title}
                      </h3>
                      <p className="text-[14px] md:text-[15px] leading-[1.85] text-[#666] max-w-[480px]">
                        {step.body}
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
         06. WHAT'S INCLUDED — NumberedSection
      ══════════════════════════════════════ */}
      <div id="included">
        <NumberedSection
          label="( INCLUDED IN ALL )"
          heading={"WHAT'S\nINCLUDED."}
          subheading="모든 프로젝트에 기본 포함되는 SEO/AEO 항목."
          items={includedItems}
          dark
        />
      </div>

      {/* ══════════════════════════════════════
         07. COMPARISON — Editorial rows
      ══════════════════════════════════════ */}
      <section
        id="compare"
        className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 py-[160px] md:py-[220px]"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20 md:mb-28">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.4 }}
              className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999]"
            >
              ( COMPARISON )
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6 }}
              className="text-[48px] md:text-[72px] lg:text-[96px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-[#111] lg:text-right"
            >
              BUILDER
              <br />
              <span className="text-[#C0C0C0]">vs CHIRO.</span>
            </motion.h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {comparisonData.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-4 md:gap-8 py-7 md:py-8 items-center"
                style={{ borderBottom: "1px solid #ddd" }}
              >
                <span className="text-[15px] md:text-[16px] font-medium text-[#111]">
                  {item.feature}
                </span>
                <span className="text-[13px] text-[#999] md:text-center">
                  <span className="md:hidden font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.08em] uppercase text-[#bbb] mr-3">빌더</span>
                  {item.others}
                </span>
                <span className="text-[14px] font-medium text-[#111] md:text-right">
                  <span className="md:hidden font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.08em] uppercase text-[#bbb] mr-3">치로</span>
                  {item.chiro}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <div className="hidden md:grid grid-cols-[1fr_1fr_1fr] gap-8 mt-6">
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.08em] uppercase text-[#bbb]">
              항목
            </span>
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.08em] uppercase text-[#bbb] text-center">
              아임웹 · 카페24
            </span>
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.08em] uppercase text-[#111] text-right font-medium">
              치로웹디자인
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         08. FAQ
      ══════════════════════════════════════ */}
      <div id="faq">
        <FaqTwoColumn
          faqs={faqs}
          sectionLabel="( FAQ )"
          heading={"FREQUENTLY\nASKED."}
          subheading="자주 묻는 질문."
          dark={false}
        />
      </div>

      {/* ══════════════════════════════════════
         09. CTA
      ══════════════════════════════════════ */}
      <CtaContact />
    </>
  );
}
