"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SubpageHero from "@/components/sections/subpage-hero";
import SubNav from "@/components/ui/sub-nav";
import FaqTwoColumn from "@/components/sections/faq-two-column";
import { sendEmail } from "@/lib/emailjs";
import { JsonLd, generateLocalBusinessSchema, generatePageSchema } from "@/lib/schema-helpers";

interface SiteSettings {
  contact_email: string;
  contact_location: string;
  response_time: string;
}

const fallbackSettings: SiteSettings = {
  contact_email: "chiroweb75@gmail.com",
  contact_location: "센트럴 비즈한라 2740호",
  response_time: "영업일 기준 24시간 내에 답변을 드립니다.",
};

const PROJECT_TAGS = ["기업 홈페이지", "브랜드 사이트", "쇼핑몰", "랜딩 페이지", "리뉴얼", "포트폴리오", "블로그 / 매거진", "기타"];

const contactFaqs = [
  { q: "상담은 어떻게 진행되나요?", a: "문의 폼을 제출하시면 24시간 이내에 이메일 또는 카카오톡으로 연락드립니다. 전화, 메일, 카카오톡 중 편한 방법으로 상담을 진행합니다." },
  { q: "응답까지 얼마나 걸리나요?", a: "평균 24시간 이내에 응답합니다. 영업일 기준 당일 또는 익일 중 연락드립니다." },
  { q: "견적만 물어봐도 되나요?", a: "물론입니다. 견적 확인만으로도 부담 없이 문의해 주세요. 프로젝트 규모에 맞는 플랜과 예상 비용을 안내드립니다." },
  { q: "해외에서도 상담 가능한가요?", a: "가능합니다. 이메일, 카카오톡, Zoom 등 온라인으로 상담을 진행합니다. 시차를 고려하여 일정을 조율합니다." },
];

export default function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [settings, setSettings] = useState<SiteSettings>(fallbackSettings);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const localBusinessSchema = generateLocalBusinessSchema();
  const pageSchema = generatePageSchema([localBusinessSchema].filter(Boolean) as object[]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then((data) => {
      if (data.settings) {
        setSettings({
          contact_email: data.settings.contact_email || fallbackSettings.contact_email,
          contact_location: data.settings.contact_location || fallbackSettings.contact_location,
          response_time: data.settings.response_time || fallbackSettings.response_time,
        });
      }
    }).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("contact") as string;
    const message = formData.get("concern") as string;
    const projectType = selectedTags.length > 0 ? selectedTags.join(", ") : "미선택";

    try {
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, projectType }),
      }).catch(() => {});

      await sendEmail({
        from_name: name,
        user_email: email,
        project_type: projectType,
        message: message,
        send_date: new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
      });

      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  return (
    <>
      {pageSchema && <JsonLd data={pageSchema} />}

      <SubpageHero
        title="CONTACT"
        label="( Get In Touch )"
      />

      <SubNav pageLabel="CONTACT MENU" items={[
        { label: "METHODS", href: "#methods" },
        { label: "FORM", href: "#form" },
        { label: "COMPANY", href: "#company" },
        { label: "FAQ", href: "#faq" },
      ]} />

      {/* Contact Methods */}
      <section id="methods" className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 py-[160px] md:py-[200px]">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[11px] tracking-[0.08em] uppercase text-[#999] mb-4 font-[family-name:var(--font-jetbrains-mono)]">
            ( CONTACT METHODS )
          </p>
          <p className="text-[14px] text-[#999] mt-0 mb-10">편한 방법으로 연락주세요</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "폼 문의", value: "아래 폼 작성", icon: "📋" },
              { label: "카카오톡", value: "치로웹디자인", icon: "💬" },
              { label: "이메일", value: settings.contact_email, icon: "✉" },
              { label: "전화", value: "010-6816-0775", icon: "📞" },
            ].map((method) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-[#e5e5e5] rounded-xl p-6"
              >
                <span className="text-[24px] mb-3 block">{method.icon}</span>
                <p className="text-[11px] tracking-[0.08em] uppercase text-[#999] mb-1 font-[family-name:var(--font-jetbrains-mono)]">{method.label}</p>
                <p className="text-[15px] text-[#111] font-medium">{method.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Response Time */}
      <section className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 pb-[60px]">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-[15px] text-[#666]">{settings.response_time}</p>
        </div>
      </section>

      {/* Contact Form */}
      <section id="form" className="bg-[#1a1a1a] px-5 md:px-12 lg:px-20 py-[200px] md:py-[260px]" data-theme="dark">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* Left: Heading */}
            <div>
              <p className="text-[11px] tracking-[0.08em] uppercase text-white/30 mb-4 font-[family-name:var(--font-jetbrains-mono)]">
                ( FORM )
              </p>
              <p className="text-[14px] text-white/35 mt-0 mb-6">문의 양식</p>
              <h2 className="text-[36px] md:text-[56px] lg:text-[72px] font-extrabold text-white tracking-[-0.03em] leading-[1.0] uppercase">
                LET&apos;S
                <br />
                TALK.
              </h2>
              <p className="mt-8 text-[14px] text-white/40 leading-[1.8] max-w-[360px]">
                간단한 정보만 남겨 주세요. 치로가 무료 진단과 함께 프로세스 체험 링크를 보내드립니다.
              </p>
            </div>

            {/* Right: Form */}
            <div>
              {submitted ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                  <h3 className="text-[24px] font-semibold text-white mb-4">접수되었습니다.</h3>
                  <p className="text-[15px] text-white/50 leading-[1.8]">
                    {settings.response_time}
                    <br />무료 진단 결과와 함께 프로세스 체험 링크를 보내드리겠습니다.
                  </p>
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
                    <label htmlFor="name" className="block text-[11px] tracking-[0.08em] uppercase text-white/40 mb-3 font-[family-name:var(--font-jetbrains-mono)]">Name</label>
                    <input type="text" id="name" name="name" required placeholder="성함" className="w-full border-b border-white/20 py-3 text-[16px] text-white bg-transparent outline-none focus:border-white transition-colors placeholder:text-white/20" />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <p className="text-[11px] tracking-[0.08em] uppercase text-white/40 mb-3 font-[family-name:var(--font-jetbrains-mono)]">Project Type</p>
                    <div className="flex flex-wrap gap-2">
                      {PROJECT_TAGS.map((tag) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                          <button
                            key={tag} type="button" onClick={() => toggleTag(tag)}
                            className={`px-4 py-2 text-[13px] rounded-full border transition-all duration-200 cursor-pointer ${
                              isSelected ? "border-[#FF4D00] bg-[#FF4D00] text-white" : "border-white/20 text-white/50 hover:border-white/50"
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label htmlFor="contact" className="block text-[11px] tracking-[0.08em] uppercase text-white/40 mb-3 font-[family-name:var(--font-jetbrains-mono)]">Contact</label>
                    <input type="text" id="contact" name="contact" required placeholder="이메일 또는 전화번호" className="w-full border-b border-white/20 py-3 text-[16px] text-white bg-transparent outline-none focus:border-white transition-colors placeholder:text-white/20" />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label htmlFor="concern" className="block text-[11px] tracking-[0.08em] uppercase text-white/40 mb-3 font-[family-name:var(--font-jetbrains-mono)]">Message</label>
                    <textarea id="concern" name="concern" required rows={4} placeholder="프로젝트에 대해 자유롭게 적어 주세요." className="w-full border-b border-white/20 py-3 text-[16px] text-white bg-transparent outline-none focus:border-white transition-colors resize-none placeholder:text-white/20" />
                  </motion.div>

                  {error && <p className="text-sm text-[#FF4D00]">{error}</p>}

                  <motion.div variants={fadeInUp}>
                    <button type="submit" className="bg-white text-[#1a1a1a] px-8 py-3.5 text-[14px] tracking-[0.02em] rounded-full hover:bg-[#FF4D00] hover:text-white transition-all duration-300 cursor-pointer">
                      문의 보내기
                    </button>
                  </motion.div>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section id="company" className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 py-[160px] md:py-[200px]">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[11px] tracking-[0.08em] uppercase text-[#999] mb-4 font-[family-name:var(--font-jetbrains-mono)]">( COMPANY )</p>
          <p className="text-[14px] text-[#999] mt-0 mb-8">회사 정보</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[600px]">
            {[
              { label: "상호", value: "치로웹디자인" },
              { label: "대표", value: "최정원" },
              { label: "이메일", value: settings.contact_email },
              { label: "전화", value: "010-6816-0775" },
              { label: "소재지", value: settings.contact_location },
            ].map((item) => (
              <div key={item.label} className="flex items-baseline gap-4 py-3 border-b border-[#ddd]">
                <span className="text-[12px] text-[#999] w-[60px] shrink-0">{item.label}</span>
                <span className="text-[15px] text-[#111]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="faq"><FaqTwoColumn faqs={contactFaqs} /></div>
    </>
  );
}
