"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/motion";

const blocks = [
  {
    title: "심리학 기반 설계",
    description:
      "심리학 전공 디렉터가 인지 편향, 손실 회피, 앵커링 효과를 설계에 녹입니다. 클릭은 우연이 아닙니다.",
    cta: "설계 프로세스 보기",
    href: "/services/website",
    imagePlaceholder: "psychology-design",
  },
  {
    title: "코드 레벨 SEO",
    description:
      "플러그인이 아닌 코드 자체가 SEO입니다. 구조화 데이터, 시맨틱 HTML, llms.txt까지 기본 내장.",
    cta: "SEO 서비스 보기",
    href: "/services/seo-aeo",
    imagePlaceholder: "code-seo",
  },
  {
    title: "실시간 빌드",
    description:
      "상담 당일 빌드 링크가 열립니다. 매 순간을 함께 지켜보고, 즉시 피드백하세요. 평균 7.5일 완성.",
    cta: "포트폴리오 보기",
    href: "/portfolio",
    imagePlaceholder: "live-build",
  },
  {
    title: "올인원 투명 가격",
    description:
      "디자인, 개발, SEO, CMS 모두 포함된 정찰제. 추가 비용 없이, 투명하게 운영합니다.",
    cta: "요금제 보기",
    href: "/pricing",
    imagePlaceholder: "pricing",
  },
];

export default function WhyChiro() {
  return (
    <section className="bg-[#fafaf8]">
      {blocks.map((block, i) => (
        <div
          key={i}
          className="sticky top-0 min-h-screen flex items-center bg-[#fafaf8] border-t border-[#E0E0E0]"
          style={{ zIndex: i + 1 }}
        >
          <div className="max-w-[1280px] mx-auto w-full px-5 md:px-8 lg:px-16 py-[80px] md:py-[120px]">
            <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16 lg:gap-24">
              {/* Left: Text (~45%) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="w-full md:w-[45%] shrink-0"
              >
                <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.1] text-[#1a1a1a] mb-6 break-keep">
                  {block.title}
                  <span className="text-[#FF4D00]">.</span>
                </h2>

                <p className="text-base md:text-lg text-[#6b6b6b] leading-[1.8] mb-8 max-w-md">
                  {block.description}
                </p>

                <a
                  href={block.href}
                  className="inline-flex items-center gap-3 text-sm text-[#1a1a1a] hover:text-[#FF4D00] transition-colors duration-300 group"
                >
                  <span className="w-8 h-8 rounded-full border border-[#1a1a1a] flex items-center justify-center group-hover:border-[#FF4D00] transition-colors duration-300">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="group-hover:translate-x-0.5 transition-transform duration-300"
                    >
                      <path
                        d="M2 6h8M7 3l3 3-3 3"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase">
                    {block.cta}
                  </span>
                </a>
              </motion.div>

              {/* Right: Image placeholder (~55%) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full md:w-[55%]"
              >
                <div className="relative aspect-[4/3] bg-[#e8e8e6] rounded-lg overflow-hidden">
                  {/* Placeholder — replace with <Image> when photos are ready */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b]">
                      {block.imagePlaceholder}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
