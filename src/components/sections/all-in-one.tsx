"use client";

import { motion } from "framer-motion";

export default function AllInOne() {
  return (
    <section className="relative bg-[#f5f5f0] px-5 md:px-12 lg:px-20 py-[120px] md:py-[160px]">
      <div className="max-w-[1400px] mx-auto relative">
        {/* Right: Image mask — positioned top-right */}
        <div className="absolute right-0 top-0 w-[200px] h-[140px] md:w-[300px] md:h-[200px] lg:w-[360px] lg:h-[240px] rounded-lg overflow-hidden">
          <img
            src="/services/blueprint.png"
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Fallback */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#001F3F] to-[#00152a] -z-10" />
        </div>

        {/* Left: Large display text */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[48px] md:text-[80px] lg:text-[110px] xl:text-[130px] font-extrabold text-[#111] tracking-[-0.03em] leading-[1.0] uppercase"
          >
            ALL IN
            <br />
            ONE
            <br />
            SOLUTION.
          </motion.h2>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 md:mt-14 max-w-[520px]"
          >
            <p className="text-[15px] md:text-[17px] text-[#111] leading-[1.9] tracking-[0.01em] font-medium mb-4">
              홈페이지 제작 한 번으로 마케팅까지 완성됩니다.
            </p>
            <p className="text-[14px] md:text-[15px] text-[#666] leading-[1.9] tracking-[0.01em]">
              브랜드 디자인, 반응형 코딩, SEO·AEO 자동화 세팅,
              <br />
              구글·네이버 검색 등록, AI 검색 노출 최적화 —
              <br />
              다른 곳에서 별도 견적을 받아야 할 모든 것이
              <br />
              치로의 기본 패키지에 포함됩니다.
            </p>
          </motion.div>

          {/* Included items label */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-[11px] md:text-[12px] text-[#999] leading-[1.8] tracking-[0.02em]"
          >
            포함 항목: 반응형 웹 · SEO 초기 세팅 · AEO 스키마 마크업
            <br />
            · 구조화 데이터 · 사이트맵 · llms.txt · GBP 등록 가이드
          </motion.p>
        </div>
      </div>
    </section>
  );
}
