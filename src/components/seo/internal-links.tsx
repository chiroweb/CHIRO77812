"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/motion';

interface InternalLink {
  title: string;
  href: string;
  description: string;
}

interface InternalLinksProps {
  links: InternalLink[];
  heading?: string;
}

export default function InternalLinks({ links, heading = "관련 콘텐츠" }: InternalLinksProps) {
  if (links.length === 0) return null;

  return (
    <section className="py-[72px] md:py-[120px] px-5 md:px-8">
      <div className="max-w-[1280px] mx-auto">
        <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b] mb-8">
          {heading}
        </p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#E0E0E0]"
        >
          {links.map((link) => (
            <motion.div key={link.href} variants={fadeInUp}>
              <Link
                href={link.href}
                className="block bg-white p-8 group hover:bg-[#fafaf8] transition-colors"
              >
                <h3 className="text-base font-normal tracking-tight mb-2 group-hover:text-[#FF4D00] transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-[#6b6b6b] leading-[1.7] mb-4">
                  {link.description}
                </p>
                <span className="text-sm text-[#9b9b9b] group-hover:text-[#FF4D00] transition-colors">
                  자세히 보기 →
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
