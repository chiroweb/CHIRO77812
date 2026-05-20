"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/motion";

const services = [
  {
    number: "01",
    title: "홈페이지 제작",
    description:
      "심리학 기반 기획부터 코드 레벨 SEO까지, 매출을 만드는 웹사이트를 처음부터 설계합니다.",
    href: "/services/website",
    icon: <WebsiteIcon />,
  },
  {
    number: "02",
    title: "홈페이지 리모델링",
    description:
      "기존 사이트의 구조와 디자인을 분석하고, 전환율 중심으로 재설계합니다.",
    href: "/services/remodeling",
    icon: <RemodelIcon />,
  },
  {
    number: "03",
    title: "SEO · AEO · GEO",
    description:
      "검색엔진, AI 엔진, 지역 검색 모두에 최적화된 콘텐츠 구조를 구축합니다.",
    href: "/services/seo-aeo",
    icon: <SeoIcon />,
  },
  {
    number: "04",
    title: "유지보수 · 관리",
    description:
      "사이트 런칭 이후에도 성능 모니터링, 콘텐츠 업데이트, 보안 관리를 지속합니다.",
    href: "/services",
    icon: <MaintainIcon />,
  },
];

export default function ServiceCards() {
  return (
    <section className="overflow-hidden">
      {/* Title area — light background */}
      <div className="bg-[#fafaf8] px-5 md:px-8 lg:px-16 pt-[120px] md:pt-[160px] pb-16 md:pb-24">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <h2 className="text-[36px] md:text-[56px] lg:text-[72px] font-extrabold tracking-[-0.03em] leading-[1.1] text-[#1a1a1a] mb-8">
              무엇을 도와드릴까요?
              <br />
              전부 다<span className="text-[#FF4D00]">.</span>
            </h2>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm tracking-[0.05em] bg-[#1a1a1a] text-white px-6 py-3 rounded-full hover:bg-[#FF4D00] transition-colors duration-300"
            >
              전체 서비스 보기
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Cards area — dark background, horizontal scroll */}
      <div className="bg-[#1a1a1a] px-5 md:px-8 lg:px-16 py-12 md:py-16">
        <div
          className="flex gap-3 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {services.map((service) => (
            <div
              key={service.number}
              className="flex-shrink-0 w-[260px] md:w-[380px] lg:w-[420px] snap-start"
            >
              <div className="group h-full border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[420px] md:min-h-[480px] hover:border-white/25 transition-all duration-300">
                {/* Title + Description */}
                <div>
                  <h3 className="text-[22px] md:text-[26px] font-semibold text-white mb-4 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/50 leading-[1.7]">
                    {service.description}
                  </p>
                </div>

                {/* Icon illustration */}
                <div className="my-8 flex justify-center opacity-30">
                  {service.icon}
                </div>

                {/* Discover button */}
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-3 text-sm text-white group-hover:text-[#FF4D00] transition-colors duration-300"
                >
                  <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-[#FF4D00] transition-colors duration-300">
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
                  자세히 보기
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Drag hint */}
        <p className="hidden md:block text-center text-[10px] tracking-[0.2em] uppercase text-white/20 mt-8 font-[family-name:var(--font-jetbrains-mono)]">
          ← Drag to explore →
        </p>
      </div>
    </section>
  );
}

/* ── SVG Icon Components ── */

function WebsiteIcon() {
  return (
    <svg width="120" height="100" viewBox="0 0 120 100" fill="none" stroke="white" strokeWidth="0.6">
      <rect x="10" y="10" width="100" height="70" rx="4" />
      <line x1="10" y1="25" x2="110" y2="25" />
      <circle cx="20" cy="17" r="2.5" />
      <circle cx="28" cy="17" r="2.5" />
      <circle cx="36" cy="17" r="2.5" />
      <rect x="20" y="35" width="35" height="35" rx="2" />
      <line x1="65" y1="35" x2="100" y2="35" />
      <line x1="65" y1="45" x2="95" y2="45" />
      <line x1="65" y1="55" x2="90" y2="55" />
      <line x1="65" y1="65" x2="85" y2="65" />
    </svg>
  );
}

function RemodelIcon() {
  return (
    <svg width="120" height="100" viewBox="0 0 120 100" fill="none" stroke="white" strokeWidth="0.6">
      <rect x="15" y="15" width="50" height="40" rx="3" strokeDasharray="3 2" />
      <rect x="55" y="45" width="50" height="40" rx="3" />
      <path d="M55 35 L75 35 L75 45" strokeDasharray="3 2" />
      <path d="M40 55 L55 55" />
      <circle cx="85" cy="30" r="12" />
      <path d="M80 30 L85 25 L90 30 L85 35 Z" />
    </svg>
  );
}

function SeoIcon() {
  return (
    <svg width="120" height="100" viewBox="0 0 120 100" fill="none" stroke="white" strokeWidth="0.6">
      <circle cx="45" cy="45" r="20" />
      <line x1="60" y1="60" x2="80" y2="78" strokeWidth="1" />
      <circle cx="85" cy="25" r="8" />
      <line x1="85" y1="33" x2="85" y2="50" />
      <circle cx="85" cy="55" r="5" />
      <path d="M30 70 L45 55 L60 65 L80 45" strokeWidth="0.8" />
      <circle cx="30" cy="70" r="2" fill="white" />
      <circle cx="60" cy="65" r="2" fill="white" />
    </svg>
  );
}

function MaintainIcon() {
  return (
    <svg width="120" height="100" viewBox="0 0 120 100" fill="none" stroke="white" strokeWidth="0.6">
      <circle cx="60" cy="50" r="25" />
      <circle cx="60" cy="50" r="18" />
      <path d="M60 32 L60 50 L73 57" strokeWidth="0.8" />
      <rect x="20" y="20" width="12" height="8" rx="1" />
      <line x1="26" y1="28" x2="26" y2="35" />
      <rect x="88" y="65" width="12" height="8" rx="1" />
      <line x1="94" y1="73" x2="94" y2="80" />
      <circle cx="30" cy="75" r="6" />
      <path d="M27 75 L33 75 M30 72 L30 78" strokeWidth="0.8" />
    </svg>
  );
}
