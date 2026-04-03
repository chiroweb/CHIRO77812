"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";

const blocks = [
  {
    number: "01",
    title: "심리학 기반 기획",
    description: "심리학 전공 디렉터가 사용자의 행동을 설계합니다",
  },
  {
    number: "02",
    title: "코드 레벨 SEO",
    description: "플러그인이 아닌 코드 자체가 SEO입니다",
  },
  {
    number: "03",
    title: "실시간 빌드",
    description: "상담 당일 링크를 보내드립니다. 평균 3.8일 완성",
  },
  {
    number: "04",
    title: "올인원 가격",
    description: "디자인, 개발, SEO, CMS 모두 포함된 정찰제",
  },
];

export default function WhyChiro() {
  return (
    <section className="py-[72px] md:py-[120px] px-5 md:px-8">
      <div className="max-w-[1280px] mx-auto">
        <Divider />
        <div className="pt-16 md:pt-24">
          <SectionLabel number="03" label="Why CHIRO" />

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[44px] font-light tracking-[0.03em] leading-[1.05] mb-10 md:mb-16"
          >
            여기는 다릅니다<span className="text-[#FF4D00]">.</span>
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#E0E0E0]"
          >
            {blocks.map((block) => (
              <motion.div
                key={block.number}
                variants={fadeInUp}
                className="bg-white p-8 md:p-10"
              >
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b] block mb-6">
                  {block.number}
                </span>
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-3">
                  {block.title}
                </h3>
                <p className="text-base text-[#6b6b6b] leading-[1.7]">
                  {block.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
