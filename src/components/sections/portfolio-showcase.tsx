"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  number: string;
  name: string;
  category: string;
  description: string;
  image: string;
  video?: string;
  link: string;
}

const fallbackProjects: Project[] = [
  {
    number: "01",
    name: "GOLF_ETC",
    category: "온라인 풀세팅",
    description: "새로 런칭하는 골프악세서리 브랜드의 분위기와 톤앤매너를 찾고, 함께 어떤 브랜드가 될지 기획하고 구현했습니다.",
    image: "/portfolio/nbpkorea.png",
    link: "/portfolio/project-GOLF_ETC",
  },
  {
    number: "02",
    name: "PEIT24",
    category: "온라인 풀세팅",
    description: "사람들이 테스트를 하고, 결과를 확인하고 서로 공유하는데에 불편함이 없도록.",
    image: "/portfolio/nbpkorea.png",
    link: "/portfolio/project-PEIT24",
  },
  {
    number: "03",
    name: "NBPKOREA",
    category: "Branding & Web",
    description: "글로벌 시장 진출을 위한 브랜드 아이덴티티 구축 및 웹사이트 런칭.",
    image: "/portfolio/nbpkorea.png",
    video: "https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/portfolio/nbpkorea.mp4",
    link: "/portfolio/nbpkorea",
  },
];

export default function PortfolioShowcase({ projects: propProjects }: { projects?: Project[] }) {
  const projects = propProjects && propProjects.length > 0 ? propProjects : fallbackProjects;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mediaItems = mediaContainerRef.current?.querySelectorAll<HTMLDivElement>(".portfolio-media");
      if (!mediaItems) return;

      projects.forEach((_, i) => {
        if (i === 0) return;

        // Trigger project switch at scroll progress thresholds
        ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: () => `${(i / projects.length) * 100}% top`,
          end: () => `${((i + 0.5) / projects.length) * 100}% top`,
          onEnter: () => setActiveIndex(i),
          onLeaveBack: () => setActiveIndex(i - 1),
        });

        // Previous media clips away
        gsap.to(mediaItems[i - 1], {
          clipPath: "inset(0 0 100% 0)",
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: () => `${((i - 0.15) / projects.length) * 100}% top`,
            end: () => `${((i + 0.15) / projects.length) * 100}% top`,
            scrub: 0.8,
          },
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const active = projects[activeIndex];

  return (
    <div
      ref={wrapperRef}
      className="relative bg-[#1a1a1a]"
      style={{ height: `${projects.length * 120}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col md:flex-row" data-theme="dark">

        {/* Section label */}
        <span className="absolute top-8 left-5 md:left-20 z-30 text-[11px] tracking-[0.08em] uppercase text-white/20 font-[family-name:var(--font-jetbrains-mono)]">
          ( Work )
        </span>

        {/* Left: Media area (55-60%) */}
        <div ref={mediaContainerRef} className="relative w-full md:w-[58%] h-[50vh] md:h-full p-4 md:p-8">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
          {projects.map((project, i) => (
            <div
              key={project.number}
              className="portfolio-media absolute inset-0"
              style={{
                zIndex: projects.length - i,
                clipPath: "inset(0 0 0 0)",
              }}
            >
              {project.video ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={project.image}
                  className="w-full h-full object-cover"
                >
                  <source src={project.video} type="video/mp4" />
                </video>
              ) : null}
              <img
                src={project.image}
                alt={project.name}
                className="absolute inset-0 w-full h-full object-contain -z-10"
              />
            </div>
          ))}
          </div>
        </div>

        {/* Right: Text panel (40%) */}
        <div className="w-full md:w-[42%] h-[50vh] md:h-full flex flex-col justify-center px-5 md:px-12 lg:px-16 relative">

          {/* Number — large ghost */}
          <AnimatePresence mode="wait">
            <motion.span
              key={`ghost-${activeIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute top-8 right-8 md:top-12 md:right-12 text-[80px] md:text-[120px] font-extrabold text-white/[0.04] leading-none select-none tracking-[-0.03em]"
            >
              {active.number}
            </motion.span>
          </AnimatePresence>

          {/* Project info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${activeIndex}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="text-[11px] tracking-[0.08em] text-[#6B7280] mb-3 block font-[family-name:var(--font-jetbrains-mono)]">
                ({active.number}) — {active.category}
              </span>

              <h3 className="text-[32px] md:text-[40px] lg:text-[48px] font-extrabold text-[#F5F5F5] tracking-[-0.02em] leading-[1.0] mb-6">
                {active.name}
              </h3>

              <p className="text-[16px] text-white/40 leading-[1.8] mb-8 max-w-[380px]">
                {active.description}
              </p>

              <Link
                href={active.link}
                className="inline-flex items-center gap-2 text-[14px] text-white/50 hover:text-white transition-colors duration-300 group tracking-[0.04em] uppercase"
              >
                View Project
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Progress indicator */}
          <div className="absolute bottom-8 left-5 md:left-12 lg:left-16 flex items-center gap-3">
            {projects.map((_, i) => (
              <div
                key={i}
                className="h-[2px] transition-all duration-500"
                style={{
                  width: i === activeIndex ? 32 : 12,
                  backgroundColor: i === activeIndex ? "#F5F5F5" : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
            <span className="ml-2 text-[11px] text-white/20 font-[family-name:var(--font-jetbrains-mono)]">
              {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
