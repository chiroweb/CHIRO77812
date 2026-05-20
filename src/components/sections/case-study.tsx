"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    name: "NBPKOREA",
    category: "Branding & Web",
    description: "글로벌 시장 진출을 위한 브랜드 아이덴티티 구축 및 웹사이트 런칭",
    video: "/portfolio/nbpkorea.mp4",
    poster: "/portfolio/nbpkorea.png",
    link: "/portfolio/nbpkorea",
  },
  {
    number: "02",
    name: "Man Solution",
    category: "Corporate Site",
    description: "전문성을 강조한 기업 사이트 구축으로 신뢰도 극대화",
    video: "/portfolio/mansolution.mp4",
    poster: "/portfolio/mansolution.png",
    link: "/portfolio/man-solution",
  },
  {
    number: "03",
    name: "FUNI",
    category: "E-commerce",
    description: "브랜드 감성을 살린 이커머스 플랫폼으로 온라인 판매 채널 확장",
    video: "/portfolio/funi.mp4",
    poster: "/portfolio/funi.png",
    link: "/portfolio/funi",
  },
];

export default function CaseStudy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videosRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const videoContainer = videosRef.current;
      if (!videoContainer) return;

      const videos = videoContainer.querySelectorAll<HTMLDivElement>(".case-video-wrap");

      projects.forEach((_, i) => {
        if (i === 0) return;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: () => `top+=${(i / projects.length) * 100}% top`,
          end: () => `top+=${((i + 0.5) / projects.length) * 100}% top`,
          onEnter: () => setActiveIndex(i),
          onLeaveBack: () => setActiveIndex(i - 1),
        });

        gsap.to(videos[i - 1], {
          clipPath: "inset(100% 0 0 0)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: () => `top+=${((i - 0.2) / projects.length) * 100}% top`,
            end: () => `top+=${((i + 0.3) / projects.length) * 100}% top`,
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const active = projects[activeIndex];

  return (
    <div ref={sectionRef} style={{ height: `${projects.length * 100}vh` }}>
      <section className="relative md:sticky md:top-0 min-h-[600px] md:h-screen w-full bg-[#0D1117] overflow-hidden flex flex-col md:flex-row" data-theme="dark">
        <span className="absolute top-10 left-5 md:left-20 z-30 text-[11px] tracking-[0.08em] uppercase text-white/20 font-[family-name:var(--font-jetbrains-mono)]">
          ( Work )
        </span>

        {/* Left: Videos (60%) */}
        <div ref={videosRef} className="relative w-full md:w-[60%] h-[60vw] md:h-full min-h-[300px]">
          {projects.map((project, i) => (
            <div
              key={project.number}
              className="case-video-wrap absolute inset-0"
              style={{ zIndex: projects.length - i, clipPath: "inset(0 0 0 0)" }}
            >
              <video autoPlay muted loop playsInline poster={project.poster} className="w-full h-full object-cover">
                <source src={project.video} type="video/mp4" />
              </video>
              <img src={project.poster} alt={project.name} className="absolute inset-0 w-full h-full object-cover -z-10" />
            </div>
          ))}
        </div>

        {/* Right: Sticky text (40%) */}
        <div className="hidden md:flex w-[40%] h-full flex-col justify-center px-10 lg:px-16 relative">
          <span
            key={`num-${activeIndex}`}
            className="text-[11px] tracking-[0.08em] text-[#6B7280] mb-4 font-[family-name:var(--font-jetbrains-mono)] animate-[fadeUp_0.3s_ease-out]"
          >
            ({active.number})
          </span>
          <h3
            key={`name-${activeIndex}`}
            className="text-[32px] lg:text-[42px] font-semibold text-[#F5F5F5] tracking-[-0.01em] leading-[1.05] mb-4 animate-[fadeUp_0.3s_ease-out]"
          >
            {active.name}
          </h3>
          <span
            key={`cat-${activeIndex}`}
            className="text-[11px] tracking-[0.08em] uppercase text-[#6B7280] mb-6 font-[family-name:var(--font-jetbrains-mono)] animate-[fadeUp_0.3s_0.05s_ease-out_both]"
          >
            {active.category}
          </span>
          <p
            key={`desc-${activeIndex}`}
            className="text-[16px] text-white/40 leading-[1.7] mb-8 max-w-[320px] animate-[fadeUp_0.3s_0.1s_ease-out_both]"
          >
            {active.description}
          </p>
          <a
            href={active.link}
            className="inline-flex items-center gap-2 text-[14px] text-white/50 hover:text-white transition-colors duration-300 group w-fit tracking-[0.04em] uppercase"
          >
            View Project
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>

        {/* Mobile overlay */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 z-20 p-5 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/80 to-transparent">
          <span className="text-[11px] tracking-[0.08em] text-[#6B7280] mb-2 block font-[family-name:var(--font-jetbrains-mono)]">
            ({active.number}) — {active.category}
          </span>
          <h3 className="text-[28px] font-semibold text-[#F5F5F5] tracking-[-0.01em] leading-[1.05] mb-2">
            {active.name}
          </h3>
          <p className="text-[16px] text-white/40 leading-[1.7]">{active.description}</p>
        </div>
      </section>
    </div>
  );
}
