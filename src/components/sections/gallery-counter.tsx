"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// 3 columns × 3 images = 9 total
const s3 = "https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/gallery";
const colLeft = [
  `${s3}/work-solo.png`,
  `${s3}/work-duo.png`,
  `${s3}/work-solo.png`,
];
const colCenter = [
  `${s3}/screen-exordium.png`,
  `${s3}/screen-nbp-video.png`,
  `${s3}/screen-chirogolf.png`,
  `${s3}/screen-golf-field.png`,
  `${s3}/screen-nbpkorea.png`,
];
const colRight = [
  `${s3}/work-team.png`,
  `${s3}/work-planning.png`,
  `${s3}/work-team.png`,
];

export default function GalleryCounter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const colLRef = useRef<HTMLDivElement>(null);
  const colCRef = useRef<HTMLDivElement>(null);
  const colRRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grid scale: 150% → 100%
      gsap.fromTo(gridRef.current,
        { scale: 1.5 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        }
      );

      // Left column: moves UP on scroll
      gsap.fromTo(colLRef.current,
        { yPercent: 20 },
        {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        }
      );

      // Center column: moves DOWN on scroll (opposite)
      gsap.fromTo(colCRef.current,
        { yPercent: -20 },
        {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        }
      );

      // Right column: moves UP on scroll
      gsap.fromTo(colRRef.current,
        { yPercent: 18 },
        {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        }
      );
      // Title reveal handled by IntersectionObserver (separate useEffect)
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  // Title reveal — observe wrapper entering viewport
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const renderColumn = (
    images: string[],
    ref: React.RefObject<HTMLDivElement | null>,
    prefix: string,
    aspect: string = "3/4"
  ) => (
    <div
      ref={ref}
      className="flex-1 flex flex-col gap-6 md:gap-8 will-change-transform"
    >
      {images.map((src, i) => (
        <div
          key={`${prefix}-${i}`}
          className="relative w-full rounded-lg overflow-hidden shrink-0"
          style={{ aspectRatio: aspect }}
        >
          <img
            src={src}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={wrapperRef}
      className="relative bg-[#0D1117]"
      style={{ height: "250vh" }}
    >
      {/* Gradient fade-in at the top */}
      <div className="absolute top-0 left-0 right-0 h-[200px] z-[15] bg-gradient-to-b from-[#0D1117] to-transparent pointer-events-none" />

      {/* Sticky fullscreen container — pinned while scrolling */}
      <div className="relative md:sticky md:top-0 min-h-[600px] md:h-screen w-full overflow-hidden" data-theme="dark">

        {/* 3-column image grid — positioned to overflow viewport */}
        <div
          ref={gridRef}
          className="absolute inset-0 flex gap-6 md:gap-8 px-6 py-0 will-change-transform origin-center"
          style={{ top: "-40%", bottom: "-40%" }}
        >
          {renderColumn(colLeft, colLRef, "l")}
          {renderColumn(colCenter, colCRef, "c", "16/9")}
          {renderColumn(colRight, colRRef, "r")}
        </div>

        {/* Dark vignette overlay + subtle blur for text readability */}
        <div className="absolute inset-0 z-[5]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117]/70 via-[#0D1117]/50 to-[#0D1117]/70 backdrop-blur-[2px]" />
        </div>

        {/* Center text overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-[11px] tracking-[0.08em] uppercase text-white/40 mb-5 font-[family-name:var(--font-jetbrains-mono)]">
            ( Gallery )
          </p>

          <div ref={titleRef} className="text-center">
            {["WE GROW", "WITH YOU."].map((word, lineIdx) => (
              <div key={lineIdx} className="flex justify-center">
                {word.split("").map((char, charIdx) => (
                  <span
                    key={`${lineIdx}-${charIdx}`}
                    className="inline-block text-[40px] md:text-[72px] lg:text-[96px] xl:text-[110px] font-extrabold text-white tracking-[-0.03em] leading-[0.95] uppercase"
                    style={{
                      opacity: titleVisible ? 1 : 0,
                      transform: titleVisible ? "translateY(0)" : "translateY(50px)",
                      clipPath: titleVisible ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
                      transition: `all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) ${(lineIdx === 0 ? charIdx : 7 + charIdx) * 0.04}s`,
                      marginRight: char === " " ? "0.3em" : "0",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <p className="mt-6 text-[14px] md:text-[16px] text-white/50 leading-[1.8] text-center max-w-[440px]">
            당신의 성공에 저희가 도움이 되는 것 만큼
            <br />
            행복한 것은 없습니다.
          </p>

          <Link
            href="/portfolio"
            className="mt-8 inline-flex items-center gap-2 text-[14px] text-white border border-white/30 px-8 py-3 hover:bg-white hover:text-[#0D1117] transition-all duration-500 tracking-[0.04em] uppercase pointer-events-auto"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
