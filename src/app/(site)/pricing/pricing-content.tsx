"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import { plans, pricingComparison } from "@/data/pricing";
import type { PricingPlan } from "@/data/pricing";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import FAQSection from "@/components/seo/faq-section";
import InternalLinks from "@/components/seo/internal-links";
import SubCtaBand from "@/components/ui/sub-cta-band";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";
import Button from "@/components/ui/button";
import {
  JsonLd,
  generateOfferSchema,
  generateFAQSchema,
  generatePageSchema,
} from "@/lib/schema-helpers";

/* ─────────────────────────────────────
   Anchoring Order: Enterprise → Business → Startup
───────────────────────────────────── */
const anchoredPlans: PricingPlan[] = [...plans].reverse();

/* ─────────────────────────────────────
   FAQ Data
───────────────────────────────────── */
const faqQuestions = [
  {
    question: "추가 비용이 발생하나요?",
    answer:
      "아니요. 치로웹디자인은 정찰제로 운영합니다. 견적서에 명시된 금액 외에 추가 비용이 발생하지 않습니다. 디자인, 개발, SEO 세팅, 실시간 빌드 링크가 모두 포함된 가격입니다.",
  },
  {
    question: "유지보수 비용은 얼마인가요?",
    answer:
      "Startup 플랜은 유지보수가 별도이며, Business는 3개월, Enterprise는 6개월 무료 유지보수가 포함됩니다. 이후 월 유지보수 비용은 규모에 따라 안내드립니다.",
  },
  {
    question: "어떤 플랜이 저한테 맞나요?",
    answer:
      "소규모 소개 사이트는 Startup, 마케팅과 SEO가 중요한 비즈니스는 Business, 대규모 맞춤 프로젝트는 Enterprise를 추천합니다. 무료 상담에서 정확한 플랜을 안내드립니다.",
  },
  {
    question: "분할 결제가 가능한가요?",
    answer:
      "계약금 50% + 런칭 시 잔금 50% 분할 결제가 가능합니다. Enterprise 플랜은 3회 분할 결제도 가능합니다.",
  },
  {
    question: "환불 정책은 어떻게 되나요?",
    answer:
      "제작 착수 전 100% 환불, 착수 후에는 진행 정도에 따라 차등 환불됩니다. 실시간 빌드 링크로 과정을 확인하시며 진행하기 때문에 환불이 필요한 경우는 거의 없습니다.",
  },
];

/* ─────────────────────────────────────
   Internal Links
───────────────────────────────────── */
const relatedLinks = [
  {
    title: "서비스 안내",
    href: "/services",
    description: "홈페이지 제작, 리모델링, SEO/AEO 자동화 서비스를 확인하세요.",
  },
  {
    title: "프로젝트 문의",
    href: "/contact",
    description: "프로젝트 규모와 목표를 알려주시면 맞춤 견적을 안내드립니다.",
  },
  {
    title: "무료 진단 신청",
    href: "/free-diagnosis",
    description: "현재 사이트의 문제점을 무료로 진단받아 보세요.",
  },
];

/* ─────────────────────────────────────
   JSON-LD
───────────────────────────────────── */
const offerSchemas = plans.map((plan) =>
  generateOfferSchema({
    name: plan.name,
    description: plan.description,
    price: String(plan.priceValue),
    priceCurrency: "KRW",
    url: `https://chiroweb.co.kr/pricing#${plan.id}`,
  })
);

const faqSchema = generateFAQSchema(faqQuestions);
const schemas: object[] = [...offerSchemas, faqSchema].filter(Boolean) as object[];
const jsonLdData = schemas.length > 0 ? generatePageSchema(schemas) : null;

/* ─────────────────────────────────────
   Component
───────────────────────────────────── */
export default function PricingContent() {
  return (
    <>
      {jsonLdData && <JsonLd data={jsonLdData} />}

      {/* ── Hero ── */}
      <div className="pt-24 md:pt-32 pb-24 md:pb-32 px-5 md:px-8">
        <div className="max-w-[1280px] mx-auto">
          <Breadcrumbs pathname="/pricing" />

          <SectionLabel number="01" label="Pricing" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-12 md:mb-20"
          >
            <motion.h1
              variants={fadeInUp}
              className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[44px] font-light tracking-[0.03em] leading-[1.05] mb-6"
            >
              홈페이지 제작 비용 안내 — 거품 없는 정찰제
              <span className="text-[#FF4D00]">.</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-base text-[#6b6b6b] leading-[1.7] max-w-2xl"
            >
              치로웹디자인의 홈페이지 제작 비용은 Startup 99만원, Business
              250만원, Enterprise 500만원부터 시작합니다. 모든 플랜에 반응형
              디자인, SEO 기본 세팅, 실시간 빌드 링크가 포함되어 있으며, 추가
              비용이 발생하지 않는 정찰제로 운영합니다.
            </motion.p>
          </motion.div>

          <Divider />

          {/* ── Pricing Cards ── */}
          <div className="pt-16 md:pt-24">
            <SectionLabel number="02" label="Plans" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid grid-cols-1 md:grid-cols-3"
            >
              {anchoredPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  id={plan.id}
                  variants={fadeInUp}
                  className={`relative p-8 md:p-10 ${
                    plan.recommended
                      ? "border-t-[3px] border-t-[#FF4D00]"
                      : "border-t border-t-[#E0E0E0]"
                  } ${
                    index < anchoredPlans.length - 1
                      ? "md:border-r md:border-dashed md:border-r-[#E0E0E0]"
                      : ""
                  }`}
                >
                  {/* Plan Name + Badge */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b]">
                      {plan.name}
                    </span>
                    {plan.recommended && (
                      <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium tracking-[0.05em] text-[#FF4D00] border border-[#FF4D00] rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <p className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-light tracking-[0.03em] text-[#1a1a1a] mb-1">
                    {plan.price}
                  </p>

                  {/* Monthly Equivalent */}
                  {plan.monthlyEquivalent && (
                    <p className="text-xs text-[#9b9b9b] mb-6">
                      {plan.monthlyEquivalent}
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-sm text-[#6b6b6b] leading-[1.7] mb-8">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li
                        key={feature.name}
                        className="flex items-start gap-2.5 text-sm leading-[1.6]"
                      >
                        <span
                          className={`shrink-0 mt-0.5 ${
                            feature.included
                              ? "text-[#1a1a1a]"
                              : "text-[#E0E0E0]"
                          }`}
                        >
                          {feature.included ? "✓" : "—"}
                        </span>
                        <span
                          className={
                            feature.included
                              ? "text-[#1a1a1a]"
                              : "text-[#9b9b9b]"
                          }
                        >
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    href={plan.ctaHref}
                    variant="ghost"
                    className="w-full justify-center"
                  >
                    {plan.ctaText}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="pt-16 md:pt-24">
            <Divider />
          </div>

          {/* ── Comparison Table ── */}
          <div className="pt-16 md:pt-24">
            <SectionLabel number="03" label="Comparison" />

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-[#1a1a1a]">
                      <th className="py-4 pr-8 text-sm font-medium text-[#1a1a1a] tracking-tight">
                        항목
                      </th>
                      <th className="py-4 pr-8 text-sm font-medium text-[#1a1a1a] tracking-tight">
                        치로웹디자인
                      </th>
                      <th className="py-4 text-sm font-medium text-[#1a1a1a] tracking-tight">
                        타 업체
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingComparison.map((item) => (
                      <tr
                        key={item.feature}
                        className="border-b border-[#E0E0E0]"
                      >
                        <td className="py-4 pr-8 text-sm text-[#1a1a1a]">
                          {item.feature}
                        </td>
                        <td className="py-4 pr-8 text-sm text-[#FF4D00] font-medium">
                          {item.chiro}
                        </td>
                        <td className="py-4 text-sm text-[#9b9b9b]">
                          {item.others}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <FAQSection
        questions={faqQuestions}
        sectionNumber="04"
        sectionLabel="FAQ"
        heading="Questions"
      />

      {/* ── Internal Links ── */}
      <InternalLinks links={relatedLinks} />

      {/* ── CTA Band ── */}
      <SubCtaBand />
    </>
  );
}
