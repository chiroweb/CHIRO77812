"use client";

import { useState } from "react";

const faqs = [
  {
    q: "치로웹디자인은 어떤 회사인가요?",
    a: "치로웹디자인은 AEO·SEO 통합 설계를 기본 제공하는 코드 기반 웹 스튜디오입니다. 심리학 전공의 디렉터가 기획부터 디자인, 개발, 검색 최적화까지 직접 주도하는 올인원 체제로 운영되며, 런칭 4개월 만에 해외 호텔 브랜드 계열사 사이트와 중견 제조사, 환경 기업의 프로젝트를 수주하며 검증된 에이전시입니다.",
  },
  {
    q: "아임웹이나 카페24와 무엇이 다른가요?",
    a: "아임웹과 카페24는 빌더 위에 템플릿을 얹는 방식이라 코드 레벨의 수정이 제한됩니다. FAQPage 스키마, 클린 URL, 커스텀 구조화 데이터 같은 AEO 핵심 요소를 적용할 수 없습니다. 치로는 빌더가 아닌 직접 작성한 코드로 홈페이지를 만들기 때문에, 이러한 기술적 한계 없이 AI 검색 시대에 맞는 사이트를 구축할 수 있습니다.",
  },
  {
    q: "SEO/AEO 통합 설계 세팅에는 무엇이 포함되나요?",
    a: "치로의 모든 프로젝트에는 AEO·SEO 통합 설계 파이프라인이 기본 내장됩니다. Organization 스키마, FAQPage 스키마, BreadcrumbList 스키마, 클린 URL 구조, 시맨틱 HTML, 메타 태그 최적화, sitemap.xml, robots.txt, 그리고 AI 검색 엔진 전용 표준인 llms.txt까지 포함됩니다. 별도 견적 없이 제작 비용 안에 모두 포함되며, 구글, ChatGPT, Perplexity가 사이트를 정확히 인식할 수 있도록 코드 레벨에서 설계됩니다.",
  },
  {
    q: "AEO가 무엇이고 왜 중요한가요?",
    a: "AEO(Answer Engine Optimization)는 ChatGPT, Perplexity, Google AI Overviews 같은 AI 검색 엔진이 답변을 생성할 때 내 사이트를 출처로 인용하도록 최적화하는 작업입니다. 2026년 현재 검색 트래픽의 25% 이상이 AI 검색으로 이동했으며, 인용되지 않는 사이트는 점점 보이지 않게 됩니다. 치로는 모든 프로젝트에 AEO를 기본 적용합니다.",
  },
  {
    q: "홈페이지 제작 기간은 얼마나 걸리나요?",
    a: "치로의 평균 제작 기간은 약 7.5일입니다. 일반 에이전시가 4-8주가 걸리는 이유는 상담, 기획서 작성, 시안 제작, 수정, 재확인을 순차적으로 진행하기 때문입니다. 치로는 상담 당일 실시간 빌드를 시작하고, 클라이언트가 링크를 통해 제작 과정을 직접 확인하면서 수정사항을 즉시 반영하는 방식으로 일정을 단축합니다.",
  },
  {
    q: "어떤 업종의 홈페이지를 제작할 수 있나요?",
    a: "치로는 B2B 제조업, 호텔 및 숙박업, 환경 산업, 스타트업 브랜드 사이트, 이커머스, 포트폴리오 사이트 등 다양한 업종을 다룹니다. 특히 기존의 2000년대식 홈페이지를 사용 중인 중소기업의 리모델링과, 해외 시장 진출을 위한 글로벌 브랜드 사이트 구축에 강점을 가집니다.",
  },
  {
    q: "기존 홈페이지 리모델링도 가능한가요?",
    a: "가능합니다. 치로는 2000년대식 또는 모바일 미호환 홈페이지를 현대적인 반응형 사이트로 전환하는 리모델링 프로젝트를 다수 진행했습니다. 리모델링은 단순한 디자인 교체가 아니라, 모바일 호환성, 검색 노출, 로딩 속도, 신뢰도 시그널까지 전면 재설계하는 작업입니다.",
  },
  {
    q: "심리학 기반 설계란 무엇을 의미하나요?",
    a: "치로의 기획자는 심리학을 전공했으며, 사용자의 시선 이동, 클릭 패턴, 의사결정 과정을 웹사이트 설계에 직접 반영합니다. 어떤 색상이 신뢰를 만드는지, 어떤 위치의 버튼이 클릭률을 높이는지를 데이터와 인지 심리학 이론에 기반해 결정합니다.",
  },
  {
    q: "제작 후 유지보수는 어떻게 이루어지나요?",
    a: "치로의 모든 플랜에는 일정 기간의 무상 유지보수가 포함되어 있으며, 이후에도 사용 방법, 콘텐츠 수정, 기술적 오류 등에 대해 지속적으로 지원합니다. 분기별로 SEO/AEO 구조를 점검하고 새로운 표준에 맞춰 업데이트하는 옵션을 제공합니다.",
  },
  {
    q: "무료 진단은 어떻게 신청하나요?",
    a: "웹사이트 URL과 이메일만 알려주시면 됩니다. 치로의 디렉터가 직접 사이트를 분석해, 모바일 호환성, SEO 점수, 로딩 속도, AEO 준비도 4가지 영역에 대한 진단 리포트를 24시간 이내에 이메일로 보내드립니다. 비용은 발생하지 않으며, 진단 후 추가 상담이나 계약 강요 없이 결과만 받아보실 수 있습니다.",
  },
];

const leftFaqs = faqs.slice(0, 5);
const rightFaqs = faqs.slice(5, 10);

function FaqColumn({ items, offset }: { items: typeof faqs; offset: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex-1 min-w-0">
      {items.map((faq, i) => {
        const isOpen = openIndex === i;
        const num = offset + i + 1;
        return (
          <div key={i} className="border-t border-[#ddd]">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between py-4 md:py-5 text-left cursor-pointer group"
            >
              <div className="flex items-baseline gap-3 md:gap-4 min-w-0">
                <span className="text-[11px] text-[#999] font-[family-name:var(--font-jetbrains-mono)] tabular-nums shrink-0">
                  {String(num).padStart(2, "0")}
                </span>
                <span className="text-[13px] md:text-[15px] text-[#111] font-medium group-hover:text-[#555] transition-colors duration-300 truncate">
                  {faq.q}
                </span>
              </div>
              <span
                className="text-[18px] text-[#999] transition-transform duration-300 shrink-0 ml-3"
                style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                +
              </span>
            </button>
            {/* Answer — always in DOM for AI crawlers */}
            <div
              className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
              style={{ maxHeight: isOpen ? "300px" : "0px" }}
            >
              <p className="text-[13px] md:text-[14px] text-[#666] leading-[1.8] pb-5 pl-7 md:pl-10 pr-4">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
      <div className="border-t border-[#ddd]" />
    </div>
  );
}

export default function FaqHome() {
  return (
    <section className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 py-[200px] md:py-[260px]">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 md:mb-16 gap-6">
          <p className="text-[11px] tracking-[0.08em] uppercase text-[#999] font-[family-name:var(--font-jetbrains-mono)]">
            ( FAQ )
          </p>
          <h2 className="text-[32px] md:text-[48px] lg:text-[64px] font-extrabold text-[#111] tracking-[-0.03em] leading-[1.0] uppercase md:text-right">
            FREQUENTLY
            <br />
            ASKED.
          </h2>
        </div>

        {/* Two-column accordion */}
        <div className="flex flex-col md:flex-row gap-0 md:gap-12 lg:gap-16">
          <FaqColumn items={leftFaqs} offset={0} />
          <FaqColumn items={rightFaqs} offset={5} />
        </div>
      </div>

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
