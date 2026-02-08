"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import Divider from "@/components/ui/divider";

function useCounter(end: number, duration: number, inView: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);

  return count;
}

const stats = [
  {
    value: 28,
    suffix: "+",
    label: "완료 프로젝트",
    en: "Projects Delivered",
    description: "각 프로젝트에 깊이 몰입하여 완성한 결과물입니다.",
  },
  {
    value: 4,
    suffix: "일",
    label: "평균 제작 기간",
    en: "Avg. Delivery",
    description: "상담부터 런칭까지, 불필요한 대기 없이 빠르게 완성합니다.",
  },
  {
    value: 100,
    suffix: "%",
    label: "고객 만족도",
    en: "Client Satisfaction",
    description: "모든 클라이언트가 결과물에 만족하였습니다.",
  },
  {
    value: 24,
    suffix: "h",
    label: "응답 시간",
    en: "Response Time",
    description: "문의 접수 후 24시간 이내에 답변을 드립니다.",
  },
];

export default function Numbers() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-[120px] px-8">
      <Divider />
      <div ref={ref} className="max-w-[1280px] mx-auto pt-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-[#E0E0E0]"
        >
          {stats.map((stat) => (
            <CounterCard key={stat.en} stat={stat} inView={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CounterCard({
  stat,
  inView,
}: {
  stat: (typeof stats)[number];
  inView: boolean;
}) {
  const count = useCounter(stat.value, 2000, inView);

  return (
    <motion.div variants={fadeInUp} className="bg-white p-8 md:p-10">
      <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-6">
        {stat.en}
      </p>
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-4xl md:text-5xl font-light tracking-tight font-[family-name:var(--font-jetbrains-mono)]">
          {count}
        </span>
        <span className="text-xl md:text-2xl font-light text-[#6b6b6b]">
          {stat.suffix}
        </span>
      </div>
      <p className="text-sm font-normal text-[#1a1a1a] mb-2">{stat.label}</p>
      <p className="text-xs text-[#6b6b6b] leading-[1.6]">
        {stat.description}
      </p>
    </motion.div>
  );
}
