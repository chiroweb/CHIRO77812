"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";
import Button from "@/components/ui/button";

interface Project {
  id: number;
  name: string;
  slug: string | null;
  category: string;
  year: string | null;
  problem?: string;
  result?: string;
  image_url?: string;
}

const fallbackProjects: Project[] = [
  {
    id: 1,
    name: "NBPKOREA",
    slug: "nbpkorea",
    category: "Branding & Web",
    year: "2024",
    problem: "글로벌 시장 진출을 위한 브랜드 사이트 필요",
    result: "브랜드 아이덴티티 구축 및 웹사이트 런칭",
    image_url: "/portfolio/nbpkorea.png",
  },
  {
    id: 2,
    name: "Man Solution",
    slug: "man-solution",
    category: "Corporate Site",
    year: "2024",
    problem: "기업 신뢰도를 전달할 홈페이지 부재",
    result: "전문성을 강조한 기업 사이트 구축",
    image_url: "/portfolio/mansolution.png",
  },
  {
    id: 3,
    name: "FUNI",
    slug: "funi",
    category: "E-commerce",
    year: "2024",
    problem: "온라인 판매 채널 확장 필요",
    result: "브랜드 감성을 살린 이커머스 구축",
    image_url: "/portfolio/funi.png",
  },
  {
    id: 4,
    name: "STUDIO",
    slug: "studio",
    category: "Portfolio Site",
    year: "2025",
    problem: "크리에이티브 포트폴리오 사이트 필요",
    result: "미니멀 디자인의 포트폴리오 사이트 런칭",
    image_url: "/portfolio/studio.png",
  },
];

export default function PortfolioPreview() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((data) => {
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects.slice(0, 6));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-[72px] md:py-[120px] px-5 md:px-8">
      <Divider />
      <div className="max-w-[1280px] mx-auto pt-16 md:pt-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row mb-10 md:mb-16">
          <div className="md:w-[30%] md:pr-12 mb-8 md:mb-0">
            <SectionLabel number="01" label="Portfolio" />
          </div>
          <div className="md:w-[70%] md:border-l md:border-[#E0E0E0] md:pl-12 flex items-end justify-between">
            <h2 className="font-[family-name:var(--font-space-grotesk)] font-light text-[36px] md:text-[72px] tracking-[0.03em] leading-[1.05]">
              Selected Works<span className="text-[#FF4D00]">.</span>
            </h2>
            <Button href="/portfolio" variant="text" className="hidden md:inline-flex">
              모든 프로젝트 보기
            </Button>
          </div>
        </div>

        {/* 3-Column Image Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
        >
          {projects.map((project) => (
            <motion.a
              key={project.id}
              href={`/portfolio/${project.slug || project.id}`}
              variants={fadeInUp}
              data-cursor="view"
              className="group relative block overflow-hidden bg-[#f5f5f3]"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-full bg-[#e8e8e6] flex items-center justify-center">
                    <span className="text-lg md:text-xl font-light tracking-tight text-[#9b9b9b]">
                      {project.name}
                    </span>
                  </div>
                )}

                {/* Hover Overlay — desktop only */}
                <div className="hidden md:flex absolute inset-0 bg-[#1a1a1a]/0 group-hover:bg-[#1a1a1a]/60 transition-colors duration-500 items-end p-5">
                  <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {project.problem && (
                      <p className="text-[11px] text-white/70 mb-1.5 leading-relaxed">
                        {project.problem}
                      </p>
                    )}
                    {project.result && (
                      <p className="text-xs text-white leading-relaxed">
                        {project.result}
                      </p>
                    )}
                  </div>
                  <span className="absolute top-5 right-5 text-white text-base opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                    &#8599;
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-4 md:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm md:text-base font-semibold tracking-tight text-[#1a1a1a]">
                      {project.name}
                    </h3>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.15em] uppercase text-[#9b9b9b] mt-0.5 block">
                      {project.category}
                    </span>
                  </div>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#9b9b9b]">
                    {project.year}
                  </span>
                </div>
                {/* Mobile-only: problem/result info */}
                <div className="mt-3 md:hidden">
                  {project.problem && (
                    <p className="text-xs text-[#6b6b6b] leading-[1.6] mb-1">
                      {project.problem}
                    </p>
                  )}
                  {project.result && (
                    <p className="text-xs text-[#1a1a1a] leading-[1.6]">
                      &rarr; {project.result}
                    </p>
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Mobile CTA */}
        <div className="mt-8 md:hidden">
          <Button href="/portfolio" variant="text">
            모든 프로젝트 보기
          </Button>
        </div>
      </div>
    </section>
  );
}
