"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import { reviews } from "@/data/reviews";
import SubpageHero from "@/components/sections/subpage-hero";
import SubNav from "@/components/ui/sub-nav";
import FaqTwoColumn from "@/components/sections/faq-two-column";
import CtaContact from "@/components/sections/cta-contact";

/* ─────────────────────────────────────
   JSON-LD — Review Schema
───────────────────────────────────── */

const reviewJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://chiroweb.co.kr/#organization",
  name: "치로웹디자인",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0",
    reviewCount: reviews.length,
    bestRating: "5",
    worstRating: "1",
  },
  review: reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: "5",
    },
    reviewBody: r.quote,
  })),
};

/* ─────────────────────────────────────
   Data
───────────────────────────────────── */

const subNavItems = [
  { label: "VOICES", href: "#voices" },
  { label: "ALL REVIEWS", href: "#all-reviews" },
  { label: "EXTERNAL", href: "#external" },
  { label: "FAQ", href: "#faq" },
];

const projectTypeLabels: Record<string, string> = {
  website: "홈페이지 제작",
  remodeling: "리모델링",
  "seo-aeo": "SEO/AEO",
};

const reviewFaqs = [
  { q: "후기는 실제 고객이 작성한 건가요?", a: "네, 모든 후기는 실명과 회사명이 공개된 실제 클라이언트의 리뷰입니다. 허위 후기는 없습니다." },
  { q: "프로젝트 완료 후 후기를 남길 수 있나요?", a: "프로젝트 완료 후 별도의 후기 작성을 요청드리며, 작성 여부는 전적으로 클라이언트의 자유입니다." },
  { q: "외부 플랫폼에서도 후기를 확인할 수 있나요?", a: "크몽, 숨고 등 외부 플랫폼에서도 치로웹디자인의 후기를 확인하실 수 있습니다." },
  { q: "불만족 시 어떻게 하나요?", a: "프로젝트 진행 중 불만족 사항이 있으면 즉시 수정합니다. 수정 횟수에 제한이 없으며, 만족할 때까지 작업합니다." },
  { q: "후기 작성에 대한 인센티브를 제공하나요?", a: "어떠한 보상도 제공하지 않습니다. 할인, 사은품, 리워드 모두 없습니다. 작성 동기가 후기 신뢰도에 영향을 주기 때문에, 자발적으로 작성된 글만 게재합니다." },
  { q: "프로젝트 진행 중 소통은 어떻게 하나요?", a: "실시간 빌드 링크로 작업 현황을 즉시 확인할 수 있습니다. 카카오톡, 이메일 등 편한 채널로 소통하며, 피드백 반영도 즉시 이루어집니다." },
];

const ITEMS_PER_PAGE = 4;

/* ─────────────────────────────────────
   Component
───────────────────────────────────── */

export default function ReviewsContent() {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const visible = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  }, []);

  // Pick the first 2 reviews for featured editorial spreads
  const featured = reviews.slice(0, 2);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />

      {/* ── Hero ── */}
      <SubpageHero
        title="REVIEWS"
        label="( Client Reviews )"
        image="https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/hero/handshake.png"
      />

      {/* ── SubNav ── */}
      <SubNav pageLabel="REVIEWS MENU" items={subNavItems} />

      {/* ══════════════════════════════════════
         01. OPENING — 에디토리얼 선언
         거대 타이포 + 평점 요약 (카운트업 없이)
      ══════════════════════════════════════ */}
      <section
        className="py-[200px] md:py-[260px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#f5f5f0" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-10 md:mb-14"
          >
            ( CLIENT REVIEWS )
          </motion.p>

          <div className="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-20">
            {/* Left: Display */}
            <div className="flex-1 min-w-0">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="text-[48px] md:text-[72px] lg:text-[96px] font-extrabold tracking-[-0.03em] leading-[0.9] text-[#111] uppercase mb-4"
              >
                WORDS
                <br />
                FROM
                <br />
                <span className="text-[#C0C0C0]">CLIENTS.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[14px] md:text-[15px] mt-4"
                style={{ color: "#999" }}
              >
                실제 클라이언트의 목소리.
              </motion.p>
            </div>

            {/* Right: Rating summary — minimal, no countup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:w-[30%] shrink-0 lg:pb-4"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-[56px] md:text-[72px] font-extrabold tracking-[-0.03em] leading-[1.0] text-[#111]">
                  {avgRating}
                </span>
                <span className="text-[18px] text-[#C0C0C0] font-medium">/ 5.0</span>
              </div>
              <p className="text-[13px] text-[#999] font-[family-name:var(--font-jetbrains-mono)] tracking-[0.04em]">
                {reviews.length}개 리뷰 평균
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         02. FEATURED VOICES — 에디토리얼 인용 스프레드
         좌/우 교차, 대형 인용문
      ══════════════════════════════════════ */}
      <section
        id="voices"
        className="py-[120px] md:py-[160px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#111" }}
        data-theme="dark"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.4 }}
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#555] mb-20 md:mb-28"
          >
            ( FEATURED VOICES )
          </motion.p>

          <div className="space-y-24 md:space-y-32">
            {featured.map((review, i) => {
              const isOffset = i % 2 === 1;

              return (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.6 }}
                  className={isOffset ? "lg:ml-auto lg:w-[70%]" : "lg:w-[70%]"}
                >
                  {/* Large quote */}
                  <blockquote
                    className="mb-10"
                    style={{ borderLeft: "2px solid rgba(255,255,255,0.15)", paddingLeft: "2rem" }}
                  >
                    <p className="text-[20px] md:text-[28px] lg:text-[32px] text-white/80 leading-[1.5] font-light italic">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                  </blockquote>

                  {/* Author info */}
                  <div className="flex items-center gap-6"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem" }}
                  >
                    <div>
                      <p className="text-[16px] md:text-[18px] font-semibold text-white leading-[1.2]">
                        {review.name}
                      </p>
                      <p className="text-[13px] text-white/40 mt-1">
                        {review.company}
                      </p>
                    </div>
                    <span className="ml-auto flex items-center gap-2">
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] tracking-[0.04em] uppercase font-[family-name:var(--font-jetbrains-mono)]"
                        style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}
                      >
                        {projectTypeLabels[review.projectType] || review.projectType}
                      </span>
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         03. ALL REVIEWS — 깔끔한 스택 리스트 + 더보기
      ══════════════════════════════════════ */}
      <section
        id="all-reviews"
        className="py-[160px] md:py-[220px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#f5f5f0" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.5 }}
            >
              <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-6">
                ( ALL REVIEWS )
              </p>
              <h2 className="text-[48px] md:text-[72px] lg:text-[96px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-[#111]">
                ALL
                <br />
                <span className="text-[#C0C0C0]">VOICES.</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] text-[#999]"
            >
              {reviews.length}개의 리뷰
            </motion.p>
          </div>

          {/* Review list */}
          <AnimatePresence mode="popLayout">
            <motion.div layout className="space-y-0">
              {visible.map((review, i) => (
                <motion.div
                  key={review.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className="py-10 md:py-12"
                  style={{ borderBottom: "1px solid #ddd" }}
                >
                  <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                    {/* Left: Author + meta */}
                    <div className="md:w-[200px] lg:w-[240px] shrink-0">
                      <p className="text-[18px] md:text-[20px] font-semibold text-[#111] leading-[1.2] mb-2">
                        {review.name}
                      </p>
                      <p className="text-[13px] text-[#999] mb-4">
                        {review.company}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="inline-block px-3 py-1 rounded-full text-[10px] tracking-[0.04em] uppercase bg-[#111] text-white font-[family-name:var(--font-jetbrains-mono)]">
                          {projectTypeLabels[review.projectType] || review.projectType}
                        </span>
                        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#bbb]">
                          {review.date}
                        </span>
                      </div>
                    </div>

                    {/* Right: Quote */}
                    <div className="flex-1">
                      <blockquote
                        style={{ borderLeft: "2px solid #111", paddingLeft: "1.5rem" }}
                      >
                        <p className="text-[16px] md:text-[18px] text-[#333] leading-[1.85] italic">
                          &ldquo;{review.quote}&rdquo;
                        </p>
                      </blockquote>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Load more */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mt-14 text-center"
            >
              <button
                onClick={handleLoadMore}
                className="inline-block text-[13px] tracking-[0.06em] uppercase font-medium py-3.5 px-12 rounded-full border border-[#ddd] text-[#999] hover:border-[#111] hover:text-[#111] transition-all duration-300 font-[family-name:var(--font-jetbrains-mono)]"
              >
                더보기 ({reviews.length - visibleCount}개 남음)
              </button>
            </motion.div>
          )}

          <p className="mt-6 text-center font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] text-[#ccc]">
            {visible.length} / {reviews.length}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
         04. EXTERNAL — 외부 플랫폼
         에디토리얼: 다크, 좌측 타이포 + 우측 링크
      ══════════════════════════════════════ */}
      <section
        id="external"
        className="py-[120px] md:py-[160px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#111" }}
        data-theme="dark"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-20">
            {/* Left: Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.5 }}
              className="lg:w-[50%]"
            >
              <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#555] mb-6">
                ( EXTERNAL )
              </p>
              <h3 className="text-[36px] md:text-[48px] lg:text-[64px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-white">
                ALSO
                <br />
                <span style={{ color: "#C0C0C0" }}>ON.</span>
              </h3>
              <p className="text-[14px] text-white/35 mt-4">
                외부 플랫폼에서도 치로의 후기를 확인하실 수 있습니다.
              </p>
            </motion.div>

            {/* Right: Links */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="lg:w-[50%] space-y-0"
            >
              {[
                { name: "크몽", url: "https://kmong.com", desc: "프리랜서 마켓플레이스" },
                { name: "숨고", url: "https://soomgo.com", desc: "전문가 매칭 플랫폼" },
              ].map((platform) => (
                <motion.a
                  key={platform.name}
                  variants={fadeInUp}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-6 group"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div>
                    <p className="text-[18px] md:text-[22px] font-semibold text-white group-hover:text-[#C0C0C0] transition-colors duration-300">
                      {platform.name}
                    </p>
                    <p className="text-[12px] text-white/30 mt-1">{platform.desc}</p>
                  </div>
                  <span className="text-white/30 group-hover:text-white transition-colors duration-300 text-[18px]">
                    ↗
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         05. FAQ
      ══════════════════════════════════════ */}
      <div id="faq">
        <FaqTwoColumn faqs={reviewFaqs} sectionLabel="( FAQ )" />
      </div>

      {/* ══════════════════════════════════════
         06. CTA
      ══════════════════════════════════════ */}
      <CtaContact />
    </>
  );
}
