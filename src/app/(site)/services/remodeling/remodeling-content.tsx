"use client";

import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  viewportConfig,
} from "@/lib/motion";
import { getServiceBySlug } from "@/data/services";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import FAQSection from "@/components/seo/faq-section";
import InternalLinks from "@/components/seo/internal-links";
import SubCtaBand from "@/components/ui/sub-cta-band";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";
import Button from "@/components/ui/button";
import {
  JsonLd,
  generateServiceSchema,
  generatePageSchema,
} from "@/lib/schema-helpers";

const service = getServiceBySlug("remodeling")!;

/* ─────────────────────────────────────
   Loss-framing Stats
───────────────────────────────────── */

const lossStats = [
  {
    stat: "57%",
    label: "3초 내 이탈",
    description:
      "모바일 미지원 사이트를 방문한 사용자의 57%가 3초 안에 떠납니다. 매일 절반 이상의 잠재 고객을 잃고 있는 셈입니다.",
  },
  {
    stat: "하락",
    label: "검색 순위",
    description:
      "Google PageSpeed 50점 이하 사이트는 Core Web Vitals 기준 미달로 검색 순위가 지속적으로 하락합니다.",
  },
  {
    stat: "0%",
    label: "AI 검색 노출",
    description:
      "구조화 데이터가 없는 사이트는 ChatGPT, Perplexity 같은 AI 검색에서 완전히 누락됩니다.",
  },
];

/* ─────────────────────────────────────
   Checklist Items
───────────────────────────────────── */

const checklistItems = [
  "모바일에서 깨지거나 가로 스크롤이 발생합니다",
  "사이트 로딩이 3초 이상 걸립니다",
  "Google에서 검색해도 나오지 않습니다",
  "아임웹/카페24로 만들어 커스터마이징에 한계를 느낍니다",
  "디자인이 2020년 이전 스타일입니다",
  "SSL 인증서가 없습니다 (http://)",
];

/* ─────────────────────────────────────
   Internal Links
───────────────────────────────────── */

const relatedLinks = [
  {
    title: "무료 사이트 진단",
    href: "/free-diagnosis",
    description:
      "현재 사이트의 속도, SEO, 모바일 대응 상태를 무료로 진단받으세요.",
  },
  {
    title: "포트폴리오",
    href: "/portfolio",
    description:
      "치로웹디자인이 리모델링한 실제 프로젝트를 확인하세요.",
  },
  {
    title: "요금 안내",
    href: "/pricing",
    description:
      "투명한 정찰제 요금 정책을 확인하세요.",
  },
];

/* ─────────────────────────────────────
   JSON-LD
───────────────────────────────────── */

const serviceSchema = generateServiceSchema({
  name: "홈페이지 리모델링",
  description: service.description,
  url: "https://chiroweb.co.kr/services/remodeling",
});

const pageSchema = serviceSchema
  ? generatePageSchema([serviceSchema])
  : null;

/* ─────────────────────────────────────
   Component
───────────────────────────────────── */

export default function RemodelingContent() {
  return (
    <>
      {pageSchema && <JsonLd data={pageSchema} />}

      <div className="pt-24 md:pt-32 pb-24 md:pb-32 px-5 md:px-8">
        <div className="max-w-[1280px] mx-auto">

          {/* ── Section 1: Hero ── */}
          <Breadcrumbs pathname="/services/remodeling" />
          <SectionLabel number="01" label="Remodeling" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-10 md:mb-16"
          >
            <motion.h1
              variants={fadeInUp}
              className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[44px] font-light tracking-[0.03em] leading-[1.05] mb-6"
            >
              낡은 홈페이지, 매일 잃고 있는 고객을 되찾으세요
              <span className="text-[#FF4D00]">.</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-base text-[#6b6b6b] leading-[1.7] max-w-2xl"
            >
              오래된 홈페이지는 느린 로딩, 모바일 미지원, SEO 부재로 매일 잠재
              고객을 잃고 있습니다. 치로웹디자인의 리모델링은 기존 도메인과
              콘텐츠를 유지하면서 반응형, SEO/AEO, 최신 기술로 전환합니다.
            </motion.p>
          </motion.div>

          {/* ── Section 2: Why Remodeling ── */}
          <div className="mt-20 md:mt-32">
            <Divider />
            <div className="pt-16 md:pt-24">
              <SectionLabel number="02" label="Why Remodeling" />

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="mb-12 md:mb-20"
              >
                <motion.h2
                  variants={fadeInUp}
                  className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[44px] font-light tracking-[0.03em] leading-[1.05] mb-6"
                >
                  지금 이 순간에도 고객을 잃고 있습니다
                  <span className="text-[#FF4D00]">.</span>
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="text-base text-[#6b6b6b] leading-[1.7] max-w-xl"
                >
                  낡은 홈페이지는 단순히 보기 안 좋은 것이 아닙니다. 검색에서
                  밀리고, 방문자가 이탈하고, AI에게 무시당합니다.
                </motion.p>
              </motion.div>

              {/* Loss Stats — Dark Block */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#2a2a2a]"
              >
                {lossStats.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={fadeInUp}
                    className="bg-[#1a1a1a] p-8 md:p-10"
                  >
                    <p className="font-[family-name:var(--font-space-grotesk)] text-[36px] md:text-[48px] font-light tracking-[0.03em] leading-none text-[#FF4D00] mb-2">
                      {item.stat}
                    </p>
                    <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-white/40 mb-4">
                      {item.label}
                    </p>
                    <p className="text-sm text-white/60 leading-[1.7]">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* ── Section 3: Checklist ── */}
          <div className="mt-20 md:mt-32">
            <Divider />
            <div className="pt-16 md:pt-24">
              <SectionLabel number="03" label="Checklist" />

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="mb-12 md:mb-20"
              >
                <motion.h2
                  variants={fadeInUp}
                  className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[44px] font-light tracking-[0.03em] leading-[1.05] mb-6"
                >
                  이런 사이트라면 리모델링이 필요합니다
                  <span className="text-[#FF4D00]">.</span>
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="text-base text-[#6b6b6b] leading-[1.7] max-w-xl"
                >
                  아래 항목 중 해당되는 것이 있는지 확인해 보세요.
                </motion.p>
              </motion.div>

              {/* Checklist Items */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="max-w-2xl"
              >
                {checklistItems.map((item) => (
                  <motion.label
                    key={item}
                    variants={fadeInUp}
                    className="flex items-start gap-4 py-5 border-b border-[#E0E0E0] cursor-pointer group"
                  >
                    <span className="shrink-0 mt-0.5 w-5 h-5 border border-[#E0E0E0] rounded-sm flex items-center justify-center group-hover:border-[#FF4D00] transition-colors">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="#FF4D00"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-sm md:text-base text-[#1a1a1a] leading-[1.6] group-hover:text-[#6b6b6b] transition-colors">
                      {item}
                    </span>
                  </motion.label>
                ))}
              </motion.div>

              {/* CTA after checklist */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="mt-10 md:mt-16 bg-[#1a1a1a] p-6 md:p-12"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <p className="font-[family-name:var(--font-space-grotesk)] text-lg md:text-2xl font-light tracking-[0.03em] leading-[1.3] text-white">
                      3개 이상 해당된다면,
                      <br />
                      무료 진단을 받아보세요
                      <span className="text-[#FF4D00]">.</span>
                    </p>
                    <p className="mt-3 text-sm text-white/60 leading-[1.7]">
                      현재 사이트 상태를 분석하고, 개선 방향을 안내합니다.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <a
                      href="/free-diagnosis"
                      className="inline-flex items-center justify-center gap-2 border border-[#FF4D00] text-white w-full md:w-auto px-8 py-3.5 text-sm tracking-[0.05em] transition-all duration-300 hover:bg-[#FF4D00] cursor-pointer"
                    >
                      무료 진단 신청
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 4: FAQ ── */}
      <FAQSection
        questions={service.faqs}
        sectionNumber="04"
        sectionLabel="FAQ"
        heading="Questions"
        showDivider
        popularIndex={0}
      />

      {/* ── Section 5: Internal Links ── */}
      <InternalLinks links={relatedLinks} heading="관련 콘텐츠" />

      {/* ── CTA Band ── */}
      <SubCtaBand />
    </>
  );
}
