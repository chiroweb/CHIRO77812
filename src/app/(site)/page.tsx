import Hero from "@/components/sections/hero";
import Numbers from "@/components/sections/numbers";
import ServiceCards from "@/components/sections/service-cards";
import WhyChiro from "@/components/sections/why-chiro";
import PortfolioPreview from "@/components/sections/portfolio-preview";
import Comparison from "@/components/sections/comparison";
import Testimonials from "@/components/sections/testimonials";
import BlogPreview from "@/components/sections/blog-preview";
import Faq from "@/components/sections/faq";
import CtaBand from "@/components/sections/cta-band";
import { generateFAQSchema, generatePageSchema, JsonLd } from "@/lib/schema-helpers";

const faqQuestions = [
  {
    question: "홈페이지 하나 만든다고 진짜 매출이나 브랜드 이미지가 달라지나요?",
    answer: "단순한 예쁜 디자인이 아닌, 타겟 고객이 결제하게 만드는 심리적 동선과 글로벌 마케팅 세팅이 결합되었을 때 매출이 폭발적으로 달라집니다. CHIRO는 디자인이 아닌 '매출 구조'를 설계합니다.",
  },
  {
    question: "만드는 비용도 비싼데, 나중에 유지비도 장난 아니지 않나요?",
    answer: "CHIRO는 디자인부터 코딩까지 아우르는 압도적인 기술력을 바탕으로 불필요한 유지보수 비용의 거품을 완전히 빼고 타사 대비 30% 저렴하게 제공합니다. 월 유지비 폭탄 없이, 합리적인 비용으로 운영 가능합니다.",
  },
  {
    question: "온라인을 하나도 모릅니다. 마케팅까지 다 해주시나요?",
    answer: "네, 호주 유학생 출신 기획자가 국내는 물론 해외 글로벌 세팅까지 풀패키지로 전담하여 '온라인 자동 영업 사원'을 만들어 드립니다. 네이버, 구글, SNS 마케팅 세팅까지 한 번에 해결됩니다.",
  },
  {
    question: "에이전시한테 맡겼다가 돈만 날린 적이 있는데, 뭐가 다른가요?",
    answer: "CHIRO는 상담 당일 빌드를 시작하고, 실시간 링크로 제작 과정을 직접 확인하실 수 있습니다. 기획서 대기, 시안 승인 같은 불필요한 과정 없이 수정 횟수 제한도 없습니다. 만족할 때까지 함께 만듭니다.",
  },
  {
    question: "홈페이지 만들면 네이버나 구글에 바로 검색되나요?",
    answer: "모든 프로젝트에 SEO(검색엔진최적화) 기본 세팅이 포함됩니다. 네이버, 구글 검색 등록은 물론, 메타태그, 사이트맵, 구조화 데이터까지 설정하여 검색 노출 기반을 확실히 잡아드립니다.",
  },
  {
    question: "아임웹이나 카페24로 만든 사이트가 있는데, 이전할 수 있나요?",
    answer: "가능합니다. 기존 사이트의 콘텐츠와 구조를 분석한 후 커스텀 빌드로 이전합니다. 도메인, 이메일 등 기존 설정도 그대로 유지되며, 이전 과정에서 서비스가 중단되지 않도록 설계합니다.",
  },
  {
    question: "제작 기간은 얼마나 걸리나요? 급하게 필요합니다.",
    answer: "일반적인 기업 홈페이지(5페이지 이내) 기준 평균 4일 이내에 완성됩니다. 상담과 동시에 빌드가 시작되고, 불필요한 대기 시간을 완전히 없앴기 때문에 가능합니다.",
  },
  {
    question: "해외 고객도 타겟하고 싶은데, 영어 사이트도 만들어 주시나요?",
    answer: "호주 유학 경험을 바탕으로 영문 사이트 제작과 해외 마케팅 세팅을 전문으로 합니다. Google Ads, 해외 SEO, 다국어 사이트까지 글로벌 비즈니스 확장을 위한 풀패키지를 제공합니다.",
  },
  {
    question: "제작 후에 직접 수정할 수 있나요? 컴퓨터를 잘 못합니다.",
    answer: "관리자 페이지에서 텍스트, 이미지, 블로그 글 등을 코딩 지식 없이 직접 수정하실 수 있습니다. 사용법 가이드를 제공해 드리며, 긴급 수정이 필요하시면 당일 대응합니다.",
  },
  {
    question: "홈페이지 제작 비용은 어느 정도인가요?",
    answer: "프로젝트 규모에 따라 합리적인 플랜을 운영합니다. 모든 플랜에 마케팅 기본 세팅과 실시간 피드백 링크가 포함되며, 거품 없는 정찰제로 투명하게 운영합니다. 정확한 견적은 무료 상담을 통해 안내드립니다.",
  },
];

export default function Home() {
  const faqSchema = generateFAQSchema(faqQuestions);
  const pageSchema = faqSchema ? generatePageSchema([faqSchema]) : null;

  return (
    <>
      {pageSchema && <JsonLd data={pageSchema} />}
      <Hero />
      <Numbers />
      <ServiceCards />
      <WhyChiro />
      <PortfolioPreview />
      <Comparison />
      <Testimonials />
      <BlogPreview />
      <Faq />
      <CtaBand />
    </>
  );
}
