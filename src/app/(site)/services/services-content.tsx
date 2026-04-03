"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  viewportConfig,
} from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import FAQSection from "@/components/seo/faq-section";
import InternalLinks from "@/components/seo/internal-links";
import SubCtaBand from "@/components/ui/sub-cta-band";
import {
  JsonLd,
  generateServiceSchema,
  generatePageSchema,
} from "@/lib/schema-helpers";

/* ─────────────────────────────────────
   Data
───────────────────────────────────── */

const serviceCards = [
  {
    number: "01",
    title: "홈페이지 제작",
    description:
      "브랜드의 첫 인상을 설계합니다. 반응형 디자인, SEO, CMS까지 기본 제공.",
    points: ["반응형 맞춤 디자인", "SEO 최적화 기본 포함", "실시간 빌드 링크"],
    href: "/services/website",
  },
  {
    number: "02",
    title: "홈페이지 리모델링",
    description:
      "낡은 사이트가 매일 잃는 고객을 되찾으세요. 기존 도메인·콘텐츠 유지.",
    points: ["기존 자산 100% 유지", "모바일·SEO 최적화", "평균 3.8일 전환"],
    href: "/services/remodeling",
  },
  {
    number: "03",
    title: "SEO/AEO 자동화",
    description:
      "코드 레벨에서 시작되는 검색 최적화. AI 검색 시대에 대응합니다.",
    points: [
      "구조화 데이터 기본 포함",
      "llms.txt AI 크롤러 대응",
      "Core Web Vitals 최적화",
    ],
    href: "/services/seo-aeo",
  },
];

const faqQuestions = [
  {
    question: "어떤 서비스를 선택해야 하나요?",
    answer:
      "새로운 홈페이지가 필요하다면 '홈페이지 제작', 기존 사이트를 개선하고 싶다면 '홈페이지 리모델링'을 추천합니다. 검색 노출과 AI 검색 대응이 필요하다면 'SEO/AEO 자동화'를 선택하세요. 무료 상담을 통해 가장 적합한 서비스를 안내해 드립니다.",
  },
  {
    question: "서비스를 조합할 수 있나요?",
    answer:
      "네, 가능합니다. 홈페이지 제작이나 리모델링에 SEO/AEO 자동화를 함께 적용하는 패키지가 가장 인기 있습니다. 조합 시 별도 할인이 적용되며, 상담을 통해 최적의 조합을 제안해 드립니다.",
  },
  {
    question: "견적은 어떻게 받나요?",
    answer:
      "문의 페이지 또는 카카오톡으로 간단한 요구사항을 보내주시면, 24시간 내에 투명한 견적서를 보내드립니다. 복잡한 견적서 대신 항목별 명확한 금액을 안내합니다.",
  },
];

const relatedLinks = [
  {
    title: "요금 안내",
    href: "/pricing",
    description: "서비스별 투명한 가격 정책을 확인하세요.",
  },
  {
    title: "포트폴리오",
    href: "/portfolio",
    description: "치로웹디자인이 완성한 프로젝트를 확인하세요.",
  },
  {
    title: "문의하기",
    href: "/contact",
    description: "무료 상담을 신청하고 맞춤 견적을 받아보세요.",
  },
];

/* ─────────────────────────────────────
   JSON-LD
───────────────────────────────────── */

const jsonLdData = generatePageSchema([
  generateServiceSchema({
    name: "홈페이지 제작",
    description:
      "브랜드의 첫 인상을 설계합니다. 반응형 디자인, SEO, CMS까지 기본 제공.",
    url: "https://chiroweb.co.kr/services/website",
  }),
  generateServiceSchema({
    name: "홈페이지 리모델링",
    description:
      "낡은 사이트가 매일 잃는 고객을 되찾으세요. 기존 도메인·콘텐츠 유지.",
    url: "https://chiroweb.co.kr/services/remodeling",
  }),
  generateServiceSchema({
    name: "SEO/AEO 자동화",
    description:
      "코드 레벨에서 시작되는 검색 최적화. AI 검색 시대에 대응합니다.",
    url: "https://chiroweb.co.kr/services/seo-aeo",
  }),
]);

/* ─────────────────────────────────────
   Component
───────────────────────────────────── */

export default function ServicesContent() {
  return (
    <>
      {jsonLdData && <JsonLd data={jsonLdData} />}

      <div className="pt-24 md:pt-32 pb-24 md:pb-32 px-5 md:px-8">
        <div className="max-w-[1280px] mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs pathname="/services" />

          {/* Header */}
          <SectionLabel number="01" label="Services" />

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
              치로웹디자인의 서비스<span className="text-[#FF4D00]">.</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-base text-[#6b6b6b] leading-[1.7] max-w-xl"
            >
              심리학으로 설계하고, 코드로 구현합니다. 세 가지 핵심 서비스로
              비즈니스의 디지털 경험을 완성합니다.
            </motion.p>
          </motion.div>

          {/* 3-Card Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#E0E0E0]"
          >
            {serviceCards.map((card) => (
              <motion.div key={card.number} variants={fadeInUp}>
                <Link
                  href={card.href}
                  className="block bg-white p-8 md:p-10 hover:bg-[#fafaf8] transition-colors group"
                >
                  {/* Number */}
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[40px] md:text-[56px] text-[#E0E0E0] leading-none block mb-6">
                    {card.number}
                  </span>

                  {/* Title */}
                  <h2 className="text-lg md:text-xl font-medium tracking-tight mb-3 group-hover:text-[#FF4D00] transition-colors">
                    {card.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-[#6b6b6b] leading-[1.7] mb-6">
                    {card.description}
                  </p>

                  {/* Key Points */}
                  <ul className="space-y-2 mb-8">
                    {card.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-sm text-[#1a1a1a] leading-[1.6]"
                      >
                        <span className="w-3 h-[1px] bg-[#1a1a1a] shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Link */}
                  <span className="text-sm text-[#9b9b9b] group-hover:text-[#FF4D00] transition-colors">
                    자세히 보기 →
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* FAQ */}
      <FAQSection
        questions={faqQuestions}
        sectionNumber="02"
        sectionLabel="FAQ"
        heading="Questions"
      />

      {/* Internal Links */}
      <InternalLinks links={relatedLinks} />

      {/* CTA Band */}
      <SubCtaBand />
    </>
  );
}
