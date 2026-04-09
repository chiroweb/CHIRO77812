"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SubpageHero from "@/components/sections/subpage-hero";
import NumberedSection from "@/components/sections/numbered-section";
import FaqTwoColumn from "@/components/sections/faq-two-column";
import { sendEmail } from "@/lib/emailjs";
import { JsonLd, generateServiceSchema, generateFAQSchema, generatePageSchema } from "@/lib/schema-helpers";

const diagnosisFaqs = [
  { q: "진단 비용이 발생하나요?", a: "아니요, 완전 무료입니다. 진단 후 프로젝트를 의뢰하지 않아도 전혀 부담이 없습니다." },
  { q: "진단 결과는 언제 받나요?", a: "신청 후 평균 24시간 이내에 이메일로 진단 리포트를 보내드립니다. 리포트에는 개선 항목과 우선순위가 포함됩니다." },
  { q: "어떤 항목을 진단하나요?", a: "모바일 호환성, SEO 점수, 로딩 속도(Core Web Vitals), AEO 준비도(AI 검색 대응) 4가지 영역을 진단합니다." },
  { q: "진단 후 반드시 제작을 의뢰해야 하나요?", a: "아닙니다. 진단 결과만 받아보셔도 됩니다. 리포트의 개선 사항을 직접 적용하셔도 좋고, 원하시면 무료 상담을 통해 구체적인 방안을 안내드립니다." },
];

export default function DiagnosisContent() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const serviceSchema = generateServiceSchema({
    name: "무료 홈페이지 진단",
    description: "SEO, 모바일 호환성, 로딩 속도, AEO 준비도를 무료로 진단하는 서비스",
    url: "https://chiroweb.co.kr/free-diagnosis",
  });
  const faqSchema = generateFAQSchema(diagnosisFaqs.map(f => ({ question: f.q, answer: f.a })));
  const pageSchema = generatePageSchema([serviceSchema, faqSchema].filter(Boolean) as object[]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const websiteUrl = formData.get("website_url") as string;
    const email = formData.get("email") as string;

    try {
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website_url: websiteUrl, type: "diagnosis", name: "", message: "무료 진단 신청" }),
      }).catch(() => {});

      await sendEmail({
        from_name: "무료 진단 신청",
        user_email: email,
        project_type: "무료 홈페이지 진단",
        message: `웹사이트 URL: ${websiteUrl}\n이메일: ${email}\n유형: 무료 진단 신청`,
        send_date: new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
      });

      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {pageSchema && <JsonLd data={pageSchema} />}

      <SubpageHero
        title="FREE DIAGNOSIS"
        label="( Site Audit )"
        dark
      />

      {/* Diagnosis Items */}
      <NumberedSection
        label="( WHAT WE CHECK )"
        heading={"4가지 영역을\n진단합니다."}
        items={[
          { title: "모바일 호환성", description: "반응형 디자인, 터치 최적화, 뷰포트 설정을 확인합니다." },
          { title: "SEO 점수", description: "메타태그, 구조화 데이터, 시맨틱 HTML, 사이트맵을 검사합니다." },
          { title: "로딩 속도", description: "Core Web Vitals, LCP, CLS, 이미지 최적화를 측정합니다." },
          { title: "AEO 준비도", description: "AI 검색 엔진 노출 가능성, FAQ 스키마, llms.txt를 확인합니다." },
        ]}
        dark
      />

      {/* Report Preview */}
      <section className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 py-[160px] md:py-[200px]">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[11px] tracking-[0.08em] uppercase text-[#999] mb-8 font-[family-name:var(--font-jetbrains-mono)]">
            ( REPORT PREVIEW )
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-[#e5e5e5] rounded-2xl p-8 md:p-12 max-w-[700px]"
          >
            <p className="text-[20px] md:text-[24px] font-semibold text-[#111] mb-6">진단 리포트에 포함되는 내용</p>
            <ul className="space-y-4">
              {["각 영역별 점수 및 등급 (A~F)", "구체적인 문제점과 개선 방향", "우선순위별 개선 로드맵", "경쟁사 대비 포지션 분석"].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-[#10B981] mt-0.5">✓</span>
                  <span className="text-[15px] text-[#333] leading-[1.7]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-[#1a1a1a] px-5 md:px-12 lg:px-20 py-[200px] md:py-[260px]" data-theme="dark">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[11px] tracking-[0.08em] uppercase text-white/30 mb-6 font-[family-name:var(--font-jetbrains-mono)]">
            ( APPLY )
          </p>
          <h2 className="text-[32px] md:text-[48px] font-extrabold text-white tracking-[-0.03em] leading-[1.0] uppercase mb-12">
            GET YOUR
            <br />
            REPORT.
          </h2>

          <div className="max-w-[560px]">
            {submitted ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h3 className="text-[24px] font-semibold text-white mb-4">신청이 완료되었습니다.</h3>
                <p className="text-[15px] text-white/50 leading-[1.8]">24시간 이내에 진단 리포트를 이메일로 보내드리겠습니다.</p>
              </motion.div>
            ) : (
              <motion.form
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <motion.div variants={fadeInUp}>
                  <label htmlFor="website_url" className="block text-[11px] tracking-[0.08em] uppercase text-white/40 mb-3 font-[family-name:var(--font-jetbrains-mono)]">
                    Website URL
                  </label>
                  <input
                    type="url" id="website_url" name="website_url" required placeholder="https://"
                    className="w-full border-b border-white/20 py-3 text-[16px] text-white bg-transparent outline-none focus:border-white transition-colors placeholder:text-white/20"
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label htmlFor="email" className="block text-[11px] tracking-[0.08em] uppercase text-white/40 mb-3 font-[family-name:var(--font-jetbrains-mono)]">
                    Email
                  </label>
                  <input
                    type="email" id="email" name="email" required placeholder="결과를 받으실 이메일"
                    className="w-full border-b border-white/20 py-3 text-[16px] text-white bg-transparent outline-none focus:border-white transition-colors placeholder:text-white/20"
                  />
                </motion.div>

                {error && <p className="text-sm text-[#FF4D00]">{error}</p>}

                <motion.div variants={fadeInUp}>
                  <button
                    type="submit" disabled={loading}
                    className="bg-white text-[#1a1a1a] px-8 py-3.5 text-[14px] tracking-[0.02em] rounded-full hover:bg-[#FF4D00] hover:text-white transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? "신청 중..." : "무료 진단 신청하기"}
                  </button>
                  <p className="mt-4 text-[13px] text-white/30 leading-[1.7]">
                    비용은 발생하지 않습니다. 진단 후 상담이나 계약 강요 없이 결과만 받아보실 수 있습니다.
                  </p>
                </motion.div>
              </motion.form>
            )}
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 py-[160px] md:py-[200px]">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[18px] md:text-[22px] font-medium text-[#111] mb-3"
          >
            진단 후 무료 30분 상담을 제공합니다.
          </motion.p>
          <p className="text-[14px] text-[#999]">리포트 결과를 함께 검토하고, 구체적인 개선 방안을 안내드립니다.</p>
        </div>
      </section>

      <FaqTwoColumn faqs={diagnosisFaqs} />
    </>
  );
}
