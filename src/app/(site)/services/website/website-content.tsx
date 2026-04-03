"use client";

import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  viewportConfig,
} from "@/lib/motion";
import { getServiceBySlug } from "@/data/services";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";
import FAQSection from "@/components/seo/faq-section";
import InternalLinks from "@/components/seo/internal-links";
import SubCtaBand from "@/components/ui/sub-cta-band";
import {
  JsonLd,
  generateServiceSchema,
  generatePageSchema,
} from "@/lib/schema-helpers";

const service = getServiceBySlug("website")!;

const featureDetails: { title: string; description: string }[] = [
  {
    title: "맞춤 디자인",
    description:
      "템플릿이 아닌, 브랜드 아이덴티티에 맞춘 고유한 디자인을 설계합니다.",
  },
  {
    title: "SEO/AEO 기본 세팅",
    description:
      "메타태그, 구조화 데이터, 사이트맵을 코드 레벨에서 세팅합니다.",
  },
  {
    title: "반응형 레이아웃",
    description:
      "데스크톱, 태블릿, 모바일 — 모든 디바이스에서 완벽하게 작동합니다.",
  },
  {
    title: "CTA 설계",
    description:
      "방문자를 고객으로 전환하는 문의 유도 구조를 설계합니다.",
  },
  {
    title: "CMS 연동",
    description:
      "관리자가 직접 텍스트, 이미지, 포트폴리오를 수정할 수 있습니다.",
  },
  {
    title: "구조화 데이터",
    description:
      "JSON-LD를 자동 생성하여 검색엔진과 AI 엔진에 최적화합니다.",
  },
];

const internalLinks = [
  {
    title: "SEO/AEO 자동화",
    href: "/services/seo-aeo",
    description:
      "검색엔진과 AI 모두에게 발견되는 사이트를 만듭니다. 코드 레벨에서 SEO/AEO를 자동화합니다.",
  },
  {
    title: "포트폴리오",
    href: "/portfolio",
    description:
      "치로가 설계한 프로젝트를 확인하세요. 실제 클라이언트와 함께 만든 결과물입니다.",
  },
  {
    title: "요금 안내",
    href: "/pricing",
    description:
      "스타트업부터 엔터프라이즈까지, 프로젝트 규모에 맞는 투명한 가격 정책을 확인하세요.",
  },
];

export default function WebsiteContent() {
  const serviceSchema = generateServiceSchema({
    name: "기업 홈페이지 제작",
    description: service.description,
    url: "https://chiroweb.co.kr/services/website",
  });
  const pageSchema = serviceSchema
    ? generatePageSchema([serviceSchema])
    : null;

  return (
    <>
      {pageSchema && <JsonLd data={pageSchema} />}

      <div className="pt-24 md:pt-32 pb-24 md:pb-32 px-5 md:px-8">
        <div className="max-w-[1280px] mx-auto">

          {/* ── Section 1: Hero ── */}
          <Breadcrumbs pathname="/services/website" />
          <SectionLabel number="01" label="Website" />

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
              {service.h1}<span className="text-[#FF4D00]">.</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-base text-[#6b6b6b] leading-[1.7] max-w-xl"
            >
              치로의 홈페이지 제작에는 반응형 디자인, SEO/AEO 기본 세팅,
              CMS 연동, 실시간 빌드 링크가 모두 포함됩니다. 별도 기획서
              없이 상담 당일 제작이 시작되며, 평균 3.8일 내에 완성됩니다.
            </motion.p>
          </motion.div>

          {/* ── Section 2: What's Included ── */}
          <Divider />
          <div className="pt-16 md:pt-24">
            <SectionLabel number="02" label="What's Included" />

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
                포함 항목<span className="text-[#FF4D00]">.</span>
              </motion.h2>
            </motion.div>

            {/* 30/70 Split */}
            <div className="flex flex-col md:flex-row">
              <div className="md:w-[30%] md:pr-12 mb-8 md:mb-0">
                <div className="md:sticky md:top-32">
                  <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b]">
                    All-in-One Package
                  </p>
                  <p className="mt-4 text-sm text-[#6b6b6b] leading-[1.7]">
                    모든 플랜에 포함되는 기본 항목입니다. 추가 비용 없이
                    제공됩니다.
                  </p>
                </div>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="md:w-[70%] md:border-l md:border-[#E0E0E0] md:pl-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {featureDetails.map((feature) => (
                    <motion.div key={feature.title} variants={fadeInUp}>
                      <div className="flex items-start gap-3">
                        <span className="mt-[2px] w-4 h-[1px] bg-[#1a1a1a] shrink-0 relative top-[9px]" />
                        <div>
                          <h3 className="text-sm font-semibold tracking-tight mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-[#6b6b6b] leading-[1.7]">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Section 3: Process ── */}
          <div className="mt-20 md:mt-32">
            <Divider />
            <div className="pt-16 md:pt-24">
              <SectionLabel number="03" label="Process" />

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
                  제작 프로세스<span className="text-[#FF4D00]">.</span>
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="text-base text-[#6b6b6b] leading-[1.7] max-w-xl"
                >
                  기획서를 기다리며 몇 주를 소비하지 않습니다. 상담이 끝나는
                  순간, 사이트가 만들어지기 시작합니다.
                </motion.p>
              </motion.div>

              {/* Process Steps */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="grid grid-cols-1 md:grid-cols-4 gap-[1px] bg-[#E0E0E0]"
              >
                {service.process.map((step) => (
                  <motion.div
                    key={step.number}
                    variants={fadeInUp}
                    className={`p-8 md:p-10 ${
                      step.highlight ? "bg-[#fafaf8]" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-[family-name:var(--font-jetbrains-mono)] text-[32px] md:text-[40px] text-[#E0E0E0] leading-none">
                        {step.number}
                      </span>
                      <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b]">
                        {step.en}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold tracking-tight mb-3">
                      {step.title}
                    </h3>

                    <p className="text-sm text-[#6b6b6b] leading-[1.7] mb-6">
                      {step.description}
                    </p>

                    <div className="pt-4 border-t border-[#E0E0E0]">
                      <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.15em] uppercase text-[#9b9b9b] mb-1">
                        소요 시간
                      </p>
                      <p
                        className={`text-sm font-[family-name:var(--font-jetbrains-mono)] tracking-wide ${
                          step.highlight ? "text-[#FF4D00]" : "text-[#6b6b6b]"
                        }`}
                      >
                        {step.duration}
                      </p>
                    </div>
                  </motion.div>
                ))}
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

      {/* ── Section 5: Internal Links + CTA ── */}
      <InternalLinks links={internalLinks} heading="Related" />
      <SubCtaBand />
    </>
  );
}
