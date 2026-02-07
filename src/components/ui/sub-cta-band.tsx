"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/motion";

export default function SubCtaBand() {
  return (
    <section className="py-[72px] md:py-[100px] px-5 md:px-8 bg-[#1a1a1a]">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        >
          <motion.div variants={fadeInUp}>
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#6b6b6b] mb-4">
              Next Step
            </p>
            <h3 className="font-[family-name:var(--font-space-grotesk)] font-light text-[24px] md:text-[36px] tracking-[0.03em] leading-[1.15] text-white">
              프로젝트를 시작하십시오<span className="text-[#FF4D00]">.</span>
            </h3>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-[#FF4D00] text-white w-full md:w-auto px-8 py-3.5 text-sm tracking-[0.05em] transition-all duration-300 hover:bg-[#FF4D00] cursor-pointer"
            >
              무료 진단 신청
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
