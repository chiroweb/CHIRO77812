"use client";

import { motion } from "framer-motion";

export default function PrettyTrash() {
  return (
    <section
      className="relative bg-[#0a0a0a] px-5 md:px-12 lg:px-20 py-[200px] md:py-[260px] overflow-hidden"
      data-theme="dark"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section label */}
        <p className="text-[11px] tracking-[0.08em] uppercase text-white/30 mb-12 md:mb-16 font-[family-name:var(--font-jetbrains-mono)]">
          ( PRETTY TRASH )
        </p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[36px] md:text-[64px] lg:text-[88px] font-extrabold text-white tracking-[-0.03em] leading-[1.0] uppercase mb-8 md:mb-12"
        >
          예쁘기만 한 사이트는
          <br />
          <span className="text-white/30">1년 안에 잊혀집니다.</span>
        </motion.h2>

        {/* Subcopy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[14px] md:text-[16px] text-white/50 leading-[1.9] max-w-[600px] mb-20 md:mb-32"
        >
          같은 디자인을 만들어도 코드 구조가 다르면 결과가 다릅니다.
          <br />
          빌더 위에 얹은 템플릿은 검색이 읽지 못합니다.
          <br />
          코드를 직접 쓰면 다릅니다.
        </motion.p>

        {/* Code comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* LEFT: Builder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/[0.02] border border-white/10 rounded-lg p-6 md:p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <p className="text-[10px] tracking-[0.1em] uppercase text-white/30 font-[family-name:var(--font-jetbrains-mono)]">
                Builder 출력
              </p>
              <span className="text-[10px] text-white/30 font-[family-name:var(--font-jetbrains-mono)]">
                아임웹 · 카페24
              </span>
            </div>
            <pre className="text-[11px] md:text-[12px] text-white/40 leading-[1.7] font-[family-name:var(--font-jetbrains-mono)] overflow-x-auto flex-1">
{`<div class="cm-wrap">
  <div class="cm-row">
    <div class="cm-col">
      <div class="title">서비스</div>
      <div class="desc">설명…</div>
    </div>
  </div>
</div>

// 구조화 데이터 없음
// 시맨틱 태그 없음
// llms.txt 불가`}
            </pre>
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-baseline gap-3">
                <span className="text-[28px] text-white/30 font-extrabold leading-none">✕</span>
                <div>
                  <p className="text-[14px] text-white/70 font-medium leading-[1.4]">
                    AI 검색에 보이지 않음
                  </p>
                  <p className="text-[11px] text-white/30 mt-1 font-[family-name:var(--font-jetbrains-mono)]">
                    ChatGPT · Perplexity 인용 불가
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: CHIRO */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/[0.05] border border-[#00D2FF]/30 rounded-lg p-6 md:p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <p className="text-[10px] tracking-[0.1em] uppercase text-[#00D2FF] font-[family-name:var(--font-jetbrains-mono)]">
                CHIRO 출력
              </p>
              <span className="text-[10px] text-white/50 font-[family-name:var(--font-jetbrains-mono)]">
                코드 직접 작성
              </span>
            </div>
            <pre className="text-[11px] md:text-[12px] text-white/80 leading-[1.7] font-[family-name:var(--font-jetbrains-mono)] overflow-x-auto flex-1">
{`<article itemtype="schema.org/Service">
  <h1>홈페이지 제작</h1>
  <p>설명…</p>
  <script type="application/ld+json">
    { "@type": "FAQPage",
      "mainEntity": [ … ] }
  </script>
</article>

// llms.txt + JSON-LD + 시맨틱`}
            </pre>
            <div className="mt-8 pt-6 border-t border-[#00D2FF]/20">
              <div className="flex items-baseline gap-3">
                <span className="text-[28px] text-[#00D2FF] font-extrabold leading-none">✓</span>
                <div>
                  <p className="text-[14px] text-white font-medium leading-[1.4]">
                    AI 검색에 인용됨
                  </p>
                  <p className="text-[11px] text-white/50 mt-1 font-[family-name:var(--font-jetbrains-mono)]">
                    ChatGPT · Perplexity · Google AI Overviews
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-[11px] tracking-[0.04em] text-white/30 leading-[1.9] mt-16 md:mt-24 max-w-[640px] font-[family-name:var(--font-jetbrains-mono)]"
        >
          같은 시간을 들여도 빌더로 만든 사이트는 1년 뒤 다시 만들어야 합니다.
          <br />
          치로의 코드는 5년 뒤에도 검색 엔진과 AI 모두에게 보입니다.
        </motion.p>
      </div>
    </section>
  );
}
