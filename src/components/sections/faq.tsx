"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";

const faqs = [
  {
    question: "실시간 빌드 링크란 무엇인가요?",
    answer:
      "상담 후 제공되는 웹 링크를 통해, 사이트가 만들어지는 과정을 실시간으로 확인하실 수 있습니다. 별도의 프로그램 설치 없이, 브라우저에서 바로 확인 가능합니다. 수정사항을 말씀해 주시면 즉시 반영되는 것을 직접 보실 수 있습니다.",
  },
  {
    question: "평균 4일이면 정말 완성되나요?",
    answer:
      "페이지 수와 복잡도에 따라 다르지만, 일반적인 기업 홈페이지(5페이지 이내) 기준 평균 4일 이내에 완성됩니다. 불필요한 기획서 대기, 시안 승인 과정을 없앴기 때문에 가능합니다. 상담과 동시에 빌드가 시작됩니다.",
  },
  {
    question: "수정은 몇 번까지 가능한가요?",
    answer:
      "횟수 제한이 없습니다. 실시간 빌드 과정에서 자유롭게 수정 요청을 하실 수 있습니다. 기존 에이전시처럼 '수정 3회 포함' 같은 제한을 두지 않습니다. 만족하실 때까지 함께 만들어갑니다.",
  },
  {
    question: "아임웹이나 카페24에서 이전할 수 있나요?",
    answer:
      "가능합니다. 기존 사이트의 콘텐츠와 구조를 분석한 후, 커스텀 빌드로 이전합니다. 도메인, 이메일 등 기존 설정도 그대로 유지됩니다. 이전 과정에서 서비스가 중단되지 않도록 설계합니다.",
  },
  {
    question: "유지보수는 어떻게 이루어지나요?",
    answer:
      "런칭 후에도 콘텐츠 수정, 페이지 추가, 성능 모니터링 등을 지원합니다. 유지보수 플랜을 선택하시면 월간 리포트와 함께 지속적인 관리를 받으실 수 있습니다. 긴급 수정은 당일 대응합니다.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-[120px] px-8">
      <Divider />
      <div className="max-w-[1280px] mx-auto pt-24">
        {/* 30/70 Split Layout */}
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Sticky */}
          <div className="md:w-[30%] md:pr-12 mb-8 md:mb-0">
            <div className="md:sticky md:top-32">
              <SectionLabel number="07" label="FAQ" />
              <motion.h2
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="text-2xl md:text-[32px] font-[family-name:var(--font-noto-serif-kr)] tracking-tight leading-[1.3]"
              >
                자주 묻는 질문<span className="text-[#FF4D00]">.</span>
              </motion.h2>
            </div>
          </div>

          {/* Right Column - Questions */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="md:w-[70%] md:border-l md:border-[#E0E0E0] md:pl-12"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="border-b border-[#E0E0E0]"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full py-6 flex items-start justify-between gap-8 text-left cursor-pointer group"
                >
                  <span className="text-sm md:text-base text-[#1a1a1a] leading-[1.5] group-hover:opacity-60 transition-opacity duration-300">
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 w-5 h-5 flex items-center justify-center text-[#9b9b9b] transition-transform duration-300 ${
                      openIndex === index ? "rotate-45" : ""
                    }`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <line x1="7" y1="0" x2="7" y2="14" />
                      <line x1="0" y1="7" x2="14" y2="7" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-sm text-[#6b6b6b] leading-[1.8] max-w-lg">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
