import type { Metadata } from 'next';
import WebsiteContent from './website-content';

export const metadata: Metadata = {
  title: '홈페이지 제작 — 심리학 기반 맞춤 웹사이트',
  description: '빌더가 아닌 직접 작성한 코드로 만드는 홈페이지. 심리학 기반 UI/UX 설계와 SEO/AEO 자동화가 기본 포함됩니다.',
  alternates: { canonical: 'https://chiroweb.co.kr/services/website' },
  openGraph: {
    title: '홈페이지 제작 — 치로웹디자인',
    description: '심리학 기반 맞춤 웹사이트 제작',
    url: 'https://chiroweb.co.kr/services/website',
  },
};

export default function WebsitePage() {
  return <WebsiteContent />;
}
