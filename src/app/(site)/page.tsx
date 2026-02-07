import Hero from "@/components/sections/hero";
import PortfolioPreview from "@/components/sections/portfolio-preview";
import MidCta from "@/components/sections/mid-cta";
import LiveProcess from "@/components/sections/live-process";
import Comparison from "@/components/sections/comparison";
import Testimonials from "@/components/sections/testimonials";
import Philosophy from "@/components/sections/philosophy";
import Faq from "@/components/sections/faq";
import CtaBand from "@/components/sections/cta-band";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "실시간 빌드 링크란 무엇인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "상담 후 제공되는 웹 링크를 통해, 사이트가 만들어지는 과정을 실시간으로 확인하실 수 있습니다. 별도의 프로그램 설치 없이, 브라우저에서 바로 확인 가능합니다. 수정사항을 말씀해 주시면 즉시 반영되는 것을 직접 보실 수 있습니다.",
      },
    },
    {
      "@type": "Question",
      name: "평균 4일이면 정말 완성되나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "페이지 수와 복잡도에 따라 다르지만, 일반적인 기업 홈페이지(5페이지 이내) 기준 평균 4일 이내에 완성됩니다. 불필요한 기획서 대기, 시안 승인 과정을 없앴기 때문에 가능합니다. 상담과 동시에 빌드가 시작됩니다.",
      },
    },
    {
      "@type": "Question",
      name: "수정은 몇 번까지 가능한가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "횟수 제한이 없습니다. 실시간 빌드 과정에서 자유롭게 수정 요청을 하실 수 있습니다. 기존 에이전시처럼 '수정 3회 포함' 같은 제한을 두지 않습니다. 만족하실 때까지 함께 만들어갑니다.",
      },
    },
    {
      "@type": "Question",
      name: "아임웹이나 카페24에서 이전할 수 있나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "가능합니다. 기존 사이트의 콘텐츠와 구조를 분석한 후, 커스텀 빌드로 이전합니다. 도메인, 이메일 등 기존 설정도 그대로 유지됩니다. 이전 과정에서 서비스가 중단되지 않도록 설계합니다.",
      },
    },
    {
      "@type": "Question",
      name: "유지보수는 어떻게 이루어지나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "런칭 후에도 콘텐츠 수정, 페이지 추가, 성능 모니터링 등을 지원합니다. 유지보수 플랜을 선택하시면 월간 리포트와 함께 지속적인 관리를 받으실 수 있습니다. 긴급 수정은 당일 대응합니다.",
      },
    },
    {
      "@type": "Question",
      name: "홈페이지 제작 비용은 어느 정도인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "프로젝트 규모에 따라 Startup(99만원~), Business(250만원~), Enterprise(500만원~) 플랜을 운영합니다. 모든 플랜에 실시간 피드백 링크가 포함되며, 거품 없는 정찰제로 투명하게 운영합니다. 정확한 견적은 무료 상담을 통해 안내드립니다.",
      },
    },
    {
      "@type": "Question",
      name: "반응형 웹사이트로 제작되나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "모든 프로젝트는 데스크톱, 태블릿, 모바일에서 완벽하게 작동하는 반응형으로 제작됩니다. 모바일 퍼스트 설계 원칙을 적용하여, 전체 트래픽의 70% 이상을 차지하는 모바일 환경에서 최적의 경험을 제공합니다.",
      },
    },
    {
      "@type": "Question",
      name: "SEO(검색 엔진 최적화)도 포함되나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "기본 SEO 설정은 모든 플랜에 포함됩니다. 메타 태그, 구조화 데이터, 사이트맵, 시맨틱 마크업, 이미지 최적화 등 검색 엔진이 사이트를 정확히 이해할 수 있도록 설계합니다. Business 플랜부터는 고급 SEO 최적화가 포함됩니다.",
      },
    },
    {
      "@type": "Question",
      name: "제작 후 직접 콘텐츠를 수정할 수 있나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Business 플랜 이상부터 CMS(콘텐츠 관리 시스템)가 포함됩니다. 관리자 페이지에서 텍스트, 이미지, 블로그 글 등을 코딩 지식 없이 직접 수정하실 수 있습니다. CMS 사용법에 대한 가이드도 제공해 드립니다.",
      },
    },
    {
      "@type": "Question",
      name: "기존 홈페이지를 리뉴얼하고 싶습니다. 가능한가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "가능합니다. 기존 사이트의 구조, 콘텐츠, SEO 현황을 분석한 후 리뉴얼을 진행합니다. 기존 검색 엔진 순위가 유지되도록 URL 구조와 리다이렉트를 신중하게 설계합니다. 도메인과 이메일 등 기존 설정은 그대로 유지됩니다.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <PortfolioPreview />
      <MidCta />
      <LiveProcess />
      <Comparison />
      <Testimonials />
      <Philosophy />
      <Faq />
      <CtaBand />
    </>
  );
}
