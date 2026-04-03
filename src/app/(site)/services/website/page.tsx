import type { Metadata } from 'next';
import WebsiteContent from './website-content';

export const metadata: Metadata = {
  title: '기업 홈페이지 제작 — 반응형 웹사이트 맞춤 설계',
  description: '치로웹디자인의 홈페이지 제작 서비스. 반응형 디자인, SEO 최적화, CMS, 실시간 빌드 링크를 기본 제공합니다. 평균 3.8일 완성.',
  alternates: { canonical: 'https://chiroweb.co.kr/services/website' },
  openGraph: {
    title: '기업 홈페이지 제작 — 반응형 웹사이트 맞춤 설계',
    description: '반응형 디자인, SEO 최적화, CMS 기본 제공. 평균 3.8일 완성.',
    url: 'https://chiroweb.co.kr/services/website',
  },
};

export default function WebsitePage() {
  return <WebsiteContent />;
}
