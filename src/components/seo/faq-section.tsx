"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";
import { generateFAQSchema, generatePageSchema, JsonLd } from "@/lib/schema-helpers";

interface FAQSectionProps {
  questions: { question: string; answer: string }[];
  sectionNumber?: string;
  sectionLabel?: string;
  heading?: string;
  showDivider?: boolean;
  popularIndex?: number;
}

export default function FAQSection({
  questions,
  sectionNumber = "06",
  sectionLabel = "FAQ",
  heading = "Questions",
  showDivider = true,
  popularIndex,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = generateFAQSchema(questions);
  const pageSchema = faqSchema ? generatePageSchema([faqSchema]) : null;

  return (
    <section className="py-[72px] md:py-[120px] px-5 md:px-8">
      {pageSchema && <JsonLd data={pageSchema} />}
      {showDivider && <Divider />}
      <div className="max-w-[1280px] mx-auto pt-16 md:pt-24">
        {/* 30/70 Split Layout */}
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Sticky */}
          <div className="md:w-[30%] md:pr-12 mb-8 md:mb-0">
            <div className="md:sticky md:top-32">
              <SectionLabel number={sectionNumber} label={sectionLabel} />
              <motion.h2
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="font-[family-name:var(--font-space-grotesk)] font-light text-[28px] md:text-[44px] tracking-[0.03em] leading-[1.05]"
              >
                {heading}<span className="text-[#FF4D00]">.</span>
              </motion.h2>
            </div>
          </div>

          {/* Right Column - Questions */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="md:w-[70%] md:border-l md:border-[#E0E0E0] md:pl-12"
          >
            {questions.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="border-b border-[#E0E0E0]"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full py-6 flex items-start justify-between gap-8 text-left cursor-pointer group"
                >
                  <span className="text-sm md:text-base text-[#1a1a1a] leading-[1.5] group-hover:opacity-60 transition-opacity duration-300 flex items-center gap-3">
                    {faq.question}
                    {popularIndex === index && (
                      <span className="inline-flex shrink-0 items-center px-2 py-0.5 text-[10px] font-medium tracking-[0.05em] text-[#FF4D00] border border-[#FF4D00] rounded-full whitespace-nowrap">
                        가장 많이 물어보는 질문
                      </span>
                    )}
                  </span>
                  <span
                    className={`shrink-0 w-5 h-5 flex items-center justify-center text-[#9b9b9b] transition-transform duration-300 ${
                      openIndex === index ? "rotate-45" : ""
                    }`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <line x1="7" y1="0" x2="7" y2="14" />
                      <line x1="0" y1="7" x2="14" y2="7" />
                    </svg>
                  </span>
                </button>
                {/* Answer is ALWAYS in DOM for AEO — uses height animation, not conditional rendering */}
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-sm text-[#6b6b6b] leading-[1.8] max-w-lg">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
