"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";

const services = [
  {
    number: "01",
    title: "홈페이지 제작",
    description: "심리학 기반 기획부터 코드 레벨 SEO까지, 매출을 만드는 웹사이트를 설계합니다.",
    href: "/services/website",
  },
  {
    number: "02",
    title: "홈페이지 리모델링",
    description: "기존 사이트의 구조와 디자인을 분석하고, 전환율 중심으로 재설계합니다.",
    href: "/services/remodeling",
  },
  {
    number: "03",
    title: "SEO/AEO 자동화",
    description: "검색엔진과 AI 엔진 모두에 최적화된 콘텐츠 구조를 구축합니다.",
    href: "/services/seo-aeo",
  },
];

export default function ServiceCards() {
  return (
    <section className="py-[72px] md:py-[120px] px-5 md:px-8">
      <div className="max-w-[1280px] mx-auto">
        <Divider />
        <div className="pt-16 md:pt-24">
          <SectionLabel number="02" label="Services" />

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[44px] font-light tracking-[0.03em] leading-[1.05] mb-10 md:mb-16"
          >
            무엇을 도와드릴까요<span className="text-[#FF4D00]">.</span>
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#E0E0E0]"
          >
            {services.map((service) => (
              <motion.div
                key={service.number}
                variants={fadeInUp}
                className="bg-white p-8 group hover:bg-[#fafaf8] transition-colors duration-300"
              >
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b] block mb-6">
                  {service.number}
                </span>
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-[#6b6b6b] leading-[1.7] mb-6">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="text-sm font-medium text-[#1a1a1a] group-hover:text-[#FF4D00] transition-colors duration-300"
                >
                  자세히 보기 →
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
