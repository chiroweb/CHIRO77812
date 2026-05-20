"use client";

import { useState } from "react";
import Link from "next/link";

const clipDefault = "inset(22% 30% 35% 32% round 8px)";
const clipExpanded = "inset(0% 0% 0% 0% round 0px)";

export default function CtaContact() {
  const [expanded, setExpanded] = useState(false);
  const clip = expanded ? clipExpanded : clipDefault;

  const titleStyle: React.CSSProperties = {
    fontSize: "clamp(60px, 12vw, 220px)",
    fontWeight: 800,
    letterSpacing: "-0.04em",
    lineHeight: 0.85,
    textTransform: "uppercase" as const,
    userSelect: "none" as const,
    textAlign: "center" as const,
  };

  return (
    <section className="relative overflow-hidden bg-[#F0F0F0] py-[120px] md:py-0 min-h-[600px] md:min-h-screen">

      {/* Layer 1: Dark text on light bg (base) */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center">
        <h2 style={{ ...titleStyle, color: "#1a1a1a" }}>
          CONTACT US
        </h2>
      </div>

      {/* Layer 2: Image + white stroked text (clipped together) */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          clipPath: clip,
          transition: "clip-path 700ms cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/cta/cta-video.mp4"
        />
        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute inset-0 flex items-center justify-center">
          <h2
            style={{
              ...titleStyle,
              color: "#FFFFFF",
              WebkitTextStroke: "1px #000000",
            }}
          >
            CONTACT US
          </h2>
        </div>
      </div>

      {/* Layer 3: Description text — bottom left */}
      <div className="absolute z-10 bottom-[8%] left-8 md:left-16 lg:left-24 max-w-[420px]">
        <p
          className="text-[13px] md:text-[15px] leading-[2] mb-6"
          style={{
            color: expanded ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.45)",
            transition: "color 700ms",
          }}
        >
          Let&apos;s work together to create
          <br />
          성장하는 브랜드를 위한
          <br />
          디자인과 기술의 완벽한 조화.
          <br />
          지금 시작하세요.
        </p>

        <div
          className="border-t pt-5 flex flex-col gap-4"
          style={{
            borderColor: expanded ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)",
            transition: "border-color 700ms",
          }}
        >
          <div>
            <p
              className="text-[13px] md:text-[14px] font-semibold mb-1"
              style={{ color: expanded ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.6)", transition: "color 700ms" }}
            >
              ① 무료 사이트 진단 받기
            </p>
            <p
              className="text-[11px] md:text-[12px] leading-[1.6]"
              style={{ color: expanded ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.3)", transition: "color 700ms" }}
            >
              웹사이트 URL만 알려주세요. 24시간 이내 진단 결과를 보내드립니다.
            </p>
          </div>
          <div>
            <p
              className="text-[13px] md:text-[14px] font-semibold mb-1"
              style={{ color: expanded ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.6)", transition: "color 700ms" }}
            >
              ② 프로젝트 상담 신청
            </p>
            <p
              className="text-[11px] md:text-[12px] leading-[1.6]"
              style={{ color: expanded ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.3)", transition: "color 700ms" }}
            >
              30분 무료 상담 · 평균 24시간 이내 응답
            </p>
          </div>
        </div>
      </div>

      {/* Layer 4: Circle button — bottom-right corner of mask */}
      <div
        className="absolute z-20"
        style={{ bottom: "35%", right: "30%", transform: "translate(50%, 50%)" }}
      >
        <Link
          href="/contact"
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
          className="block"
        >
          <div
            style={{
              width: 180,
              height: 180,
              borderRadius: "50%",
              border: `2px solid ${expanded ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.08)"}`,
              backgroundColor: expanded ? "rgba(255,255,255,0.1)" : "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 700ms",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              aspectRatio: "1/1",
            }}
          >
            <span
              style={{
                fontSize: 14,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontWeight: 500,
                color: expanded ? "#FFFFFF" : "#1a1a1a",
                transition: "color 700ms",
                textAlign: "center",
                lineHeight: 1.4,
                whiteSpace: "pre-line",
              }}
            >
              {expanded ? "→" : "GO TO\nFORM"}
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
