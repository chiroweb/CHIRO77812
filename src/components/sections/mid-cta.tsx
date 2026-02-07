"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/motion";

export default function MidCta() {
  return (
    <section className="py-12 md:py-16 px-5 md:px-8">
      <div className="max-w-[1280px] mx-auto text-center">
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-base md:text-lg text-[#6b6b6b] leading-relaxed"
        >
          이런 결과물을 원하시나요?{" "}
          <a
            href="/contact"
            className="inline-flex items-center gap-1 text-[#1a1a1a] border-b border-[#1a1a1a] pb-[1px] hover:border-[#FF4D00] hover:text-[#FF4D00] transition-colors duration-300"
          >
            프로젝트 문의
            <span className="text-sm">&#8594;</span>
          </a>
        </motion.p>
      </div>
    </section>
  );
}
