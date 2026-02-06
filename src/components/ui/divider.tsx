"use client";

import { motion } from "framer-motion";
import { lineReveal, viewportConfig } from "@/lib/motion";

interface DividerProps {
  emphasis?: boolean;
}

export default function Divider({ emphasis = false }: DividerProps) {
  if (emphasis) {
    return (
      <motion.div
        variants={lineReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="w-full border-t-2 border-[#1a1a1a] origin-left"
      />
    );
  }

  return (
    <motion.div
      variants={lineReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="w-full h-[0.5px] bg-[#E0E0E0] origin-left"
    />
  );
}
