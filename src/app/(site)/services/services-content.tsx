"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  viewportConfig,
} from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";
import Button from "@/components/ui/button";
import Placeholder from "@/components/ui/placeholder";
import SubCtaBand from "@/components/ui/sub-cta-band";

/* ─────────────────────────────────────
   1. Service Categories
───────────────────────────────────── */

const services = [
  {
    id: "homepage",
    tab: "Homepage",
    title: "홈페이지 제작",
    description:
      "브랜드의 첫 인상을 설계합니다. 기업 소개, 서비스 안내, 문의 유도까지 — 방문자가 신뢰하고 행동하는 구조를 만듭니다.",
    details: [
      "브랜드 아이덴티티에 맞춘 맞춤 디자인",
      "SEO 최적화로 검색 노출 극대화",
      "문의 전환율을 높이는 CTA 설계",
      "관리자가 직접 수정할 수 있는 CMS 연동",
    ],
    targets: [
      { name: "기업 홈페이지", desc: "신뢰를 전달하는 기업의 디지털 거점을 설계합니다." },
      { name: "브랜드 사이트", desc: "브랜드의 고유한 결을 디지털 위에 옮깁니다." },
      { name: "랜딩 페이지", desc: "하나의 목표에 집중하는 전환 최적화 페이지를 만듭니다." },
    ],
  },
  {
    id: "mobile",
    tab: "Mobile",
    title: "모바일 최적화",
    description:
      "전체 트래픽의 70% 이상이 모바일에서 발생합니다. 모바일 환경에서 완벽하게 작동하는 경험을 설계합니다.",
    details: [
      "모바일 퍼스트 UI/UX 설계",
      "터치 인터랙션 최적화",
      "빠른 로딩 속도 (LCP 1.5초 이내)",
      "모바일 전용 네비게이션 및 CTA 배치",
    ],
    targets: [
      { name: "모바일 웹", desc: "앱 설치 없이 브라우저에서 완벽한 경험을 제공합니다." },
      { name: "PWA", desc: "앱처럼 설치 가능한 프로그레시브 웹앱을 구축합니다." },
      { name: "모바일 랜딩", desc: "SNS 광고에 최적화된 모바일 전환 페이지를 만듭니다." },
    ],
  },
  {
    id: "responsive",
    tab: "Responsive",
    title: "반응형 웹",
    description:
      "데스크톱, 태블릿, 모바일 — 어떤 환경에서도 동일한 품질의 경험을 제공합니다. 하나의 사이트로 모든 디바이스를 대응합니다.",
    details: [
      "모든 해상도에서 완벽한 레이아웃",
      "디바이스별 최적화된 이미지 제공",
      "크로스 브라우저 호환성 보장",
      "유연한 그리드 시스템 적용",
    ],
    targets: [
      { name: "기업/브랜드", desc: "PC와 모바일 모두에서 일관된 브랜드 경험을 전달합니다." },
      { name: "이커머스", desc: "어떤 기기에서든 끊김 없는 구매 경험을 만듭니다." },
      { name: "포트폴리오", desc: "작업물을 모든 화면에서 최상의 품질로 보여줍니다." },
    ],
  },
  {
    id: "maintenance",
    tab: "Maintenance",
    title: "유지보수 & 호스팅",
    description:
      "웹사이트는 만들고 끝이 아닙니다. 안정적인 운영과 지속적인 개선을 통해 사이트의 가치를 유지합니다.",
    details: [
      "월간 성능 모니터링 및 리포트",
      "보안 업데이트 및 백업 관리",
      "콘텐츠 수정 및 페이지 추가 지원",
      "고속 호스팅 환경 제공 (Vercel / AWS)",
    ],
    targets: [
      { name: "정기 유지보수", desc: "월 단위로 사이트 상태를 점검하고 최적화합니다." },
      { name: "긴급 대응", desc: "장애 발생 시 빠르게 진단하고 복구합니다." },
      { name: "호스팅 관리", desc: "안정적이고 빠른 서버 환경을 유지합니다." },
    ],
  },
];

/* ─────────────────────────────────────
   2. Process Steps
───────────────────────────────────── */

const processSteps = [
  {
    number: "01",
    title: "상담",
    en: "Consultation",
    description:
      "전화, 메일, 카카오톡 — 편한 방법으로 연락 주십시오. 브랜드의 현재 상황과 목표를 함께 정리합니다.",
    duration: "1일",
  },
  {
    number: "02",
    title: "실시간 빌드",
    en: "Live Build",
    description:
      "상담이 끝나면, 바로 제작에 들어갑니다. 별도의 기획서 대기 기간 없이, 실시간으로 사이트가 만들어지는 과정을 확인하실 수 있는 링크를 보내드립니다.",
    duration: "즉시",
    highlight: true,
  },
  {
    number: "03",
    title: "피드백 & 수정",
    en: "Feedback",
    description:
      "제작 과정 중 궁금한 점이나 수정사항을 말씀해 주십시오. 링크를 통해 실시간으로 반영되는 것을 직접 확인하실 수 있습니다. 별도의 시안 대기가 필요 없습니다.",
    duration: "실시간",
    highlight: true,
  },
  {
    number: "04",
    title: "런칭",
    en: "Launch",
    description:
      "최종 확인 후, 도메인 연결과 함께 사이트를 런칭합니다. 런칭 이후에도 안정적인 운영을 지원합니다.",
    duration: "1일",
  },
];

/* ─────────────────────────────────────
   3. Pricing Plans
───────────────────────────────────── */

const plans = [
  {
    name: "Startup",
    price: "99만원~",
    description: "브랜드의 첫 온라인 거점을 설계합니다.",
    features: [
      { name: "반응형 웹사이트 (5페이지 이내)", included: true },
      { name: "기본 SEO 설정", included: true },
      { name: "실시간 피드백 링크 제공", included: true },
      { name: "컨텐츠 관리 시스템(CMS)", included: false },
      { name: "맞춤 애니메이션", included: false },
      { name: "유지보수 (월)", included: false },
    ],
  },
  {
    name: "Business",
    price: "250만원~",
    description: "성장하는 비즈니스를 위한 본격적인 웹 경험을 구축합니다.",
    features: [
      { name: "반응형 웹사이트 (10페이지 이내)", included: true },
      { name: "고급 SEO 최적화", included: true },
      { name: "실시간 피드백 링크 제공", included: true },
      { name: "컨텐츠 관리 시스템(CMS)", included: true },
      { name: "맞춤 애니메이션", included: true },
      { name: "유지보수 (3개월)", included: false },
    ],
  },
  {
    name: "Enterprise",
    price: "500만원~",
    description: "브랜드의 본질을 담은 완전한 디지털 경험을 설계합니다.",
    features: [
      { name: "반응형 웹사이트 (무제한)", included: true },
      { name: "고급 SEO 최적화", included: true },
      { name: "실시간 피드백 링크 제공", included: true },
      { name: "컨텐츠 관리 시스템(CMS)", included: true },
      { name: "맞춤 애니메이션", included: true },
      { name: "유지보수 (6개월)", included: true },
    ],
  },
];

/* ─────────────────────────────────────
   Page Component
───────────────────────────────────── */

export default function ServicesContent() {
  const [activeTab, setActiveTab] = useState("homepage");
  const activeService = services.find((s) => s.id === activeTab)!;

  return (
    <>
    <div className="pt-24 md:pt-32 pb-24 md:pb-32 px-5 md:px-8">
      <div className="max-w-[1280px] mx-auto">

        {/* ── Section 1: What We Do ── */}
        <SectionLabel number="01" label="What We Do" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-10 md:mb-16"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[44px] font-light tracking-[0.03em] leading-[1.05] mb-6"
          >
            치로가 설계하는 것<span className="text-[#FF4D00]">.</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-base text-[#6b6b6b] leading-[1.7] max-w-xl"
          >
            홈페이지 제작부터 유지보수까지, 브랜드의 디지털 경험에 필요한 모든 것을 설계합니다.
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <div className="flex border-b border-[#E0E0E0] overflow-x-auto">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`relative px-4 md:px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase whitespace-nowrap transition-colors duration-300 cursor-pointer ${
                  activeTab === service.id
                    ? "text-[#1a1a1a]"
                    : "text-[#9b9b9b] hover:text-[#6b6b6b]"
                }`}
              >
                {service.tab}
                {activeTab === service.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#FF4D00]"
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 md:mt-12"
          >
            {/* Title + Description + Image */}
            <div className="grid grid-cols-4 md:grid-cols-12 gap-6 mb-10 md:mb-16">
              <div className="col-span-4 md:col-span-5">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-[22px] md:text-[32px] font-light tracking-[0.03em] leading-[1.15] mb-6">
                  {activeService.title}
                </h2>
                <p className="text-base text-[#6b6b6b] leading-[1.7] mb-8">
                  {activeService.description}
                </p>
                <ul className="space-y-3">
                  {activeService.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-3 text-sm text-[#1a1a1a] leading-[1.6]"
                    >
                      <span className="mt-[2px] w-4 h-[1px] bg-[#1a1a1a] shrink-0 relative top-[9px]" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-4 md:col-span-6 md:col-start-7">
                <Placeholder type="image" aspectRatio="video" />
              </div>
            </div>

            {/* Target Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#E0E0E0]">
              {activeService.targets.map((target) => (
                <div key={target.name} className="bg-white p-8">
                  <h3 className="text-base font-normal tracking-tight mb-2">
                    {target.name}
                  </h3>
                  <p className="text-sm text-[#6b6b6b] leading-[1.7]">
                    {target.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Section 2: Our Process ── */}
        <div className="mt-20 md:mt-32">
          <Divider />
          <div className="pt-16 md:pt-24">
            <SectionLabel number="02" label="Our Process" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="mb-12 md:mb-20"
            >
              <motion.h2
                variants={fadeInUp}
                className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[44px] font-light tracking-[0.03em] leading-[1.05] mb-6"
              >
                불필요한 과정은 없습니다<span className="text-[#FF4D00]">.</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-base text-[#6b6b6b] leading-[1.7] max-w-xl"
              >
                기획서를 기다리며 몇 주를 소비하지 않습니다. 상담이 끝나는 순간,
                사이트가 만들어지기 시작합니다. 링크 하나로 모든 과정을 지켜보실 수 있습니다.
              </motion.p>
            </motion.div>

            {/* Process Steps */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid grid-cols-1 md:grid-cols-4 gap-[1px] bg-[#E0E0E0]"
            >
              {processSteps.map((step) => (
                <motion.div
                  key={step.number}
                  variants={fadeInUp}
                  className={`p-8 md:p-10 ${
                    step.highlight ? "bg-[#fafaf8]" : "bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[32px] md:text-[40px] text-[#E0E0E0] leading-none">
                      {step.number}
                    </span>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b]">
                      {step.en}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold tracking-tight mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#6b6b6b] leading-[1.7] mb-6">
                    {step.description}
                  </p>

                  <div className="pt-4 border-t border-[#E0E0E0]">
                    <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.15em] uppercase text-[#9b9b9b] mb-1">
                      소요 시간
                    </p>
                    <p
                      className={`text-sm font-[family-name:var(--font-jetbrains-mono)] tracking-wide ${
                        step.highlight ? "text-[#FF4D00]" : "text-[#6b6b6b]"
                      }`}
                    >
                      {step.duration}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Process Highlight Message */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="mt-10 md:mt-16 bg-[#1a1a1a] p-6 md:p-12"
            >
              <div className="grid grid-cols-4 md:grid-cols-12 gap-6">
                <div className="col-span-4 md:col-span-5">
                  <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#6b6b6b] mb-4">
                    Why CHIRO
                  </p>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl md:text-2xl font-light tracking-[0.03em] leading-[1.3] text-white">
                    시안을 기다리지 않습니다<span className="text-[#FF4D00]">.</span>
                    <br />
                    과정을 지켜봅니다<span className="text-[#FF4D00]">.</span>
                  </h3>
                </div>
                <div className="col-span-4 md:col-span-5 md:col-start-7 flex items-center">
                  <div className="space-y-4 text-sm text-white/60 leading-[1.7]">
                    <p>
                      일반적인 에이전시는 상담 후 기획서를 작성하고, 시안을 만들고,
                      확인을 받고, 수정하고, 다시 확인을 받습니다. 이 과정에 수 주가 걸립니다.
                    </p>
                    <p>
                      치로는 다릅니다. 상담과 동시에 빌드가 시작됩니다. 제공된 링크를
                      통해 실시간으로 만들어지는 사이트를 확인하고, 수정사항을 말씀해 주시면
                      즉시 반영됩니다. 기다림이 없습니다.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Section 3: Pricing ── */}
        <div className="mt-20 md:mt-32">
          <Divider emphasis />
          <div className="pt-16 md:pt-24">
            <SectionLabel number="03" label="Pricing" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="mb-12 md:mb-20"
            >
              <motion.h2
                variants={fadeInUp}
                className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[44px] font-light tracking-[0.03em] leading-[1.05] mb-6"
              >
                거품 없는 정찰제<span className="text-[#FF4D00]">.</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-base text-[#6b6b6b] leading-[1.7] max-w-lg"
              >
                복잡한 견적서 대신, 투명한 가격 정책을 운영합니다. 모든 플랜에는
                치로만의 실시간 피드백 링크가 포함됩니다.
              </motion.p>
            </motion.div>

            {/* Pricing Cards with Dashed Dividers */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 relative">
                {/* Dashed vertical dividers - blueprint feel */}
                <div className="hidden md:block absolute top-0 bottom-0 left-1/3 border-l border-dashed border-[#E0E0E0]" />
                <div className="hidden md:block absolute top-0 bottom-0 left-2/3 border-l border-dashed border-[#E0E0E0]" />

                {plans.map((plan) => (
                  <motion.div
                    key={plan.name}
                    variants={fadeInUp}
                    className={`p-8 md:p-10 ${
                      plan.name === "Business"
                        ? "border-t-[3px] border-t-[#FF4D00]"
                        : "border-t border-t-[#E0E0E0] md:border-t-0"
                    }`}
                  >
                    <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b] mb-2">
                      {plan.name}
                      {plan.name === "Business" && (
                        <span className="ml-2 text-[#FF4D00]">Recommended</span>
                      )}
                    </p>
                    <p className="text-2xl md:text-3xl font-light tracking-[0.03em] font-[family-name:var(--font-space-grotesk)] mb-2">
                      {plan.price}
                    </p>
                    <p className="text-sm text-[#6b6b6b] mb-8">
                      {plan.description}
                    </p>

                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <div
                          key={feature.name}
                          className="flex items-start gap-3 text-sm"
                        >
                          {feature.included ? (
                            <span className="text-[#1a1a1a] mt-0.5">&#10004;</span>
                          ) : (
                            <span className="text-[#E0E0E0] mt-0.5">&mdash;</span>
                          )}
                          <span
                            className={
                              feature.included
                                ? "text-[#1a1a1a]"
                                : "text-[#9b9b9b]"
                            }
                          >
                            {feature.name}
                            {feature.name === "실시간 피드백 링크 제공" && (
                              <span className="ml-2 text-xs tracking-wider text-[#FF4D00]">
                                CHIRO
                              </span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button href="/contact" variant="ghost" className="w-full justify-center">
                      문의하기
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="mt-12 md:mt-20 text-center"
            >
              <p className="text-sm text-[#6b6b6b] mb-6">
                프로젝트의 규모와 요구사항에 따라 맞춤 견적을 안내해 드립니다.
              </p>
              <Button href="/contact" variant="ghost">
                무료 상담 신청
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>

    {/* ── CTA Band ── */}
    <SubCtaBand />
    </>
  );
}
