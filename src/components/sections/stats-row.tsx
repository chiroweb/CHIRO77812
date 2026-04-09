"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";

interface StatItem {
  label: string;
  value: string;
}

interface StatsRowProps {
  stats: StatItem[];
  dark?: boolean;
}

export default function StatsRow({ stats, dark = false }: StatsRowProps) {
  const bg = dark ? "bg-[#1a1a1a]" : "bg-white";
  const valueColor = dark ? "text-white" : "text-[#111]";
  const labelColor = dark ? "text-white/40" : "text-[#999]";
  const dividerColor = dark ? "bg-white/10" : "bg-[#e5e5e5]";

  return (
    <section
      className={`${bg} py-[120px] md:py-[160px] px-5 md:px-12 lg:px-20`}
      data-theme={dark ? "dark" : undefined}
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="flex flex-wrap md:flex-nowrap items-stretch"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="flex flex-1 min-w-[140px]"
            >
              {/* Vertical divider — skip before first item */}
              {i > 0 && (
                <div
                  className={`w-px self-stretch ${dividerColor} mx-6 md:mx-10 lg:mx-14 shrink-0`}
                />
              )}
              <div className="flex flex-col justify-center py-4">
                <span
                  className={`text-[32px] md:text-[48px] font-extrabold ${valueColor} tracking-[-0.03em] leading-[1.0]`}
                >
                  {stat.value}
                </span>
                <span
                  className={`text-[12px] ${labelColor} mt-2 tracking-[0.04em] uppercase font-[family-name:var(--font-jetbrains-mono)]`}
                >
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
