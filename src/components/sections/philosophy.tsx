"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";

export default function Philosophy() {
  return (
    <section className="py-[72px] md:py-[120px] px-5 md:px-8">
      <Divider />
      <div className="max-w-[1280px] mx-auto pt-16 md:pt-24">
        {/* 30/70 Split Layout */}
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Sticky */}
          <div className="md:w-[30%] md:pr-12 mb-8 md:mb-0">
            <div className="md:sticky md:top-32">
              <SectionLabel number="05" label="Philosophy" />
            </div>
          </div>

          {/* Right Column - Scrolling Content */}
          <div className="md:w-[70%] md:border-l md:border-[#E0E0E0] md:pl-12">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              {/* Hero statement — Pretendard ExtraBold, massive */}
              <motion.h2
                variants={fadeInUp}
                className="text-[36px] md:text-[80px] font-extrabold tracking-[-0.03em] leading-[1.05] text-[#1a1a1a]"
              >
                치로는 공장이
                <br className="hidden md:inline" />
                아닙니다<span className="text-[#FF4D00]">.</span>
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-base md:text-lg text-[#6b6b6b] leading-[1.8] mt-12 md:mt-16"
              >
                대형 에이전시처럼 수십 개를 동시에 돌리지 않습니다. 치로는 한 번에
                소수의 프로젝트만 받습니다. 하나의 브랜드에 깊이 몰입하고, 기획부터
                개발까지 모든 과정을 직접 설계합니다.
              </motion.p>

              <motion.p
                variants={fadeInUp}
                className="text-base md:text-lg text-[#6b6b6b] leading-[1.8] mt-[80px]"
              >
                치로의 포트폴리오가 소수인 이유는 단순합니다. 지금 이 순간에도
                누군가의 프로젝트에 온전히 몰입하고 있기 때문입니다. 양이 아닌 질로,
                당신의 브랜드를 설계합니다.
              </motion.p>

              {/* Key Values */}
              <div className="mt-[80px] pt-12 border-t border-[#E0E0E0]">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                  className="space-y-12"
                >
                  {[
                    {
                      title: "투명함",
                      titleEn: "Transparency",
                      desc: "실시간 링크를 통해 제작 과정의 모든 단계를 확인하실 수 있습니다.",
                      highlight: true,
                    },
                    {
                      title: "몰입",
                      titleEn: "Immersion",
                      desc: "소수의 프로젝트만 수주하여 하나의 브랜드에 온전히 집중합니다.",
                      highlight: true,
                    },
                    {
                      title: "정제",
                      titleEn: "Refinement",
                      desc: "불필요한 요소를 걷어내고, 본질에 집중한 디자인을 설계합니다.",
                      highlight: false,
                    },
                  ].map((item) => (
                    <motion.div
                      key={item.title}
                      variants={fadeInUp}
                      className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 pb-12 border-b border-[#E0E0E0] last:border-b-0 last:pb-0"
                    >
                      <div className="md:w-1/3">
                        <h3
                          className={`text-xl font-bold tracking-tight ${
                            item.highlight
                              ? "underline decoration-[#FF4D00] decoration-[1.5px] underline-offset-4"
                              : ""
                          }`}
                        >
                          {item.title}
                        </h3>
                        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b] mt-1 block">
                          {item.titleEn}
                        </span>
                      </div>
                      <p className="md:w-2/3 text-base text-[#6b6b6b] leading-[1.7]">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
