"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { plans, pricingComparison } from "@/data/pricing";
import SubpageHero from "@/components/sections/subpage-hero";
import NumberedSection from "@/components/sections/numbered-section";
import ComparisonTable from "@/components/sections/comparison-table";
import FaqTwoColumn from "@/components/sections/faq-two-column";
import ContactCtaSection from "@/components/sections/contact-cta-section";

const pricingFaqs = [
  { q: "추가 비용이 발생하나요?", a: "기본 패키지에 명시된 항목 외 추가 비용은 없습니다. 추가 기능이 필요한 경우 사전에 별도 견적을 안내드립니다." },
  { q: "결제는 어떻게 하나요?", a: "계약금 50% + 완료 후 50% 방식입니다. 카드 결제와 계좌이체 모두 가능합니다." },
  { q: "환불 정책은 어떻게 되나요?", a: "착수 전 100% 환불. 착수 후에는 진행 단계에 따라 부분 환불이 가능합니다." },
  { q: "유지보수 비용은 별도인가요?", a: "플랜에 따라 무상 유지보수가 포함됩니다. 이후 유지보수는 월 정액제로 운영됩니다." },
  { q: "플랜 간 업그레이드가 가능한가요?", a: "진행 중에도 상위 플랜으로 업그레이드 가능합니다. 차액만 추가 결제하시면 됩니다." },
  { q: "제작 기간은 플랜마다 다른가요?", a: "Startup 플랜은 평균 3-5일, Business는 1-2주, Enterprise는 2-4주 소요됩니다. 프로젝트 복잡도에 따라 달라질 수 있습니다." },
];

const comparisonRows = pricingComparison.map((item) => ({
  feature: item.feature,
  values: [item.others, item.others, item.chiro],
}));

const recommendTargets = [
  {
    plan: "Startup",
    targets: [
      "처음 홈페이지를 만드는 소상공인",
      "1인 브랜드·프리랜서",
      "빠르게 온라인 존재감을 확보하고 싶은 분",
      "예산이 제한적이지만 품질을 포기하고 싶지 않은 분",
    ],
  },
  {
    plan: "Business",
    targets: [
      "기존 사이트를 전면 리모델링하려는 중소기업",
      "검색 노출과 전환율을 동시에 높이고 싶은 분",
      "CMS로 직접 콘텐츠를 관리하고 싶은 분",
      "해외 시장 진출을 준비하는 기업",
    ],
  },
  {
    plan: "Enterprise",
    targets: [
      "브랜드 아이덴티티를 완벽히 담고 싶은 기업",
      "복잡한 기능(예약, 결제, 회원 등)이 필요한 프로젝트",
      "장기적 파트너십을 원하는 기업",
      "분양 홍보관, 대형 프로젝트를 준비하는 기업",
    ],
  },
];

export default function PricingContent() {
  return (
    <>
      <SubpageHero
        title="PRICING"
        label="( Plans & Pricing )"
      />

      {/* Direct Answer Block */}
      <section className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 py-[140px] md:py-[180px]">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[28px] md:text-[36px] font-semibold text-[#111] mb-4"
          >
            99만원부터 시작합니다.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[15px] text-[#666] leading-[1.8] max-w-[560px] mx-auto"
          >
            모든 플랜에 반응형 웹, SEO 초기 세팅, AEO 스키마 마크업이
            기본 포함됩니다.
          </motion.p>
        </div>
      </section>

      {/* Plan Cards */}
      <section className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 pb-[200px] md:pb-[260px]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {plans.map((plan, i) => {
              const isRecommended = plan.recommended;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative rounded-2xl p-8 md:p-10 flex flex-col ${
                    isRecommended
                      ? "bg-[#1a1a1a] text-white"
                      : "bg-white border border-[#e5e5e5]"
                  }`}
                >
                  {isRecommended && (
                    <span className="absolute top-6 right-6 text-[11px] tracking-[0.08em] uppercase bg-[#FF4D00] text-white px-3 py-1 rounded-full font-[family-name:var(--font-jetbrains-mono)]">
                      추천
                    </span>
                  )}

                  <p className={`text-[13px] tracking-[0.04em] mb-2 ${isRecommended ? "text-white/50" : "text-[#999]"}`}>
                    {plan.name}
                  </p>

                  <p className={`text-[36px] md:text-[48px] font-extrabold tracking-[-0.02em] leading-[1.0] mb-2 ${isRecommended ? "text-white" : "text-[#111]"}`}>
                    {plan.price}
                  </p>

                  {plan.monthlyEquivalent && (
                    <p className={`text-[12px] mb-6 ${isRecommended ? "text-white/40" : "text-[#999]"}`}>
                      {plan.monthlyEquivalent}
                    </p>
                  )}

                  <p className={`text-[14px] leading-[1.7] mb-8 ${isRecommended ? "text-white/60" : "text-[#666]"}`}>
                    {plan.description}
                  </p>

                  <ul className="flex-1 space-y-3 mb-8">
                    {plan.features.map((feat) => (
                      <li key={feat.name} className="flex items-start gap-3">
                        <span className={`mt-0.5 text-[14px] ${feat.included ? "text-[#10B981]" : isRecommended ? "text-white/20" : "text-[#ccc]"}`}>
                          {feat.included ? "✓" : "—"}
                        </span>
                        <span className={`text-[14px] leading-[1.6] ${feat.included ? (isRecommended ? "text-white/80" : "text-[#333]") : (isRecommended ? "text-white/30" : "text-[#bbb]")}`}>
                          {feat.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.ctaHref}
                    className={`block text-center text-[14px] tracking-[0.02em] py-3.5 rounded-full transition-all duration-300 ${
                      isRecommended
                        ? "bg-white text-[#1a1a1a] hover:bg-[#FF4D00] hover:text-white"
                        : "bg-[#1a1a1a] text-white hover:bg-[#FF4D00]"
                    }`}
                  >
                    {plan.ctaText}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Included in All */}
      <NumberedSection
        label="( INCLUDED IN ALL )"
        heading={"EVERY PROJECT\nINCLUDES."}
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

      {/* Comparison */}
      <ComparisonTable
        label="( COMPARISON )"
        heading={"WHY CHIRO."}
        columns={["일반 에이전시 A", "일반 에이전시 B", "치로"]}
        rows={comparisonRows}
        highlightColumn={2}
      />

      {/* Recommend Targets */}
      <section className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 py-[200px] md:py-[260px]">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[11px] tracking-[0.08em] uppercase text-[#999] mb-6 font-[family-name:var(--font-jetbrains-mono)]">
            ( RECOMMENDED FOR )
          </p>
          <h2 className="text-[32px] md:text-[48px] font-extrabold text-[#111] tracking-[-0.03em] leading-[1.0] uppercase mb-16">
            WHO IS IT
            <br />
            FOR.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {recommendTargets.map((group, i) => (
              <motion.div
                key={group.plan}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="text-[20px] md:text-[24px] font-bold text-[#111] mb-6">
                  {group.plan}
                </p>
                <ul className="space-y-3">
                  {group.targets.map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="text-[#999] mt-1 text-[10px]">●</span>
                      <span className="text-[14px] text-[#666] leading-[1.7]">{t}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqTwoColumn faqs={pricingFaqs} />

      {/* CTA */}
      <ContactCtaSection />
    </>
  );
}
