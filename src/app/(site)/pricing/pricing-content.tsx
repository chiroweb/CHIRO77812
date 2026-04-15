"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { plans, pricingComparison } from "@/data/pricing";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SubpageHero from "@/components/sections/subpage-hero";
import SubNav from "@/components/ui/sub-nav";
import NumberedSection from "@/components/sections/numbered-section";
import FaqTwoColumn from "@/components/sections/faq-two-column";
import CtaContact from "@/components/sections/cta-contact";

const pricingFaqs = [
  { q: "추가 비용이 발생하나요?", a: "기본 패키지에 명시된 항목 외 추가 비용은 없습니다. 추가 기능이 필요한 경우 사전에 별도 견적을 안내드립니다." },
  { q: "결제는 어떻게 하나요?", a: "계약금 50% + 완료 후 50% 방식입니다. 카드 결제와 계좌이체 모두 가능합니다." },
  { q: "환불 정책은 어떻게 되나요?", a: "착수 전 100% 환불. 착수 후에는 진행 단계에 따라 부분 환불이 가능합니다." },
  { q: "유지보수 비용은 별도인가요?", a: "플랜에 따라 무상 유지보수가 포함됩니다. 이후 유지보수는 월 정액제로 운영됩니다." },
  { q: "플랜 간 업그레이드가 가능한가요?", a: "진행 중에도 상위 플랜으로 업그레이드 가능합니다. 차액만 추가 결제하시면 됩니다." },
  { q: "제작 기간은 플랜마다 다른가요?", a: "Startup 플랜은 평균 3-5일, Business는 1-2주, Enterprise는 2-4주 소요됩니다. 프로젝트 복잡도에 따라 달라질 수 있습니다." },
];

const comparisonData = pricingComparison;

const recommendTargets = [
  {
    plan: "Startup",
    accent: "FIRST STEP.",
    targets: [
      "처음 홈페이지를 만드는 소상공인",
      "1인 브랜드·프리랜서",
      "빠르게 온라인 존재감을 확보하고 싶은 분",
      "예산이 제한적이지만 품질을 포기하고 싶지 않은 분",
    ],
  },
  {
    plan: "Business",
    accent: "GROWTH.",
    targets: [
      "기존 사이트를 전면 리모델링하려는 중소기업",
      "검색 노출과 전환율을 동시에 높이고 싶은 분",
      "CMS로 직접 콘텐츠를 관리하고 싶은 분",
      "해외 시장 진출을 준비하는 기업",
    ],
  },
  {
    plan: "Enterprise",
    accent: "TOTAL.",
    targets: [
      "브랜드 아이덴티티를 완벽히 담고 싶은 기업",
      "복잡한 기능(예약, 결제, 회원 등)이 필요한 프로젝트",
      "장기적 파트너십을 원하는 기업",
      "분양 홍보관, 대형 프로젝트를 준비하는 기업",
    ],
  },
];

export default function PricingContent() {
  const startup = plans[0];
  const business = plans[1];
  const enterprise = plans[2];

  return (
    <>
      <SubpageHero
        title="PRICING"
        label="( Plans & Pricing )"
        image="https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/hero/pen-envelope.png"
      />

      <SubNav pageLabel="PRICING MENU" items={[
        { label: "PLANS", href: "#plans" },
        { label: "INCLUDED", href: "#included" },
        { label: "COMPARE", href: "#compare" },
        { label: "FOR WHO", href: "#for-who" },
        { label: "FAQ", href: "#faq" },
      ]} />

      {/* ══════════════════════════════════════
         OPENING — Editorial Price Statement
      ══════════════════════════════════════ */}
      <section className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 py-[200px] md:py-[260px]">
        <div className="max-w-[1400px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-10 md:mb-14"
          >
            ( PRICING )
          </motion.p>

          <div className="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-20">
            {/* Left: Display type */}
            <div className="flex-1 min-w-0">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-[56px] md:text-[80px] lg:text-[120px] font-extrabold tracking-[-0.04em] leading-[0.85] text-[#111] uppercase"
              >
                STARTS
                <br />
                FROM
                <br />
                <span className="text-[#C0C0C0]">175.</span>
              </motion.h2>
            </div>

            {/* Right: Context — positioned lower */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
              className="lg:w-[35%] shrink-0 lg:pb-4"
            >
              <p className="text-[15px] md:text-[16px] font-medium leading-[1.85] text-[#111] mb-5">
                175만원부터 시작합니다.
              </p>
              <p className="text-[14px] md:text-[15px] leading-[1.85] text-[#666]">
                모든 플랜에 반응형 웹, SEO 초기 세팅, AEO 스키마 마크업이
                기본 포함됩니다. 빌더가 아닌 직접 작성한 코드.
                구글과 AI가 읽을 수 있는 구조.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         PLAN 01 — Startup: Big type left + features stacked right
      ══════════════════════════════════════ */}
      <section
        id="plans"
        className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 pb-[40px] md:pb-[60px]"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.4 }}
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-12 md:mb-16"
          >
            ( 01 — STARTUP )
          </motion.p>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Left: Plan name + price as editorial display */}
            <div className="lg:w-[55%]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-[64px] md:text-[96px] lg:text-[130px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-[#111]">
                  START
                  <br />
                  <span className="text-[#C0C0C0]">-UP.</span>
                </h3>
                <p className="text-[36px] md:text-[56px] lg:text-[72px] font-extrabold tracking-[-0.03em] leading-[1.0] text-[#111] mt-6 md:mt-10">
                  {startup.price}
                </p>
                {startup.monthlyEquivalent && (
                  <p className="text-[13px] text-[#999] mt-2 font-[family-name:var(--font-jetbrains-mono)] tracking-[0.02em]">
                    {startup.monthlyEquivalent}
                  </p>
                )}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[14px] md:text-[15px] leading-[1.85] text-[#666] mt-8 max-w-[420px]"
              >
                {startup.description} 빠르게 온라인 존재감을 확보하고,
                검색 엔진이 인식하는 구조를 처음부터 갖춥니다.
              </motion.p>
            </div>

            {/* Right: Feature list — editorial numbered style */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="lg:w-[45%] lg:pt-16"
            >
              {startup.features.map((feat, i) => (
                <motion.div
                  key={feat.name}
                  variants={fadeInUp}
                  className="flex items-start gap-6 py-5"
                  style={{ borderTop: "1px solid #ddd" }}
                >
                  <span
                    className="text-[28px] md:text-[36px] font-extrabold leading-none tabular-nums shrink-0 w-12"
                    style={{ color: feat.included ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.04)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 pt-1">
                    <span
                      className={`text-[15px] leading-[1.6] ${
                        feat.included ? "text-[#111] font-medium" : "text-[#bbb]"
                      }`}
                    >
                      {feat.name}
                    </span>
                  </div>
                  <span className={`text-[14px] mt-1 shrink-0 ${feat.included ? "text-[#10B981]" : "text-[#ccc]"}`}>
                    {feat.included ? "✓" : "—"}
                  </span>
                </motion.div>
              ))}
              <div style={{ borderTop: "1px solid #ddd" }} />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-10"
              >
                <Link
                  href={startup.ctaHref}
                  className="inline-block text-[13px] tracking-[0.04em] uppercase font-medium py-3.5 px-10 rounded-full bg-[#1a1a1a] text-white hover:bg-[#FF4D00] transition-colors duration-300"
                >
                  {startup.ctaText}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         PLAN 02 — Business: Dark full-width spread, recommended
      ══════════════════════════════════════ */}
      <section
        className="px-5 md:px-12 lg:px-20 py-[160px] md:py-[220px]"
        style={{ backgroundColor: "#111" }}
        data-theme="dark"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Header row: label left, recommend badge */}
          <div className="flex items-center justify-between mb-12 md:mb-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.4 }}
              className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#555]"
            >
              ( 02 — BUSINESS )
            </motion.p>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportConfig}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-[11px] tracking-[0.08em] uppercase bg-[#FF4D00] text-white px-4 py-1.5 rounded-full font-[family-name:var(--font-jetbrains-mono)]"
            >
              추천
            </motion.span>
          </div>

          {/* Overlapping editorial layout */}
          <div className="relative">
            {/* Giant display type */}
            <motion.h3
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[72px] md:text-[110px] lg:text-[160px] font-extrabold tracking-[-0.04em] leading-[0.82] uppercase text-white"
            >
              BUSI
              <br />
              <span style={{ color: "#C0C0C0" }}>-NESS.</span>
            </motion.h3>

            {/* Price overlapping from right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
              className="lg:absolute lg:right-0 lg:top-[20%] mt-10 lg:mt-0 lg:text-right"
            >
              <p className="text-[48px] md:text-[72px] lg:text-[96px] font-extrabold tracking-[-0.03em] leading-[1.0] text-white">
                {business.price}
              </p>
              {business.monthlyEquivalent && (
                <p className="text-[13px] text-[#555] mt-2 font-[family-name:var(--font-jetbrains-mono)] tracking-[0.02em]">
                  {business.monthlyEquivalent}
                </p>
              )}
            </motion.div>
          </div>

          {/* Body + Features — two column below */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mt-16 md:mt-24">
            {/* Left: Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:w-[40%]"
            >
              <p className="text-[15px] md:text-[16px] font-medium leading-[1.85] text-white/80 mb-5">
                {business.description}
              </p>
              <p className="text-[14px] md:text-[15px] leading-[1.85] text-white/40">
                CMS, 맞춤 애니메이션, 고급 SEO 최적화까지.
                성장하는 비즈니스에 필요한 모든 것을 하나의 프로젝트에 담습니다.
              </p>
            </motion.div>

            {/* Right: Feature list */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="lg:w-[60%]"
            >
              {business.features.map((feat, i) => (
                <motion.div
                  key={feat.name}
                  variants={fadeInUp}
                  className="flex items-start gap-6 py-5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <span
                    className="text-[28px] md:text-[36px] font-extrabold leading-none tabular-nums shrink-0 w-12"
                    style={{ color: feat.included ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 pt-1">
                    <span
                      className={`text-[15px] leading-[1.6] ${
                        feat.included ? "text-white/80 font-medium" : "text-white/25"
                      }`}
                    >
                      {feat.name}
                    </span>
                  </div>
                  <span className={`text-[14px] mt-1 shrink-0 ${feat.included ? "text-[#10B981]" : "text-white/15"}`}>
                    {feat.included ? "✓" : "—"}
                  </span>
                </motion.div>
              ))}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }} />
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-14 md:mt-20"
          >
            <Link
              href={business.ctaHref}
              className="inline-block text-[13px] tracking-[0.04em] uppercase font-medium py-3.5 px-10 rounded-full bg-white text-[#1a1a1a] hover:bg-[#FF4D00] hover:text-white transition-colors duration-300"
            >
              {business.ctaText}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         PLAN 03 — Enterprise: Right-aligned type + left features
      ══════════════════════════════════════ */}
      <section
        className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 py-[160px] md:py-[220px]"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.4 }}
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-12 md:mb-16 text-right"
          >
            ( 03 — ENTERPRISE )
          </motion.p>

          {/* Right-aligned giant type */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
            className="text-right"
          >
            <h3 className="text-[56px] md:text-[90px] lg:text-[130px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-[#111]">
              ENTER
              <br />
              <span className="text-[#C0C0C0]">-PRISE.</span>
            </h3>
            <p className="text-[36px] md:text-[56px] lg:text-[72px] font-extrabold tracking-[-0.03em] leading-[1.0] text-[#111] mt-6 md:mt-10">
              {enterprise.price}
            </p>
            {enterprise.monthlyEquivalent && (
              <p className="text-[13px] text-[#999] mt-2 font-[family-name:var(--font-jetbrains-mono)] tracking-[0.02em]">
                {enterprise.monthlyEquivalent}
              </p>
            )}
          </motion.div>

          {/* Reversed layout: features left, description right */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mt-16 md:mt-24">
            {/* Left: Feature list */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="lg:w-[55%]"
            >
              {enterprise.features.map((feat, i) => (
                <motion.div
                  key={feat.name}
                  variants={fadeInUp}
                  className="flex items-start gap-6 py-5"
                  style={{ borderTop: "1px solid #ddd" }}
                >
                  <span
                    className="text-[28px] md:text-[36px] font-extrabold leading-none tabular-nums shrink-0 w-12"
                    style={{ color: feat.included ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.04)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 pt-1">
                    <span className="text-[15px] leading-[1.6] text-[#111] font-medium">
                      {feat.name}
                    </span>
                  </div>
                  <span className="text-[14px] mt-1 shrink-0 text-[#10B981]">✓</span>
                </motion.div>
              ))}
              <div style={{ borderTop: "1px solid #ddd" }} />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-10"
              >
                <Link
                  href={enterprise.ctaHref}
                  className="inline-block text-[13px] tracking-[0.04em] uppercase font-medium py-3.5 px-10 rounded-full bg-[#1a1a1a] text-white hover:bg-[#FF4D00] transition-colors duration-300"
                >
                  {enterprise.ctaText}
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Description — aligned bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:w-[45%] flex flex-col justify-end lg:pb-8"
            >
              <p className="text-[15px] md:text-[16px] font-medium leading-[1.85] text-[#111] mb-5">
                {enterprise.description}
              </p>
              <p className="text-[14px] md:text-[15px] leading-[1.85] text-[#666]">
                반응형 무제한, 맞춤 애니메이션, CMS, 고급 SEO,
                6개월 유지보수까지. 브랜드의 본질을 코드 레벨에서
                완성하는 프리미엄 솔루션.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         INCLUDED IN ALL
      ══════════════════════════════════════ */}
      <div id="included">
        <NumberedSection
          label="( INCLUDED IN ALL )"
          heading={"EVERY PROJECT\nINCLUDES."}
          subheading="모든 프로젝트에 기본 포함됩니다."
          items={[
            { title: "반응형 웹 디자인", description: "모든 디바이스에서 완벽하게 작동하는 반응형 설계. 데스크톱, 태블릿, 모바일 최적화." },
            { title: "SEO 초기 세팅", description: "메타 태그, 사이트맵, robots.txt, 시맨틱 HTML 구조 기본 포함." },
            { title: "AEO 스키마 마크업", description: "Organization, FAQPage, BreadcrumbList 스키마와 llms.txt를 코드 레벨에서 직접 작성." },
            { title: "구조화 데이터", description: "구글 리치 결과에 노출될 수 있도록 페이지별 구조화 데이터 설계." },
            { title: "사이트맵 & robots.txt", description: "검색 엔진이 사이트를 정확히 크롤링할 수 있도록 자동 생성." },
            { title: "llms.txt", description: "2026년 신규 표준. AI 검색 엔진이 사이트를 인식할 수 있도록 설정." },
          ]}
          dark
        />
      </div>

      {/* ══════════════════════════════════════
         COMPARISON — Editorial vs Table
      ══════════════════════════════════════ */}
      <section
        id="compare"
        className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 py-[160px] md:py-[220px]"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Header: label + big type */}
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
              WHY
              <br />
              <span className="text-[#C0C0C0]">CHIRO.</span>
            </motion.h2>
          </div>

          {/* Comparison rows — editorial style, not table */}
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
                {/* Feature name */}
                <span className="text-[15px] md:text-[16px] font-medium text-[#111]">
                  {item.feature}
                </span>

                {/* Others */}
                <span className="text-[13px] text-[#999] md:text-center">
                  <span className="md:hidden font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.08em] uppercase text-[#bbb] mr-3">일반</span>
                  {item.others}
                </span>

                {/* Chiro — highlighted */}
                <span className="text-[14px] font-medium text-[#111] md:text-right">
                  <span className="md:hidden font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.08em] uppercase text-[#bbb] mr-3">치로</span>
                  {item.chiro}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Column labels — desktop only */}
          <div className="hidden md:grid grid-cols-[1fr_1fr_1fr] gap-8 mt-6">
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.08em] uppercase text-[#bbb]">
              기능
            </span>
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.08em] uppercase text-[#bbb] text-center">
              일반 에이전시
            </span>
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.08em] uppercase text-[#111] text-right font-medium">
              치로웹디자인
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         FOR WHO — Editorial staggered layout
      ══════════════════════════════════════ */}
      <section
        id="for-who"
        className="px-5 md:px-12 lg:px-20 py-[160px] md:py-[220px]"
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
            ( RECOMMENDED FOR )
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
            className="text-[48px] md:text-[72px] lg:text-[96px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-white mb-20 md:mb-28"
          >
            WHO IS
            <br />
            IT <span style={{ color: "#C0C0C0" }}>FOR.</span>
          </motion.h2>

          {/* Staggered recommend blocks — each with different offset */}
          <div className="space-y-20 md:space-y-28">
            {recommendTargets.map((group, gi) => {
              // Alternating alignment: left, right-offset, left
              const isOffset = gi === 1;

              return (
                <motion.div
                  key={group.plan}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.6 }}
                  className={isOffset ? "lg:ml-auto lg:w-[65%]" : "lg:w-[65%]"}
                >
                  {/* Plan label + accent */}
                  <div className="flex items-end gap-6 mb-8">
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#555]">
                      ( {String(gi + 1).padStart(2, "0")} )
                    </span>
                    <h3 className="text-[32px] md:text-[48px] lg:text-[64px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-white">
                      {group.plan}
                      <span className="text-[#C0C0C0] ml-2 md:ml-4">{group.accent}</span>
                    </h3>
                  </div>

                  {/* Target list */}
                  <div className="space-y-0">
                    {group.targets.map((t) => (
                      <div
                        key={t}
                        className="flex items-start gap-4 py-4"
                        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        <span className="text-[#555] mt-1.5 text-[8px] shrink-0">●</span>
                        <span className="text-[14px] md:text-[15px] text-white/50 leading-[1.8]">{t}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         FAQ
      ══════════════════════════════════════ */}
      <div id="faq">
        <FaqTwoColumn faqs={pricingFaqs} />
      </div>

      {/* ══════════════════════════════════════
         CTA
      ══════════════════════════════════════ */}
      <CtaContact />
    </>
  );
}
