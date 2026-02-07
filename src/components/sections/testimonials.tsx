"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";

const testimonials = [
  {
    quote:
      "다른 에이전시에서는 시안 나올 때까지 2주를 기다렸습니다. 치로는 상담한 당일에 링크를 보내줬습니다.",
    name: "김도현",
    title: "스타트업 대표",
    year: "2024",
  },
  {
    quote:
      "아임웹으로 직접 만들어보려다 한계를 느꼈습니다. 치로에 맡기고 나서야 제가 원했던 그 느낌이 나왔습니다.",
    name: "박서연",
    title: "뷰티 브랜드 운영",
    year: "2024",
  },
  {
    quote:
      "수정사항을 말하면 바로 반영되는 게 신기했습니다. 기다림이 없으니까 오히려 더 꼼꼼하게 요청할 수 있었습니다.",
    name: "이준혁",
    title: "법률사무소 대표",
    year: "2025",
  },
];

export default function Testimonials() {
  return (
    <section className="py-[72px] md:py-[120px] px-5 md:px-8">
      <Divider />
      <div className="max-w-[1280px] mx-auto pt-16 md:pt-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row mb-10 md:mb-16">
          <div className="md:w-[30%] md:pr-12 mb-8 md:mb-0">
            <SectionLabel number="04" label="Testimonials" />
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
                What We Hear<span className="text-[#FF4D00]">.</span>
              </motion.h2>
            </motion.div>
          </div>
        </div>

        {/* Full-width quotes */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="space-y-0 border-t border-[#E0E0E0]"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeInUp}
              className="py-12 md:py-16 border-b border-[#E0E0E0]"
            >
              <blockquote className="text-[22px] md:text-[32px] font-bold tracking-tight leading-[1.4] text-[#1a1a1a] md:max-w-4xl mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b]">
                  — {t.name}, {t.title}, {t.year}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Example Notice */}
        <p className="mt-6 font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#9b9b9b] text-right">
          ※ 서비스 경험을 기반으로 재구성한 예시입니다.
        </p>
      </div>
    </section>
  );
}
