"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/motion";

export default function HeroStatement() {
  return (
    <section
      className="relative bg-[#1a1a1a] py-[120px] md:py-[160px] px-5 md:px-8 lg:px-16"
      data-theme="dark"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Large serif italic statement */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-[28px] md:text-[40px] lg:text-[52px] leading-[1.3] tracking-[-0.02em] text-white font-light italic max-w-[800px]"

        >
          심리학으로 설계하고, 코드 레벨에서 구현하는 — 가장 빠르고 효율적인 웹
          에이전시<span className="text-[#FF4D00]">.</span>
        </motion.p>

        {/* Right-aligned body text */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-16 md:mt-24 flex justify-end"
        >
          <p className="text-base md:text-lg text-white/50 leading-[1.8] max-w-[480px] text-right">
            방문자를 고객으로 전환시키는 것은 디자인이 아닙니다.
            <br />
            인지 편향, 손실 회피, 사회적 증거 — 검증된 심리학 원리를 코드
            레벨에서 구현합니다. SEO와 AEO까지, 모든 것이 설계된
            결과입니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
