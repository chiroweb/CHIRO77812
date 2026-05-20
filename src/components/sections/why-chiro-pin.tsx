"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Group A: visible early (start lower, rise slowly)
// Group B: appear later (start much lower, rise faster)
const floatingImages = [
  // Group A — visible from the start, biased to edges
  { left: "3%",  startY: "70vh",  endY: "-60vh", width: "26%", aspect: "3/4",  scrubEnd: 0.4, img: "/why/desk.png" },
  { left: "62%", startY: "55vh",  endY: "-70vh", width: "16%", aspect: "4/5",  scrubEnd: 0.5, img: "/why/pen.png" },
  // Group B — appear later, different positions
  { left: "38%", startY: "130vh", endY: "-50vh", width: "20%", aspect: "3/4",  scrubEnd: 0.6, img: "/why/keyboard.png" },
  { left: "80%", startY: "140vh", endY: "-40vh", width: "14%", aspect: "1/1",  scrubEnd: 0.55, img: "/why/notes.png" },
];

export default function WhyChiroPin() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        const data = floatingImages[i];

        gsap.fromTo(
          img,
          { y: data.startY, opacity: 0 },
          {
            y: data.endY,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top bottom",
              end: `bottom+=${data.scrubEnd * 100}% top`,
              scrub: 0.6,
            },
          }
        );

        // Fade in separately for smoother entrance
        gsap.fromTo(
          img,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            scrollTrigger: {
              trigger: wrapperRef.current,
              // Group A fades in earlier, Group B later
              start: i < 2 ? "top 80%" : "top 30%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
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
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="relative bg-[#1a1a1a]" style={{ minHeight: "400vh" }}>
      {/* Sticky content — pinned for entire scroll */}
      <div className="relative md:sticky md:top-0 min-h-[600px] md:h-screen w-full overflow-hidden">

        {/* Floating images — behind text, z-0 */}
        <div className="absolute inset-0 z-0">
          {floatingImages.map((img, i) => (
            <div
              key={i}
              ref={(el) => { imagesRef.current[i] = el; }}
              className="absolute will-change-transform opacity-0"
              style={{ left: img.left, width: img.width, top: 0 }}
            >
              <div
                className="w-full overflow-hidden relative"
                style={{ aspectRatio: img.aspect }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#333] to-[#1a1a1a]" />
                <img
                  src={img.img}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-95"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Text layer — always on top */}
        <div className="relative z-10 h-full pointer-events-none">
          {/* Title — center of screen */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 md:px-20">
            <p className="text-center text-[11px] tracking-[0.08em] uppercase text-white/30 mb-6 font-[family-name:var(--font-jetbrains-mono)]">
              ( About )
            </p>
            <div ref={titleRef} className="text-center">
              {["WHY", "CHIRO?"].map((word, lineIdx) => (
                <div key={lineIdx} className="flex justify-center">
                  {word.split("").map((char, charIdx) => {
                    const globalIdx = lineIdx === 0 ? charIdx : 3 + charIdx;
                    return (
                      <span
                        key={`${lineIdx}-${charIdx}`}
                        className="inline-block text-[44px] md:text-[80px] lg:text-[120px] xl:text-[150px] font-extrabold text-white tracking-[0.02em] leading-[1.0] uppercase"
                        style={{
                          opacity: titleVisible ? 1 : 0,
                          transform: titleVisible ? "translateY(0)" : "translateY(50px)",
                          clipPath: titleVisible ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
                          transition: `all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) ${globalIdx * 0.04}s`,
                          marginRight: char === " " ? "0.3em" : "0",
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Body text — bottom right */}
          <div className="absolute bottom-10 right-5 md:right-20 text-right max-w-[440px]">
            <p className="text-[12px] md:text-[13px] text-white/35 leading-[1.9] mb-4">
              대부분의 웹 에이전시는 디자인을 만듭니다.
              <br />
              치로는 그 이전의 단계부터 시작합니다.
            </p>
            <p className="text-[12px] md:text-[13px] text-white/35 leading-[1.9] mb-4">
              치로의 기획자는 심리학을 전공했습니다.
              <br />
              사용자의 시선이 어디로 움직이는지, 어떤 버튼을 왜 누르는지,
              <br />
              그 모든 의사결정의 과정을 설계에 직접 반영합니다.
              <br />
              &ldquo;왜 이 버튼이 여기 있어야 하는지&rdquo; 설명할 수 있는
              <br />
              에이전시는 흔하지 않습니다.
            </p>
            <p className="text-[12px] md:text-[13px] text-white/35 leading-[1.9] mb-4">
              치로는 코드를 직접 작성합니다.
              <br />
              빌더 위에 얹는 템플릿이 아니라, 한 줄씩 직접 쓰는 코드입니다.
              <br />
              그래야만 가능한 구조와 속도와 최적화가 있습니다.
            </p>
            <p className="text-[12px] md:text-[13px] text-white/35 leading-[1.9] mb-4">
              기획, 디자인, 개발, 검색 최적화 —
              <br />
              대부분의 회사가 여러 업체에 외주를 주는 모든 단계를
              <br />
              치로는 하나의 팀에서 처음부터 끝까지 완성합니다.
            </p>
            <p className="text-[12px] md:text-[13px] text-white/50 leading-[1.9]">
              이것이 치로만이 할 수 있는 이유입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
