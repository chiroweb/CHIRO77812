"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";

const testimonials = [
  {
    quote:
      "다른 에이전시에서는 시안 나올 때까지 2주를 기다렸습니다. 치로는 상담한 당일에 링크를 보내줬습니다. 실시간으로 만들어지는 걸 보는 경험은 처음이었습니다.",
    name: "김도현",
    title: "스타트업 대표",
    project: "브랜드 사이트 구축",
  },
  {
    quote:
      "아임웹으로 직접 만들어보려다 한계를 느꼈습니다. 치로에 맡기고 나서야 제가 원했던 그 느낌이 나왔습니다. 과정이 투명해서 불안함이 없었습니다.",
    name: "박서연",
    title: "뷰티 브랜드 운영",
    project: "이커머스 리뉴얼",
  },
  {
    quote:
      "수정사항을 말하면 바로 반영되는 게 신기했습니다. 기다림이 없으니까 오히려 더 꼼꼼하게 요청할 수 있었습니다. 결과물의 퀄리티도 기대 이상이었습니다.",
    name: "이준혁",
    title: "법률사무소 대표",
    project: "기업 홈페이지 제작",
  },
];

export default function Testimonials() {
  return (
    <section className="py-[120px] px-8">
      <Divider />
      <div className="max-w-[1280px] mx-auto pt-24">
        {/* 30/70 Split Layout */}
        <div className="flex flex-col md:flex-row mb-16">
          <div className="md:w-[30%] md:pr-12 mb-8 md:mb-0">
            <SectionLabel number="05" label="Testimonials" />
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
                className="text-3xl md:text-[40px] font-[family-name:var(--font-noto-serif-kr)] tracking-tight leading-[1.2]"
              >
                클라이언트의 이야기<span className="text-[#FF4D00]">.</span>
              </motion.h2>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#E0E0E0]"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeInUp}
              className="bg-white p-8 md:p-10 flex flex-col justify-between"
            >
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-6">
                  {t.project}
                </p>
                <blockquote className="text-base text-[#1a1a1a] leading-[1.8] mb-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <div className="pt-6 border-t border-[#E0E0E0]">
                <p className="text-sm font-normal text-[#1a1a1a]">{t.name}</p>
                <p className="text-xs text-[#6b6b6b] mt-1">{t.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
