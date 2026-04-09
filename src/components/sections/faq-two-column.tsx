"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/motion";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqTwoColumnProps {
  faqs: FaqItem[];
  sectionLabel?: string;
  heading?: string;
  subheading?: string;
  dark?: boolean;
}

function FaqColumn({
  items,
  offset,
  dark,
}: {
  items: FaqItem[];
  offset: number;
  dark: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const borderColor = dark ? "border-[#333]" : "border-[#ddd]";
  const numColor = "text-[#999]";
  const questionColor = dark
    ? "text-white group-hover:text-white/60"
    : "text-[#111] group-hover:text-[#555]";
  const answerColor = dark ? "text-white/50" : "text-[#666]";
  const iconColor = dark ? "text-[#666]" : "text-[#999]";

  return (
    <div className="flex-1 min-w-0">
      {items.map((faq, i) => {
        const isOpen = openIndex === i;
        const num = offset + i + 1;
        return (
          <div key={i} className={`border-t ${borderColor}`}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between py-4 md:py-5 text-left cursor-pointer group"
            >
              <div className="flex items-baseline gap-3 md:gap-4 min-w-0">
                <span
                  className={`text-[11px] ${numColor} font-[family-name:var(--font-jetbrains-mono)] tabular-nums shrink-0`}
                >
                  {String(num).padStart(2, "0")}
                </span>
                <span
                  className={`text-[13px] md:text-[15px] font-medium transition-colors duration-300 truncate ${questionColor}`}
                >
                  {faq.q}
                </span>
              </div>
              <span
                className={`text-[18px] ${iconColor} transition-transform duration-300 shrink-0 ml-3`}
                style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                +
              </span>
            </button>
            {/* Answer — always in DOM for AI crawlers */}
            <div
              className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
              style={{ maxHeight: isOpen ? "300px" : "0px" }}
            >
              <p
                className={`text-[13px] md:text-[14px] ${answerColor} leading-[1.8] pb-5 pl-7 md:pl-10 pr-4`}
              >
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
      <div className={`border-t ${borderColor}`} />
    </div>
  );
}

export default function FaqTwoColumn({
  faqs,
  sectionLabel = "( FAQ )",
  heading = "FREQUENTLY\nASKED.",
  subheading,
  dark = false,
}: FaqTwoColumnProps) {
  const mid = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, mid);
  const rightFaqs = faqs.slice(mid);

  const bg = dark ? "bg-[#1a1a1a]" : "bg-[#f5f5f0]";
  const labelColor = "text-[#999]";
  const headingColor = dark ? "text-white" : "text-[#111]";

  const headingLines = heading.split("\n");

  return (
    <section
      className={`${bg} px-5 md:px-12 lg:px-20 py-[200px] md:py-[260px]`}
      data-theme={dark ? "dark" : undefined}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 md:mb-16 gap-6"
        >
          <motion.p
            variants={fadeInUp}
            className={`text-[11px] tracking-[0.08em] uppercase ${labelColor} font-[family-name:var(--font-jetbrains-mono)]`}
          >
            {sectionLabel}
          </motion.p>
          <div className="flex flex-col md:items-end">
            <motion.h2
              variants={fadeInUp}
              className={`text-[32px] md:text-[48px] lg:text-[64px] font-extrabold ${headingColor} tracking-[-0.03em] leading-[1.0] uppercase md:text-right`}
            >
              {headingLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < headingLines.length - 1 && <br />}
                </span>
              ))}
            </motion.h2>
            {subheading && (
              <motion.p
                variants={fadeInUp}
                className="text-[14px] md:text-[15px] mt-4 md:text-right"
                style={{ color: dark ? "rgba(255,255,255,0.35)" : "#999" }}
              >
                {subheading}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Two-column accordion */}
        <div className="flex flex-col md:flex-row gap-0 md:gap-12 lg:gap-16">
          <FaqColumn items={leftFaqs} offset={0} dark={dark} />
          <FaqColumn items={rightFaqs} offset={mid} dark={dark} />
        </div>
      </div>

      {/* FAQPage Schema — always rendered for AI crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
