"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SubpageHero from "@/components/sections/subpage-hero";
import SubNav from "@/components/ui/sub-nav";
import NumberedSection from "@/components/sections/numbered-section";
import StatsRow from "@/components/sections/stats-row";
import FaqTwoColumn from "@/components/sections/faq-two-column";
import ContactCtaSection from "@/components/sections/contact-cta-section";

/* ─────────────────────────────────────
   JSON-LD — Person Schema
───────────────────────────────────── */

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://chiroweb.co.kr/#director",
  name: "최정원",
  jobTitle: "Creative Director & Founder",
  worksFor: {
    "@type": "Organization",
    "@id": "https://chiroweb.co.kr/#organization",
    name: "치로웹디자인",
  },
  description:
    "심리학 전공 디렉터. 기획부터 디자인, 개발, SEO/AEO 최적화까지 1인 전담으로 진행하는 올인원 웹 에이전시 치로웹디자인의 창립자.",
  url: "https://chiroweb.co.kr/about",
};

/* ─────────────────────────────────────
   Data
───────────────────────────────────── */

const subNavItems = [
  { label: "MISSION", href: "#mission" },
  { label: "DIRECTOR", href: "#director" },
  { label: "VALUES", href: "#values" },
  { label: "HISTORY", href: "#history" },
  { label: "COMPANY", href: "#company" },
];

const valuesItems = [
  {
    title: "심리학 기반 설계",
    description:
      "방문자의 시선, 클릭, 의사결정을 데이터와 인지 심리학에 기반해 설계합니다. '왜 이 버튼이 여기 있어야 하는지' 설명할 수 있습니다.",
  },
  {
    title: "코드 레벨 구현",
    description:
      "빌더나 템플릿이 아닌 직접 작성한 코드. SEO/AEO 구조를 코드 레벨에서 설계하여 구글, ChatGPT, Perplexity가 읽을 수 있는 사이트를 만듭니다.",
  },
  {
    title: "올인원 솔루션",
    description:
      "기획, 디자인, 개발, 검색 최적화를 하나의 팀에서 완성합니다. 여러 업체에 흩어져 있던 모든 과정을 치로가 책임집니다.",
  },
];

const historyItems = [
  {
    year: "( 2024 )",
    desc: "치로웹디자인 설립. 심리학 전공 디렉터의 1인 웹 에이전시로 시작.",
  },
  {
    year: "( 2024 )",
    desc: "첫 클라이언트 프로젝트 완료. 골프 악세서리 브랜드 치로골프 런칭.",
  },
  {
    year: "( 2025 )",
    desc: "해외 호텔 브랜드 계열사 프로젝트 수주. 중견 제조사 NBPKOREA 사이트 구축.",
  },
  {
    year: "( 2025 )",
    desc: "아파트 분양 홍보관 프로젝트 진행. B2B 환경 기업 사이트 구축.",
  },
  {
    year: "( 2026 )",
    desc: "SEO/AEO 자동화 시스템 고도화. llms.txt 표준 조기 도입.",
  },
];

const companyInfo = [
  { label: "상호", value: "치로웹디자인" },
  { label: "대표", value: "최정원" },
  { label: "설립", value: "2024년" },
  { label: "소재지", value: "대한민국 서울" },
  { label: "이메일", value: "chiroweb75@gmail.com" },
  { label: "전화", value: "010-6816-0775" },
  { label: "서비스", value: "웹사이트 제작 · 리모델링 · SEO/AEO 최적화" },
];

const statsItems = [
  { label: "런칭 후 수주 기간", value: "4개월" },
  { label: "클라이언트 추가 의뢰율", value: "43%" },
  { label: "평균 제작 기간", value: "2주" },
  { label: "기본 포함 SEO 항목", value: "12+" },
];

const aboutFaqs = [
  {
    q: "치로웹디자인은 어떤 회사인가요?",
    a: "치로웹디자인은 심리학 전공 디렉터가 이끄는 1인 올인원 웹 에이전시입니다. 기획부터 디자인, 개발, SEO/AEO 최적화까지 하나의 팀에서 완성합니다.",
  },
  {
    q: "빌더(아임웹, 카페24)와 어떻게 다른가요?",
    a: "치로는 빌더를 사용하지 않습니다. 모든 코드를 직접 작성합니다. 그래야만 가능한 속도, 구조, SEO 최적화가 있기 때문입니다. 구조화 데이터, llms.txt 같은 핵심 요소는 빌더로 구현할 수 없습니다.",
  },
  {
    q: "1인 에이전시인데 품질이 괜찮나요?",
    a: "기획부터 개발까지 한 사람이 일관되게 진행하기 때문에 커뮤니케이션 비용이 없고 품질이 균일합니다. 해외 호텔 브랜드 계열사 프로젝트도 수행한 실력을 보유하고 있습니다.",
  },
  {
    q: "심리학 기반 설계란 무엇인가요?",
    a: "방문자가 어디를 보고, 무엇을 클릭하고, 언제 결정하는지를 인지 심리학 원리에 기반해 설계합니다. 단순히 예쁜 디자인이 아닌, 전환율을 높이는 구조적 설계입니다.",
  },
  {
    q: "SEO/AEO 최적화는 어떻게 포함되나요?",
    a: "모든 프로젝트에 SEO/AEO 기본 세팅이 포함됩니다. 구조화 데이터(JSON-LD), 시맨틱 HTML, 메타태그, 사이트맵, llms.txt 12개 이상의 항목이 추가 비용 없이 적용됩니다.",
  },
  {
    q: "제작 기간은 얼마나 걸리나요?",
    a: "평균 2주. 프로젝트 규모에 따라 달라지지만, 효율적인 1인 체계 덕분에 대형 에이전시보다 빠르게 진행됩니다. 상담 후 정확한 일정을 안내해 드립니다.",
  },
];

/* ─────────────────────────────────────
   Component
───────────────────────────────────── */

export default function AboutContent() {
  return (
    <>
      {/* Person JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* ── Hero ── */}
      <SubpageHero
        title="ABOUT"
        label="( About CHIRO )"
      />

      {/* ── SubNav ── */}
      <SubNav pageLabel="ABOUT MENU" items={subNavItems} />

      {/* ── MISSION ── */}
      <section
        id="mission"
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
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-10 md:mb-14"
          >
            ( MISSION )
          </motion.p>

          {/* Main content: giant text left + image right */}
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
                BEAUTIFULLY
                <br />
                FOR THE
                <br />
                BUSINESS.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
                className="text-[14px] md:text-[15px] mt-4 mb-10 md:mb-14"
                style={{ color: "#999" }}
              >
                당신의 비즈니스를 위한 아름다움.
              </motion.p>

              {/* Body paragraphs */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="space-y-5 max-w-[520px]"
              >
                <motion.p
                  variants={fadeInUp}
                  className="text-[15px] md:text-[16px] font-medium leading-[1.85] text-[#111]"
                >
                  치로웹디자인은 &lsquo;예쁜 홈페이지&rsquo;를 만드는 회사가
                  아닙니다.
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  className="text-[14px] md:text-[15px] leading-[1.85] text-[#666]"
                >
                  방문자가 어디를 보고, 무엇을 클릭하고, 언제 결정하는지 —
                  그 모든 과정을 심리학 원리에 기반해 설계합니다. 디자인은 그
                  설계를 시각화하는 마지막 단계입니다.
                </motion.p>
              </motion.div>
            </div>

            {/* Right: Image placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.15,
              }}
              className="w-full lg:w-[38%] shrink-0"
            >
              <div
                className="w-full aspect-[3/4] rounded-lg"
                style={{ backgroundColor: "#ddd" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DIRECTOR ── */}
      <section
        id="director"
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
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase mb-12 md:mb-16"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            ( DIRECTOR )
          </motion.p>

          {/* Content: image left + text right */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            {/* Left: image placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full lg:w-[40%] shrink-0"
            >
              <div
                className="w-full aspect-[3/4] rounded-lg"
                style={{ backgroundColor: "#2a2a2a" }}
              />
            </motion.div>

            {/* Right: message */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="flex-1 min-w-0 flex flex-col justify-center"
            >
              <motion.p
                variants={fadeInUp}
                className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase mb-6"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                ( MESSAGE )
              </motion.p>

              <motion.h2
                variants={fadeInUp}
                className="text-[36px] md:text-[56px] lg:text-[72px] font-extrabold tracking-[-0.03em] leading-[0.95] uppercase text-white mb-4"
              >
                DIRECTOR
                <br />
                MESSAGE
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-[14px] md:text-[15px] mt-4 mb-10 md:mb-14"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                디렉터 메시지
              </motion.p>

              <motion.div
                variants={staggerContainer}
                className="space-y-5 mb-12"
              >
                <motion.p
                  variants={fadeInUp}
                  className="text-[14px] md:text-[15px] leading-[1.85]"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  저는 심리학을 전공했습니다. 사람이 왜 특정 버튼을 누르는지,
                  왜 특정 페이지에서 떠나는지를 연구했습니다. 그 지식을
                  웹사이트 설계에 직접 적용합니다.
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  className="text-[14px] md:text-[15px] leading-[1.85]"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  치로는 빌더를 사용하지 않습니다. 모든 코드를 직접 작성합니다.
                  그래야만 가능한 구조와 속도와 최적화가 있기 때문입니다.
                  기획부터 디자인, 개발, 검색 최적화까지 — 하나의 팀에서
                  처음부터 끝까지.
                </motion.p>
              </motion.div>

              {/* Name block */}
              <motion.div
                variants={fadeInUp}
                className="pt-8"
                style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
              >
                <p className="text-[20px] md:text-[24px] font-semibold text-white leading-[1.2] mb-1">
                  최정원
                </p>
                <p
                  className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Creative Director & Founder
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <div id="values">
        <NumberedSection
          label="( VALUES )"
          heading="CORE VALUES."
          subheading="핵심 가치"
          items={valuesItems}
          dark={true}
        />
      </div>

      {/* ── HISTORY ── */}
      <section
        id="history"
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
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-6"
          >
            ( HISTORY )
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.05 }}
            className="text-[14px] md:text-[15px] mt-4 mb-12 md:mb-16"
            style={{ color: "#999" }}
          >
            치로웹디자인의 역사
          </motion.p>

          {/* Timeline rows */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {historyItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-12 md:gap-20 py-8 md:py-10"
                style={{ borderBottom: "1px solid #ddd" }}
              >
                {/* Year */}
                <span
                  className="font-[family-name:var(--font-jetbrains-mono)] text-[13px] tracking-[0.06em] text-[#999] shrink-0 sm:w-[120px] md:w-[160px] pt-[2px]"
                >
                  {item.year}
                </span>
                {/* Description */}
                <p className="text-[14px] md:text-[15px] leading-[1.8] text-[#333] flex-1">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS ROW ── */}
      <StatsRow stats={statsItems} />

      {/* ── COMPANY ── */}
      <section
        id="company"
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
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase mb-6"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            ( COMPANY )
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.05 }}
            className="text-[14px] md:text-[15px] mt-4 mb-12 md:mb-16"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            회사 정보
          </motion.p>

          {/* Key-value table */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="max-w-[720px]"
          >
            {companyInfo.map((row, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex items-start gap-8 md:gap-16 py-5"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  borderTop:
                    i === 0 ? "1px solid rgba(255,255,255,0.08)" : undefined,
                }}
              >
                <span
                  className="text-[13px] w-[80px] md:w-[100px] shrink-0 pt-[1px]"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {row.label}
                </span>
                <span
                  className="text-[15px] leading-[1.6]"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  {row.value}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FaqTwoColumn faqs={aboutFaqs} sectionLabel="( FAQ )" />

      {/* ── CTA ── */}
      <ContactCtaSection />
    </>
  );
}
