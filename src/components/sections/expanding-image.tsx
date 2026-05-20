"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  "대부분의 홈페이지는",
  "만들어지고 잊혀집니다.",
  "",
  "론칭하는 날 잠깐 축하받고,",
  "며칠 동안 가족과 지인에게 링크를 보내고,",
  "그리고 서서히 잊혀집니다.",
  "검색해도 나오지 않고, 누군가 우연히 찾아와도",
  "바로 떠나는 홈페이지가 됩니다.",
  "",
  "치로가 만든 홈페이지는 다릅니다.",
  "",
  "만들어진 다음 날부터",
  "구글이 읽기 시작합니다.",
  "ChatGPT가 인용하기 시작합니다.",
  "Perplexity가 출처로 선택하기 시작합니다.",
  "",
  "홈페이지는 만들어서 끝나는 결과물이 아니라,",
  "그날부터 비로소 일을 시작하는 출발점입니다.",
  "",
  "치로는 그 출발선을 설계합니다.",
];

export default function ExpandingImage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image expand
      gsap.fromTo(
        clipRef.current,
        {
          clipPath: "inset(15% 20% 15% 20% round 12px)",
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 50%",
            end: "center center",
            scrub: 0.5,
            onUpdate: (self) => {
              // Show text when image is ~85% expanded
              if (self.progress > 0.85 && !textVisible) {
                setTextVisible(true);
              }
            },
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, [textVisible]);

  return (
    <div ref={wrapperRef} className="relative" style={{ minHeight: "200vh", background: "linear-gradient(to bottom, #f5f5f0 0%, #f5f5f0 30%, #1a1a1a 70%, #1a1a1a 100%)" }}>
      <div className="relative md:sticky md:top-0 min-h-[600px] md:h-screen w-full">
        <div
          ref={clipRef}
          className="w-full h-full will-change-transform"
          style={{ clipPath: "inset(15% 20% 15% 20% round 12px)" }}
        >
          <div className="absolute inset-0 bg-[#001F3F]" />
          <img
            src="/services/building-night.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Text overlay — left side, reveals when image is nearly full */}
        <div
          ref={textRef}
          className="absolute z-10 left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 max-w-[460px]"
        >
          {lines.map((line, i) => (
            <span
              key={i}
              className={`block ${
                line === "" ? "h-4" :
                line === "치로가 만든 홈페이지는 다릅니다." || line === "치로는 그 출발선을 설계합니다."
                  ? "text-[14px] md:text-[16px] text-white/90 font-medium"
                  : "text-[13px] md:text-[14px] text-white/60"
              } leading-[1.9]`}
              style={{
                opacity: textVisible ? 1 : 0,
                transform: textVisible ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.5s ease ${i * 0.04}s, transform 0.5s ease ${i * 0.04}s`,
              }}
            >
              {line || "\u00A0"}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
