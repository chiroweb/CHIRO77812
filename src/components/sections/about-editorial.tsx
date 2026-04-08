"use client";

import { motion } from "framer-motion";

export default function AboutEditorial() {
  return (
    <section className="bg-[#f5f5f0] px-5 md:px-20 pt-[20px] pb-[160px] md:pb-[200px]">
      <div className="max-w-[1400px] mx-auto relative min-h-[500px] md:min-h-[750px]">

        {/* Large vertical image — left, pushed down */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="md:absolute md:left-0 md:top-[120px] w-full md:w-[36%]"
        >
          <div className="aspect-[3/4] bg-[#001F3F] overflow-hidden relative">
            <img src="/services/highway.png" alt="" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* Small image — center, high up */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 md:mt-0 md:absolute md:left-[40%] md:top-0 w-[50%] md:w-[20%]"
        >
          <div className="aspect-[4/5] bg-[#001F3F] overflow-hidden relative">
            <img src="/services/waterdrop.png" alt="" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* Text — right side, vertically centered */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 md:mt-0 md:absolute md:right-0 md:top-[50%] md:-translate-y-1/2 md:w-[30%]"
        >
          <p className="text-[16px] md:text-[17px] text-[#111] leading-[1.9] mb-6">
            웹사이트 제작은 단순한 디자인 작업이 아닙니다.
          </p>
          <p className="text-[16px] md:text-[17px] text-[#111] leading-[1.9] mb-6">
            치로의 기획자는 <em className="not-italic font-medium">심리학</em>을 전공했습니다.
            <br />
            방문자의 시선 이동, 클릭 패턴, 의사결정 과정을
            <br />
            설계에 직접 반영합니다.
          </p>
          <p className="text-[14px] md:text-[15px] text-[#888] leading-[1.9] mb-8">
            &ldquo;왜 이 버튼이 여기 있어야 하는지&rdquo;
            <br />
            설명할 수 있는 에이전시는 흔하지 않습니다.
          </p>
          <p className="text-[16px] md:text-[17px] text-[#111] leading-[1.9] mb-10">
            SEO, AEO, 퍼포먼스 최적화까지 —
            <br />
            온라인에서 비즈니스가 성장하는 데 필요한 모든 것을
            <br />
            하나의 솔루션으로 제공합니다.
          </p>

          {/* Stats block */}
          <div className="border-t border-[#ddd] pt-6 flex flex-col gap-3">
            <div className="flex items-baseline justify-between">
              <span className="text-[12px] text-[#999] tracking-[0.02em]">평균 제작 기간</span>
              <span className="text-[15px] font-semibold text-[#111]">2주</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-[12px] text-[#999] tracking-[0.02em]">클라이언트 추가 의뢰율</span>
              <span className="text-[15px] font-semibold text-[#111]">43%</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-[12px] text-[#999] tracking-[0.02em]">런칭 후 첫 해외 브랜드 수주</span>
              <span className="text-[15px] font-semibold text-[#111]">4개월</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
