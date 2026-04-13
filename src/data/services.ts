export interface ProcessStep {
  number: string;
  title: string;
  en: string;
  description: string;
  duration: string;
  highlight?: boolean;
}

export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  h1: string;
  description: string;
  shortDescription: string;
  features: string[];
  process: ProcessStep[];
  faqs: { question: string; answer: string }[];
  relatedPortfolioSlugs: string[];
  thumbnailUrl?: string;
  imageUrl?: string;
}

const sharedProcess: ProcessStep[] = [
  {
    number: '01',
    title: '상담',
    en: 'Consultation',
    description:
      '전화, 메일, 카카오톡 — 편한 방법으로 연락 주십시오. 브랜드의 현재 상황과 목표를 함께 정리합니다.',
    duration: '1일',
  },
  {
    number: '02',
    title: '실시간 빌드',
    en: 'Live Build',
    description:
      '상담이 끝나면, 바로 제작에 들어갑니다. 별도의 기획서 대기 기간 없이, 실시간으로 사이트가 만들어지는 과정을 확인하실 수 있는 링크를 보내드립니다.',
    duration: '즉시',
    highlight: true,
  },
  {
    number: '03',
    title: '피드백 & 수정',
    en: 'Feedback',
    description:
      '제작 과정 중 궁금한 점이나 수정사항을 말씀해 주십시오. 링크를 통해 실시간으로 반영되는 것을 직접 확인하실 수 있습니다. 별도의 시안 대기가 필요 없습니다.',
    duration: '실시간',
    highlight: true,
  },
  {
    number: '04',
    title: '런칭',
    en: 'Launch',
    description:
      '최종 확인 후, 도메인 연결과 함께 사이트를 런칭합니다. 런칭 이후에도 안정적인 운영을 지원합니다.',
    duration: '1일',
  },
];

export const services: ServiceDetail[] = [
  {
    id: 'website',
    slug: 'website',
    title: '홈페이지 제작',
    h1: '기업 홈페이지 제작, 무엇이 포함되나요?',
    description: '기업 홈페이지 제작 전문 — 반응형 디자인, SEO, CMS까지 포함된 AEO 자동화 웹사이트 제작 서비스. 평균 3.8일 완성.',
    shortDescription: '브랜드의 첫 인상을 설계합니다. 반응형 디자인부터 SEO까지 포함된 올인원 홈페이지를 제작합니다.',
    features: [
      '브랜드 아이덴티티에 맞춘 맞춤 디자인',
      'SEO/AEO 기본 세팅 포함',
      '모든 디바이스 대응 반응형 레이아웃',
      '문의 전환율을 높이는 CTA 설계',
      '관리자가 직접 수정할 수 있는 CMS 연동',
      '구조화 데이터(JSON-LD) 자동 생성',
    ],
    process: sharedProcess,
    faqs: [
      {
        question: '홈페이지 제작 기간은 얼마나 걸리나요?',
        answer: '치로의 평균 제작 기간은 3.8일입니다. 상담 당일 실시간 빌드 링크를 제공하며, 기획서 대기 기간 없이 바로 제작에 들어갑니다. 프로젝트 규모에 따라 1주일 이내에 완성됩니다.',
      },
      {
        question: '홈페이지 제작 비용은 얼마인가요?',
        answer: '스타트업 플랜은 99만원부터, 비즈니스 플랜은 250만원부터 시작합니다. 모든 플랜에 반응형 디자인, SEO 기본 세팅, 실시간 피드백 링크가 포함됩니다. 프로젝트 규모에 맞는 정확한 견적은 무료 상담을 통해 안내드립니다.',
      },
      {
        question: '수정은 몇 번까지 가능한가요?',
        answer: '수정 횟수에 제한이 없습니다. 실시간 빌드 링크를 통해 제작 과정을 직접 확인하시면서, 원하시는 만큼 피드백을 주시면 즉시 반영됩니다.',
      },
      {
        question: 'SEO가 기본으로 포함되나요?',
        answer: '네, 모든 플랜에 SEO 기본 세팅이 포함됩니다. 메타태그, 구조화 데이터(JSON-LD), 사이트맵, Open Graph 태그를 코드 레벨에서 세팅합니다. 별도 비용이 발생하지 않습니다.',
      },
      {
        question: '완성 후 직접 내용을 수정할 수 있나요?',
        answer: 'Business 플랜 이상에서 CMS(콘텐츠 관리 시스템)가 포함됩니다. 관리자 페이지에서 텍스트, 이미지, 포트폴리오 등을 코딩 없이 직접 수정할 수 있습니다.',
      },
    ],
    relatedPortfolioSlugs: ['nbpkorea'],
  },
  {
    id: 'remodeling',
    slug: 'remodeling',
    title: '홈페이지 리모델링',
    h1: '낡은 홈페이지, 매일 잃고 있는 고객을 되찾으세요',
    description: '기존 홈페이지 리모델링 — 낡은 디자인과 느린 속도를 개선하여 검색 노출과 전환율을 높이는 리뉴얼 서비스.',
    shortDescription: '낡은 디자인과 느린 속도를 개선합니다. 기존 콘텐츠를 살리면서 최신 기술로 전환합니다.',
    features: [
      '기존 콘텐츠 마이그레이션 및 재구성',
      '최신 반응형 디자인으로 전환',
      '페이지 로딩 속도 최적화 (LCP 1.5초 이내)',
      'SEO/AEO 재세팅으로 검색 노출 복구',
      '전환율 개선을 위한 UX 재설계',
    ],
    process: sharedProcess,
    faqs: [
      {
        question: '기존 홈페이지 콘텐츠를 그대로 옮길 수 있나요?',
        answer: '네, 기존 텍스트와 이미지를 새로운 디자인에 맞춰 마이그레이션합니다. 콘텐츠를 재구성하면서 SEO 구조도 함께 개선하므로, 리모델링 후 검색 노출이 향상되는 경우가 많습니다.',
      },
      {
        question: '리모델링과 신규 제작의 차이는 무엇인가요?',
        answer: '리모델링은 기존 콘텐츠와 도메인 자산을 유지하면서 디자인과 기술 스택을 교체합니다. 신규 제작은 처음부터 새로 만듭니다. 기존 검색 순위를 유지해야 한다면 리모델링을 권장합니다.',
      },
      {
        question: '리모델링 후 속도가 얼마나 빨라지나요?',
        answer: '평균적으로 LCP(최대 콘텐츠 표시 시간)를 1.5초 이내로 개선합니다. 이미지 최적화, 코드 경량화, CDN 적용을 통해 기존 대비 2~5배 빠른 로딩 속도를 달성합니다.',
      },
      {
        question: '리모델링 기간은 얼마나 걸리나요?',
        answer: '기존 사이트의 페이지 수와 복잡도에 따라 다르지만, 평균 5~7일 내에 완성됩니다. 기존 콘텐츠 정리가 사전에 되어 있으면 더 빠르게 진행됩니다.',
      },
    ],
    relatedPortfolioSlugs: [],
  },
  {
    id: 'seo-aeo',
    slug: 'seo-aeo',
    title: 'SEO/AEO 자동화',
    h1: 'SEO/AEO 자동화 세팅 — 코드 레벨에서 시작되는 검색 최적화',
    description: 'SEO와 AEO를 코드 레벨에서 자동화합니다. 구조화 데이터, 메타태그, 사이트맵을 한 번에 세팅하는 검색 최적화 서비스.',
    shortDescription: '검색엔진과 AI 모두에게 발견되는 사이트를 만듭니다. 코드 레벨에서 SEO/AEO를 자동화합니다.',
    features: [
      '구조화 데이터(JSON-LD) 자동 생성',
      '메타태그 및 Open Graph 최적화',
      'XML 사이트맵 자동 생성 및 제출',
      'AEO(AI Engine Optimization) 세팅',
      '페이지별 키워드 매핑 및 콘텐츠 구조화',
      'Google Search Console 연동 및 모니터링',
    ],
    process: sharedProcess,
    faqs: [
      {
        question: 'SEO와 AEO의 차이점은 무엇인가요?',
        answer: 'SEO는 구글, 네이버 같은 검색엔진에 최적화하는 것이고, AEO는 ChatGPT, Perplexity 같은 AI 엔진이 사이트 정보를 정확히 이해하고 인용할 수 있도록 최적화하는 것입니다. 치로는 두 가지를 동시에 세팅합니다.',
      },
      {
        question: '아임웹이나 카페24로는 SEO가 안 되나요?',
        answer: '기본적인 메타태그 설정은 가능하지만, 구조화 데이터(JSON-LD), 시맨틱 HTML, llms.txt 같은 코드 레벨 SEO는 플랫폼 제약으로 구현이 어렵습니다. 치로는 코드를 직접 작성하기 때문에 이러한 제약이 없습니다.',
      },
      {
        question: 'SEO 효과는 얼마나 걸리나요?',
        answer: '구조화 데이터와 사이트맵 제출 후, 일반적으로 2~4주 내에 검색 인덱싱이 시작됩니다. 키워드 경쟁도에 따라 순위 상승에는 1~3개월이 소요될 수 있습니다.',
      },
      {
        question: 'AEO가 중요한 이유는 무엇인가요?',
        answer: 'AI 검색(ChatGPT, Perplexity 등)의 사용량이 급증하고 있습니다. AI가 답변을 생성할 때 신뢰할 수 있는 출처로 인용되려면, 구조화 데이터와 llms.txt를 통해 사이트 정보를 명확하게 제공해야 합니다.',
      },
      {
        question: '치로의 SEO 세팅은 다른 업체와 뭐가 다른가요?',
        answer: '대부분의 업체는 SEO 플러그인이나 외부 도구에 의존합니다. 치로는 코드 자체에 SEO를 내장합니다. 구조화 데이터, 시맨틱 HTML, 메타태그가 빌드 시점에 자동 생성되므로, 플러그인 없이도 검색엔진과 AI 모두에게 최적화된 결과를 제공합니다.',
      },
      {
        question: '구조화 데이터가 왜 중요한가요?',
        answer: '구조화 데이터(JSON-LD)는 검색엔진이 사이트 콘텐츠를 정확히 이해하도록 돕습니다. 리치 스니펫(별점, FAQ, 가격 등)으로 검색 결과에서 클릭률을 높이고, AI 엔진이 정보를 인용할 때도 핵심 근거가 됩니다.',
      },
      {
        question: 'SEO/AEO 세팅 비용은 별도인가요?',
        answer: '치로의 모든 홈페이지 제작 플랜에 SEO/AEO 기본 세팅이 포함됩니다. 별도의 추가 비용이 발생하지 않습니다. 기존 사이트에 대한 단독 SEO/AEO 세팅은 별도 상담을 통해 안내드립니다.',
      },
    ],
    relatedPortfolioSlugs: [],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return services.find((service) => service.slug === slug);
}
