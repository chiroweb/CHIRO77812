"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";

interface ContactCtaSectionProps {
  variant?: "default" | "diagnosis";
}

export default function ContactCtaSection({
  variant = "default",
}: ContactCtaSectionProps) {
  const isDiagnosis = variant === "diagnosis";

  return (
    <section
      id="cta-band"
      className="bg-[#1a1a1a] py-[200px] md:py-[260px] px-5 md:px-12 lg:px-20"
      data-theme="dark"
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
        >
          {/* Section label */}
          <motion.p
            variants={fadeInUp}
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#555] mb-8"
          >
            {isDiagnosis ? "( Free Diagnosis )" : "( Start Your Project )"}
          </motion.p>

          {/* Display heading */}
          <motion.h2
            variants={fadeInUp}
            className="text-[48px] md:text-[80px] lg:text-[112px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] uppercase mb-16 md:mb-20"
          >
            LET&apos;S
            <br />
            START.
          </motion.h2>

          {/* CTA entry points */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          >
            {isDiagnosis ? (
              <>
                {/* Primary: diagnosis */}
                <a
                  href="/free-diagnosis"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#111] px-8 py-4 text-[13px] font-semibold tracking-[0.05em] rounded-full transition-all duration-300 hover:bg-white/90 cursor-pointer"
                >
                  무료 사이트 진단 받기
                  <span className="text-[16px]">→</span>
                </a>
                {/* Secondary: contact */}
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 text-[13px] font-semibold tracking-[0.05em] rounded-full transition-all duration-300 hover:border-white/50 cursor-pointer"
                >
                  프로젝트 상담 신청
                </a>
              </>
            ) : (
              <>
                {/* Primary: contact */}
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#111] px-8 py-4 text-[13px] font-semibold tracking-[0.05em] rounded-full transition-all duration-300 hover:bg-white/90 cursor-pointer"
                >
                  프로젝트 상담 신청
                  <span className="text-[16px]">→</span>
                </a>
                {/* Secondary: diagnosis */}
                <a
                  href="/free-diagnosis"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 text-[13px] font-semibold tracking-[0.05em] rounded-full transition-all duration-300 hover:border-white/50 cursor-pointer"
                >
                  무료 사이트 진단 받기
                </a>
              </>
            )}
          </motion.div>

          {/* Footnote */}
          <motion.p
            variants={fadeInUp}
            className="mt-8 font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#555] tracking-wide"
          >
            평균 응답 시간 24시간 이내 · 계약 강요 없음
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
