"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SubpageHero from "@/components/sections/subpage-hero";
import SubNav from "@/components/ui/sub-nav";
import NumberedSection from "@/components/sections/numbered-section";
import ComparisonTable from "@/components/sections/comparison-table";
import StatsRow from "@/components/sections/stats-row";
import FaqTwoColumn from "@/components/sections/faq-two-column";
import ContactCtaSection from "@/components/sections/contact-cta-section";

/* ─────────────────────────────────────
   Data
───────────────────────────────────── */

const includedItems = [
  {
    title: "Organization 스키마",
    description: "검색엔진이 비즈니스 정보를 정확히 인식하도록 구조화.",
  },
  {
    title: "FAQPage 스키마",
    description: "자주 묻는 질문이 구글 리치 결과에 직접 노출.",
  },
  {
    title: "BreadcrumbList 스키마",
    description: "사이트 구조를 검색엔진에 명확히 전달.",
  },
  {
    title: "시맨틱 HTML",
    description: "의미 있는 HTML 구조로 크롤러 가독성 극대화.",
  },
  {
    title: "sitemap.xml & robots.txt",
    description: "자동 생성. 크롤링 효율 최적화.",
  },
  {
    title: "llms.txt",
    description: "2026년 신규 표준. AI 크롤러 전용 사이트맵.",
  },
];

const comparisonColumns = ["아임웹", "카페24", "치로"];

const comparisonRows = [
  { feature: "커스텀 코드", values: [false, false, true] },
  { feature: "SEO 자동화", values: [false, false, true] },
  { feature: "AEO 스키마", values: [false, false, true] },
  { feature: "클린 URL", values: [false, false, true] },
  { feature: "llms.txt", values: [false, false, true] },
  { feature: "구조화 데이터", values: [false, false, true] },
  { feature: "로딩 속도 최적화", values: [false, false, true] },
];

const stats = [
  { label: "AI 검색 트래픽 비중", value: "25%+" },
  { label: "기본 포함 SEO 항목", value: "12+" },
  { label: "평균 페이지 속도 점수", value: "95+" },
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
    a: "2025년부터 등장한 새로운 표준 파일입니다. robots.txt가 검색 크롤러에게 지침을 주듯, llms.txt는 AI 크롤러(GPTBot, PerplexityBot 등)에게 사이트 정보를 구조화해서 전달합니다. AI 검색 인용률에 직접 영향을 줍니다.",
  },
  {
    q: "SEO/AEO 작업은 별도 비용인가요?",
    a: "아닙니다. 치로의 모든 프로젝트에는 SEO/AEO 기본 세팅이 포함되어 있습니다. Organization 스키마, FAQPage 스키마, BreadcrumbList, 시맨틱 HTML, sitemap.xml, robots.txt, llms.txt가 추가 비용 없이 기본 제공됩니다.",
  },
  {
    q: "결과가 얼마나 걸리나요?",
    a: "구조화 데이터와 기술적 SEO는 사이트 론칭 즉시 적용됩니다. 구글 리치 결과 반영은 보통 2–6주, AI 검색 인용 증가는 3–8주 내에 확인됩니다. 단, 콘텐츠 품질과 사이트 권위에 따라 달라질 수 있습니다.",
  },
  {
    q: "ChatGPT가 내 사이트를 인용하게 할 수 있나요?",
    a: "완전히 보장할 수는 없지만, llms.txt 적용, 명확한 답변 구조, 권위 시그널 강화를 통해 인용 가능성을 높일 수 있습니다. 치로는 이 세 가지를 모두 기본 세팅에 포함합니다.",
  },
];

/* ─────────────────────────────────────
   Platform Strategy blocks
───────────────────────────────────── */

const platforms = [
  {
    name: "Google",
    strategy: "구조화 데이터 + 시맨틱 HTML로 리치 결과 노출",
  },
  {
    name: "ChatGPT",
    strategy: "명확한 답변 구조 + llms.txt로 인용 후보 확보",
  },
  {
    name: "Perplexity",
    strategy: "출처 URL + 권위 시그널로 직접 인용 유도",
  },
];

/* ─────────────────────────────────────
   Page Component
───────────────────────────────────── */

export default function SeoAeoContent() {
  return (
    <>
      {/* 1. SubpageHero */}
      <SubpageHero
        title="SEO & AEO"
        label="( Search Optimization )"
      />

      {/* SubNav */}
      <SubNav pageLabel="SEO/AEO MENU" items={[
        { label: "WHAT", href: "#what" },
        { label: "WHY CODE", href: "#why-code" },
        { label: "INCLUDED", href: "#included" },
        { label: "COMPARE", href: "#compare" },
        { label: "FAQ", href: "#faq" },
      ]} />

      {/* 2. Direct Answer Block — Light */}
      <section
        id="what"
        className="py-[200px] md:py-[260px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#f5f5f0" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="max-w-[800px]"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-[28px] md:text-[40px] lg:text-[52px] font-extrabold tracking-[-0.03em] leading-[1.1] text-[#111] mb-4"
            >
              AEO(Answer Engine Optimization)란.
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-[14px] md:text-[15px] text-[#999] mb-8"
            >
              AI 검색 최적화란 무엇인가.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-[15px] md:text-[17px] leading-[1.9] text-[#555]"
            >
              AI 검색 엔진이 답변을 생성할 때 내 사이트를 출처로 인용하도록
              최적화하는 작업입니다. 2026년 현재 검색 트래픽의 25% 이상이
              AI 검색으로 이동했습니다.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 3. 코드 레벨 이유 — Dark */}
      <section
        id="why-code"
        className="py-[200px] md:py-[260px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#1a1a1a" }}
        data-theme="dark"
      >
        <div className="max-w-[1400px] mx-auto">
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
              ( WHY CODE-LEVEL )
            </motion.p>

            <motion.h2
              variants={fadeInUp}
              className="text-[36px] md:text-[60px] lg:text-[80px] font-extrabold tracking-[-0.03em] leading-[1.05] text-white uppercase whitespace-pre-line"
            >
              {`왜 코드 레벨에서\n시작해야 하는가.`}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-[14px] md:text-[15px] text-white/35 mt-4 mb-12 md:mb-16"
            >
              빌더 플랫폼의 한계.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
              <motion.p
                variants={fadeInUp}
                className="text-[15px] md:text-[16px] leading-[1.9]"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                아임웹, 카페24 같은 빌더 위에서는 FAQPage 스키마, 클린 URL,
                커스텀 구조화 데이터를 적용할 수 없습니다. 빌더의 기술적
                한계가 곧 검색 노출의 한계입니다.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-[15px] md:text-[16px] leading-[1.9]"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                치로는 모든 코드를 직접 작성합니다. 그래야만 가능한 구조가
                있습니다.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. 기본 제공 항목 — NumberedSection (dark) */}
      <div id="included">
        <NumberedSection
          label="( INCLUDED )"
          heading={"WHAT'S\nINCLUDED."}
          subheading="기본 제공 항목."
          items={includedItems}
          dark={true}
        />
      </div>

      {/* 5. 비교표 — ComparisonTable */}
      <div id="compare">
        <ComparisonTable
          label="( COMPARISON )"
          heading={"플랫폼\n비교."}
          columns={comparisonColumns}
          rows={comparisonRows}
          highlightColumn={2}
        />
      </div>

      {/* 6. 플랫폼별 전략 — Light */}
      <section
        className="py-[200px] md:py-[260px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#f5f5f0" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-16 md:mb-20"
          >
            <motion.p
              variants={fadeInUp}
              className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-6"
            >
              ( AI PLATFORMS )
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-[36px] md:text-[56px] lg:text-[72px] font-extrabold tracking-[-0.03em] leading-[1.0] text-[#111] uppercase whitespace-pre-line"
            >
              {`PLATFORM\nSTRATEGY.`}
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#ddd]"
          >
            {platforms.map((platform, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-[#f5f5f0] p-8 md:p-10"
              >
                <p
                  className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-4"
                >
                  {platform.name}
                </p>
                <p className="text-[15px] md:text-[16px] leading-[1.8] text-[#333] font-medium">
                  {platform.strategy}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. StatsRow */}
      <StatsRow stats={stats} dark={false} />

      {/* 8. FaqTwoColumn */}
      <div id="faq">
        <FaqTwoColumn
          faqs={faqs}
          sectionLabel="( FAQ )"
          heading={"FREQUENTLY\nASKED."}
          subheading="자주 묻는 질문."
          dark={false}
        />
      </div>

      {/* 9. ContactCtaSection */}
      <ContactCtaSection variant="diagnosis" />
    </>
  );
}
