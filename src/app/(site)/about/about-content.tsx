"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";
import Placeholder from "@/components/ui/placeholder";

export default function AboutContent() {
  return (
    <section className="pt-24 md:pt-32 pb-24 md:pb-32 px-5 md:px-8">
      <div className="max-w-[1280px] mx-auto">
        <SectionLabel number="01" label="About" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-12 md:mb-20"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[44px] font-light tracking-[0.03em] leading-[1.05]"
          >
            디렉터의 편지<span className="text-[#FF4D00]">.</span>
          </motion.h1>
        </motion.div>

        <Divider />

        {/* Director's Letter */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-12 md:mt-20 grid grid-cols-4 md:grid-cols-12 gap-6"
        >
          {/* Photo */}
          <motion.div
            variants={fadeInUp}
            className="col-span-4 md:col-span-4"
          >
            <div className="sticky top-24">
              <Placeholder type="image" aspectRatio="portrait" />
              <p className="mt-4 font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b]">
                Director
              </p>
              <p className="text-sm text-[#1a1a1a] mt-1">치로웹디자인 대표</p>
            </div>
          </motion.div>

          {/* Essay */}
          <motion.div
            variants={fadeInUp}
            className="col-span-4 md:col-span-6 md:col-start-7"
          >
            <div className="space-y-6 text-base text-[#6b6b6b] leading-[1.8]">
              <p>
                아임웹, 카페24, 워드프레스. 수많은 도구들이 &ldquo;누구나 쉽게
                홈페이지를 만들 수 있다&rdquo;고 말합니다. 하지만 현실은
                다릅니다.
              </p>

              <p>
                수많은 대표님들이 복잡한 툴 앞에서 좌절합니다. 원하는 디자인은
                머릿속에 있는데, 그것을 구현할 방법을 모릅니다. 결국 타협하고,
                &ldquo;이 정도면 됐지&rdquo;라고 스스로를 설득합니다.
              </p>

              <p>
                치로는 그 타협이 필요 없는 길을 닦습니다.
              </p>

              <p>
                상담을 시작하는 순간부터, 당신의 사이트가 만들어지는 과정을 실시간으로
                지켜보실 수 있습니다. 기획서가 코드가 되고, 코드가 화면이 되는
                모든 순간이 투명합니다.
              </p>

              <p>
                치로는 많은 프로젝트를 하지 않습니다. 대신, 맡은 프로젝트에는
                온전히 몰입합니다. 당신의 브랜드가 가진 고유한 결을 이해하고,
                그것을 디지털 위에 정확히 옮기는 것. 그것이 치로가 존재하는
                이유입니다.
              </p>

              <p className="text-[#1a1a1a] font-normal">
                당신의 브랜드에 가장 쉬운 길을 닦겠습니다.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Values */}
        <Divider />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-12 md:mt-20"
        >
          <SectionLabel number="02" label="Values" />
          <div className="grid grid-cols-4 md:grid-cols-12 gap-6">
            {[
              {
                title: "투명함",
                en: "Transparency",
                desc: "숨기지 않습니다. 과정의 모든 것을 공유합니다. 실시간 링크를 통해 제작 과정을 함께 지켜봅니다.",
              },
              {
                title: "몰입",
                en: "Immersion",
                desc: "소수의 프로젝트만 수주합니다. 하나의 브랜드에 깊이 집중하여, 본질을 담은 결과물을 설계합니다.",
              },
              {
                title: "정제",
                en: "Refinement",
                desc: "불필요한 것을 걷어냅니다. 최소한의 요소로 최대한의 메시지를 전달하는 디자인을 추구합니다.",
              },
            ].map((value) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                className="col-span-4 border-t border-[#E0E0E0] pt-8"
              >
                <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b] mb-2">
                  {value.en}
                </p>
                <h3 className="text-xl font-semibold tracking-tight mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-[#6b6b6b] leading-[1.7]">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
