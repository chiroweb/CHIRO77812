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
      className="flex items-center gap-3 mb-12"
    >
      <span className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] font-normal">
        {number}
      </span>
      <span className="w-8 h-[0.5px] bg-[#e5e5e3]" />
      <span className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] font-normal">
        {label}
      </span>
    </motion.div>
  );
}
