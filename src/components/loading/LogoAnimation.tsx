"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// ─────────────────────────────────────
// CHIRO. 마침표 강조 + 라인
// 총 재생: 2.8초 (애니메이션) + 0.4초 (여유) + 0.6초 (페이드아웃)
// ─────────────────────────────────────

interface LogoAnimationProps {
  onComplete?: () => void;
}

const EASE = [0.25, 0.1, 0.25, 1] as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// 글자별 등장 애니메이션
const charVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(4px)",
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay,
      duration: 0.5,
      ease: EASE,
    },
  }),
};

// 마침표 전용 — 등장 + 펄스
const dotVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 1,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: [1, 1.6, 1],
    filter: "blur(0px)",
    transition: {
      delay: 0.9,
      duration: 0.6,
      ease: EASE,
      scale: {
        delay: 1.05,
        duration: 0.35,
        ease: EASE_OUT,
      },
    },
  },
};

const CHARS = ["C", "H", "I", "R", "O"];
const CHAR_BASE_DELAY = 0.3;
const CHAR_INTERVAL = 0.15;

export default function LogoAnimation({ onComplete }: LogoAnimationProps) {
  const [phase, setPhase] = useState<"intro" | "fade">("intro");

  useEffect(() => {
    // 2.8초 애니메이션 + 0.4초 여유 = 3.2초 후 페이드 시작
    const fadeTimer = setTimeout(() => setPhase("fade"), 3200);
    // 페이드 0.6초 후 완료
    const completeTimer = setTimeout(() => onComplete?.(), 3800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // 클릭/탭 스킵
  const handleSkip = () => {
    setPhase("fade");
    setTimeout(() => onComplete?.(), 400);
  };

  // 접근성: reduced-motion
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      onComplete?.();
    }
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "fade" || true ? (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center cursor-pointer select-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "fade" ? 0 : 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={handleSkip}
          onAnimationComplete={() => {
            if (phase === "fade") onComplete?.();
          }}
        >
          <div className="flex flex-col items-center px-5">
            {/* ── CHIRO. ── */}
            <div className="flex items-baseline">
              {CHARS.map((char, i) => (
                <motion.span
                  key={char}
                  custom={CHAR_BASE_DELAY + i * CHAR_INTERVAL}
                  variants={charVariants}
                  initial="hidden"
                  animate="visible"
                  className="font-[family-name:var(--font-bank-gothic),var(--font-space-grotesk)] text-[#e8e8e8] text-[18vw] md:text-[12vw] lg:text-[140px] font-medium leading-none tracking-[0.12em]"
                >
                  {char}
                </motion.span>
              ))}

              {/* 마침표 — #FF4D00 */}
              <motion.span
                variants={dotVariants}
                initial="hidden"
                animate="visible"
                className="font-[family-name:var(--font-bank-gothic),var(--font-space-grotesk)] text-[#FF4D00] text-[18vw] md:text-[12vw] lg:text-[140px] font-medium leading-none tracking-[0.12em]"
              >
                .
              </motion.span>
            </div>

            {/* ── 수평선 ── */}
            <div className="w-full mt-4 md:mt-6 overflow-hidden">
              <motion.div
                className="h-[1px] bg-[#e8e8e8] opacity-40"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 1.2,
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{ transformOrigin: "left center" }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
