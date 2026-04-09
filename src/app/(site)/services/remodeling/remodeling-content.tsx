"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SubpageHero from "@/components/sections/subpage-hero";
import ProcessTimeline from "@/components/sections/process-timeline";
import FaqTwoColumn from "@/components/sections/faq-two-column";
import ContactCtaSection from "@/components/sections/contact-cta-section";

/* ─────────────────────────────────────
   Pain Points
───────────────────────────────────── */
const painPoints = [
  {
    title: "모바일에서 깨지는 레이아웃",
    description: "방문자의 70%는 모바일입니다.",
  },
  {
    title: "구글에 검색해도 나오지 않는 사이트.",
    description: "오래된 구조와 느린 속도는 검색 순위를 지속적으로 끌어내립니다.",
  },
  {
    title: "로딩에 3초 이상 걸리면 53%가 떠납니다.",
    description: "기회는 단 한 번. 첫 3초 안에 인상을 만들지 못하면 잠재 고객은 경쟁사로 갑니다.",
  },
  {
    title: "AI 검색에서 완전히 보이지 않는 사이트.",
    description: "ChatGPT, Perplexity 같은 AI 검색은 구조화 데이터가 없는 사이트를 무시합니다.",
  },
];

/* ─────────────────────────────────────
   Checklist
───────────────────────────────────── */
const checklistItems = [
  "홈페이지가 3년 이상 되었다",
  "모바일에서 확인하면 글자가 너무 작거나 레이아웃이 깨진다",
  "구글에서 회사명을 검색해도 1페이지에 나오지 않는다",
  "방문자가 있어도 문의로 이어지지 않는다",
  "경쟁사 사이트가 더 현대적으로 보인다",
  "직접 콘텐츠를 수정할 수 없다",
];

/* ─────────────────────────────────────
   Process Steps
───────────────────────────────────── */
const processSteps = [
  {
    number: "01",
    title: "현황 진단",
    description:
      "현재 사이트의 속도, SEO 구조, 모바일 대응, AEO 호환성을 종합 분석합니다. 어디서 고객을 잃고 있는지 데이터로 확인합니다.",
  },
  {
    number: "02",
    title: "전략 설계",
    description:
      "브랜드 정체성과 전환 목표에 맞는 정보 구조(IA)와 디자인 방향을 설계합니다. 기존 도메인과 콘텐츠 자산을 최대한 보존합니다.",
  },
  {
    number: "03",
    title: "개발 및 최적화",
    description:
      "반응형 UI, Core Web Vitals 최적화, 구조화 데이터(Schema), SEO/AEO 전략을 전부 적용해 구축합니다.",
  },
  {
    number: "04",
    title: "런칭 및 인수인계",
    description:
      "기존 URL 구조를 유지하며 마이그레이션합니다. 직접 콘텐츠를 수정할 수 있는 CMS와 운영 가이드를 함께 제공합니다.",
  },
];

/* ─────────────────────────────────────
   FAQs
───────────────────────────────────── */
const faqs = [
  {
    q: "기존 도메인과 콘텐츠를 유지할 수 있나요?",
    a: "네. 기존 도메인, 브랜드명, 핵심 콘텐츠는 그대로 유지합니다. URL 구조도 301 리디렉션으로 SEO 자산을 보존합니다.",
  },
  {
    q: "리모델링 기간은 얼마나 걸리나요?",
    a: "규모에 따라 다르지만 보통 4–8주 내에 완료됩니다. 진단 후 정확한 일정을 안내드립니다.",
  },
  {
    q: "신규 제작과 리모델링의 차이는 무엇인가요?",
    a: "리모델링은 기존 브랜드 자산(도메인, 콘텐츠, 이미지)을 최대한 살리면서 기술 구조만 현대화합니다. 비용과 기간이 신규 대비 효율적입니다.",
  },
  {
    q: "완료 후 직접 수정할 수 있나요?",
    a: "네. 비개발자도 쉽게 사용할 수 있는 CMS를 함께 구축하고, 운영 교육과 가이드를 제공합니다.",
  },
  {
    q: "SEO/AEO 효과는 언제부터 나타나나요?",
    a: "구조적 개선 후 보통 2–4주 내 구글 재크롤링이 시작되며, 3개월 이내에 검색 순위 변화를 확인하실 수 있습니다.",
  },
  {
    q: "비용은 어느 정도인가요?",
    a: "현재 사이트 규모와 목표에 따라 다릅니다. 무료 진단 후 맞춤 견적을 투명하게 안내드립니다. 숨겨진 비용은 없습니다.",
  },
];

/* ─────────────────────────────────────
   Component
───────────────────────────────────── */
export default function RemodelingContent() {
  return (
    <>
      {/* 1. SubpageHero */}
      <SubpageHero
        title="REMODELING"
        label="( Site Renewal )"
        dark={true}
      />

      {/* 2. 리모델링이 필요한 이유 — Dark */}
      <section
        className="py-[200px] md:py-[260px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#1a1a1a" }}
        data-theme="dark"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase mb-12"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            ( WHY REMODEL )
          </motion.p>

          {/* Large loss-aversion statement */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            className="text-[32px] md:text-[52px] lg:text-[68px] font-extrabold tracking-[-0.03em] leading-[1.1] text-white mb-16 md:mb-20 whitespace-pre-line"
          >
            {"방치된 홈페이지는\n매일 고객을 잃고 있습니다."}
          </motion.h2>

          {/* 4 Pain Points */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {painPoints.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 py-8 md:py-10"
                style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}
              >
                {/* Ghost number */}
                <div className="shrink-0 w-12 md:w-16">
                  <span
                    className="text-[40px] md:text-[52px] font-extrabold leading-none tabular-nums select-none"
                    style={{ color: "rgba(255,255,255,0.07)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1 md:pt-2">
                  <h3
                    className="text-[16px] md:text-[20px] font-semibold leading-[1.4] mb-2"
                    style={{ color: "#f5f5f5" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[13px] md:text-[14px] leading-[1.8]"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }} />
          </motion.div>
        </div>
      </section>

      {/* 3. 자가 진단 체크리스트 — Light */}
      <section
        className="py-[200px] md:py-[260px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#f5f5f0" }}
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-12"
          >
            ( SELF CHECK )
          </motion.p>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            className="text-[36px] md:text-[56px] lg:text-[72px] font-extrabold tracking-[-0.03em] leading-[1.0] text-[#111] mb-16 md:mb-20"
          >
            리모델링이 필요한 신호.
          </motion.h2>

          {/* Checklist */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="max-w-[720px]"
          >
            {checklistItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex items-center gap-5 py-5"
                style={{ borderTop: "1px solid #ddd" }}
              >
                {/* Visual-only checkbox */}
                <span
                  className="shrink-0 w-5 h-5 border border-[#ccc] rounded-sm flex items-center justify-center"
                  aria-hidden="true"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 5l2.5 2.5 3.5-4"
                      stroke="#bbb"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-[14px] md:text-[16px] text-[#111] leading-[1.6]">
                  {item}
                </span>
              </motion.div>
            ))}
            <div style={{ borderTop: "1px solid #ddd" }} />
          </motion.div>

          {/* Result message */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            className="mt-10 text-[14px] md:text-[16px] font-semibold"
            style={{ color: "#FF4D00" }}
          >
            3개 이상 해당된다면, 리모델링이 필요합니다.
          </motion.p>
        </div>
      </section>

      {/* 4. Before / After — Dark */}
      <section
        className="py-[200px] md:py-[260px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#111111" }}
        data-theme="dark"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase mb-16 md:mb-20"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            ( BEFORE &amp; AFTER )
          </motion.p>

          {/* Two columns */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {/* Before */}
            <motion.div variants={fadeInUp}>
              <p
                className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase mb-4"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                BEFORE
              </p>
              <div
                className="w-full aspect-[4/3] rounded-sm flex flex-col items-center justify-center gap-3 relative overflow-hidden"
                style={{ backgroundColor: "#2a2a2a" }}
              >
                {/* Decorative old-style grid lines */}
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, #666 0px, #666 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #666 0px, #666 1px, transparent 1px, transparent 60px)",
                  }}
                />
                <div className="relative flex flex-col items-center gap-4 px-8 w-full">
                  {/* Fake nav bar */}
                  <div className="w-full h-8 rounded-sm flex items-center gap-2 px-3" style={{ backgroundColor: "#3a3a3a" }}>
                    {[40, 28, 36].map((w, i) => (
                      <div key={i} className="h-2 rounded-sm" style={{ width: `${w}px`, backgroundColor: "#555" }} />
                    ))}
                  </div>
                  {/* Fake content blocks */}
                  <div className="w-full flex gap-3">
                    <div className="flex-1 h-24 rounded-sm" style={{ backgroundColor: "#363636" }} />
                    <div className="w-1/3 flex flex-col gap-2 justify-center">
                      {[80, 60, 70].map((w, i) => (
                        <div key={i} className="h-2 rounded-sm" style={{ width: `${w}%`, backgroundColor: "#444" }} />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] font-[family-name:var(--font-jetbrains-mono)]" style={{ color: "rgba(255,255,255,0.2)" }}>
                    비반응형 · 느린 로딩 · SEO 0점
                  </p>
                </div>
              </div>
            </motion.div>

            {/* After */}
            <motion.div variants={fadeInUp}>
              <p
                className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase mb-4"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                AFTER
              </p>
              <div
                className="w-full aspect-[4/3] rounded-sm flex flex-col items-center justify-center gap-3 relative overflow-hidden"
                style={{ backgroundColor: "#0d0d0d", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {/* Clean gradient accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: "linear-gradient(90deg, #00D2FF, #001F3F)" }}
                />
                <div className="relative flex flex-col items-center gap-4 px-8 w-full">
                  {/* Clean nav */}
                  <div className="w-full h-8 flex items-center justify-between">
                    <div className="h-3 w-20 rounded-sm" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                    <div className="flex gap-3">
                      {[3].map((_, i) => (
                        <div key={i} className="h-2 w-8 rounded-sm" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
                      ))}
                    </div>
                  </div>
                  {/* Clean hero block */}
                  <div className="w-full flex flex-col gap-3">
                    <div className="h-3 w-3/4 rounded-sm" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
                    <div className="h-2 w-1/2 rounded-sm" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
                    <div className="mt-2 h-7 w-28 rounded-full" style={{ backgroundColor: "rgba(0,210,255,0.25)", border: "1px solid rgba(0,210,255,0.4)" }} />
                  </div>
                  <p className="text-[11px] font-[family-name:var(--font-jetbrains-mono)]" style={{ color: "rgba(255,255,255,0.45)" }}>
                    반응형 · PageSpeed 95+ · SEO/AEO 완비
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. ProcessTimeline */}
      <ProcessTimeline
        label="( PROCESS )"
        heading="HOW WE RENEW."
        steps={processSteps}
        dark={false}
      />

      {/* 6. FaqTwoColumn */}
      <FaqTwoColumn
        faqs={faqs}
        sectionLabel="( FAQ )"
        heading={"FREQUENTLY\nASKED."}
        dark={true}
      />

      {/* 7. ContactCtaSection */}
      <ContactCtaSection variant="diagnosis" />
    </>
  );
}
