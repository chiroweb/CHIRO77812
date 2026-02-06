"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/button";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden py-[120px]">
      {/* Grid Paper Background - visible on hover */}
      <div
        className={`absolute inset-0 z-0 grid-paper transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Fullscreen Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/video-poster.jpg"
          className="w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div
          className={`absolute inset-0 bg-white transition-opacity duration-500 ${
            isHovered ? "opacity-95" : "opacity-80"
          }`}
        />
      </div>

      {/* Fallback background */}
      <div className="absolute inset-0 z-[-1] bg-[#fafaf8]" />

      {/* Copy - Bottom Left Positioning */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-8 w-full">
        <div className="max-w-[700px]">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-8"
          >
            Web Design Studio
          </motion.p>

          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative"
          >
            {/* Filled text (default) */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isHovered ? 0 : 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-4xl md:text-[72px] lg:text-[80px] tracking-tight leading-[1.05] font-[family-name:var(--font-noto-serif-kr)] text-[#1a1a1a]"
            >
              기획이 곧 개발이 되는
              <br />
              투명함<span className="text-[#FF4D00]">.</span>
            </motion.h1>

            {/* Stroke text (hover) */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 text-4xl md:text-[72px] lg:text-[80px] tracking-tight leading-[1.05] font-[family-name:var(--font-noto-serif-kr)]"
              style={{
                WebkitTextStroke: "1px #1a1a1a",
                WebkitTextFillColor: "transparent",
              }}
            >
              기획이 곧 개발이 되는
              <br />
              투명함<span style={{ WebkitTextStroke: "1px #FF4D00" }}>.</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-10 text-base md:text-lg text-[#6b6b6b] max-w-lg leading-relaxed"
          >
            당신의 브랜드에 온전히 몰입합니다.
            <br />
            상담부터 완성까지, 모든 과정을 함께 지켜보실 수 있습니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-12"
          >
            <Button href="/contact" variant="ghost">
              프로젝트 문의
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#9b9b9b]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-6 bg-[#9b9b9b]"
        />
      </motion.div>
    </section>
  );
}
