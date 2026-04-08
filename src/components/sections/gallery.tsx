"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const columns = [
  ["/portfolio/nbpkorea.png", "/portfolio/mansolution.png", "/portfolio/funi.png", "/portfolio/nbpkorea.png", "/portfolio/mansolution.png", "/portfolio/funi.png"],
  ["/portfolio/funi.png", "/portfolio/nbpkorea.png", "/portfolio/mansolution.png", "/portfolio/funi.png", "/portfolio/nbpkorea.png", "/portfolio/mansolution.png"],
  ["/portfolio/mansolution.png", "/portfolio/funi.png", "/portfolio/nbpkorea.png", "/portfolio/mansolution.png", "/portfolio/funi.png", "/portfolio/nbpkorea.png"],
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const colLRef = useRef<HTMLDivElement>(null);
  const colCRef = useRef<HTMLDivElement>(null);
  const colRRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Side columns (1,3): translate from bottom to top (move upward)
      // Center column (2): translate from top to bottom (move downward)
      const colAnimations = [
        { ref: colLRef.current, fromY: "15%", toY: "-15%" },   // left → moves up
        { ref: colCRef.current, fromY: "-15%", toY: "15%" },   // center → moves down
        { ref: colRRef.current, fromY: "15%", toY: "-15%" },   // right → moves up
      ];

      colAnimations.forEach(({ ref, fromY, toY }) => {
        gsap.fromTo(ref,
          { y: fromY },
          {
            y: toY,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Piano reveal for title
  const title = "SELECTED PROJECTS";
  const letterReveal = {
    hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
    visible: (i: number) => ({
      clipPath: "inset(0 0 0% 0)",
      opacity: 1,
      transition: { duration: 0.4, delay: i * 0.03, ease: [0.25, 0.1, 0.25, 1] },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0D1117] py-[120px] overflow-hidden"
      data-theme="dark"
      style={{ minHeight: "100vh" }}
    >
      {/* 3-column parallax grid */}
      <div className="relative w-full flex gap-4 md:gap-5 px-5 md:px-8 h-[85vh] md:h-[95vh]">
        {[colLRef, colCRef, colRRef].map((ref, colIdx) => (
          <div
            key={colIdx}
            ref={ref}
            className="flex-1 flex flex-col gap-4 md:gap-5 will-change-transform"
          >
            {columns[colIdx].map((img, imgIdx) => {
              const id = `${colIdx}-${imgIdx}`;
              const isHovered = hoveredIdx === id;
              const otherHovered = hoveredIdx !== null && !isHovered;

              return (
                <div
                  key={id}
                  className="relative overflow-hidden cursor-pointer rounded-lg shrink-0"
                  style={{ height: "clamp(280px, 38vh, 420px)" }}
                  onMouseEnter={() => setHoveredIdx(id)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <img
                    src={img}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-300 bg-[#0D1117]"
                    style={{ opacity: isHovered ? 0.1 : otherHovered ? 0.7 : 0.45 }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Text overlay — centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-6">
        <span className="text-[11px] tracking-[0.08em] uppercase text-white/25 mb-6 font-[family-name:var(--font-jetbrains-mono)]">
          ( Gallery )
        </span>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center"
        >
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterReveal}
              className={`text-[48px] md:text-[72px] lg:text-[96px] font-bold text-[#F5F5F5] tracking-[-0.02em] leading-none ${char === " " ? "w-[0.3em]" : ""}`}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h2>

        <span className="mt-6 text-[11px] tracking-[0.08em] text-white/25 font-[family-name:var(--font-jetbrains-mono)]">
          Since 2024 — 30+ Projects
        </span>

        <Link
          href="/portfolio"
          className="mt-8 inline-flex items-center gap-2 text-[14px] text-white/60 border border-white/20 px-6 py-3 hover:bg-white hover:text-[#0D1117] transition-all duration-500 tracking-[0.04em] uppercase pointer-events-auto"
        >
          View All Work →
        </Link>
      </div>
    </section>
  );
}
