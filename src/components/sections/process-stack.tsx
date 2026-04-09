"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/motion";

const steps = [
  {
    step: "01",
    title: "상담",
    headline: "30분 무료 상담으로 시작합니다",
    description:
      "요구사항 분석, 경쟁사 조사, 방향 수립까지. 상담 당일 구체적인 제안서와 견적을 받아보실 수 있습니다.",
    details: [
      "요구사항 분석 & 목표 설정",
      "경쟁사 사이트 분석",
      "방향성 제안 & 견적",
    ],
  },
  {
    step: "02",
    title: "기획",
    headline: "심리학 기반으로 전환 동선을 설계합니다",
    description:
      "인지 편향, 앵커링 효과, 손실 회피를 활용한 UX 구조를 설계합니다. 와이어프레임과 콘텐츠 전략까지.",
    details: [
      "심리학 기반 UX 설계",
      "콘텐츠 전략 수립",
      "와이어프레임 & 프로토타입",
    ],
  },
  {
    step: "03",
    title: "제작",
    headline: "실시간 빌드 링크로 매 순간을 함께",
    description:
      "코드 레벨 SEO/AEO까지 내장된 반응형 사이트를 제작합니다. 실시간 빌드 링크로 과정을 직접 확인하세요.",
    details: [
      "반응형 커스텀 코딩",
      "코드 레벨 SEO/AEO",
      "실시간 빌드 링크",
    ],
  },
  {
    step: "04",
    title: "검토",
    headline: "Lighthouse 기반으로 품질을 검증합니다",
    description:
      "퍼포먼스, 접근성, SEO 점수를 검증하고 피드백을 반영합니다. 완벽한 상태로 런칭을 준비합니다.",
    details: [
      "Lighthouse 퍼포먼스 검증",
      "접근성 & SEO 점검",
      "피드백 반영 & 수정",
    ],
  },
  {
    step: "05",
    title: "런칭",
    headline: "완성된 사이트를 즉시 배포합니다",
    description:
      "도메인 연결, 구조화 데이터 확인까지 한 번에. 런칭 후에도 안정화 기간 동안 무상 지원합니다.",
    details: [
      "도메인 연결 & 배포",
      "구조화 데이터 & sitemap",
      "다운타임 0",
    ],
  },
];

const contentVariants = {
  enter: { opacity: 0, y: 40 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
};

const transition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

export default function ProcessStack() {
  const [active, setActive] = useState(0);

  return (
    <section className="min-h-screen flex items-center py-[200px] md:py-[260px] px-5 md:px-8 lg:px-16 bg-[#1a1a1a]" data-theme="dark">
      <div className="max-w-[1280px] mx-auto w-full">
        {/* Header */}
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-[36px] md:text-[56px] lg:text-[72px] font-extrabold tracking-[-0.03em] leading-[1.1] text-white mb-16 md:mb-24"
        >
          How We Work<span className="text-[#FF4D00]">.</span>
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          {/* Left: Step selector (horizontal on mobile, vertical on desktop) */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex md:flex-col gap-0 md:w-[280px] shrink-0"
          >
            {steps.map((step, i) => (
              <button
                key={step.step}
                onClick={() => setActive(i)}
                className={`group text-left py-6 md:py-8 border-t cursor-pointer transition-all duration-300 flex-1 md:flex-none ${
                  i === active
                    ? "border-[#FF4D00]"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.2em] uppercase text-white/40 block mb-2">
                  Step {step.step}
                </span>
                <span
                  className={`text-[24px] md:text-[32px] font-extrabold tracking-[-0.02em] transition-colors duration-300 ${
                    i === active ? "text-white" : "text-white/25"
                  }`}
                >
                  {step.title}
                  <span className="text-[#FF4D00]">.</span>
                </span>
              </button>
            ))}
          </motion.div>

          {/* Right: Content panel */}
          <div className="flex-1 min-h-[300px] md:min-h-[360px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
                className="md:pt-8"
              >
                <p className="text-[22px] md:text-[28px] lg:text-[32px] font-semibold text-white leading-[1.3] mb-6">
                  {steps[active].headline}
                </p>

                <p className="text-base md:text-lg text-white/50 leading-[1.8] mb-10 max-w-lg">
                  {steps[active].description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {steps[active].details.map((detail, i) => (
                    <motion.span
                      key={detail}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.3 }}
                      className="inline-flex items-center px-4 py-2 text-sm text-white/70 border border-white/10 rounded-full"
                    >
                      {detail}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
