"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/motion";

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
          setProjects(data.projects.slice(0, 4));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-[120px] md:py-[160px] px-5 md:px-8 lg:px-16 bg-[#fafaf8]">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24"
        >
          <h2 className="text-[36px] md:text-[56px] lg:text-[72px] font-extrabold tracking-[-0.03em] leading-[1.1] text-[#1a1a1a]">
            Selected Works<span className="text-[#FF4D00]">.</span>
          </h2>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 text-sm text-[#1a1a1a] hover:text-[#FF4D00] transition-colors duration-300 group shrink-0"
          >
            <span className="w-8 h-8 rounded-full border border-[#1a1a1a] flex items-center justify-center group-hover:border-[#FF4D00] transition-colors duration-300">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="group-hover:translate-x-0.5 transition-transform duration-300"
              >
                <path
                  d="M2 6h8M7 3l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase">
              모든 프로젝트 보기
            </span>
          </Link>
        </motion.div>

        {/* Grid — 1x4 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/portfolio/${project.slug || project.id}`}
                data-cursor="view"
                className="group block overflow-hidden rounded-lg"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#e8e8e6]">
                  {project.image_url &&
                  /\.(mp4|webm|mov)(\?|$)/i.test(project.image_url) ? (
                    <video
                      src={project.image_url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  ) : project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl font-light tracking-tight text-[#9b9b9b]">
                        {project.name}
                      </span>
                    </div>
                  )}

                  {/* Hover Overlay — desktop only */}
                  <div className="hidden md:flex absolute inset-0 bg-[#1a1a1a]/0 group-hover:bg-[#1a1a1a]/60 transition-colors duration-500 items-end p-8">
                    <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      {project.problem && (
                        <p className="text-sm text-white/70 mb-2 leading-relaxed">
                          {project.problem}
                        </p>
                      )}
                      {project.result && (
                        <p className="text-sm text-white leading-relaxed font-medium">
                          → {project.result}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Info — minimal */}
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold tracking-tight text-[#1a1a1a]">
                      {project.name}
                    </h3>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.15em] uppercase text-[#9b9b9b] mt-0.5 block">
                      {project.category}
                    </span>
                  </div>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#9b9b9b]">
                    {project.year}
                  </span>
                </div>

                {/* Mobile info */}
                <div className="md:hidden pb-2">
                  {project.problem && (
                    <p className="text-xs text-[#6b6b6b] leading-[1.6] mb-1">
                      {project.problem}
                    </p>
                  )}
                  {project.result && (
                    <p className="text-xs text-[#1a1a1a] leading-[1.6]">
                      → {project.result}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
