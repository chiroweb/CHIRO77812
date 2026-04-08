"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WordRotatorProps {
  items: string[];
  interval?: number;
  className?: string;
}

const variants = {
  enter: {
    y: 40,
    opacity: 0,
  },
  center: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -40,
    opacity: 0,
  },
};

const transition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

export default function WordRotator({
  items,
  interval = 3000,
  className = "",
}: WordRotatorProps) {
  const [index, setIndex] = useState(0);

  const advance = useCallback(() => {
    setIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(advance, interval);
    return () => clearInterval(id);
  }, [advance, interval, items.length]);

  if (items.length === 0) return null;
  if (items.length === 1) {
    return <span className={className}>{items[0]}</span>;
  }

  return (
    <span className={`relative inline-block overflow-hidden align-bottom ${className}`}>
      {/* Invisible spacer for consistent width */}
      <span className="invisible" aria-hidden="true">
        {items.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>

      <AnimatePresence mode="wait">
        <motion.span
          key={items[index]}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="absolute left-0 top-0"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>

      {/* Screen reader: full list */}
      <span className="sr-only">
        {items.join(", ")}
      </span>
    </span>
  );
}
