"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SubNavProps {
  items: { label: string; href: string }[];
  pageLabel: string;
}

export default function SubNav({ items, pageLabel }: SubNavProps) {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create a sentinel element at the bottom of the hero (100vh)
    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = "100vh";
    sentinel.style.left = "0";
    sentinel.style.width = "1px";
    sentinel.style.height = "1px";
    sentinel.style.pointerEvents = "none";
    document.body.appendChild(sentinel);
    sentinelRef.current = sentinel;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Visible when sentinel has scrolled OUT of viewport (user scrolled past hero)
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  const handleClick = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto"
          aria-label={pageLabel}
        >
          <div className="flex items-center gap-1 h-12 px-5 rounded-full bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/[0.08] shadow-lg">
            {/* Grid icon + page label */}
            <div className="flex items-center gap-2 pr-4 border-r border-white/[0.12]">
              <span className="grid grid-cols-2 gap-[3px] shrink-0" aria-hidden="true">
                <span className="w-[3px] h-[3px] rounded-[1px] bg-white/40 block" />
                <span className="w-[3px] h-[3px] rounded-[1px] bg-white/40 block" />
                <span className="w-[3px] h-[3px] rounded-[1px] bg-white/40 block" />
                <span className="w-[3px] h-[3px] rounded-[1px] bg-white/40 block" />
              </span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.08em] uppercase text-white/40 whitespace-nowrap">
                {pageLabel}
              </span>
            </div>

            {/* Nav items */}
            <div className="flex items-center gap-1 pl-2">
              {items.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleClick(item.href)}
                  className="px-3 py-1.5 text-[12px] text-white/60 hover:text-white transition-colors duration-200 whitespace-nowrap rounded-full hover:bg-white/[0.06]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
