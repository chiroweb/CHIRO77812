"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";

interface SiteSettings {
  contact_email: string;
  contact_location: string;
  response_time: string;
}

const fallbackSettings: SiteSettings = {
  contact_email: "hello@chiroweb.kr",
  contact_location: "Seoul, South Korea",
  response_time: "영업일 기준 24시간 내에 답변을 드립니다.",
};

const PROJECT_TAGS = [
  "기업 홈페이지",
  "브랜드 사이트",
  "쇼핑몰",
  "랜딩 페이지",
  "리뉴얼",
  "포트폴리오",
  "블로그 / 매거진",
  "기타",
];

export default function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [settings, setSettings] = useState<SiteSettings>(fallbackSettings);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.settings) {
          setSettings({
            contact_email: data.settings.contact_email || fallbackSettings.contact_email,
            contact_location: data.settings.contact_location || fallbackSettings.contact_location,
            response_time: data.settings.response_time || fallbackSettings.response_time,
          });
        }
      })
      .catch(() => {});
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, projectType }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    }
  };

  return (
    <>
      {/* ── Header ── */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-5 md:px-8">
        <div className="max-w-[1280px] mx-auto">
          <SectionLabel number="01" label="Contact" />

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
              프로젝트를 시작합니다<span className="text-[#FF4D00]">.</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-base text-[#6b6b6b] leading-[1.7] max-w-lg"
            >
              간단한 정보만 남겨 주십시오. 치로가 무료 진단과 함께 프로세스 체험
              링크를 보내드립니다.
            </motion.p>
          </motion.div>

          <Divider />

          <div className="mt-12 md:mt-20 grid grid-cols-4 md:grid-cols-12 gap-6">
            {/* Form */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="col-span-4 md:col-span-6"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="py-16"
                >
                  <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-light tracking-[0.03em] mb-4">
                    접수되었습니다<span className="text-[#FF4D00]">.</span>
                  </h2>
                  <p className="text-base text-[#6b6b6b] leading-[1.7]">
                    {settings.response_time}
                    <br />
                    무료 진단 결과와 함께 프로세스 체험 링크를 보내드리겠습니다.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                  <motion.div variants={fadeInUp}>
                    <label
                      htmlFor="name"
                      className="block font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b] mb-4"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="성함을 입력해 주십시오"
                      className="w-full border-b border-[#E0E0E0] py-3 text-base bg-transparent outline-none focus:border-[#1a1a1a] transition-colors duration-300 placeholder:text-[#9b9b9b]"
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b] mb-4">
                      Project Type
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {PROJECT_TAGS.map((tag) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleTag(tag)}
                            className={`px-4 py-2 text-sm border transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "border-[#FF4D00] bg-[#FF4D00] text-white"
                                : "border-[#E0E0E0] text-[#6b6b6b] hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label
                      htmlFor="contact"
                      className="block font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b] mb-4"
                    >
                      Contact
                    </label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      required
                      placeholder="연락처 (이메일 또는 전화번호)"
                      className="w-full border-b border-[#E0E0E0] py-3 text-base bg-transparent outline-none focus:border-[#1a1a1a] transition-colors duration-300 placeholder:text-[#9b9b9b]"
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label
                      htmlFor="concern"
                      className="block font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b] mb-4"
                    >
                      현재 가장 고민인 부분은?
                    </label>
                    <textarea
                      id="concern"
                      name="concern"
                      required
                      rows={5}
                      placeholder="현재 운영 중인 사이트의 문제점이나, 새로 만들고자 하는 사이트에 대해 자유롭게 적어 주십시오."
                      className="w-full border-b border-[#E0E0E0] py-3 text-base bg-transparent outline-none focus:border-[#1a1a1a] transition-colors duration-300 resize-none placeholder:text-[#9b9b9b]"
                    />
                  </motion.div>

                  {error && (
                    <p className="text-sm text-[#FF4D00]">{error}</p>
                  )}

                  <motion.div variants={fadeInUp}>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 border border-[#1a1a1a] text-[#1a1a1a] w-full md:w-auto justify-center px-8 py-3.5 md:py-3 text-sm tracking-[0.05em] transition-all duration-300 hover:bg-[#FF4D00] hover:text-white hover:border-[#FF4D00] cursor-pointer"
                    >
                      무료 진단 및 프로세스 체험 신청
                    </button>
                  </motion.div>
                </form>
              )}
            </motion.div>

            {/* Info — Dark sidebar */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="col-span-4 md:col-span-4 md:col-start-9"
            >
              <motion.div
                variants={fadeInUp}
                className="bg-[#1a1a1a] p-8 md:p-10 space-y-10"
              >
                <div>
                  <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#6b6b6b] mb-3">
                    Email
                  </p>
                  <p className="text-sm text-white">{settings.contact_email}</p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#6b6b6b] mb-3">
                    Location
                  </p>
                  <p className="text-sm text-white">{settings.contact_location}</p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#6b6b6b] mb-3">
                    Response
                  </p>
                  <p className="text-sm text-white/60 leading-[1.7]">
                    {settings.response_time}
                    <br />
                    무료 진단 결과와 함께 프로세스 체험 링크를 보내드립니다.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
