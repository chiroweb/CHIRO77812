"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#001F3F]">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/30 via-transparent to-[#0a0a0a]/60" />

      {/* Top-left tagline */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute z-10 top-24 md:top-28 left-5 md:left-8 lg:left-12"
      >
        <p className="text-[13px] md:text-[14px] text-white/60 leading-[1.8]">
          ChatGPT·Perplexity가 인용하는 사이트.
          <br />
          코드 기반 AEO 자동화 웹 에이전시.
        </p>
      </motion.div>

      {/* Content — CHIRO at bottom, massive */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-[2vh] md:pb-[3vh]">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[36vw] md:text-[28vw] font-extrabold tracking-[0.08em] leading-[0.8] text-white select-none mix-blend-difference"
        >
          CHIRO
        </motion.h1>
      </div>

      {/* Bottom info bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="absolute bottom-10 left-0 right-0 z-10 px-5 md:px-8 lg:px-12 flex items-end justify-between"
      >
        <p className="text-[11px] md:text-[12px] tracking-[0.1em] text-white/40 uppercase font-[family-name:var(--font-jetbrains-mono)]">
          Web Design Studio
        </p>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-[family-name:var(--font-jetbrains-mono)]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-6 bg-white/30"
          />
        </div>
      </motion.div>
    </section>
  );
}
