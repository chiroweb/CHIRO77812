"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import FAQSection from "@/components/seo/faq-section";
import InternalLinks from "@/components/seo/internal-links";
import { sendEmail } from "@/lib/emailjs";
import {
  JsonLd,
  generateServiceSchema,
  generateFAQSchema,
  generatePageSchema,
} from "@/lib/schema-helpers";

const DIAGNOSIS_ITEMS = [
  {
    number: "01",
    title: "모바일 호환성",
    description: "반응형 디자인, 터치 최적화, 뷰포트 설정 확인",
  },
  {
    number: "02",
    title: "SEO 점수",
    description: "메타태그, 구조화 데이터, 시맨틱 HTML, 사이트맵 검사",
  },
  {
    number: "03",
    title: "로딩 속도",
    description: "Core Web Vitals, LCP, CLS, 이미지 최적화 측정",
  },
  {
    number: "04",
    title: "AEO 준비도",
    description: "AI 검색 엔진 노출 가능성, FAQ 스키마, llms.txt 확인",
  },
];

const FAQ_QUESTIONS = [
  {
    question: "진단 비용이 발생하나요?",
    answer:
      "아니요, 완전 무료입니다. 진단 후 프로젝트를 의뢰하지 않아도 전혀 부담이 없습니다.",
  },
  {
    question: "진단 결과는 언제 받나요?",
    answer:
      "신청 후 평균 24시간 이내에 이메일로 진단 리포트를 보내드립니다. 리포트에는 개선 항목과 우선순위가 포함됩니다.",
  },
  {
    question: "어떤 항목을 진단하나요?",
    answer:
      "모바일 호환성, SEO 점수, 로딩 속도(Core Web Vitals), AEO 준비도(AI 검색 대응) 4가지 영역을 진단합니다.",
  },
  {
    question: "진단 후 반드시 제작을 의뢰해야 하나요?",
    answer:
      "아닙니다. 진단 결과만 받아보셔도 됩니다. 리포트의 개선 사항을 직접 적용하셔도 좋고, 원하시면 무료 상담을 통해 구체적인 방안을 안내드립니다.",
  },
];

const INTERNAL_LINKS = [
  {
    title: "SEO/AEO 자동화 서비스",
    href: "/services/seo-aeo",
    description:
      "검색 엔진과 AI 검색 모두에 최적화된 웹사이트를 만들어 드립니다.",
  },
  {
    title: "고객 후기",
    href: "/reviews",
    description: "치로웹과 함께한 고객들의 실제 후기를 확인하세요.",
  },
  {
    title: "요금 안내",
    href: "/pricing",
    description: "프로젝트 규모에 맞는 합리적인 요금 플랜을 확인하세요.",
  },
];

export default function DiagnosisContent() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const serviceSchema = generateServiceSchema({
    name: "무료 홈페이지 진단",
    description:
      "SEO, 모바일 호환성, 로딩 속도, AEO 준비도를 무료로 진단하는 서비스",
    url: "https://chiroweb.co.kr/free-diagnosis",
  });

  const faqSchema = generateFAQSchema(FAQ_QUESTIONS);
  const pageSchema = generatePageSchema(
    [serviceSchema, faqSchema].filter(Boolean) as object[]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const websiteUrl = formData.get("website_url") as string;
    const email = formData.get("email") as string;

    try {
      // 1. DB 저장 (서버)
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website_url: websiteUrl,
          type: "diagnosis",
          name: "",
          message: "무료 진단 신청",
        }),
      }).catch(() => {});

      // 2. 이메일 발송 (브라우저에서 직접)
      await sendEmail({
        from_name: "무료 진단 신청",
        user_email: email,
        project_type: "무료 홈페이지 진단",
        message: `웹사이트 URL: ${websiteUrl}\n이메일: ${email}\n유형: 무료 진단 신청`,
        send_date: new Date().toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
        }),
      });

      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-hide-mobile-cta>
      {pageSchema && <JsonLd data={pageSchema} />}

      {/* ── Section 01: Hero ── */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-5 md:px-8">
        <div className="max-w-[1280px] mx-auto">
          <Breadcrumbs pathname="/free-diagnosis" />
          <SectionLabel number="01" label="Free Diagnosis" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-12 md:mb-20"
          >
            <motion.h1
              variants={fadeInUp}
              className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[44px] font-light tracking-[0.03em] leading-[1.05] mb-6"
            >
              내 홈페이지 무료 진단 받기
              <span className="text-[#FF4D00]">.</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-base text-[#6b6b6b] leading-[1.7] max-w-lg"
            >
              당신의 홈페이지는 몇 점인가요? 웹사이트 URL만 입력하시면 전문 진단
              리포트를 보내드립니다.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Section 02: What We Check ── */}
      <section className="py-[72px] md:py-[120px] px-5 md:px-8">
        <Divider />
        <div className="max-w-[1280px] mx-auto pt-16 md:pt-24">
          <SectionLabel number="02" label="What We Check" />

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[44px] font-light tracking-[0.03em] leading-[1.05] mb-10 md:mb-16"
          >
            진단 항목<span className="text-[#FF4D00]">.</span>
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#E0E0E0]"
          >
            {DIAGNOSIS_ITEMS.map((item) => (
              <motion.div
                key={item.number}
                variants={fadeInUp}
                className="bg-white p-8 md:p-10"
              >
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b] mb-4 block">
                  {item.number}
                </span>
                <h3 className="text-lg font-normal tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#6b6b6b] leading-[1.7]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 03: Form ── */}
      <section className="py-[72px] md:py-[120px] px-5 md:px-8">
        <Divider />
        <div className="max-w-[1280px] mx-auto pt-16 md:pt-24">
          <SectionLabel number="03" label="Get Your Report" />

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[44px] font-light tracking-[0.03em] leading-[1.05] mb-10 md:mb-16"
          >
            진단 신청<span className="text-[#FF4D00]">.</span>
          </motion.h2>

          <div className="max-w-[600px]">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="py-16"
              >
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-light tracking-[0.03em] mb-4">
                  신청이 완료되었습니다
                  <span className="text-[#FF4D00]">.</span>
                </h3>
                <p className="text-base text-[#6b6b6b] leading-[1.7]">
                  24시간 이내에 진단 리포트를 보내드리겠습니다.
                </p>
              </motion.div>
            ) : (
              <motion.form
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                onSubmit={handleSubmit}
                className="space-y-12"
              >
                <motion.div variants={fadeInUp}>
                  <label
                    htmlFor="website_url"
                    className="block font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b] mb-4"
                  >
                    Website URL
                  </label>
                  <input
                    type="url"
                    id="website_url"
                    name="website_url"
                    required
                    placeholder="https://"
                    className="w-full border-b border-[#E0E0E0] py-3 text-base bg-transparent outline-none focus:border-[#1a1a1a] transition-colors duration-300 placeholder:text-[#9b9b9b]"
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label
                    htmlFor="email"
                    className="block font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b] mb-4"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="결과를 받으실 이메일"
                    className="w-full border-b border-[#E0E0E0] py-3 text-base bg-transparent outline-none focus:border-[#1a1a1a] transition-colors duration-300 placeholder:text-[#9b9b9b]"
                  />
                </motion.div>

                {error && (
                  <p className="text-sm text-[#FF4D00]">{error}</p>
                )}

                <motion.div variants={fadeInUp}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-[#FF4D00] text-white w-full md:w-auto justify-center px-8 py-3.5 md:py-3 text-sm tracking-[0.05em] transition-all duration-300 hover:bg-[#e04400] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "신청 중..." : "내 사이트 점수 확인하기"}
                  </button>
                  <p className="mt-4 text-[13px] text-[#9b9b9b] leading-[1.7]">
                    평균 24시간 이내 진단 리포트를 보내드립니다. 비용은 일절
                    발생하지 않습니다.
                  </p>
                </motion.div>
              </motion.form>
            )}
          </div>
        </div>
      </section>

      {/* ── Section 04: FAQ ── */}
      <FAQSection
        questions={FAQ_QUESTIONS}
        sectionNumber="04"
        sectionLabel="FAQ"
        heading="Questions"
        showDivider={true}
      />

      {/* ── Section 05: Internal Links ── */}
      <InternalLinks links={INTERNAL_LINKS} />
    </div>
  );
}
