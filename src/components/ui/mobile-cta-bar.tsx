"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileCtaBar() {
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const ctaBand = document.getElementById("cta-band");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowBar(false);
        } else if (window.scrollY > window.innerHeight) {
          setShowBar(true);
        }
      },
      { threshold: 0 }
    );

    if (ctaBand) observer.observe(ctaBand);

    const handleScroll = () => {
      const pastHero = window.scrollY > window.innerHeight;
      const ctaVisible = ctaBand
        ? ctaBand.getBoundingClientRect().top < window.innerHeight
        : false;

      setShowBar(pastHero && !ctaVisible);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (ctaBand) observer.unobserve(ctaBand);
    };
  }, []);

  return (
    <AnimatePresence>
      {showBar && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          <div className="bg-[#1a1a1a] px-5 py-3 flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-medium">
                프로젝트 시작하기
              </p>
              <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#6b6b6b]">
                평균 응답 24시간 이내
              </p>
            </div>
            <a
              href="/contact"
              className="bg-[#FF4D00] text-white text-sm px-5 py-3 font-medium"
            >
              무료 상담
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
