"use client";

import { motion } from "framer-motion";

/* Each service has a DIFFERENT animation — no shared fadeUp */

/* ── Service 1: Left image (55%) + Right text + (01) overlay — fade from left ── */
function Service1() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col md:flex-row items-start gap-8 md:gap-12"
    >
      <div className="relative w-full md:w-[55%]">
        <div className="aspect-[16/10] bg-[#D8D8D4] overflow-hidden relative">
          <img src="/services/web-design.jpg" alt="웹사이트 기획 & 개발" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#C8C8C4] to-[#D8D8D4] -z-10" />
        </div>
        <span className="absolute top-4 left-4 text-[11px] tracking-[0.08em] text-[#6B7280] font-[family-name:var(--font-jetbrains-mono)]">
          (01)
        </span>
      </div>
      <div className="md:w-[40%] flex flex-col justify-center">
        <h3 className="text-[28px] md:text-[36px] font-semibold text-[#111111] tracking-[-0.01em] leading-[1.15] mb-4">
          웹사이트 기획 &amp; 개발
        </h3>
        <p className="text-[16px] text-[#6B7280] leading-[1.7]">
          페이지 수 제한 없음. 모든 디바이스에 완벽한 반응형.
          비즈니스 목표에 맞춘 커스텀 설계부터 개발, 런칭까지.
        </p>
      </div>
    </motion.div>
  );
}

/* ── Service 2: Full-width text band — scale up reveal ── */
function Service2() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="py-4"
    >
      <div className="border-t border-b border-[rgba(0,0,0,0.08)] py-12 md:py-16">
        <span className="text-[11px] tracking-[0.08em] text-[#6B7280] mb-6 block font-[family-name:var(--font-jetbrains-mono)]">
          (02)
        </span>
        <h3 className="text-[28px] md:text-[36px] lg:text-[42px] font-semibold text-[#111111] tracking-[-0.01em] leading-[1.2] mb-4 max-w-[700px]">
          SEO / AEO / GEO
        </h3>
        <p className="text-[16px] text-[#6B7280] leading-[1.7] max-w-[560px]">
          구글 검색, AI 검색, 지역 검색. 세 가지 전선에서 동시에 싸우는
          통합 검색 최적화 전략을 설계하고 구현합니다.
        </p>
      </div>
    </motion.div>
  );
}

/* ── Service 3: Top image (full-width, short) + Bottom text — vertical stack, NOT zigzag ── */
function Service3() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col"
    >
      <div className="relative w-full md:w-[70%]">
        <div className="aspect-[21/9] bg-[#D8D8D4] overflow-hidden relative">
          <img src="/services/branding.jpg" alt="브랜딩 & 디자인" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#C8C8C4] to-[#D8D8D4] -z-10" />
        </div>
        <span className="absolute top-4 left-4 text-[11px] tracking-[0.08em] text-[#6B7280] font-[family-name:var(--font-jetbrains-mono)]">
          (03)
        </span>
      </div>
      <div className="mt-8 max-w-[480px]">
        <h3 className="text-[28px] md:text-[36px] font-semibold text-[#111111] tracking-[-0.01em] leading-[1.15] mb-4">
          브랜딩 &amp; 디자인
        </h3>
        <p className="text-[16px] text-[#6B7280] leading-[1.7]">
          로고, CI, 브랜드 전략. 온라인에서 당신의 비즈니스가
          어떤 인상을 남길지 설계합니다.
        </p>
      </div>
    </motion.div>
  );
}

/* ── Service 4: Number cluster + one-liner — fade from right ── */
function Service4() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col md:flex-row items-baseline gap-6 md:gap-16"
    >
      <div className="flex items-baseline gap-3">
        <span className="text-[11px] tracking-[0.08em] text-[#6B7280] font-[family-name:var(--font-jetbrains-mono)]">
          (04)
        </span>
        <span className="text-[56px] md:text-[72px] font-bold text-[#111111] tracking-[-0.02em] leading-none">
          24/7
        </span>
      </div>
      <div className="flex flex-col">
        <h3 className="text-[22px] md:text-[28px] font-semibold text-[#111111] tracking-[-0.01em] leading-[1.2] mb-2">
          유지보수 &amp; 관리
        </h3>
        <p className="text-[16px] text-[#6B7280] leading-[1.7]">
          도메인, 호스팅, 유지보수 무료 제공. 추가 비용 없이 안정적으로 운영됩니다.
        </p>
      </div>
    </motion.div>
  );
}

export default function ServicesEditorial() {
  return (
    <section className="bg-[#F0F0EC] px-5 md:px-20 pb-[160px] md:pb-[200px]">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-[80px] md:gap-[160px]">
        <Service1 />
        <Service2 />
        <Service3 />
        <Service4 />
      </div>
    </section>
  );
}
