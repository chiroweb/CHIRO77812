"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface PortfolioProject {
  id: number;
  name: string;
  slug: string;
  category: string;
  image_url: string;
  year: string;
}

interface PortfolioGridProps {
  projects: PortfolioProject[];
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const categories = ["전체", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState("전체");

  const filtered =
    activeCategory === "전체"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="bg-[#f5f5f0] py-[160px] md:py-[200px]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 xl:px-20">
        {/* Filter tabs */}
        <div className="flex items-center gap-6 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[13px] pb-1.5 whitespace-nowrap transition-colors duration-200 border-b-2 ${
                activeCategory === cat
                  ? "text-[#111] border-[#111]"
                  : "text-[#999] border-transparent hover:text-[#555]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link href={`/portfolio/${project.slug}`} className="group block">
                  {/* Image */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#e8e8e0]">
                    <Image
                      src={project.image_url}
                      alt={project.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Info */}
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[16px] font-semibold text-[#111] leading-snug">
                        {project.name}
                      </p>
                      <p className="text-[12px] text-[#999] mt-0.5">{project.category}</p>
                    </div>
                    <p className="text-[12px] text-[#bbb] shrink-0 mt-0.5">{project.year}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
