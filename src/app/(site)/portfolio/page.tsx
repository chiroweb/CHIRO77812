"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";

interface Project {
  id: number;
  name: string;
  category: string;
  problem: string | null;
  result: string | null;
  year: string | null;
  image_url: string | null;
}

const fallbackProjects: Project[] = [
  { id: 1, name: "Project Alpha", category: "Branding & Web", problem: "브랜드 인지도 부족으로 온라인 전환율이 낮았습니다.", result: "런칭 3개월 내 문의량 240% 증가", year: "2024", image_url: null },
  { id: 2, name: "Project Beta", category: "UX Redesign", problem: "복잡한 서비스 구조로 사용자 이탈률이 높았습니다.", result: "이탈률 45% 감소, 평균 체류 시간 2배 증가", year: "2024", image_url: null },
  { id: 3, name: "Project Gamma", category: "Performance", problem: "기존 사이트의 속도와 SEO 문제로 검색 노출이 어려웠습니다.", result: "검색 유입 380% 증가, 페이지 로드 0.8초", year: "2024", image_url: null },
  { id: 4, name: "Project Delta", category: "Custom Build", problem: "아임웹 한계로 원하는 디자인 구현이 불가능했습니다.", result: "커스텀 빌드로 브랜드 정체성 완벽 반영", year: "2025", image_url: null },
  { id: 5, name: "Project Epsilon", category: "E-Commerce", problem: "기존 쇼핑몰의 전환율이 업계 평균 이하였습니다.", result: "구매 전환율 180% 향상", year: "2025", image_url: null },
  { id: 6, name: "Project Zeta", category: "Corporate", problem: "기업 이미지와 웹사이트의 괴리가 심했습니다.", result: "브랜드 일관성 확보, 문의량 3배 증가", year: "2025", image_url: null },
];

export default function PortfolioPage() {
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

  return (
    <section className="pt-32 pb-32 px-8">
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
            className="text-3xl md:text-[40px] font-light tracking-tight leading-[1.2] mb-6"
          >
            엄선된 프로젝트.
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
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#e5e5e3]"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeInUp}
              className="group relative bg-white p-8 md:p-10 cursor-pointer min-h-[280px] flex flex-col justify-between"
            >
              {/* Hover Image */}
              <div className="absolute inset-0 bg-[#f5f5f3] opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center z-10">
                {project.image_url ? (
                  <img src={project.image_url} alt={project.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-64 h-48 bg-[#e5e5e3] border border-dashed border-[#d0d0ce] flex items-center justify-center">
                    <span className="text-xs tracking-wider uppercase text-[#9b9b9b]">Image</span>
                  </div>
                )}
              </div>

              {/* Top */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b]">
                    {project.category}
                  </p>
                  <p className="text-xs tracking-wider text-[#9b9b9b] font-[family-name:var(--font-jetbrains-mono)]">
                    {project.year}
                  </p>
                </div>
                <h3 className="text-xl font-normal tracking-tight mb-4">
                  {project.name}
                </h3>
                <p className="text-sm text-[#6b6b6b] leading-[1.7]">
                  {project.problem}
                </p>
              </div>

              {/* Bottom */}
              <div className="mt-6 pt-4 border-t border-[#e5e5e3]">
                <p className="text-sm font-normal text-[#1a1a1a]">
                  {project.result}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
