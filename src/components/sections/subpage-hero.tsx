"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface SubpageHeroProps {
  title: string;
  label: string;
  image?: string;
  dark?: boolean;
}

export default function SubpageHero({
  title,
  label,
  image,
  dark = true,
}: SubpageHeroProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = title.split(" ");

  const bg = dark ? "#1a1a1a" : "#f5f5f0";
  const textColor = dark ? "#ffffff" : "#111111";
  const labelColor = dark ? "rgba(255,255,255,0.3)" : "#999999";

  return (
    <section
      ref={ref}
      style={{ backgroundColor: bg, color: textColor }}
      className="relative min-h-screen flex flex-col justify-end"
      data-theme={dark ? "dark" : undefined}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 lg:px-20 pb-16 md:pb-24 w-full">
        {/* Label — small, just a whisper */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ color: labelColor }}
          className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] md:text-[12px] tracking-[0.08em] uppercase mb-8 md:mb-12"
        >
          {label}
        </motion.p>

        {/* Title — massive, takes up the space */}
        <h1 className="text-[56px] md:text-[100px] lg:text-[140px] xl:text-[170px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase">
          {words.map((word, wi) => (
            <span key={wi} className="inline-block mr-[0.15em] last:mr-0">
              {word.split("").map((letter, li) => {
                const globalIndex = words
                  .slice(0, wi)
                  .reduce((acc, w) => acc + w.length, 0) + li;
                return (
                  <motion.span
                    key={li}
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      visible
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 30 }
                    }
                    transition={{
                      duration: 0.4,
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: 0.3 + globalIndex * 0.04,
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>
      </div>

      {/* Optional hero image — full width at the very bottom */}
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full aspect-[21/9] overflow-hidden"
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </section>
  );
}
