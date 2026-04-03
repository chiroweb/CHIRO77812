import type { Metadata } from 'next';
import PricingContent from './pricing-content';

export const metadata: Metadata = {
  title: '홈페이지 제작 비용 안내 — 거품 없는 정찰제',
  description: '치로웹디자인 홈페이지 제작 비용: Startup 99만원, Business 250만원, Enterprise 500만원. SEO, 반응형, 실시간 빌드 링크 기본 포함. 추가 비용 없는 정찰제.',
  alternates: { canonical: 'https://chiroweb.co.kr/pricing' },
  openGraph: {
    title: '홈페이지 제작 비용 안내 — 거품 없는 정찰제',
    description: 'Startup 99만원부터. SEO, 반응형, 실시간 빌드 기본 포함.',
    url: 'https://chiroweb.co.kr/pricing',
  },
};

export default function PricingPage() {
  return <PricingContent />;
}
