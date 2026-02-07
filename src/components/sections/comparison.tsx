"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";

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
    chiro: "평균 4일 완성",
  },
  {
    aspect: "소통 방식",
    others: "담당자 배정, 전달 과정에서 의도 왜곡 가능",
    chiro: "디렉터 직접 소통, 기획부터 개발까지 1인 전담",
  },
  {
    aspect: "응답 속도",
    others: "업무 시간 내 순차 대응",
    chiro: "24시간 이내 응답",
  },
];

export default function Comparison() {
  return (
    <section className="py-[72px] md:py-[120px] px-5 md:px-8 bg-[#1a1a1a]">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row mb-10 md:mb-16">
          <div className="md:w-[30%] md:pr-12 mb-8 md:mb-0">
            <div className="mb-12">
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#6b6b6b]">
                03 — Why CHIRO
              </span>
            </div>
          </div>
          <div className="md:w-[70%] md:border-l md:border-[#333] md:pl-12">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <motion.h2
                variants={fadeInUp}
                className="font-[family-name:var(--font-space-grotesk)] font-light text-[32px] md:text-[52px] tracking-[0.03em] leading-[1.05] text-white mb-3"
              >
                Different Process<span className="text-[#FF4D00]">.</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-[18px] md:text-[22px] font-medium text-white/50 tracking-tight leading-[1.5]"
              >
                같은 결과, 다른 과정.
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
                <tr className="border-b border-[#333]">
                  <th className="text-left py-5 pr-8 w-[20%]">
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#6b6b6b] font-normal">
                      항목
                    </span>
                  </th>
                  <th className="text-left py-5 px-8 w-[40%]">
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#6b6b6b] font-normal">
                      일반 에이전시
                    </span>
                  </th>
                  <th className="text-left py-5 px-8 w-[40%] bg-white/5">
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-white font-normal">
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
                    className="border-b border-[#333]"
                  >
                    <td className="py-5 pr-8 text-sm font-normal text-white/80 align-top">
                      {row.aspect}
                    </td>
                    <td className="py-5 px-8 text-sm text-[#6b6b6b] leading-[1.6] align-top">
                      {row.others}
                    </td>
                    <td className="py-5 px-8 text-sm text-white leading-[1.6] bg-white/5 align-top">
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
                className="border border-[#333]"
              >
                <div className="p-4 border-b border-[#333]">
                  <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#6b6b6b]">
                    {row.aspect}
                  </p>
                </div>
                <div className="grid grid-cols-2 divide-x divide-[#333]">
                  <div className="p-4">
                    <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.15em] uppercase text-[#6b6b6b] mb-2">
                      일반
                    </p>
                    <p className="text-xs text-[#6b6b6b] leading-[1.6]">
                      {row.others}
                    </p>
                  </div>
                  <div className="p-4 bg-[#FF4D00]/10">
                    <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.15em] uppercase text-white mb-2">
                      CHIRO
                    </p>
                    <p className="text-sm text-white leading-[1.6]">
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
