"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";

interface Project {
  id: number;
  name: string;
  slug: string | null;
  category: string;
  client_name: string | null;
  problem: string | null;
  result: string | null;
  year: string | null;
  image_url: string | null;
}

const fallbackProjects: Project[] = [
  { id: 1, name: "NBPKOREA", slug: "nbpkorea", category: "Branding & Web", client_name: "NBPKOREA", problem: "글로벌 시장 진출을 위한 브랜드 사이트 필요", result: "브랜드 아이덴티티 구축 및 웹사이트 런칭", year: "2024", image_url: "/portfolio/nbpkorea.png" },
  { id: 2, name: "Man Solution", slug: "man-solution", category: "Corporate Site", client_name: "Man Solution", problem: "기업 신뢰도를 전달할 홈페이지 부재", result: "전문성을 강조한 기업 사이트 구축", year: "2024", image_url: "/portfolio/mansolution.png" },
  { id: 3, name: "FUNI", slug: "funi", category: "E-commerce", client_name: "FUNI", problem: "온라인 판매 채널 확장 필요", result: "브랜드 감성을 살린 이커머스 구축", year: "2024", image_url: "/portfolio/funi.png" },
  { id: 4, name: "STUDIO", slug: "studio", category: "Portfolio Site", client_name: "STUDIO", problem: "크리에이티브 포트폴리오 사이트 필요", result: "미니멀 디자인의 포트폴리오 사이트 런칭", year: "2025", image_url: "/portfolio/studio.png" },
];

export default function PortfolioContent() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((data) => {
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects);
        }
      })
      .catch(() => {});
  }, []);

  function getProjectLink(project: Project) {
    return `/portfolio/${project.slug || project.id}`;
  }

  return (
    <section className="pt-24 md:pt-32 pb-24 md:pb-32 px-5 md:px-8">
      <div className="max-w-[1280px] mx-auto">
        <SectionLabel number="01" label="Portfolio" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-20"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[44px] font-light tracking-[0.03em] leading-[1.05] mb-6"
          >
            엄선된 프로젝트<span className="text-[#FF4D00]">.</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-base text-[#6b6b6b] leading-[1.7] max-w-lg"
          >
            치로가 몰입했던 프로젝트들입니다. 각 프로젝트는 고유한 문제를
            해결하고, 측정 가능한 결과를 만들어냈습니다.
          </motion.p>
        </motion.div>

        <Divider />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {projects.map((project) => (
            <motion.a
              key={project.id}
              href={getProjectLink(project)}
              variants={fadeInUp}
              data-cursor="view"
              className="group relative block overflow-hidden bg-[#f5f5f3]"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-full bg-[#e8e8e6] flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-light tracking-tight text-[#9b9b9b]">
                      {project.name}
                    </span>
                  </div>
                )}

                {/* Hover Overlay — desktop only */}
                <div className="hidden md:flex absolute inset-0 bg-[#1a1a1a]/0 group-hover:bg-[#1a1a1a]/60 transition-colors duration-500 items-end p-8">
                  <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {project.problem && (
                      <p className="text-xs text-white/70 mb-2 leading-relaxed">
                        {project.problem}
                      </p>
                    )}
                    {project.result && (
                      <p className="text-sm text-white leading-relaxed">
                        {project.result}
                      </p>
                    )}
                  </div>
                  <span className="absolute top-8 right-8 text-white text-lg opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                    &#8599;
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base md:text-lg font-normal tracking-tight text-[#1a1a1a]">
                      {project.name}
                    </h3>
                    <span className="text-xs tracking-[0.15em] uppercase text-[#9b9b9b] mt-1 block">
                      {project.category}
                    </span>
                  </div>
                  <span className="text-xs font-[family-name:var(--font-jetbrains-mono)] text-[#9b9b9b]">
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
      </div>
    </section>
  );
}
