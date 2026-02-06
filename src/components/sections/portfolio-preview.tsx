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
  category: string;
  year: string | null;
}

const fallbackProjects: Project[] = [
  { id: 1, name: "Project Alpha", category: "Branding & Web", year: "2024" },
  { id: 2, name: "Project Beta", category: "UX Redesign", year: "2024" },
  { id: 3, name: "Project Gamma", category: "Performance", year: "2024" },
  { id: 4, name: "Project Delta", category: "Custom Build", year: "2025" },
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
    <section className="py-[120px] px-8">
      <Divider />
      <div className="max-w-[1280px] mx-auto pt-24">
        {/* 30/70 Split Header */}
        <div className="flex flex-col md:flex-row mb-16">
          <div className="md:w-[30%] md:pr-12 mb-8 md:mb-0">
            <SectionLabel number="04" label="Portfolio" />
          </div>
          <div className="md:w-[70%] md:border-l md:border-[#E0E0E0] md:pl-12 flex items-end justify-between">
            <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-noto-serif-kr)] tracking-tight">
              Selected Works<span className="text-[#FF4D00]">.</span>
            </h2>
            <Button href="/portfolio" variant="text" className="hidden md:inline-flex">
              모든 프로젝트 보기
            </Button>
          </div>
        </div>

        {/* Text-Only List */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="border-t border-[#E0E0E0]"
        >
          {projects.map((project, i) => (
            <motion.a
              key={project.id}
              href="/portfolio"
              variants={fadeInUp}
              data-cursor="view"
              className="group flex items-center justify-between py-6 md:py-8 border-b border-[#E0E0E0] transition-colors duration-300 hover:bg-[#F9F9F9] px-4 -mx-4"
            >
              <div className="flex items-center gap-6 md:gap-12">
                <span className="text-xs text-[#9b9b9b] font-[family-name:var(--font-jetbrains-mono)] w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg md:text-2xl font-light tracking-tight text-[#1a1a1a]">
                  {project.name}
                </span>
              </div>
              <div className="flex items-center gap-4 md:gap-8">
                <span className="hidden md:inline text-sm font-[family-name:var(--font-jetbrains-mono)] text-[#9b9b9b]">
                  {project.year}
                </span>
                <span className="hidden md:inline text-xs tracking-[0.15em] uppercase text-[#9b9b9b] w-32 text-right">
                  {project.category}
                </span>
                <span className="text-[#FF4D00] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-lg">
                  &#8599;
                </span>
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
