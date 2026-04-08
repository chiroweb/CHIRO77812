"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";

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
    <section className="min-h-[80vh] flex items-center py-[120px] md:py-[160px] px-5 md:px-8 lg:px-16 bg-[#fafaf8]">
      <div className="max-w-[1280px] mx-auto w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-[36px] md:text-[56px] lg:text-[72px] font-extrabold tracking-[-0.03em] leading-[1.1] text-[#1a1a1a] mb-16 md:mb-24"
          >
            What We Hear<span className="text-[#FF4D00]">.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="space-y-0"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeInUp}
              className={`py-12 md:py-16 ${i < testimonials.length - 1 ? "border-b border-[#E0E0E0]" : ""}`}
            >
              <blockquote className="text-[24px] md:text-[36px] font-bold tracking-tight leading-[1.35] text-[#1a1a1a] md:max-w-4xl mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a1a1a]">
                    {t.name}
                  </p>
                  <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.15em] uppercase text-[#9b9b9b]">
                    {t.title} · {t.year}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
