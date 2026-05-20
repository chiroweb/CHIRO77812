"use client";

import Link from "next/link";

const projects = [
  {
    number: "01",
    name: "NBPKOREA",
    category: "Branding & Web",
    description: "글로벌 시장 진출을 위한 브랜드 아이덴티티 구축 및 웹사이트 런칭",
    result: "+240% 유입 증가",
    video: "/portfolio/nbpkorea.mp4",
    poster: "/portfolio/nbpkorea.png",
    link: "/portfolio/nbpkorea",
  },
  {
    number: "02",
    name: "Man Solution",
    category: "Corporate Site",
    description: "전문성을 강조한 기업 사이트 구축으로 신뢰도 극대화",
    result: "+180% 문의 증가",
    video: "/portfolio/mansolution.mp4",
    poster: "/portfolio/mansolution.png",
    link: "/portfolio/man-solution",
  },
  {
    number: "03",
    name: "FUNI",
    category: "E-commerce",
    description: "브랜드 감성을 살린 이커머스 플랫폼으로 온라인 판매 채널 확장",
    result: "+320% 매출 성장",
    video: "/portfolio/funi.mp4",
    poster: "/portfolio/funi.png",
    link: "/portfolio/funi",
  },
];

export default function PortfolioStack() {
  return (
    <div className="bg-[#fafaf8]">
      {/* Each slide is sticky, stacking on top of previous */}
      {projects.map((project, i) => (
        <div
          key={project.number}
          className="relative md:sticky md:top-0 min-h-[600px] md:h-screen w-full"
          style={{ zIndex: i + 1 }}
        >
          <div
            className="h-full w-full bg-[#f7f7f5]"
            style={{
              boxShadow: i > 0 ? "0 -30px 80px rgba(0,0,0,0.15), 0 -4px 20px rgba(0,0,0,0.08)" : "none",
            }}
          >
            <div className="h-full relative">
              {/* Right: Video (60%) — positioned first, behind text */}
              <div className="absolute right-0 top-0 w-full md:w-[60%] h-full flex items-center justify-center p-4 md:p-10">
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#e8e8e6]">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={project.poster}
                    className="w-full h-full object-cover"
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                  <img
                    src={project.poster}
                    alt={project.name}
                    className="absolute inset-0 w-full h-full object-cover -z-10"
                  />
                </div>
              </div>

              {/* Text block — overlaps into video with bg */}
              <div className="absolute left-0 top-0 z-20 px-8 md:px-12 lg:px-16 pt-[100px] md:pt-[140px]">
                {/* Number */}
                <span className="text-[13px] font-extrabold text-[#FF4D00] tracking-[0.1em] block mb-3">
                  {project.number}
                </span>

                {/* Project name — massive with bg block underneath */}
                <div className="relative inline-block">
                  <h3 className="text-[64px] md:text-[100px] lg:text-[140px] font-[900] text-[#1a1a1a] tracking-[-0.04em] leading-[0.85] relative z-10 pr-4">
                    {project.name}
                  </h3>
                  {/* Background block that extends behind text into video area */}
                  <div className="absolute left-[-32px] md:left-[-48px] lg:left-[-64px] top-0 bottom-0 right-0 bg-[#f7f7f5] -z-0" />
                </div>

                {/* Category */}
                <span className="text-[11px] tracking-[0.12em] uppercase text-[#9b9b9b] mt-4 block mb-4 font-[family-name:var(--font-jetbrains-mono)]">
                  {project.category}
                </span>

                <p className="text-[14px] text-[#6b6b6b] leading-[1.7] mb-4 max-w-[320px]">
                  {project.description}
                </p>

                <p className="text-[18px] md:text-[22px] font-extrabold text-[#FF4D00] mb-6">
                  {project.result}
                </p>

                <Link
                  href={project.link}
                  className="inline-flex items-center gap-2 text-sm text-[#1a1a1a] hover:text-[#FF4D00] transition-colors duration-300 group w-fit"
                >
                  사이트 방문
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}
