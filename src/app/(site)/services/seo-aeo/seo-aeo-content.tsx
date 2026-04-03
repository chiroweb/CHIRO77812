"use client";

import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  viewportConfig,
} from "@/lib/motion";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import FAQSection from "@/components/seo/faq-section";
import InternalLinks from "@/components/seo/internal-links";
import SectionLabel from "@/components/ui/section-label";
import Divider from "@/components/ui/divider";
import SubCtaBand from "@/components/ui/sub-cta-band";
import {
  generateServiceSchema,
  generateBreadcrumbSchema,
  generatePageSchema,
  JsonLd,
} from "@/lib/schema-helpers";

/* ─────────────────────────────────────
   Data
───────────────────────────────────── */

const includedItems = [
  {
    number: "01",
    title: "구조화 데이터 (JSON-LD)",
    description:
      "검색엔진과 AI가 페이지 내용을 정확히 이해하도록 Organization, Service, FAQ, BreadcrumbList 등 스키마를 코드에 직접 삽입합니다.",
  },
  {
    number: "02",
    title: "시맨틱 HTML",
    description:
      "header, main, section, article 등 의미론적 태그를 사용하여 콘텐츠 계층 구조를 명확하게 전달합니다.",
  },
  {
    number: "03",
    title: "메타태그 자동화",
    description:
      "title, description, Open Graph, Twitter Card 메타태그를 페이지별로 자동 생성하여 검색 결과와 SNS 공유 시 최적의 미리보기를 제공합니다.",
  },
  {
    number: "04",
    title: "XML 사이트맵 & robots.txt",
    description:
      "모든 페이지를 포함하는 사이트맵을 자동 생성하고, robots.txt로 크롤링 범위를 제어합니다.",
  },
  {
    number: "05",
    title: "llms.txt",
    description:
      "ChatGPT, Perplexity 등 AI 검색 엔진이 사이트 정보를 정확하게 인용할 수 있도록 llms.txt 파일을 제공합니다.",
  },
  {
    number: "06",
    title: "클린 URL",
    description:
      "파라미터 없는 정적 URL 구조로 검색엔진 친화성을 높이고, 사용자가 URL만으로 페이지 내용을 예측할 수 있게 합니다.",
  },
  {
    number: "07",
    title: "Core Web Vitals 최적화",
    description:
      "LCP 1.5초 이내, CLS 0.1 이하를 목표로 이미지 최적화, 코드 경량화, 레이아웃 안정화를 적용합니다.",
  },
  {
    number: "08",
    title: "FAQPage 스키마",
    description:
      "자주 묻는 질문을 FAQPage 스키마로 마크업하여 구글 리치 스니펫(아코디언 FAQ)에 노출될 수 있도록 합니다.",
  },
];

const comparisonRows = [
  { feature: "구조화 데이터 (JSON-LD)", imweb: "✗", cafe24: "✗", chiro: "✓" },
  { feature: "클린 URL", imweb: "제한적", cafe24: "제한적", chiro: "✓" },
  { feature: "시맨틱 HTML", imweb: "✗", cafe24: "제한적", chiro: "✓" },
  { feature: "메타태그 제어", imweb: "제한적", cafe24: "제한적", chiro: "✓" },
  { feature: "XML 사이트맵", imweb: "자동", cafe24: "제한적", chiro: "✓" },
  { feature: "llms.txt", imweb: "✗", cafe24: "✗", chiro: "✓" },
  { feature: "Core Web Vitals", imweb: "제한적", cafe24: "제한적", chiro: "✓" },
  { feature: "코드 수준 SEO", imweb: "✗", cafe24: "✗", chiro: "✓" },
];

const faqs = [
  {
    question: "SEO와 AEO의 차이점은 무엇인가요?",
    answer:
      "SEO는 구글, 네이버 같은 검색엔진에 최적화하는 것이고, AEO는 ChatGPT, Perplexity 같은 AI 엔진이 사이트 정보를 정확히 이해하고 인용할 수 있도록 최적화하는 것입니다. 치로는 두 가지를 동시에 세팅합니다.",
  },
  {
    question: "아임웹이나 카페24로는 SEO가 안 되나요?",
    answer:
      "기본적인 메타태그 설정은 가능하지만, 구조화 데이터(JSON-LD), 시맨틱 HTML, llms.txt 같은 코드 레벨 SEO는 플랫폼 제약으로 구현이 어렵습니다. 치로는 코드를 직접 작성하기 때문에 이러한 제약이 없습니다.",
  },
  {
    question: "SEO 효과는 얼마나 걸리나요?",
    answer:
      "구조화 데이터와 사이트맵 제출 후, 일반적으로 2~4주 내에 검색 인덱싱이 시작됩니다. 키워드 경쟁도에 따라 순위 상승에는 1~3개월이 소요될 수 있습니다.",
  },
  {
    question: "AEO가 중요한 이유는 무엇인가요?",
    answer:
      "AI 검색(ChatGPT, Perplexity 등)의 사용량이 급증하고 있습니다. AI가 답변을 생성할 때 신뢰할 수 있는 출처로 인용되려면, 구조화 데이터와 llms.txt를 통해 사이트 정보를 명확하게 제공해야 합니다.",
  },
  {
    question: "치로의 SEO 세팅은 다른 업체와 뭐가 다른가요?",
    answer:
      "대부분의 업체는 SEO 플러그인이나 외부 도구에 의존합니다. 치로는 코드 자체에 SEO를 내장합니다. 구조화 데이터, 시맨틱 HTML, 메타태그가 빌드 시점에 자동 생성되므로, 플러그인 없이도 검색엔진과 AI 모두에게 최적화된 결과를 제공합니다.",
  },
  {
    question: "구조화 데이터가 왜 중요한가요?",
    answer:
      "구조화 데이터(JSON-LD)는 검색엔진이 사이트 콘텐츠를 정확히 이해하도록 돕습니다. 리치 스니펫(별점, FAQ, 가격 등)으로 검색 결과에서 클릭률을 높이고, AI 엔진이 정보를 인용할 때도 핵심 근거가 됩니다.",
  },
  {
    question: "SEO/AEO 세팅 비용은 별도인가요?",
    answer:
      "치로의 모든 홈페이지 제작 플랜에 SEO/AEO 기본 세팅이 포함됩니다. 별도의 추가 비용이 발생하지 않습니다. 기존 사이트에 대한 단독 SEO/AEO 세팅은 별도 상담을 통해 안내드립니다.",
  },
];

const internalLinks = [
  {
    title: "무료 웹사이트 진단",
    href: "/free-diagnosis",
    description:
      "현재 사이트의 SEO 상태를 무료로 진단받으세요. 구조화 데이터, 메타태그, Core Web Vitals를 점검합니다.",
  },
  {
    title: "포트폴리오",
    href: "/portfolio",
    description:
      "치로가 제작한 웹사이트를 확인하세요. 모든 프로젝트에 SEO/AEO가 기본 적용되어 있습니다.",
  },
  {
    title: "블로그",
    href: "/blog",
    description:
      "SEO, AEO, 웹 개발에 관한 인사이트를 공유합니다. 검색 최적화의 최신 트렌드를 확인하세요.",
  },
];

/* ─────────────────────────────────────
   JSON-LD Schemas
───────────────────────────────────── */

const serviceSchema = generateServiceSchema({
  name: "SEO/AEO 자동화 세팅",
  description:
    "코드 레벨에서 시작되는 검색 최적화. 구조화 데이터, 시맨틱 HTML, 메타태그, 사이트맵, llms.txt를 기본 제공하여 구글, 네이버, AI 검색 엔진에 최적화합니다.",
  url: "https://chiroweb.co.kr/services/seo-aeo",
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "홈", url: "https://chiroweb.co.kr" },
  { name: "서비스", url: "https://chiroweb.co.kr/services" },
  { name: "SEO/AEO", url: "https://chiroweb.co.kr/services/seo-aeo" },
]);

const pageSchema = generatePageSchema(
  [serviceSchema, breadcrumbSchema].filter(Boolean) as object[]
);

/* ─────────────────────────────────────
   Page Component
───────────────────────────────────── */

export default function SeoAeoContent() {
  return (
    <>
      {pageSchema && <JsonLd data={pageSchema} />}

      <div className="pt-24 md:pt-32 pb-24 md:pb-32 px-5 md:px-8">
        <div className="max-w-[1280px] mx-auto">

          {/* ── Section 1: Hero / Definition Block ── */}
          <Breadcrumbs pathname="/services/seo-aeo" />
          <SectionLabel number="01" label="SEO/AEO" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-10 md:mb-16"
          >
            <motion.h1
              variants={fadeInUp}
              className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[44px] font-light tracking-[0.03em] leading-[1.05] mb-6"
            >
              SEO/AEO 자동화 세팅 — 코드 레벨에서 시작되는 검색 최적화
              <span className="text-[#FF4D00]">.</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-base text-[#6b6b6b] leading-[1.7] max-w-2xl"
            >
              치로웹디자인의 SEO/AEO 자동화는 웹사이트 코드 레벨에서 구현되는 검색
              최적화입니다. 구조화 데이터(JSON-LD), 시맨틱 HTML, 메타태그,
              사이트맵, llms.txt를 기본 제공하여 구글, 네이버는 물론 ChatGPT,
              Perplexity 등 AI 검색 엔진에도 정확하게 노출됩니다.
            </motion.p>
          </motion.div>

          {/* ── Section 2: 치로 기본 제공 항목 ── */}
          <div className="mt-20 md:mt-32">
            <Divider />
            <div className="pt-16 md:pt-24">
              <SectionLabel number="02" label="What's Included" />

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="mb-12 md:mb-20"
              >
                <motion.h2
                  variants={fadeInUp}
                  className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[44px] font-light tracking-[0.03em] leading-[1.05] mb-6"
                >
                  치로 기본 제공 항목<span className="text-[#FF4D00]">.</span>
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="text-base text-[#6b6b6b] leading-[1.7] max-w-xl"
                >
                  별도 비용 없이, 모든 프로젝트에 포함되는 SEO/AEO 세팅입니다.
                </motion.p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#E0E0E0]"
              >
                {includedItems.map((item) => (
                  <motion.div
                    key={item.number}
                    variants={fadeInUp}
                    className="bg-white p-8 md:p-10"
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-[family-name:var(--font-jetbrains-mono)] text-[28px] md:text-[32px] text-[#E0E0E0] leading-none shrink-0">
                        {item.number}
                      </span>
                      <div>
                        <h3 className="text-base font-semibold tracking-tight mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#6b6b6b] leading-[1.7]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* ── Section 3: 기술 비교표 ── */}
          <div className="mt-20 md:mt-32">
            <Divider />
            <div className="pt-16 md:pt-24">
              <SectionLabel number="03" label="Comparison" />

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="mb-12 md:mb-20"
              >
                <motion.h2
                  variants={fadeInUp}
                  className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[44px] font-light tracking-[0.03em] leading-[1.05] mb-6"
                >
                  기술 비교<span className="text-[#FF4D00]">.</span>
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="text-base text-[#6b6b6b] leading-[1.7] max-w-xl"
                >
                  빌더형 플랫폼과 치로의 코드 레벨 SEO를 비교합니다.
                </motion.p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="overflow-x-auto"
              >
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-[#1a1a1a]">
                      <th className="text-left py-4 pr-6 font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b] font-normal">
                        항목
                      </th>
                      <th className="text-center py-4 px-4 font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b] font-normal">
                        아임웹
                      </th>
                      <th className="text-center py-4 px-4 font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#9b9b9b] font-normal">
                        카페24
                      </th>
                      <th className="text-center py-4 px-4 font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#FF4D00] font-normal">
                        치로
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, index) => (
                      <tr
                        key={index}
                        className="border-b border-[#E0E0E0]"
                      >
                        <td className="py-4 pr-6 text-[#1a1a1a]">
                          {row.feature}
                        </td>
                        <td className="py-4 px-4 text-center text-[#9b9b9b]">
                          {row.imweb}
                        </td>
                        <td className="py-4 px-4 text-center text-[#9b9b9b]">
                          {row.cafe24}
                        </td>
                        <td className="py-4 px-4 text-center text-[#FF4D00] font-medium">
                          {row.chiro}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </div>
          </div>

          {/* ── Section 4: 치로만의 차이 ── */}
          <div className="mt-20 md:mt-32">
            <Divider />
            <div className="pt-16 md:pt-24">
              <SectionLabel number="04" label="Why CHIRO" />

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="mb-12 md:mb-20"
              >
                <motion.h2
                  variants={fadeInUp}
                  className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[44px] font-light tracking-[0.03em] leading-[1.05] mb-6"
                >
                  치로만의 차이<span className="text-[#FF4D00]">.</span>
                </motion.h2>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="bg-[#1a1a1a] p-6 md:p-12"
              >
                <div className="grid grid-cols-4 md:grid-cols-12 gap-6">
                  <div className="col-span-4 md:col-span-5">
                    <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase text-[#6b6b6b] mb-4">
                      Code-Level SEO
                    </p>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl md:text-2xl font-light tracking-[0.03em] leading-[1.3] text-white">
                      플러그인에 의존하지 않습니다
                      <span className="text-[#FF4D00]">.</span>
                      <br />
                      코드 자체가 SEO입니다
                      <span className="text-[#FF4D00]">.</span>
                    </h3>
                  </div>
                  <div className="col-span-4 md:col-span-5 md:col-start-7 flex items-center">
                    <div className="space-y-4 text-sm text-white/60 leading-[1.7]">
                      <p>
                        일반 에이전시는 SEO 플러그인에 의존합니다. 플러그인은
                        페이지 속도를 저하시키고, 플랫폼이 허용하는 범위 안에서만
                        작동합니다. 구조화 데이터, 시맨틱 HTML, llms.txt 같은
                        핵심 요소는 플러그인으로 해결할 수 없습니다.
                      </p>
                      <p>
                        치로는 다릅니다. 심리학 기반 UX 기획과 코드 레벨 SEO를
                        결합합니다. 빌드 시점에 구조화 데이터가 자동 생성되고,
                        모든 페이지가 시맨틱 HTML로 작성되며, AI 검색 엔진을 위한
                        llms.txt까지 기본 제공됩니다. 플러그인 없이, 코드만으로
                        완성되는 SEO입니다.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 5: FAQ ── */}
      <FAQSection
        questions={faqs}
        sectionNumber="05"
        sectionLabel="FAQ"
        heading="Questions"
        popularIndex={0}
      />

      {/* ── Section 6: Internal Links + CTA ── */}
      <InternalLinks links={internalLinks} />
      <SubCtaBand />
    </>
  );
}
