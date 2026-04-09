"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import { getServiceBySlug } from "@/data/services";
import SubpageHero from "@/components/sections/subpage-hero";
import NumberedSection from "@/components/sections/numbered-section";
import ProcessTimeline from "@/components/sections/process-timeline";
import FaqTwoColumn from "@/components/sections/faq-two-column";
import ContactCtaSection from "@/components/sections/contact-cta-section";

const service = getServiceBySlug("website")!;

const buildTypes = [
  {
    title: "기업 소개 사이트",
    description:
      "B2B 제조사, 서비스 기업의 신뢰를 구축하는 사이트. 회사 소개, 서비스, 포트폴리오를 체계적으로 구성합니다.",
  },
  {
    title: "브랜드 사이트",
    description:
      "브랜드의 감성과 정체성을 담은 사이트. 스타트업, 1인 브랜드의 온라인 거점을 설계합니다.",
  },
  {
    title: "랜딩 페이지",
    description:
      "특정 캠페인, 분양 홍보, 이벤트를 위한 단일 페이지. 전환에 집중한 구조를 설계합니다.",
  },
  {
    title: "이커머스",
    description:
      "상품 판매를 위한 온라인 쇼핑몰. 결제, 장바구니, 회원 기능을 포함합니다.",
  },
  {
    title: "글로벌 사이트",
    description:
      "해외 시장 진출을 위한 다국어 사이트. 영문, 일문 등 현지화 설계를 지원합니다.",
  },
];

const includedItems = [
  {
    name: "반응형 웹",
    description: "모든 디바이스에서 완벽하게 작동하는 레이아웃",
  },
  {
    name: "SEO 초기 세팅",
    description: "메타태그, Open Graph, 키워드 구조 최적화",
  },
  {
    name: "AEO 스키마",
    description: "AI 엔진이 사이트 정보를 정확히 읽을 수 있는 구조",
  },
  {
    name: "구조화 데이터",
    description: "JSON-LD 자동 생성 — 리치 스니펫 대응",
  },
  {
    name: "사이트맵/robots.txt",
    description: "검색엔진 크롤링 최적화 파일 자동 생성",
  },
  {
    name: "llms.txt",
    description: "AI 크롤러를 위한 사이트 정보 명세 파일",
  },
  {
    name: "실시간 빌드 링크",
    description: "상담 당일부터 제작 과정을 직접 확인",
  },
  {
    name: "수정 무제한",
    description: "횟수 제한 없이 피드백을 즉시 반영",
  },
];

const processSteps = service.process.map((step) => ({
  number: step.number,
  title: step.title,
  description: step.description,
}));

const faqs = service.faqs.map((faq) => ({
  q: faq.question,
  a: faq.answer,
}));

const reviews = [
  {
    quote:
      "기획서 없이 바로 시작한다는 게 처음엔 반신반의했는데, 상담 당일 링크로 제작 과정을 직접 보니 믿음이 갔습니다. 완성도도 기대 이상이었어요.",
    name: "김 대표",
    company: "B2B 제조업체",
  },
  {
    quote:
      "예쁜 홈페이지가 아니라 일하는 홈페이지를 만들고 싶다고 했더니, 그 말을 그대로 이해하고 구조부터 다시 설계해줬습니다. 문의가 눈에 띄게 늘었어요.",
    name: "이 대표",
    company: "서비스 스타트업",
  },
];

export default function WebsiteContent() {
  return (
    <>
      {/* 1. Hero */}
      <SubpageHero
        title="WEB DESIGN"
        label="( Website Development )"
      />

      {/* 2. Direct Answer */}
      <section className="py-[200px] md:py-[260px] px-5 md:px-12 lg:px-20 bg-[#f5f5f0]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="max-w-[760px] mx-auto text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-[24px] md:text-[32px] font-semibold text-[#111] leading-[1.4] mb-6"
            >
              치로의 홈페이지 제작이란.
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-[15px] md:text-[17px] text-[#555] leading-[1.9]"
            >
              방문자의 행동을 설계하고, 검색 엔진과 AI가 읽을 수 있는 구조를
              코드 레벨에서 직접 구현하는 것입니다. 예쁜 홈페이지가 아닌,
              일하는 홈페이지를 만듭니다.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 3. 제작 가능 유형 */}
      <NumberedSection
        label="( TYPES )"
        heading={"WHAT WE\nBUILD."}
        items={buildTypes}
        dark={true}
      />

      {/* 4. 포함 항목 상세 */}
      <section className="py-[200px] md:py-[260px] px-5 md:px-12 lg:px-20 bg-[#f5f5f0]">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
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
              ( INCLUDED )
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-[36px] md:text-[56px] lg:text-[72px] font-extrabold text-[#111] tracking-[-0.03em] leading-[1.0]"
            >
              WHAT&apos;S
              <br />
              INCLUDED.
            </motion.h2>
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-2 gap-0"
          >
            {includedItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex items-start gap-4 py-7 md:py-8 border-t border-[#ddd]"
                style={
                  i % 2 === 1
                    ? { paddingLeft: "0", borderLeft: "none" }
                    : undefined
                }
              >
                {/* Checkmark */}
                <span className="shrink-0 mt-[3px] w-5 h-5 rounded-full border border-[#111] flex items-center justify-center">
                  <svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="#111111"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <p className="text-[15px] md:text-[16px] font-semibold text-[#111] mb-1">
                    {item.name}
                  </p>
                  <p className="text-[13px] md:text-[14px] text-[#666] leading-[1.7]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
            {/* Bottom border */}
            <div className="col-span-1 md:col-span-2 border-t border-[#ddd]" />
          </motion.div>
        </div>
      </section>

      {/* 5. Process Timeline */}
      <ProcessTimeline
        label="( PROCESS )"
        heading="HOW WE BUILD."
        steps={processSteps}
        dark={false}
      />

      {/* 6. 고객 후기 */}
      <section
        className="py-[200px] md:py-[260px] px-5 md:px-12 lg:px-20 bg-white"
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
              ( REVIEWS )
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-[36px] md:text-[56px] lg:text-[72px] font-extrabold text-[#111] tracking-[-0.03em] leading-[1.0]"
            >
              WHAT THEY
              <br />
              SAY.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          >
            {reviews.map((review, i) => (
              <motion.blockquote
                key={i}
                variants={fadeInUp}
                className="border-l-2 border-[#111] pl-8 py-2"
              >
                <p className="text-[15px] md:text-[17px] text-[#444] leading-[1.9] italic mb-6">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <footer className="flex flex-col gap-1">
                  <span className="text-[14px] font-semibold text-[#111]">
                    {review.name}
                  </span>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] text-[#999] uppercase">
                    {review.company}
                  </span>
                </footer>
              </motion.blockquote>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. FAQ */}
      <FaqTwoColumn
        faqs={faqs}
        sectionLabel="( FAQ )"
        heading={"FREQUENTLY\nASKED."}
        dark={false}
      />

      {/* 8. Contact CTA */}
      <ContactCtaSection />
    </>
  );
}
