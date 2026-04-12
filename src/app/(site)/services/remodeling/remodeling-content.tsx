"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SubpageHero from "@/components/sections/subpage-hero";
import SubNav from "@/components/ui/sub-nav";
import FaqTwoColumn from "@/components/sections/faq-two-column";
import CtaContact from "@/components/sections/cta-contact";

/* ─────────────────────────────────────
   JSON-LD
───────────────────────────────────── */

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://chiroweb.co.kr/services/remodeling#service",
  name: "홈페이지 리모델링",
  description:
    "낡은 디자인과 느린 속도를 현대적으로 전환합니다. 기존 콘텐츠를 살리면서 SEO/AEO 구조를 새로 설계합니다.",
  provider: {
    "@type": "Organization",
    "@id": "https://chiroweb.co.kr/#organization",
    name: "치로웹디자인",
  },
  serviceType: "Website Redesign",
  areaServed: { "@type": "Country", name: "KR" },
  url: "https://chiroweb.co.kr/services/remodeling",
};

/* ─────────────────────────────────────
   Data
───────────────────────────────────── */

const subNavItems = [
  { label: "PROBLEM", href: "#problem" },
  { label: "CHECK", href: "#check" },
  { label: "WHAT WE DO", href: "#what-we-do" },
  { label: "PROCESS", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

const faqs = [
  {
    q: "기존 도메인과 콘텐츠를 유지할 수 있나요?",
    a: "네. 기존 도메인, 브랜드명, 핵심 콘텐츠는 그대로 유지합니다. URL 구조도 301 리디렉션으로 SEO 자산을 보존합니다.",
  },
  {
    q: "리모델링 기간은 얼마나 걸리나요?",
    a: "규모에 따라 다르지만 보통 2~4주 내에 완료됩니다. 진단 후 정확한 일정을 안내드립니다.",
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
    a: "구조적 개선 후 보통 2~4주 내 구글 재크롤링이 시작되며, 3개월 이내에 검색 순위 변화를 확인하실 수 있습니다.",
  },
  {
    q: "비용은 어느 정도인가요?",
    a: "현재 사이트 규모와 목표에 따라 다릅니다. 무료 진단 후 맞춤 견적을 투명하게 안내드립니다. 숨겨진 비용은 없습니다.",
  },
  {
    q: "아임웹/카페24에서 이전할 수 있나요?",
    a: "가능합니다. 빌더 기반 사이트에서 코드 기반 사이트로 전환하면 속도, SEO, AI 검색 대응이 근본적으로 달라집니다. 기존 콘텐츠를 모두 이전합니다.",
  },
  {
    q: "기존 사이트의 SEO 순위가 떨어지지 않나요?",
    a: "301 리디렉션으로 기존 URL의 SEO 자산을 보존합니다. 오히려 구조 개선으로 인해 순위가 올라가는 경우가 대부분입니다.",
  },
];

/* ─────────────────────────────────────
   Component
───────────────────────────────────── */

export default function RemodelingContent() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* ── Hero ── */}
      <SubpageHero
        title="REMODELING"
        label="( Site Renewal )"
        image="https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/services/remodeling-compare.png"
      />

      {/* ── SubNav ── */}
      <SubNav pageLabel="REMODELING MENU" items={subNavItems} />

      {/* ══════════════════════════════════════
         01. THE PROBLEM — 방치된 홈페이지
         Editorial: 거대 타이포 좌 + 우측 하단 컨텍스트
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
            <div className="flex-1 min-w-0">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-[48px] md:text-[72px] lg:text-[96px] font-extrabold tracking-[-0.03em] leading-[0.9] text-[#111] uppercase mb-4"
              >
                YOUR SITE
                <br />
                IS LOSING
                <br />
                <span className="text-[#C0C0C0]">CLIENTS.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[14px] md:text-[15px] mt-4"
                style={{ color: "#999" }}
              >
                방치된 홈페이지는 매일 고객을 잃고 있습니다.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.7, delay: 0.15 }}
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
                  로딩에 3초 이상 걸리면 방문자의 53%가 떠납니다.
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  className="text-[14px] md:text-[15px] leading-[1.85] text-[#666]"
                >
                  모바일에서 깨지는 레이아웃. 구글에 검색해도 나오지 않는 사이트.
                  AI 검색에서 완전히 보이지 않는 구조. 경쟁사가 현대적인 사이트를
                  갖추는 동안, 당신의 사이트는 잠재 고객을 경쟁사로 보내고 있습니다.
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  className="text-[14px] md:text-[15px] leading-[1.85] text-[#666]"
                >
                  리모델링은 예쁘게 바꾸는 것이 아닙니다.
                  구조부터 다시 설계하는 것입니다.
                </motion.p>
              </motion.div>
            </motion.div>
          </div>

          {/* Pain point stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-wrap gap-x-16 gap-y-8 mt-24 md:mt-32 pt-12"
            style={{ borderTop: "1px solid #ddd" }}
          >
            {[
              { value: "53%", label: "3초 이상 로딩 시 이탈률" },
              { value: "70%", label: "모바일 방문자 비중" },
              { value: "25%+", label: "AI 검색으로 이동한 트래픽" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp}>
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
         02. SELF CHECK — 자가 진단
         Editorial: 다크 배경, 체크리스트 좌 + 대형 타이포 우
      ══════════════════════════════════════ */}
      <section
        id="check"
        className="py-[160px] md:py-[220px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#111" }}
        data-theme="dark"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Left: Checklist */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="lg:w-[55%]"
            >
              <motion.p
                variants={fadeInUp}
                className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#555] mb-10"
              >
                ( SELF CHECK )
              </motion.p>

              {[
                "홈페이지가 3년 이상 되었다",
                "모바일에서 글자가 너무 작거나 레이아웃이 깨진다",
                "구글에서 회사명을 검색해도 1페이지에 나오지 않는다",
                "방문자가 있어도 문의로 이어지지 않는다",
                "경쟁사 사이트가 더 현대적으로 보인다",
                "직접 콘텐츠를 수정할 수 없다",
                "ChatGPT에 회사명을 물어보면 아무 정보가 없다",
              ].map((item) => (
                <motion.div
                  key={item}
                  variants={fadeInUp}
                  className="flex items-center gap-5 py-5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span className="shrink-0 w-5 h-5 border border-white/20 rounded-sm flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5 3.5-4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-[14px] md:text-[15px] text-white/60 leading-[1.6]">
                    {item}
                  </span>
                </motion.div>
              ))}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />

              <motion.p
                variants={fadeInUp}
                className="mt-8 text-[15px] md:text-[16px] font-semibold"
                style={{ color: "#FF4D00" }}
              >
                3개 이상 해당된다면, 리모델링이 필요합니다.
              </motion.p>
            </motion.div>

            {/* Right: Big type */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6 }}
              className="lg:w-[45%] flex flex-col justify-end lg:pb-8"
            >
              <h2 className="text-[48px] md:text-[72px] lg:text-[96px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-white text-right">
                NEED A
                <br />
                <span style={{ color: "#C0C0C0" }}>CHECK?</span>
              </h2>
              <p className="text-[14px] md:text-[15px] text-white/35 mt-6 text-right">
                리모델링이 필요한 신호를 확인하세요.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         03. WHAT WE DO — 리모델링의 본질
         Editorial: 이미지 좌 + 오버랩 타이틀 + 우측 본문
      ══════════════════════════════════════ */}
      <section
        id="what-we-do"
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
            ( WHAT WE DO )
          </motion.p>

          <div className="relative">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
              {/* Left: Image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.7 }}
                className="relative z-0 w-full lg:w-[38%] shrink-0"
              >
                <img src="https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/services/design-process.png" alt="디자인 프로세스 작업 과정" className="w-full h-full object-cover rounded-lg" />
              </motion.div>

              {/* Right: Body */}
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
                  ( NOT JUST A REDESIGN )
                </motion.p>

                <motion.div className="space-y-5 mb-12">
                  <motion.p
                    variants={fadeInUp}
                    className="text-[15px] md:text-[16px] font-medium leading-[1.85] text-[#111]"
                  >
                    디자인만 바꾸는 것이 아닙니다. 구조부터 다시 설계합니다.
                  </motion.p>
                  <motion.p
                    variants={fadeInUp}
                    className="text-[14px] md:text-[15px] leading-[1.85] text-[#666]"
                  >
                    기존 콘텐츠와 브랜드 자산을 최대한 살리면서, 최신 기술 스택과
                    SEO/AEO 구조로 전환합니다. 반응형 디자인, 구조화 데이터,
                    llms.txt, Core Web Vitals 최적화 — 빌더에서 코드로,
                    느린 사이트에서 빠른 사이트로.
                  </motion.p>
                  <motion.p
                    variants={fadeInUp}
                    className="text-[14px] md:text-[15px] leading-[1.85] text-[#666]"
                  >
                    기존 도메인의 SEO 자산은 301 리디렉션으로 보존합니다.
                    리모델링 후 검색 순위가 떨어지는 것이 아니라, 올라갑니다.
                  </motion.p>
                </motion.div>

                {/* What changes */}
                <motion.div variants={fadeInUp}>
                  {[
                    { label: "디자인", desc: "현대적 UI + 반응형 + 맞춤 애니메이션" },
                    { label: "구조", desc: "시맨틱 HTML + 클린 URL + 사이트맵 재설계" },
                    { label: "속도", desc: "Core Web Vitals 전항목 Good. Lighthouse 95+" },
                    { label: "SEO/AEO", desc: "JSON-LD 6종 + llms.txt + AI 크롤러 대응" },
                    { label: "관리", desc: "CMS 구축 + 운영 가이드 + 직접 콘텐츠 수정" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center gap-6 md:gap-8 py-4"
                      style={{ borderTop: "1px solid #ddd" }}
                    >
                      <span className="text-[13px] font-semibold text-[#111] w-[80px] md:w-[100px] shrink-0">
                        {row.label}
                      </span>
                      <span className="text-[13px] text-[#666] leading-[1.6]">{row.desc}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: "1px solid #ddd" }} />
                </motion.div>
              </motion.div>
            </div>

            {/* Overlapping title */}
            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="absolute top-[18%] md:top-[12%] left-[30%] md:left-[25%] z-10 text-[44px] md:text-[72px] lg:text-[100px] xl:text-[120px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-[#111] bg-[#f5f5f0] px-5 md:px-8 py-4 md:py-6"
            >
              RE
              <br />
              <span className="text-[#C0C0C0]">-BUILD.</span>
            </motion.h2>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         04. BEFORE / AFTER — 시각적 대비
         Editorial: 다크, 좌우 대비 스프레드
      ══════════════════════════════════════ */}
      <section
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
              ( BEFORE & AFTER )
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6 }}
              className="text-[48px] md:text-[72px] lg:text-[96px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-white lg:text-right"
            >
              BEFORE
              <br />
              <span style={{ color: "#C0C0C0" }}>&amp; AFTER.</span>
            </motion.h2>
          </div>

          {/* Two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6 }}
            >
              <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#555] mb-4">
                BEFORE
              </p>
              <div
                className="w-full aspect-[4/3] rounded-lg flex flex-col items-center justify-center gap-3 relative overflow-hidden"
                style={{ backgroundColor: "#2a2a2a" }}
              >
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: "repeating-linear-gradient(0deg, #666 0px, #666 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #666 0px, #666 1px, transparent 1px, transparent 60px)" }}
                />
                <div className="relative flex flex-col items-center gap-4 px-8 w-full">
                  <div className="w-full h-8 rounded-sm flex items-center gap-2 px-3" style={{ backgroundColor: "#3a3a3a" }}>
                    {[40, 28, 36].map((w, i) => (
                      <div key={i} className="h-2 rounded-sm" style={{ width: `${w}px`, backgroundColor: "#555" }} />
                    ))}
                  </div>
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-white/60 mb-4">
                AFTER
              </p>
              <div
                className="w-full aspect-[4/3] rounded-lg flex flex-col items-center justify-center gap-3 relative overflow-hidden"
                style={{ backgroundColor: "#0d0d0d", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, #00D2FF, #001F3F)" }} />
                <div className="relative flex flex-col items-center gap-4 px-8 w-full">
                  <div className="w-full h-8 flex items-center justify-between">
                    <div className="h-3 w-20 rounded-sm" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                    <div className="flex gap-3">
                      <div className="h-2 w-8 rounded-sm" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
                    </div>
                  </div>
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
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         05. PROCESS — 리모델링 과정
         Editorial: 좌/우 교차 오프셋 + 대형 번호
      ══════════════════════════════════════ */}
      <section
        id="process"
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
            <span className="text-[#C0C0C0]">RENEW.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[14px] md:text-[15px] text-[#999] mb-20 md:mb-28"
          >
            리모델링 과정.
          </motion.p>

          <div className="space-y-20 md:space-y-28">
            {[
              { num: "01", title: "현황 진단", body: "현재 사이트의 속도, SEO 구조, 모바일 대응, AEO 호환성을 종합 분석합니다. 어디서 고객을 잃고 있는지 데이터로 확인합니다. 무료 진단 후 결과를 공유합니다." },
              { num: "02", title: "전략 설계", body: "브랜드 정체성과 전환 목표에 맞는 정보 구조(IA)와 디자인 방향을 설계합니다. 기존 도메인과 콘텐츠 자산을 최대한 보존하면서 URL 구조를 재설계합니다." },
              { num: "03", title: "디자인 & 빌드", body: "실시간 빌드 링크로 진행 상황을 확인하면서 피드백을 주세요. 반응형 UI, 맞춤 애니메이션, 인터랙션을 구현합니다. 수정 무제한." },
              { num: "04", title: "SEO/AEO 최적화", body: "JSON-LD 스키마, 시맨틱 HTML, llms.txt, Core Web Vitals 최적화. 301 리디렉션으로 기존 SEO 자산을 보존하면서 구조를 업그레이드합니다." },
              { num: "05", title: "런칭 & 인수인계", body: "최종 검수 후 런칭. CMS와 운영 가이드를 함께 제공합니다. 무상 유지보수 기간 동안 수정 사항을 즉시 반영합니다." },
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
         06. FAQ
      ══════════════════════════════════════ */}
      <div id="faq">
        <FaqTwoColumn
          faqs={faqs}
          sectionLabel="( FAQ )"
          heading={"FREQUENTLY\nASKED."}
          subheading="자주 묻는 질문."
          dark
        />
      </div>

      {/* ══════════════════════════════════════
         07. CTA
      ══════════════════════════════════════ */}
      <CtaContact />
    </>
  );
}
