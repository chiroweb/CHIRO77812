"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SubpageHeroProps {
  title: string;
  label: string;
  image?: string;
}

export default function SubpageHero({
  title,
  label,
  image,
}: SubpageHeroProps) {
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageClipRef = useRef<HTMLDivElement>(null);

  // Title reveal
  useEffect(() => {
    const el = heroRef.current;
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

  // Image expand on scroll
  useEffect(() => {
    if (!image || !imageWrapperRef.current || !imageClipRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageClipRef.current,
        { clipPath: "inset(0% 12% 0% 12% round 12px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top 70%",
            end: "top 20%",
            scrub: 0.4,
          },
        }
      );
    }, imageWrapperRef);

    return () => ctx.revert();
  }, [image]);

  const words = title.split(" ");

  return (
    <>
      {/* Hero — light bg like Toyokoh */}
      <section
        ref={heroRef}
        className="relative bg-[#f5f5f0] min-h-[70vh] md:min-h-[80vh] flex flex-col justify-end px-5 md:px-12 lg:px-20 pb-16 md:pb-24"
      >
        <div className="max-w-[1400px] mx-auto w-full">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] md:text-[12px] tracking-[0.08em] uppercase text-[#999] mb-8 md:mb-12"
          >
            {label}
          </motion.p>

          {/* Title — massive */}
          <h1 className="text-[56px] md:text-[100px] lg:text-[140px] xl:text-[170px] font-extrabold tracking-[-0.04em] leading-[0.85] uppercase text-[#111]">
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
                      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
      </section>

      {/* Expanding image — starts 76% width, expands to 100% on scroll */}
      {image && (
        <div ref={imageWrapperRef} className="bg-[#f5f5f0]">
          <div
            ref={imageClipRef}
            className="w-full will-change-transform"
            style={{ clipPath: "inset(0% 12% 0% 12% round 12px)" }}
          >
            <div className="aspect-[21/9] md:aspect-[2.5/1]">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
