"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";

const comparisons = [
  {
    aspect: "제작 시작",
    others: "상담 → 기획서 작성 → 시안 제작 (2~4주 소요)",
    chiro: "상담 당일 빌드 시작, 실시간 확인 링크 제공",
  },
  {
    aspect: "수정 요청",
    others: "메일로 요청 → 시안 수정 → 재확인 (3~7일)",
    chiro: "요청 즉시 반영, 링크에서 실시간 확인",
  },
  {
    aspect: "진행 상황 확인",
    others: "중간 보고 메일, 일정 미팅",
    chiro: "24시간 접근 가능한 실시간 빌드 링크",
  },
  {
    aspect: "완성까지 기간",
    others: "평균 4~8주",
    chiro: "평균 4일",
  },
  {
    aspect: "소통 방식",
    others: "담당자 배정, 전달 과정에서 의도 왜곡 가능",
    chiro: "디렉터 직접 소통, 기획부터 개발까지 1인 전담",
  },
];

export default function Comparison() {
  return (
    <section className="py-[120px] px-8">
      <Divider />
      <div className="max-w-[1280px] mx-auto pt-24">
        {/* 30/70 Split Layout */}
        <div className="flex flex-col md:flex-row mb-16">
          <div className="md:w-[30%] md:pr-12 mb-8 md:mb-0">
            <SectionLabel number="06" label="Why CHIRO" />
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
                className="text-3xl md:text-[40px] font-[family-name:var(--font-noto-serif-kr)] tracking-tight leading-[1.2] mb-6"
              >
                같은 결과, 다른 과정<span className="text-[#FF4D00]">.</span>
              </motion.h2>
          <motion.p
                variants={fadeInUp}
                className="text-base text-[#6b6b6b] leading-[1.7] max-w-xl"
              >
                일반적인 웹 에이전시와 치로의 프로세스를 비교합니다. 결과물이 아닌
                과정에서 차이가 만들어집니다.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Desktop Table */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <div className="hidden md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#E0E0E0]">
                  <th className="text-left py-5 pr-8 w-[20%]">
                    <span className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] font-normal">
                      항목
                    </span>
                  </th>
                  <th className="text-left py-5 px-8 w-[40%]">
                    <span className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] font-normal">
                      일반 에이전시
                    </span>
                  </th>
                  <th className="text-left py-5 px-8 w-[40%] bg-[#fafaf8]">
                    <span className="text-xs tracking-[0.2em] uppercase text-[#1a1a1a] font-normal">
                      CHIRO
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row) => (
                  <motion.tr
                    key={row.aspect}
                    variants={fadeInUp}
                    className="border-b border-[#E0E0E0]"
                  >
                    <td className="py-5 pr-8 text-sm font-normal text-[#1a1a1a] align-top">
                      {row.aspect}
                    </td>
                    <td className="py-5 px-8 text-sm text-[#9b9b9b] leading-[1.6] align-top">
                      {row.others}
                    </td>
                    <td className="py-5 px-8 text-sm text-[#1a1a1a] leading-[1.6] bg-[#fafaf8] align-top">
                      {row.chiro}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-6">
            {comparisons.map((row) => (
              <motion.div
                key={row.aspect}
                variants={fadeInUp}
                className="border border-[#E0E0E0]"
              >
                <div className="p-4 border-b border-[#E0E0E0]">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b]">
                    {row.aspect}
                  </p>
                </div>
                <div className="grid grid-cols-2 divide-x divide-[#e5e5e3]">
                  <div className="p-4">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#9b9b9b] mb-2">
                      일반
                    </p>
                    <p className="text-xs text-[#9b9b9b] leading-[1.6]">
                      {row.others}
                    </p>
                  </div>
                  <div className="p-4 bg-[#fafaf8]">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a] mb-2">
                      CHIRO
                    </p>
                    <p className="text-xs text-[#1a1a1a] leading-[1.6]">
                      {row.chiro}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
