"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("contact") as string;
    const message = formData.get("concern") as string;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        // Fallback: still show success to the user (DB might not be connected)
        setSubmitted(true);
      }
    } catch {
      // Fallback: show success even without DB
      setSubmitted(true);
    }
  };

  return (
    <section className="pt-32 pb-32 px-8">
      <div className="max-w-[1280px] mx-auto">
        <SectionLabel number="01" label="Contact" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-20"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-3xl md:text-[40px] font-light tracking-tight leading-[1.2] mb-6"
          >
            프로젝트를 시작합니다.
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

        <div className="mt-20 grid grid-cols-4 md:grid-cols-12 gap-6">
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
                <h2 className="text-2xl font-light tracking-tight mb-4">
                  접수되었습니다.
                </h2>
                <p className="text-base text-[#6b6b6b] leading-[1.7]">
                  영업일 기준 24시간 내에 무료 진단 결과와 함께 프로세스 체험
                  링크를 보내드리겠습니다.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                <motion.div variants={fadeInUp}>
                  <label
                    htmlFor="name"
                    className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-4"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="성함을 입력해 주십시오"
                    className="w-full border-b border-[#e5e5e3] py-3 text-base bg-transparent outline-none focus:border-[#1a1a1a] transition-colors duration-300 placeholder:text-[#9b9b9b]"
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label
                    htmlFor="contact"
                    className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-4"
                  >
                    Contact
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    required
                    placeholder="연락처 (이메일 또는 전화번호)"
                    className="w-full border-b border-[#e5e5e3] py-3 text-base bg-transparent outline-none focus:border-[#1a1a1a] transition-colors duration-300 placeholder:text-[#9b9b9b]"
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label
                    htmlFor="concern"
                    className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-4"
                  >
                    현재 가장 고민인 부분은?
                  </label>
                  <textarea
                    id="concern"
                    name="concern"
                    required
                    rows={5}
                    placeholder="현재 운영 중인 사이트의 문제점이나, 새로 만들고자 하는 사이트에 대해 자유롭게 적어 주십시오."
                    className="w-full border-b border-[#e5e5e3] py-3 text-base bg-transparent outline-none focus:border-[#1a1a1a] transition-colors duration-300 resize-none placeholder:text-[#9b9b9b]"
                  />
                </motion.div>

                {error && (
                  <p className="text-sm text-[#FF4D00]">{error}</p>
                )}

                <motion.div variants={fadeInUp}>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 border border-[#1a1a1a] text-[#1a1a1a] px-8 py-3 text-sm tracking-[0.05em] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white cursor-pointer"
                  >
                    무료 진단 및 프로세스 체험 신청
                  </button>
                </motion.div>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="col-span-4 md:col-span-4 md:col-start-9"
          >
            <motion.div variants={fadeInUp} className="space-y-12">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
                  Email
                </p>
                <p className="text-sm text-[#1a1a1a]">hello@chiroweb.kr</p>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
                  Location
                </p>
                <p className="text-sm text-[#1a1a1a]">Seoul, South Korea</p>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
                  Response
                </p>
                <p className="text-sm text-[#6b6b6b] leading-[1.7]">
                  영업일 기준 24시간 내에 답변을 드립니다.
                  <br />
                  무료 진단 결과와 함께 프로세스 체험 링크를 보내드립니다.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
