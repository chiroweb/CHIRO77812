"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  name: string;
  company?: string;
  projectType: string;
  rating: number;
  quote: string;
}

interface ReviewGridProps {
  reviews: Review[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating}점`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-[16px] ${i < rating ? "text-amber-400" : "text-[#ddd]"}`}
        >
          {i < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function ReviewGrid({ reviews }: ReviewGridProps) {
  const projectTypes = ["전체", ...Array.from(new Set(reviews.map((r) => r.projectType)))];
  const [activeType, setActiveType] = useState("전체");

  const filtered =
    activeType === "전체" ? reviews : reviews.filter((r) => r.projectType === activeType);

  return (
    <section className="bg-[#f5f5f0] py-[160px] md:py-[200px]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 xl:px-20">
        {/* Filter tabs */}
        <div className="flex items-center gap-6 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {projectTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`text-[13px] pb-1.5 whitespace-nowrap transition-colors duration-200 border-b-2 ${
                activeType === type
                  ? "text-[#111] border-[#111]"
                  : "text-[#999] border-transparent hover:text-[#555]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeType}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
          >
            {filtered.map((review, index) => (
              <motion.div
                key={`${review.name}-${index}`}
                variants={cardVariants}
                className="bg-white rounded-xl p-6 md:p-8 border border-[#eee] flex flex-col gap-4"
              >
                {/* Top: rating + project type tag */}
                <div className="flex items-center justify-between gap-3">
                  <StarRating rating={review.rating} />
                  <span className="px-2.5 py-1 rounded-full bg-[#f0f0f0] text-[11px] text-[#666] tracking-[0.04em] shrink-0">
                    {review.projectType}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-[15px] text-[#333] leading-[1.8] italic flex-1">
                  &ldquo;{review.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#f0f0f0]">
                  <div>
                    <p className="text-[14px] font-semibold text-[#111]">{review.name}</p>
                    {review.company && (
                      <p className="text-[13px] text-[#999] mt-0.5">{review.company}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
