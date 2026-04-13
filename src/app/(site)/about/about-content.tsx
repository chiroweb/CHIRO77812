"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SubpageHero from "@/components/sections/subpage-hero";
import SubNav from "@/components/ui/sub-nav";
import FaqTwoColumn from "@/components/sections/faq-two-column";
import CtaContact from "@/components/sections/cta-contact";

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
    "심리학 전공 디렉터. 기획부터 디자인, 개발, SEO/AEO 최적화까지 1인 전담으로 진행하는 AEO 자동화 웹 에이전시 치로웹디자인의 창립자.",
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
    year: "2024",
    tags: ["Foundation"],
    desc: "치로웹디자인 설립. 심리학 전공 디렉터의 1인 웹 에이전시로 시작.",
  },
  {
    year: "2024",
    tags: ["Launch", "Brand"],
    desc: "첫 클라이언트 프로젝트 완료. 골프 악세서리 브랜드 치로골프 런칭.",
  },
  {
    year: "2025",
    tags: ["Enterprise", "B2B"],
    desc: "해외 호텔 브랜드 계열사 프로젝트 수주. 중견 제조사 NBPKOREA 사이트 구축.",
  },
  {
    year: "2025",
    tags: ["Real Estate", "B2B"],
    desc: "아파트 분양 홍보관 프로젝트 진행. B2B 환경 기업 사이트 구축.",
  },
  {
    year: "2026",
    tags: ["SEO/AEO", "AI"],
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
    a: "치로웹디자인은 심리학 전공 디렉터가 이끄는 1인 AEO 자동화 웹 에이전시입니다. 기획부터 디자인, 개발, SEO/AEO 최적화까지 하나의 팀에서 완성합니다.",
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
        image="https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/hero/architecture-dark.png"
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

            {/* Right: Image placeholder — smaller, positioned lower */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.15,
              }}
              className="w-full lg:w-[30%] shrink-0 lg:mt-[160px]"
            >
              <div className="w-full aspect-[4/5] rounded-lg overflow-hidden">
                <img src="https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/about/mission-desk.png" alt="치로웹디자인 미션 — 비즈니스를 위한 아름다운 웹사이트" className="w-full h-full object-cover rounded-lg" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DIRECTOR ── */}
      <section
        id="director"
        className="py-[100px] md:py-[140px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#f5f5f0" }}

      >
        <div className="max-w-[1400px] mx-auto">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase mb-12 md:mb-16"
            style={{ color: "#999" }}
          >
            ( DIRECTOR )
          </motion.p>

          {/* Editorial layout: image left + title overlapping + body right */}
          <div className="relative">
            {/* Two-column: image left, body text right */}
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
              {/* Left: Image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative z-0 w-full lg:w-[38%] shrink-0"
              >
                <div className="w-full aspect-[3/4] rounded-lg overflow-hidden">
                  <img src="https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/about/director-profile.png" alt="최정원 디렉터 프로필" className="w-full h-full object-cover rounded-lg" />
                </div>
              </motion.div>

              {/* Right: Body text — vertically centered to bottom half of image */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="flex-1 flex flex-col justify-end lg:pb-8"
              >
                <motion.p
                  variants={fadeInUp}
                  className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase mb-6"
                  style={{ color: "#999" }}
                >
                  ( MESSAGE )
                </motion.p>

                <motion.div className="space-y-5 mb-12">
                  <motion.p
                    variants={fadeInUp}
                    className="text-[14px] md:text-[15px] leading-[1.85]"
                    style={{ color: "#666" }}
                  >
                    저는 심리학을 전공했습니다. 사람이 왜 특정 버튼을 누르는지,
                    왜 특정 페이지에서 떠나는지를 연구했습니다. 그 지식을
                    웹사이트 설계에 직접 적용합니다.
                  </motion.p>
                  <motion.p
                    variants={fadeInUp}
                    className="text-[14px] md:text-[15px] leading-[1.85]"
                    style={{ color: "#666" }}
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
                  style={{ borderTop: "1px solid #ddd" }}
                >
                  <p className="text-[20px] md:text-[24px] font-semibold text-[#111] leading-[1.2] mb-1">
                    최정원
                  </p>
                  <p
                    className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase"
                    style={{ color: "#999" }}
                  >
                    Creative Director & Founder
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Title — overlaps image top-right, editorial style */}
            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
              className="absolute top-[18%] md:top-[12%] left-[35%] md:left-[28%] z-10 text-[48px] md:text-[80px] lg:text-[110px] xl:text-[130px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-[#111] bg-[#f5f5f0] px-5 md:px-8 py-4 md:py-6"
            >
              DIRECTOR
              <br />
              MESSAGE
            </motion.h2>
          </div>
        </div>
      </section>

      {/* ── VALUES — Editorial Magazine Layout ── */}
      <section
        id="values"
        className="py-[120px] md:py-[160px] px-5 md:px-12 lg:px-20"
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
            ( VALUES )
          </motion.p>

          {/* Value 01 — full-width big type + image right */}
          <div className="relative mb-32 md:mb-40">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6 }}
              className="text-[56px] md:text-[90px] lg:text-[120px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-[#111]"
            >
              PSYCHOLOGY
              <br />
              <span className="text-[#C0C0C0]">DRIVEN.</span>
            </motion.h3>
            <div className="flex flex-col lg:flex-row lg:items-end gap-8 mt-10 lg:mt-[-60px]">
              <div className="lg:w-[45%]" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:w-[25%]"
              >
                <div className="w-full aspect-[4/5] rounded-lg overflow-hidden">
                  <img src="https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/about/ux-wireframe.png" alt="심리학 기반 UX 와이어프레임 설계" className="w-full h-full object-cover rounded-lg" />
                </div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:w-[30%] text-[14px] md:text-[15px] leading-[1.85] text-[#666] lg:pb-4"
              >
                {valuesItems[0].description}
              </motion.p>
            </div>
          </div>

          {/* Value 02 — image left, big type right */}
          <div className="relative mb-32 md:mb-40">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.6 }}
                className="lg:w-[35%] shrink-0"
              >
                <div className="w-full aspect-[3/4] rounded-lg overflow-hidden">
                  <img src="https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/about/code-editor.png" alt="코드 레벨 개발 환경" className="w-full h-full object-cover rounded-lg" />
                </div>
              </motion.div>
              <div className="flex-1 lg:pt-12">
                <motion.h3
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-[48px] md:text-[72px] lg:text-[100px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-[#111] mb-8"
                >
                  CODE
                  <br />
                  <span className="text-[#C0C0C0]">LEVEL.</span>
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-[14px] md:text-[15px] leading-[1.85] text-[#666] max-w-[440px]"
                >
                  {valuesItems[1].description}
                </motion.p>
              </div>
            </div>
          </div>

          {/* Value 03 — right-aligned big type + image bottom-left overlap */}
          <div className="relative">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6 }}
              className="text-right text-[48px] md:text-[72px] lg:text-[100px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-[#111]"
            >
              ALL-IN
              <br />
              <span className="text-[#C0C0C0]">-ONE.</span>
            </motion.h3>
            <div className="flex flex-col lg:flex-row gap-8 mt-10 lg:mt-[-40px] items-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:w-[30%]"
              >
                <div className="w-full aspect-[5/4] rounded-lg overflow-hidden">
                  <img src="https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/about/workspace-sketch.png" alt="올인원 워크스페이스 스케치" className="w-full h-full object-cover rounded-lg" />
                </div>
              </motion.div>
              <div className="flex-1" />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:w-[35%] text-[14px] md:text-[15px] leading-[1.85] text-[#666] text-right"
              >
                {valuesItems[2].description}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HISTORY — Editorial Timeline ── */}
      <section
        id="history"
        className="py-[120px] md:py-[160px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#111" }}
        data-theme="dark"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Header row: label left, big type right */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20 md:mb-28">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.4 }}
              className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#555]"
            >
              ( HISTORY )
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6 }}
              className="text-[48px] md:text-[72px] lg:text-[96px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-white text-right"
            >
              OUR
              <br />
              <span style={{ color: "#C0C0C0" }}>JOURNEY.</span>
            </motion.h2>
          </div>

          {/* Timeline rows with tags */}
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
                className="grid grid-cols-1 md:grid-cols-[100px_1fr_1fr] gap-4 md:gap-8 py-8 md:py-10 items-start"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
              >
                {/* Year */}
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[28px] md:text-[36px] font-bold text-white tracking-[-0.02em]">
                  {item.year}
                </span>

                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap md:pt-3">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-[11px] font-medium tracking-[0.04em] uppercase"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-[14px] md:text-[15px] leading-[1.8] text-[#888] md:text-right md:pt-3">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ── COMPANY — Editorial Split ── */}
      <section
        id="company"
        className="py-[120px] md:py-[160px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#f5f5f0" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Left: Big type + image */}
            <div className="lg:w-[50%]">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.4 }}
                className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-6"
              >
                ( COMPANY )
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.6 }}
                className="text-[48px] md:text-[64px] lg:text-[80px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-[#111] mb-12"
              >
                CHIRO
                <br />
                <span className="text-[#C0C0C0]">WEB.</span>
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-full aspect-[16/9] rounded-lg overflow-hidden">
                  <img src="https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/about/office-night.png" alt="치로웹디자인 오피스 야경" className="w-full h-full object-cover rounded-lg" />
                </div>
              </motion.div>
            </div>

            {/* Right: Company info — staggered card style */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="lg:w-[50%] lg:pt-20"
            >
              {companyInfo.map((row, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex items-start gap-8 md:gap-12 py-5"
                  style={{ borderBottom: "1px solid #ddd" }}
                >
                  <span
                    className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.06em] uppercase w-[70px] md:w-[80px] shrink-0 pt-[3px]"
                    style={{ color: "#999" }}
                  >
                    {row.label}
                  </span>
                  <span className="text-[15px] md:text-[16px] leading-[1.6] text-[#111] font-medium">
                    {row.value}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FaqTwoColumn faqs={aboutFaqs} sectionLabel="( FAQ )" />

      {/* ── CTA ── */}
      <CtaContact />
    </>
  );
}
