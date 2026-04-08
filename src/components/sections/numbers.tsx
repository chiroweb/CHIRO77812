"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import CodeTicker from "@/components/ui/code-ticker";

const stats = [
  {
    value: "28",
    suffix: "+",
    subtitle: "완료 프로젝트",
    description: "NET OF 28 PROJECTS DELIVERED IN 2024-2025.",
  },
  {
    value: "4",
    suffix: "일",
    subtitle: "평균 제작 기간",
    description: "AVERAGE DELIVERY TIME FROM KICKOFF TO LAUNCH.",
  },
  {
    value: "100",
    suffix: "%",
    subtitle: "고객 만족도",
    description: "CLIENT SATISFACTION RATE ACROSS ALL PROJECTS.",
  },
  {
    value: "24",
    suffix: "h",
    subtitle: "평균 응답 시간",
    description: "AVERAGE RESPONSE TIME FOR ALL INQUIRIES.",
  },
];

const statsCode = `// chiro::performance_metrics
const metrics = await measureAll({
  projects: countDelivered(),     // 28+
  avgDays: calcDeliveryTime(),    // 3.8
  satisfaction: getSurveyScore(), // 100%
  responseTime: getAvgResponse(), // < 24h
});

// chiro::quality_assurance
function validateDelivery(site) {
  const lighthouse = runAudit(site);
  assert(lighthouse.performance > 90);
  assert(lighthouse.seo > 95);
  assert(lighthouse.accessibility > 90);
  return { passed: true, score: 97 };
}

// chiro::conversion_tracking
async function trackConversion(visitor) {
  const session = await analyze(visitor);
  const touchpoints = mapJourney(session);
  const score = calcConversionProb(touchpoints);
  if (score > 0.7) triggerCTA(visitor);
  return { score, touchpoints };
}`;

// Wireframe sphere SVG
function WireframeSphere({ className = "" }: { className?: string }) {
  const circles: React.ReactNode[] = [];

  // Horizontal circles (latitudes)
  for (let i = 0; i < 7; i++) {
    const y = 50 + (i - 3) * 22;
    const radiusFactor = Math.cos(((i - 3) / 3.5) * (Math.PI / 2));
    const rx = 80 * radiusFactor;
    const ry = 8 * radiusFactor;
    circles.push(
      <ellipse
        key={`h-${i}`}
        cx="100"
        cy={y}
        rx={rx}
        ry={ry}
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="0.5"
        opacity={0.25}
      />
    );
  }

  // Vertical circles (longitudes)
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI;
    const rx = 80 * Math.sin(angle);
    const ry = 80;
    circles.push(
      <ellipse
        key={`v-${i}`}
        cx="100"
        cy="50"
        rx={Math.max(rx, 2)}
        ry={ry}
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="0.5"
        opacity={0.2}
        transform={`rotate(0, 100, 50)`}
      />
    );
  }

  // Outer circle
  circles.push(
    <circle
      key="outer"
      cx="100"
      cy="50"
      r="80"
      fill="none"
      stroke="#1a1a1a"
      strokeWidth="0.6"
      opacity={0.3}
    />
  );

  // Hexagonal mesh overlay
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 8; col++) {
      const cx = 30 + col * 18 + (row % 2 === 0 ? 0 : 9);
      const cy = 10 + row * 16;
      const dist = Math.sqrt((cx - 100) ** 2 + ((cy - 50) * 1.6) ** 2);
      if (dist > 78) continue;

      const size = 7;
      const points = Array.from({ length: 6 }, (_, k) => {
        const a = (k * Math.PI) / 3 + Math.PI / 6;
        return `${cx + size * Math.cos(a)},${cy + size * Math.sin(a)}`;
      }).join(" ");

      circles.push(
        <polygon
          key={`hex-${row}-${col}`}
          points={points}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="0.4"
          opacity={0.15}
        />
      );
    }
  }

  return (
    <svg
      viewBox="0 -30 200 160"
      className={className}
      aria-hidden="true"
    >
      {circles}
    </svg>
  );
}

const numberVariants = {
  enter: { opacity: 0, y: 60 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -60 },
};

const subtitleVariants = {
  enter: { opacity: 0, y: 30 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const transition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

export default function Numbers() {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const advance = useCallback(() => {
    setIndex((prev) => (prev + 1) % stats.length);
  }, []);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(advance, 4000);
    return () => clearInterval(id);
  }, [advance, inView]);

  const stat = stats[index];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center py-[120px] md:py-[160px] px-5 md:px-8 lg:px-16 bg-[#fafaf8] overflow-hidden"
    >
      {/* Background Code Ticker — right side */}
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[280px] opacity-10 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#fafaf8] to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fafaf8] to-transparent z-10" />
        <CodeTicker
          code={statsCode}
          className="w-full h-full"
          speed={40}
          variant="light"
        />
      </div>

      {/* Wireframe Sphere — center */}
      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] lg:w-[600px] pointer-events-none opacity-60">
        <WireframeSphere className="w-full h-auto" />
      </div>

      <div className="max-w-[1280px] mx-auto w-full relative z-10">
        {/* Large cycling number */}
        <div className="min-h-[240px] md:min-h-[320px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <motion.div
                variants={numberVariants}
                transition={transition}
                className="flex items-baseline gap-0"
              >
                <span className="text-[80px] md:text-[120px] lg:text-[160px] font-extrabold tracking-[-0.04em] leading-none text-[#1a1a1a]">
                  {stat.value}
                </span>
                <span className="text-[40px] md:text-[60px] lg:text-[80px] font-extrabold tracking-[-0.04em] text-[#1a1a1a]">
                  {stat.suffix}
                </span>
              </motion.div>

              <motion.p
                variants={subtitleVariants}
                transition={{ ...transition, delay: 0.1 }}
                className="text-[28px] md:text-[40px] lg:text-[52px] font-light text-[#1a1a1a] mt-2 leading-[1.2]"
              >
                {stat.subtitle}
              </motion.p>

              <motion.p
                variants={subtitleVariants}
                transition={{ ...transition, delay: 0.2 }}
                className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] md:text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b] mt-6"
              >
                {stat.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom-left description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 md:mt-24 text-sm md:text-base text-[#6b6b6b] leading-[1.8] max-w-[400px]"
        >
          빠르게 변하는 시장에서, 치로웹디자인은 심리학 기반 설계와 코드 레벨
          SEO로 확실한 성과를 만들어냅니다. 모든 수치는 실제 납품 데이터에
          기반합니다.
        </motion.p>

        {/* Progress dots */}
        <div className="flex gap-2 mt-10">
          {stats.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === index
                  ? "bg-[#1a1a1a] w-6"
                  : "bg-[#1a1a1a]/20 hover:bg-[#1a1a1a]/40"
              }`}
              aria-label={`${stats[i].subtitle}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
