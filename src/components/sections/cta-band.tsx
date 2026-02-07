"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/motion";
import Button from "@/components/ui/button";

export default function CtaBand() {
  return (
    <section id="cta-band" className="py-[72px] md:py-[120px] px-5 md:px-8 bg-[#1a1a1a]">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <div className="grid grid-cols-4 md:grid-cols-12 gap-6 items-center">
            <motion.div
              variants={fadeInUp}
              className="col-span-4 md:col-span-7 text-center md:text-left"
            >
              <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#6b6b6b] mb-6">
                Start Your Project
              </p>
              <h2 className="font-[family-name:var(--font-space-grotesk)] font-light text-[28px] md:text-[44px] tracking-[0.03em] leading-[1.05] text-white mb-3">
                Let&apos;s Begin<span className="text-[#FF4D00]">.</span>
              </h2>
              <p className="text-[18px] md:text-[22px] font-medium text-white/50 tracking-tight leading-[1.5] md:max-w-md">
                30분 무료 상담으로 시작하십시오.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="col-span-4 md:col-span-3 md:col-start-10 text-center md:text-right mt-8 md:mt-0"
            >
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-[#FF4D00] text-white w-full md:w-auto px-8 py-3.5 text-sm tracking-[0.05em] transition-all duration-300 hover:bg-[#FF4D00] cursor-pointer"
              >
                무료 진단 신청
              </a>
              <p className="mt-4 font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#6b6b6b] tracking-wide">
                평균 응답 시간 24시간 이내
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
