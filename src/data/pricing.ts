export interface PricingFeature {
  name: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  monthlyEquivalent?: string;
  description: string;
  features: PricingFeature[];
  recommended?: boolean;
  ctaText: string;
  ctaHref: string;
}

export const plans: PricingPlan[] = [
  {
    id: 'startup',
    name: 'Startup',
    price: '99만원~',
    priceValue: 990000,
    monthlyEquivalent: '하루 약 2,700원',
    description: '브랜드의 첫 온라인 거점을 설계합니다.',
    features: [
      { name: '반응형 웹사이트 (5페이지 이내)', included: true },
      { name: '기본 SEO 설정', included: true },
      { name: '실시간 피드백 링크 제공', included: true },
      { name: '컨텐츠 관리 시스템(CMS)', included: false },
      { name: '맞춤 애니메이션', included: false },
      { name: '유지보수 (월)', included: false },
    ],
    ctaText: '문의하기',
    ctaHref: '/contact',
  },
  {
    id: 'business',
    name: 'Business',
    price: '250만원~',
    priceValue: 2500000,
    recommended: true,
    monthlyEquivalent: '하루 약 6,800원으로 24시간 일하는 영업사원',
    description: '성장하는 비즈니스를 위한 본격적인 웹 경험을 구축합니다.',
    features: [
      { name: '반응형 웹사이트 (10페이지 이내)', included: true },
      { name: '고급 SEO 최적화', included: true },
      { name: '실시간 피드백 링크 제공', included: true },
      { name: '컨텐츠 관리 시스템(CMS)', included: true },
      { name: '맞춤 애니메이션', included: true },
      { name: '유지보수 (3개월)', included: false },
    ],
    ctaText: '문의하기',
    ctaHref: '/contact',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '500만원~',
    priceValue: 5000000,
    monthlyEquivalent: '하루 약 13,700원',
    description: '브랜드의 본질을 담은 완전한 디지털 경험을 설계합니다.',
    features: [
      { name: '반응형 웹사이트 (무제한)', included: true },
      { name: '고급 SEO 최적화', included: true },
      { name: '실시간 피드백 링크 제공', included: true },
      { name: '컨텐츠 관리 시스템(CMS)', included: true },
      { name: '맞춤 애니메이션', included: true },
      { name: '유지보수 (6개월)', included: true },
    ],
    ctaText: '문의하기',
    ctaHref: '/contact',
  },
];

export interface ComparisonItem {
  feature: string;
  chiro: string;
  others: string;
}

export const pricingComparison: ComparisonItem[] = [
  { feature: 'SEO 기본 세팅', chiro: '기본 포함', others: '추가 비용 발생' },
  { feature: '반응형 디자인', chiro: '기본 포함', others: '별도 견적 필요' },
  { feature: '실시간 빌드 링크', chiro: '기본 포함', others: '지원 안 됨' },
  { feature: '수정 횟수', chiro: '무제한', others: '3회 포함' },
  { feature: '구조화 데이터(JSON-LD)', chiro: '기본 포함', others: '추가 비용 발생' },
  { feature: 'AEO 세팅', chiro: '기본 포함', others: '지원 안 됨' },
  { feature: '제작 기간', chiro: '평균 3.8일', others: '2~4주' },
];
