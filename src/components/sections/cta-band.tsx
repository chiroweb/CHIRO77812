"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/motion";
import CodeTicker from "@/components/ui/code-ticker";

const ctaCode = `// chiro::launch_day
async function deployWithConfidence() {
  await runLighthouseAudit();
  // score: 97
  await validateStructuredData();
  await checkMobileResponsive();
  await goLive({ downtime: 0 });
  return "your site is live.";
}

// chiro::seo_automation
function setupSearchOptimization() {
  generateSitemap(allPages);
  createLlmsTxt(siteInfo);
  injectJsonLd(schemas);
  validateBreadcrumbs(routes);
  return { indexed: true };
}

// chiro::conversion_engine
const results = {
  lighthouseScore: 97,
  structuredData: "valid",
  mobileReady: true,
  seoScore: "A+",
  launchTime: "0ms downtime",
};`;

export default function CtaBand() {
  return (
    <section id="cta-band" className="relative py-[200px] md:py-[260px] px-5 md:px-8 lg:px-16 bg-[#1a1a1a] overflow-hidden" data-theme="dark">
      {/* Background Code Ticker — desktop only */}
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[300px] opacity-20 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#1a1a1a] to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1a1a1a] to-transparent z-10" />
        <CodeTicker
          code={ctaCode}
          className="w-full h-full"
          speed={25}
          variant="dark"
        />
      </div>

      <div className="max-w-[1280px] mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <motion.div
              variants={fadeInUp}
              className="col-span-1 md:col-span-7 text-center md:text-left"
            >
              <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#6b6b6b] mb-6">
                Start Your Project
              </p>
              <h2 className="text-[28px] md:text-[44px] lg:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.1] text-white mb-3">
                Let&apos;s Begin<span className="text-[#FF4D00]">.</span>
              </h2>
              <p className="text-[18px] md:text-[22px] font-medium text-white/50 tracking-tight leading-[1.5] md:max-w-md break-keep">
                30분 무료 상담으로 시작하십시오.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="col-span-1 md:col-span-3 md:col-start-10 text-center md:text-right mt-8 md:mt-0"
            >
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-[#FF4D00] text-white w-full md:w-auto px-8 py-3.5 text-sm tracking-[0.05em] rounded-full transition-all duration-300 hover:bg-[#FF4D00] cursor-pointer"
              >
                무료 진단 신청
              </a>
              <p className="mt-4 font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-[#6b6b6b] tracking-wide">
                평균 응답 시간 24시간 이내
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
