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
  "@id": "https://chiroweb.co.kr/services/website#service",
  name: "홈페이지 제작",
  description:
    "심리학 기반 설계 + 코드 레벨 구현. 반응형 웹, SEO/AEO 기본 세팅 포함. 빌더가 아닌 직접 작성한 코드.",
  provider: {
    "@type": "Organization",
    "@id": "https://chiroweb.co.kr/#organization",
    name: "치로웹디자인",
  },
  serviceType: "Web Design",
  areaServed: { "@type": "Country", name: "KR" },
  url: "https://chiroweb.co.kr/services/website",
};

/* ─────────────────────────────────────
   Data
───────────────────────────────────── */

const subNavItems = [
  { label: "ABOUT", href: "#about" },
  { label: "TYPES", href: "#types" },
  { label: "INCLUDED", href: "#included" },
  { label: "PROCESS", href: "#process" },
  { label: "REVIEWS", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

const faqs = [
  {
    q: "정적 페이지와 CMS 연동, 어느 쪽이 맞나요?",
    a: "회사 소개·서비스처럼 변경이 적은 페이지는 정적으로 만들고, 블로그·포트폴리오처럼 자주 업데이트되는 영역에만 CMS를 붙입니다. 모든 페이지에 CMS를 깔면 속도가 떨어지고, 운영 권한이 너무 넓어져 실수도 잦아집니다.",
  },
  {
    q: "디자인 시안을 따로 받나요?",
    a: "아닙니다. 실시간 빌드 링크로 실제 작동하는 웹사이트를 보면서 피드백을 주실 수 있습니다. 정적 시안이 아닌 살아있는 결과물로 확인합니다.",
  },
  {
    q: "기존 도메인과 콘텐츠를 그대로 옮길 수 있나요?",
    a: "가능합니다. 도메인은 네임서버만 옮기면 되고, 기존 URL은 301 리다이렉트로 새 구조에 매핑합니다. 이렇게 해야 기존에 쌓인 검색 자산(색인·백링크)이 보존됩니다.",
  },
  {
    q: "관리자 페이지에서 어디까지 직접 수정할 수 있나요?",
    a: "블로그 글, 포트폴리오, 후기, 공지, 가격 텍스트, 메인 이미지까지 직접 수정 가능합니다. 레이아웃 자체를 바꾸는 작업만 코드 수준에서 다룹니다. 어드민은 코드를 모르셔도 쓸 수 있게 설계됩니다.",
  },
  {
    q: "반응형 한 벌이 아니라 PC·모바일 따로 만드는 게 좋지 않나요?",
    a: "치로는 반응형 한 벌로 만듭니다. PC·모바일을 분리하면 검색 자산이 둘로 쪼개지고 유지보수 비용이 두 배가 됩니다. 같은 코드에서 화면 폭에 따라 레이아웃을 다르게 보이도록 설계합니다.",
  },
  {
    q: "이미지·영상 같은 미디어 파일은 어디에 보관되나요?",
    a: "Vercel Blob 또는 AWS S3 같은 외부 스토리지에 분리 보관합니다. 호스팅 비용이 절감되고, 이미지가 다른 도메인에서 캐시 처리돼 속도가 빨라집니다. CDN은 기본으로 적용됩니다.",
  },
  {
    q: "SEO/AEO가 기본 포함인가요?",
    a: "네. 모든 프로젝트에 SEO/AEO 기본 세팅이 포함됩니다. 구조화 데이터, 시맨틱 HTML, 메타태그, 사이트맵, llms.txt 등 12개 이상의 항목이 추가 비용 없이 적용됩니다.",
  },
  {
    q: "Google Analytics·Meta·카카오 추적 코드는 어디서 심나요?",
    a: "관리자 설정 영역에 ID만 입력하면 전 페이지에 자동 삽입됩니다. 헤드 태그에 직접 코드를 붙이지 않아도 되고, 추적 코드를 교체할 때 개발자 도움 없이 즉시 반영됩니다.",
  },
];

/* ─────────────────────────────────────
   Component
───────────────────────────────────── */

export default function WebsiteContent() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* ── Hero ── */}
      <SubpageHero
        title="WEB DESIGN"
        label="( Website Development )"
        image="https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/hero/code-closeup.png"
      />

      {/* ── SubNav ── */}
      <SubNav pageLabel="WEBSITE MENU" items={subNavItems} />

      {/* ══════════════════════════════════════
         01. OPENING — 무엇을 만드는가
         Editorial: 거대 타이포 좌 + 우측 하단 컨텍스트
      ══════════════════════════════════════ */}
      <section
        id="about"
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
            ( WHAT WE BUILD )
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
                NOT JUST
                <br />
                PRETTY
                <br />
                <span className="text-[#C0C0C0]">SITES.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[14px] md:text-[15px] mt-4"
                style={{ color: "#999" }}
              >
                예쁜 홈페이지가 아닌, 일하는 홈페이지.
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
                  방문자의 행동을 설계하고, 검색 엔진과 AI가 읽을 수 있는
                  구조를 코드 레벨에서 직접 구현합니다.
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  className="text-[14px] md:text-[15px] leading-[1.85] text-[#666]"
                >
                  빌더나 템플릿이 아닌 직접 작성한 코드. 심리학 기반 전환 구조.
                  반응형 디자인, SEO/AEO 기본 세팅, 실시간 빌드 링크까지 —
                  하나의 프로젝트에 모든 것이 포함됩니다.
                </motion.p>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-wrap gap-x-16 gap-y-8 mt-24 md:mt-32 pt-12"
            style={{ borderTop: "1px solid #ddd" }}
          >
            {[
              { value: "175만원~", label: "시작 가격" },
              { value: "2주", label: "평균 제작 기간" },
              { value: "12+", label: "기본 SEO/AEO 항목" },
              { value: "무제한", label: "수정 횟수" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <span className="text-[32px] md:text-[48px] font-extrabold tracking-[-0.03em] leading-[1.0] text-[#111]">
                  {stat.value}
                </span>
                <p className="text-[11px] text-[#999] mt-1 tracking-[0.04em] uppercase font-[family-name:var(--font-jetbrains-mono)]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         02. TYPES — 제작 유형
         Editorial: 대형 타이포 + 번호별 교차 오프셋
      ══════════════════════════════════════ */}
      <section
        id="types"
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
              ( TYPES )
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6 }}
              className="text-[48px] md:text-[72px] lg:text-[96px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-white lg:text-right"
            >
              WHAT WE
              <br />
              <span style={{ color: "#C0C0C0" }}>BUILD.</span>
            </motion.h2>
          </div>

          <div className="space-y-20 md:space-y-28">
            {[
              {
                num: "01",
                title: "기업 소개 사이트",
                body: "B2B 제조사, 서비스 기업의 신뢰를 구축하는 사이트. 회사 소개, 서비스, 포트폴리오를 체계적으로 구성합니다. 검색 엔진과 AI가 비즈니스 정보를 정확히 인식하도록 구조화 데이터를 설계합니다.",
              },
              {
                num: "02",
                title: "브랜드 사이트",
                body: "브랜드의 감성과 정체성을 담은 사이트. 스타트업, 1인 브랜드의 온라인 거점을 설계합니다. 맞춤 애니메이션과 인터랙션으로 브랜드 경험을 완성합니다.",
              },
              {
                num: "03",
                title: "랜딩 페이지",
                body: "특정 캠페인, 분양 홍보, 이벤트를 위한 단일 페이지. 전환에 집중한 구조를 설계합니다. 심리학 기반 CTA 배치와 스크롤 흐름으로 전환율을 극대화합니다.",
              },
              {
                num: "04",
                title: "이커머스",
                body: "상품 판매를 위한 온라인 쇼핑몰. 결제, 장바구니, 회원 기능을 포함합니다. 상품 스키마(JSON-LD)로 구글 쇼핑 노출까지 대응합니다.",
              },
              {
                num: "05",
                title: "글로벌 사이트",
                body: "해외 시장 진출을 위한 다국어 사이트. 영문, 일문 등 현지화 설계를 지원합니다. hreflang 태그, 언어별 SEO 전략까지 포함합니다.",
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
                      style={{ color: "rgba(255,255,255,0.06)" }}
                    >
                      {item.num}
                    </span>
                    <div className="pt-3 md:pt-5">
                      <h3 className="text-[20px] md:text-[28px] font-bold text-white leading-[1.2] mb-4">
                        {item.title}
                      </h3>
                      <p className="text-[14px] md:text-[15px] leading-[1.85] text-white/40 max-w-[480px]">
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
         03. INCLUDED — 기본 포함 항목
         Editorial: 이미지 좌측 + 오버랩 타이틀 + 우측 리스트
      ══════════════════════════════════════ */}
      <section
        id="included"
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
            ( INCLUDED )
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
                <img src="https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/services/responsive-devices.png" alt="다양한 디바이스에서의 반응형 웹 디자인" className="w-full h-full object-cover rounded-lg" />
              </motion.div>

              {/* Right: Feature list */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="flex-1 flex flex-col justify-end lg:pb-8"
              >
                {[
                  { name: "반응형 웹", desc: "모든 디바이스에서 완벽하게 작동하는 레이아웃" },
                  { name: "SEO 초기 세팅", desc: "메타태그, Open Graph, 시맨틱 HTML 구조 최적화" },
                  { name: "AEO 스키마 마크업", desc: "JSON-LD 6종 이상 기본 포함. AI가 읽는 구조" },
                  { name: "llms.txt", desc: "AI 크롤러 전용 사이트맵. 2026년 신규 표준" },
                  { name: "구조화 데이터", desc: "구글 리치 결과 노출을 위한 페이지별 설계" },
                  { name: "실시간 빌드 링크", desc: "상담 당일부터 제작 과정을 직접 확인" },
                  { name: "수정 무제한", desc: "횟수 제한 없이 피드백을 즉시 반영" },
                  { name: "사이트맵 & robots.txt", desc: "검색 크롤링 최적화 파일 자동 생성" },
                ].map((item, i) => (
                  <motion.div
                    key={item.name}
                    variants={fadeInUp}
                    className="flex items-start gap-6 py-4"
                    style={{ borderTop: "1px solid #ddd" }}
                  >
                    <span
                      className="text-[24px] md:text-[28px] font-extrabold leading-none tabular-nums shrink-0 w-10"
                      style={{ color: "rgba(0,0,0,0.06)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 pt-0.5">
                      <span className="text-[15px] font-medium text-[#111]">{item.name}</span>
                      <p className="text-[13px] text-[#999] leading-[1.6] mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
                <div style={{ borderTop: "1px solid #ddd" }} />
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
              WHAT&apos;S
              <br />
              <span className="text-[#C0C0C0]">INCLUDED.</span>
            </motion.h2>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         04. PROCESS — 제작 과정
         Editorial: 다크, 3컬럼 그리드 타임라인
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
              <span style={{ color: "#C0C0C0" }}>BUILD.</span>
            </motion.h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {[
              { num: "01", title: "상담 & 기획", time: "1~2일", desc: "프로젝트 목표와 타겟 사용자를 파악합니다. 심리학 기반 사용자 여정을 설계하고, 사이트맵과 URL 구조를 확정합니다." },
              { num: "02", title: "디자인 & 빌드", time: "5~7일", desc: "기획 결과를 실시간으로 구현합니다. 디자인 시안이 아닌 실제 작동하는 웹사이트를 보면서 피드백을 주세요. 수정 무제한." },
              { num: "03", title: "SEO/AEO 최적화", time: "2~3일", desc: "JSON-LD 스키마, 시맨틱 HTML, llms.txt, Core Web Vitals 최적화. 코드 레벨에서 검색 구조를 완성합니다." },
              { num: "04", title: "런칭 & 유지보수", time: "런칭 후", desc: "최종 검수 후 런칭. 구글 서치 콘솔 등록, 네이버 웹마스터 설정 가이드. 무상 유지보수 기간 + 분기별 SEO 점검." },
            ].map((step) => (
              <motion.div
                key={step.num}
                variants={fadeInUp}
                className="grid grid-cols-1 md:grid-cols-[100px_1fr_1fr] gap-4 md:gap-8 py-8 md:py-10 items-start"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
              >
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[28px] md:text-[36px] font-bold text-white tracking-[-0.02em]">
                  {step.num}
                </span>
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
                <p className="text-[14px] md:text-[15px] leading-[1.85] text-white/40 md:pt-1">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         05. REVIEWS — 고객 후기
         Editorial: 우측 정렬 대형 타이포 + 인용 블록 교차
      ══════════════════════════════════════ */}
      <section
        id="reviews"
        className="py-[160px] md:py-[220px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#f5f5f0" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
            className="text-right text-[48px] md:text-[72px] lg:text-[96px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-[#111] mb-20 md:mb-28"
          >
            WHAT
            <br />
            THEY <span className="text-[#C0C0C0]">SAY.</span>
          </motion.h2>

          <div className="space-y-16 md:space-y-20">
            {[
              {
                quote: "기획서 없이 바로 시작한다는 게 처음엔 반신반의했는데, 상담 당일 링크로 제작 과정을 직접 보니 믿음이 갔습니다. 완성도도 기대 이상이었어요.",
                name: "김 대표",
                company: "B2B 제조업체",
              },
              {
                quote: "예쁜 홈페이지가 아니라 일하는 홈페이지를 만들고 싶다고 했더니, 그 말을 그대로 이해하고 구조부터 다시 설계해줬습니다. 문의가 눈에 띄게 늘었어요.",
                name: "이 대표",
                company: "서비스 스타트업",
              },
            ].map((review, i) => {
              const isOffset = i % 2 === 1;
              return (
                <motion.blockquote
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.6 }}
                  className={`${isOffset ? "lg:ml-auto" : ""} lg:w-[60%]`}
                  style={{ borderLeft: "2px solid #111", paddingLeft: "2rem" }}
                >
                  <p className="text-[17px] md:text-[20px] text-[#333] leading-[1.85] italic mb-8">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <div>
                    <span className="text-[15px] font-semibold text-[#111]">{review.name}</span>
                    <span className="text-[12px] text-[#999] ml-3 font-[family-name:var(--font-jetbrains-mono)] tracking-[0.04em] uppercase">
                      {review.company}
                    </span>
                  </div>
                </motion.blockquote>
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
          dark={false}
        />
      </div>

      {/* ══════════════════════════════════════
         07. CTA
      ══════════════════════════════════════ */}
      <CtaContact />
    </>
  );
}
