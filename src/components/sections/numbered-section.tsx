"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";

interface NumberedItem {
  title: string;
  description: string;
}

interface NumberedSectionProps {
  label: string;
  heading?: string;
  items: NumberedItem[];
  dark?: boolean;
}

export default function NumberedSection({
  label,
  heading,
  items,
  dark = true,
}: NumberedSectionProps) {
  const isDark = dark;

  return (
    <section
      className="py-[200px] md:py-[260px] px-5 md:px-12 lg:px-20"
      style={{ backgroundColor: isDark ? "#1a1a1a" : "#f5f5f0" }}
      data-theme={isDark ? "dark" : undefined}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-16 md:mb-20"
        >
          <motion.p
            variants={fadeInUp}
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase mb-6"
            style={{ color: isDark ? "rgba(255,255,255,0.3)" : "#999" }}
          >
            {label}
          </motion.p>
          {heading && (
            <motion.h2
              variants={fadeInUp}
              className="text-[36px] md:text-[56px] lg:text-[72px] font-extrabold tracking-[-0.03em] leading-[1.0] whitespace-pre-line"
              style={{ color: isDark ? "#f5f5f5" : "#111" }}
            >
              {heading}
            </motion.h2>
          )}
        </motion.div>

        {/* Items */}
        <div>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex flex-col md:flex-row md:items-start gap-4 md:gap-10 py-6 md:py-8"
              style={{
                borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "#ddd"}`,
              }}
            >
              <div className="shrink-0 w-14 md:w-20">
                <span
                  className="text-[32px] md:text-[44px] font-extrabold leading-none tabular-nums select-none"
                  style={{ color: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex-1 pt-1 md:pt-2">
                <h3
                  className="text-[16px] md:text-[20px] font-semibold leading-[1.3] mb-2"
                  style={{ color: isDark ? "#f5f5f5" : "#111" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[13px] md:text-[14px] leading-[1.8]"
                  style={{ color: isDark ? "rgba(255,255,255,0.5)" : "#666" }}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
          <div
            style={{
              borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "#ddd"}`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
