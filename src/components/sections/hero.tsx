"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/button";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row md:items-center overflow-hidden bg-[#fafaf8]">
      {/* Mobile Video Strip — full width, short height, above text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        className="md:hidden w-full h-[22vh] mt-[72px] -mx-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-8 w-full">
        <div className="flex items-center md:min-h-screen md:py-[120px] py-10">
          {/* Left: Text */}
          <div className="relative z-20 w-full shrink-0">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b] mb-8"
            >
              Web Design Studio
            </motion.p>

            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative"
            >
              {/* Filled text (default) — mobile always visible */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isHovered ? 0 : 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-[48px] md:text-[80px] lg:text-[100px] tracking-[-0.03em] leading-[1.05] font-extrabold text-[#1a1a1a] max-md:!opacity-100"
              >
                기다리지 마십시오<span className="text-[#FF4D00]">.</span>
              </motion.h1>

              {/* Stroke text (hover) — desktop only */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="hidden md:block absolute inset-0 text-[48px] md:text-[80px] lg:text-[100px] tracking-[-0.03em] leading-[1.05] font-extrabold"
                style={{
                  WebkitTextStroke: "1.5px #1a1a1a",
                  WebkitTextFillColor: "transparent",
                }}
              >
                기다리지 마십시오<span style={{ WebkitTextStroke: "1.5px #FF4D00" }}>.</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mt-10 text-base md:text-lg text-[#6b6b6b] max-w-lg leading-[1.8]"
            >
              상담 당일, 실시간 빌드 링크가 열립니다.
              <br />
              당신의 사이트가 만들어지는 모든 순간을 함께 지켜보십시오.
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

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="mt-6 text-[13px] text-[#9b9b9b] tracking-[0.02em]"
            >
              신생회사의 열정을 당신의 비즈니스에 적용해 보십시오.
            </motion.p>
          </div>

          {/* Desktop Video — absolute right, hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[50%] h-[55vh] z-10"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.2em] uppercase text-[#9b9b9b]">
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
