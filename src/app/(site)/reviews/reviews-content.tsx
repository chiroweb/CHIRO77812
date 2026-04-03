"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import FAQSection from "@/components/seo/faq-section";
import InternalLinks from "@/components/seo/internal-links";
import SubCtaBand from "@/components/ui/sub-cta-band";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";
import { JsonLd, generateReviewSchema, generatePageSchema } from "@/lib/schema-helpers";
import { reviews, getAverageRating } from "@/data/reviews";

const PROJECT_TYPE_LABELS: Record<string, string> = {
  website: "홈페이지 제작",
  remodeling: "홈페이지 리모델링",
  "seo-aeo": "SEO/AEO 자동화",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? "text-[#FF4D00]" : "text-[#E0E0E0]"}
        >
          ★
        </span>
      ))}
    </span>
  );
}

const faqQuestions = [
  {
    question: "후기는 실제 고객이 작성한 건가요?",
    answer:
      "네, 모든 후기는 실제 프로젝트를 완료한 고객이 직접 작성한 것입니다. 실명과 회사명을 함께 공개하여 신뢰성을 보장합니다.",
  },
  {
    question: "프로젝트 완료 후 후기를 남길 수 있나요?",
    answer:
      "프로젝트 완료 후 후기 작성을 요청드리고 있습니다. 작성해 주신 후기는 감사의 의미로 다음 유지보수 시 우선 대응해 드립니다.",
  },
  {
    question: "부정적인 후기도 공개하나요?",
    answer:
      "네, 치로웹디자인은 모든 후기를 투명하게 공개합니다. 개선이 필요한 피드백은 서비스 향상에 반영하고 있습니다.",
  },
];

const internalLinks = [
  {
    title: "포트폴리오",
    href: "/portfolio",
    description: "치로웹디자인이 완성한 실제 프로젝트를 확인하세요.",
  },
  {
    title: "문의하기",
    href: "/contact",
    description: "프로젝트 상담 및 무료 진단을 신청하세요.",
  },
  {
    title: "요금 안내",
    href: "/pricing",
    description: "서비스별 투명한 요금 체계를 확인하세요.",
  },
];

export default function ReviewsContent() {
  const averageRating = getAverageRating();

  // JSON-LD schemas
  const reviewSchemas = reviews
    .map((r) =>
      generateReviewSchema({
        author: r.name,
        reviewBody: r.quote,
        ratingValue: r.rating,
        datePublished: r.date,
      })
    )
    .filter((s): s is NonNullable<typeof s> => s !== null);

  const aggregateRating = {
    "@type": "AggregateRating" as const,
    "@id": "https://chiroweb.co.kr/#aggregateRating",
    itemReviewed: { "@id": "https://chiroweb.co.kr/#organization" },
    ratingValue: averageRating,
    bestRating: 5,
    worstRating: 1,
    ratingCount: reviews.length,
  };

  const pageSchema = generatePageSchema([
    ...reviewSchemas,
    aggregateRating,
  ]);

  return (
    <>
      {pageSchema && <JsonLd data={pageSchema} />}

      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-5 md:px-8">
        <div className="max-w-[1280px] mx-auto">
          <Breadcrumbs pathname="/reviews" />
          <SectionLabel number="01" label="Reviews" />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.h1
              variants={fadeInUp}
              className="font-[family-name:var(--font-space-grotesk)] font-light text-[28px] md:text-[44px] tracking-[0.03em] leading-[1.05] mb-6"
            >
              치로웹디자인 고객 후기<span className="text-[#FF4D00]">.</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-sm md:text-base text-[#6b6b6b] leading-[1.8] max-w-2xl"
            >
              치로웹디자인의 고객 후기는 실명과 회사명을 기반으로 투명하게
              공개됩니다. 홈페이지 제작, 리모델링, SEO/AEO 자동화 서비스를 이용한
              고객들의 실제 경험을 확인하세요.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-12 md:py-16 px-5 md:px-8">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-col items-center text-center py-12 md:py-16 border-t border-b border-[#E0E0E0]"
          >
            <span className="font-[family-name:var(--font-space-grotesk)] font-light text-[56px] md:text-[80px] tracking-[0.03em] leading-none text-[#1a1a1a]">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-[24px] md:text-[32px] mt-2">
              <StarRating rating={Math.round(averageRating)} />
            </span>
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b] mt-4">
              {reviews.length}건의 리뷰
            </span>
          </motion.div>
        </div>
      </section>

      {/* Reviews List */}
      <section className="py-[72px] md:py-[120px] px-5 md:px-8">
        <Divider />
        <div className="max-w-[1280px] mx-auto pt-16 md:pt-24">
          <div className="flex flex-col md:flex-row mb-10 md:mb-16">
            <div className="md:w-[30%] md:pr-12 mb-8 md:mb-0">
              <SectionLabel number="02" label="All Reviews" />
            </div>
            <div className="md:w-[70%] md:border-l md:border-[#E0E0E0] md:pl-12">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
              >
                <motion.h2
                  variants={fadeInUp}
                  className="font-[family-name:var(--font-space-grotesk)] font-light text-[28px] md:text-[44px] tracking-[0.03em] leading-[1.05]"
                >
                  What Clients Say<span className="text-[#FF4D00]">.</span>
                </motion.h2>
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="space-y-0 border-t border-[#E0E0E0]"
          >
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                variants={fadeInUp}
                className="py-12 md:py-16 border-b border-[#E0E0E0]"
              >
                <div className="text-base mb-4">
                  <StarRating rating={review.rating} />
                </div>
                <blockquote className="text-[22px] md:text-[32px] font-bold tracking-tight leading-[1.4] text-[#1a1a1a] md:max-w-4xl mb-6">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b]">
                    — {review.name}, {review.company}
                  </span>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#E0E0E0]">
                    |
                  </span>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b]">
                    {PROJECT_TYPE_LABELS[review.projectType]}
                  </span>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#E0E0E0]">
                    |
                  </span>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b]">
                    {review.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        questions={faqQuestions}
        sectionNumber="03"
        sectionLabel="FAQ"
        heading="Questions"
      />

      {/* Internal Links */}
      <InternalLinks links={internalLinks} />

      {/* CTA */}
      <SubCtaBand />
    </>
  );
}
