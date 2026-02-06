"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/motion";
import Button from "@/components/ui/button";
import Divider from "@/components/ui/divider";

export default function CtaBand() {
  return (
    <section className="py-[120px] px-8">
      <Divider />
      <div className="max-w-[1280px] mx-auto pt-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="border border-[#E0E0E0] p-12 md:p-20"
        >
          <div className="grid grid-cols-4 md:grid-cols-12 gap-6 items-center">
            <motion.div
              variants={fadeInUp}
              className="col-span-4 md:col-span-7"
            >
              <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-4">
                Start Your Project
              </p>
              <h2 className="text-2xl md:text-[36px] font-[family-name:var(--font-noto-serif-kr)] tracking-tight leading-[1.2] mb-4">
                당신의 브랜드에
                <br />
                몰입할 준비가 되었습니다<span className="text-[#FF4D00]">.</span>
              </h2>
              <p className="text-base text-[#6b6b6b] leading-[1.7] max-w-md">
                무료 진단과 함께, 치로의 실시간 빌드 프로세스를 직접 경험해
                보십시오. 상담 후 24시간 이내에 연락드립니다.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="col-span-4 md:col-span-3 md:col-start-10 md:text-right"
            >
              <Button href="/contact" variant="ghost">
                무료 진단 신청
              </Button>
              <p className="mt-4 text-xs text-[#9b9b9b] tracking-wide">
                평균 응답 시간 24시간 이내
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
