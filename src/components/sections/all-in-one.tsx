"use client";

import { motion } from "framer-motion";

export default function AllInOne() {
  return (
    <section className="relative bg-[#f5f5f0] px-5 md:px-12 lg:px-20 py-[200px] md:py-[260px]">
      <div className="max-w-[1400px] mx-auto relative">
        {/* Right: Image mask — positioned top-right */}
        <div className="hidden md:block absolute right-0 top-0 md:w-[300px] md:h-[200px] lg:w-[360px] lg:h-[240px] rounded-lg overflow-hidden">
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
            className="text-[40px] md:text-[80px] lg:text-[110px] xl:text-[130px] font-extrabold text-[#111] tracking-[-0.03em] leading-[1.0] uppercase"
          >
            BUILT
            <br />
            TO BE
            <br />
            CITED.
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
              ChatGPT·Perplexity가 인용하는 사이트는 따로 만듭니다.
            </p>
            <p className="text-[14px] md:text-[15px] text-[#666] leading-[1.9] tracking-[0.01em]">
              아임웹·카페24는 구조화 데이터, llms.txt, FAQ 스키마를
              <br />
              구현할 수 없습니다. 그래서 AI가 읽을 수 없습니다.
              <br />
              치로는 코드를 직접 작성하기 때문에,
              <br />
              구글·네이버·ChatGPT·Perplexity 모두에게 보입니다.
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
            기본 포함: AEO·SEO 통합 설계 · llms.txt · FAQ·Organization·Service 스키마
            <br />
            · 시맨틱 HTML · 반응형 웹 · SEO 구조화 데이터 · 구글·네이버 검색 등록
          </motion.p>
        </div>
      </div>
    </section>
  );
}
