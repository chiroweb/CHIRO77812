"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";

const processSteps = [
  {
    step: "01",
    title: "상담 및 기획",
    titleEn: "Consultation",
    description:
      "브랜드의 핵심 가치와 목표를 파악합니다. 대상 고객, 경쟁사 분석, 원하는 방향성을 함께 정리합니다.",
  },
  {
    step: "02",
    title: "실시간 빌드",
    titleEn: "Live Build",
    description:
      "기획이 확정되면 즉시 개발에 착수합니다. 실시간 링크를 통해 사이트가 만들어지는 과정을 직접 확인하실 수 있습니다.",
  },
  {
    step: "03",
    title: "피드백 반영",
    titleEn: "Feedback",
    description:
      "진행 중 언제든 피드백을 주실 수 있습니다. 수정 사항은 실시간으로 반영되어 즉시 확인 가능합니다.",
  },
  {
    step: "04",
    title: "런칭 및 인수인계",
    titleEn: "Launch",
    description:
      "최종 검수 후 사이트를 런칭합니다. 관리자 교육과 유지보수 가이드를 함께 제공합니다.",
  },
];

export default function LiveProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section className="py-[120px] px-8">
      <Divider />
      <div className="max-w-[1280px] mx-auto pt-24">
        {/* 30/70 Split Header */}
        <div className="flex flex-col md:flex-row mb-20">
          <div className="md:w-[30%] md:pr-12 mb-8 md:mb-0">
            <SectionLabel number="03" label="Process" />
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
                상담과 동시에
                <br />
                사이트가 만들어집니다<span className="text-[#FF4D00]">.</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="mt-8 text-base md:text-lg text-[#6b6b6b] leading-[1.7] max-w-lg"
              >
                링크 하나로 모든 과정을 지켜보실 수 있습니다. 치로의 실시간 빌드
                프로세스를 경험하십시오.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div ref={containerRef} className="relative">
          {/* Center vertical line (gray background) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#E0E0E0] md:-translate-x-1/2" />

          {/* Filled portion (Red-Orange, grows with scroll) */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 w-[1px] bg-[#FF4D00] md:-translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />

          {/* Steps */}
          <div className="relative">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className={`flex items-start mb-20 last:mb-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content - Desktop alternating sides */}
                <div
                  className={`pl-12 md:pl-0 md:w-[45%] ${
                    i % 2 === 0
                      ? "md:pr-16 md:text-right"
                      : "md:pl-16 md:text-left"
                  }`}
                >
                  <span className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] block mb-2">
                    Step {step.step}
                  </span>
                  <h3 className="text-xl md:text-2xl font-normal tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <span className="text-xs tracking-[0.15em] uppercase text-[#9b9b9b] block mb-4">
                    {step.titleEn}
                  </span>
                  <p className="text-sm md:text-base text-[#6b6b6b] leading-[1.7]">
                    {step.description}
                  </p>
                </div>

                {/* Timeline node */}
                <div className="absolute left-4 md:static md:w-[10%] flex justify-center items-start pt-1">
                  <div className="w-3 h-3 rounded-full border-2 border-[#E0E0E0] bg-white relative z-10" />
                </div>

                {/* Spacer for alternating side */}
                <div className="hidden md:block md:w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
