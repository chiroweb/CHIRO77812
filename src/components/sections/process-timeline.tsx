"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  label?: string;
  heading?: string;
  steps: ProcessStep[];
  dark?: boolean;
}

export default function ProcessTimeline({
  label,
  heading,
  steps,
  dark = false,
}: ProcessTimelineProps) {
  const isDark = dark;

  return (
    <section
      className="py-[200px] md:py-[260px] px-5 md:px-12 lg:px-20"
      style={{ backgroundColor: isDark ? "#1a1a1a" : "#f5f5f0" }}
      data-theme={isDark ? "dark" : undefined}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        {(label || heading) && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-16 md:mb-20"
          >
            {label && (
              <motion.p
                variants={fadeInUp}
                className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase mb-6"
                style={{ color: isDark ? "rgba(255,255,255,0.3)" : "#999" }}
              >
                {label}
              </motion.p>
            )}
            {heading && (
              <motion.h2
                variants={fadeInUp}
                className="text-[36px] md:text-[56px] lg:text-[72px] font-extrabold tracking-[-0.03em] leading-[1.0]"
                style={{ color: isDark ? "#f5f5f5" : "#111" }}
              >
                {heading}
              </motion.h2>
            )}
          </motion.div>
        )}

        {/* Steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="flex gap-8 md:gap-12"
            >
              {/* Left: number + connecting line */}
              <div className="flex flex-col items-center shrink-0 w-8">
                <span
                  className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] tabular-nums leading-none pt-1"
                  style={{ color: isDark ? "rgba(255,255,255,0.3)" : "#999" }}
                >
                  {step.number}
                </span>
                {i < steps.length - 1 && (
                  <div
                    className="flex-1 w-px mt-3"
                    style={{
                      backgroundColor: isDark ? "rgba(255,255,255,0.12)" : "#ddd",
                      minHeight: "60px",
                    }}
                  />
                )}
              </div>

              {/* Right: content */}
              <div
                className="flex-1 pb-12 md:pb-16"
                style={
                  i === steps.length - 1 ? { paddingBottom: 0 } : undefined
                }
              >
                <h3
                  className="text-[18px] md:text-[20px] font-semibold leading-[1.3] mb-3"
                  style={{ color: isDark ? "#f5f5f5" : "#111" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-[14px] leading-[1.8]"
                  style={{ color: isDark ? "rgba(255,255,255,0.5)" : "#666" }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
