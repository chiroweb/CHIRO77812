"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/motion";

interface SectionLabelProps {
  number: string;
  label: string;
}

export default function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="mb-12"
    >
      <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b]">
        {number} — {label}
      </span>
    </motion.div>
  );
}
