"use client";

import { reviews } from "@/data/reviews";
import SubpageHero from "@/components/sections/subpage-hero";
import ReviewGrid from "@/components/sections/review-grid";
import FaqTwoColumn from "@/components/sections/faq-two-column";
import ContactCtaSection from "@/components/sections/contact-cta-section";
import { motion } from "framer-motion";

const reviewFaqs = [
  { q: "후기는 실제 고객이 작성한 건가요?", a: "네, 모든 후기는 실명과 회사명이 공개된 실제 클라이언트의 리뷰입니다. 허위 후기는 없습니다." },
  { q: "프로젝트 완료 후 후기를 남길 수 있나요?", a: "프로젝트 완료 후 별도의 후기 작성을 요청드리며, 작성 여부는 전적으로 클라이언트의 자유입니다." },
  { q: "외부 플랫폼에서도 후기를 확인할 수 있나요?", a: "크몽, 숨고 등 외부 플랫폼에서도 치로웹디자인의 후기를 확인하실 수 있습니다." },
  { q: "불만족 시 어떻게 하나요?", a: "프로젝트 진행 중 불만족 사항이 있으면 즉시 수정합니다. 수정 횟수에 제한이 없으며, 만족할 때까지 작업합니다." },
];

const avgRating = reviews.length > 0
  ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
  : "5.0";

export default function ReviewsContent() {
  return (
    <>
      <SubpageHero
        title="REVIEWS"
        label="( Client Reviews )"
      />

      {/* Average Rating */}
      <section className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 py-[120px] md:py-[160px]">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-[28px] md:text-[36px] text-amber-400">★</span>
              ))}
            </div>
            <p className="text-[48px] md:text-[64px] font-extrabold text-[#111] tracking-[-0.02em]">{avgRating}</p>
            <p className="text-[14px] text-[#999] mt-2">{reviews.length}개의 리뷰</p>
          </motion.div>
        </div>
      </section>

      {/* Review Grid */}
      <ReviewGrid reviews={reviews.map(r => ({ name: r.name, company: r.company, projectType: r.projectType, rating: r.rating, quote: r.quote }))} />

      {/* External Links */}
      <section className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 py-[160px] md:py-[200px]">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[11px] tracking-[0.08em] uppercase text-[#999] mb-8 font-[family-name:var(--font-jetbrains-mono)]">
            ( EXTERNAL )
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <a href="https://kmong.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-4 bg-white border border-[#e5e5e5] rounded-xl hover:border-[#111] transition-colors">
              <span className="text-[15px] font-medium text-[#111]">크몽에서 후기 보기</span>
              <span className="text-[#999]">↗</span>
            </a>
            <a href="https://soomgo.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-4 bg-white border border-[#e5e5e5] rounded-xl hover:border-[#111] transition-colors">
              <span className="text-[15px] font-medium text-[#111]">숨고에서 후기 보기</span>
              <span className="text-[#999]">↗</span>
            </a>
          </div>
        </div>
      </section>

      <FaqTwoColumn faqs={reviewFaqs} />
      <ContactCtaSection />
    </>
  );
}
