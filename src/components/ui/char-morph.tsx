"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CharMorphProps {
  lines: string[];
  interval?: number;
  className?: string;
}

interface CharData {
  char: string;
  key: string;
}

function getChars(text: string, stateIndex: number): CharData[] {
  return text.split("").map((char, i) => ({
    char,
    key: `${stateIndex}-${i}-${char}`,
  }));
}

// Find shared characters between two strings using LCS-style matching
// so common chars get stable keys for FLIP animation
function diffChars(
  prev: string,
  next: string,
  stateIndex: number
): CharData[] {
  const result: CharData[] = [];
  let pi = 0;
  let ni = 0;

  // Simple greedy match: walk both strings, reuse keys for matching chars
  const prevUsed = new Set<number>();
  const matches = new Map<number, number>(); // next index -> prev index

  // Find longest common subsequence positions
  const lcs = findLCS(prev, next);
  const prevMatchSet = new Set(lcs.map((m) => m[0]));
  const nextMatchSet = new Map(lcs.map((m) => [m[1], m[0]]));

  for (let i = 0; i < next.length; i++) {
    if (nextMatchSet.has(i)) {
      // This char existed in prev — reuse a stable key
      const prevIdx = nextMatchSet.get(i)!;
      result.push({
        char: next[i],
        key: `stable-${prevIdx}-${prev[prevIdx]}`,
      });
    } else {
      // New char
      result.push({
        char: next[i],
        key: `new-${stateIndex}-${i}-${next[i]}`,
      });
    }
  }

  return result;
}

function findLCS(a: string, b: string): [number, number][] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find matching positions
  const result: [number, number][] = [];
  let i = m,
    j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      result.unshift([i - 1, j - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return result;
}

const charVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function CharMorph({
  lines,
  interval = 3000,
  className = "",
}: CharMorphProps) {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  const advance = useCallback(() => {
    setPrevIndex(index);
    setIndex((prev) => (prev + 1) % lines.length);
  }, [index, lines.length]);

  useEffect(() => {
    if (lines.length <= 1) return;
    const id = setInterval(advance, interval);
    return () => clearInterval(id);
  }, [advance, interval, lines.length]);

  const chars = useMemo(() => {
    if (index === prevIndex && index === 0) {
      return getChars(lines[0], 0);
    }
    return diffChars(lines[prevIndex], lines[index], index);
  }, [index, prevIndex, lines]);

  if (lines.length === 0) return null;

  return (
    <span className={`inline-block ${className}`} aria-hidden="true">
      <AnimatePresence mode="popLayout">
        {chars.map((c, i) => (
          <motion.span
            key={c.key}
            layout
            variants={charVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.35,
              delay: i * 0.02,
              ease: [0.25, 0.1, 0.25, 1],
              layout: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
            }}
            className="inline-block"
            style={{ whiteSpace: "pre" }}
          >
            {c.char}
          </motion.span>
        ))}
      </AnimatePresence>
      <span className="sr-only">{lines.join(", ")}</span>
    </span>
  );
}
