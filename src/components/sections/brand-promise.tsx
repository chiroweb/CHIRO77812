"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const floatingImages = [
  { src: "/portfolio/nbpkorea.png", startX: -200, startY: -150, endX: -40, endY: -30 },
  { src: "/portfolio/funi.png", startX: 220, startY: -120, endX: 50, endY: -20 },
  { src: "/portfolio/mansolution.png", startX: -180, startY: 160, endX: -30, endY: 40 },
  { src: "/portfolio/nbpkorea.png", startX: 200, startY: 140, endX: 40, endY: 30 },
];

function FloatingImage({ src, startX, startY, endX, endY }: typeof floatingImages[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [startX, endX]);
  const y = useTransform(scrollYProgress, [0, 1], [startY, endY]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 0.6]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y, scale }}
      className="absolute w-[120px] md:w-[180px] aspect-[4/5] opacity-30 overflow-hidden pointer-events-none"
    >
      <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
    </motion.div>
  );
}

export default function BrandPromise() {
  /* Horizontal wipe reveal instead of piano (avoiding 3rd piano usage) */
  const wipeReveal = {
    hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
    visible: {
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <section className="relative bg-[#0D1117] py-[200px] md:py-[280px] overflow-hidden" data-theme="dark">
      <div className="absolute inset-0 flex items-center justify-center">
        {floatingImages.map((img, i) => (
          <FloatingImage key={i} {...img} />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6">
        <span className="text-[11px] tracking-[0.08em] uppercase text-white/20 mb-8 font-[family-name:var(--font-jetbrains-mono)]">
          ( Promise )
        </span>

        {/* Horizontal wipe reveal — distinct from Gallery piano reveal */}
        <motion.h2
          variants={wipeReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-[36px] md:text-[56px] lg:text-[72px] font-semibold text-[#F5F5F5] tracking-[-0.02em] leading-[1.05] text-center max-w-[900px]"
        >
          We make your business shine online.
        </motion.h2>
      </div>
    </section>
  );
}
