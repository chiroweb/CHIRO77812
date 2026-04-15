import type { Metadata } from 'next';
import WebsiteContent from './website-content';

export const metadata: Metadata = {
  title: '홈페이지 제작 — 코드 기반 반응형 웹 + AEO 기본 포함',
  description: '빌더가 아닌 직접 작성한 코드. 반응형 디자인, SEO/AEO 기본 세팅, llms.txt까지 포함된 홈페이지 제작. 175만원부터.',
  alternates: { canonical: 'https://chiroweb.co.kr/services/website' },
  openGraph: {
    title: '홈페이지 제작 — 코드 기반 반응형 웹 + AEO 기본 포함',
    description: '빌더가 아닌 직접 작성한 코드. 반응형 디자인, SEO/AEO 기본 세팅, llms.txt까지 포함된 홈페이지 제작. 175만원부터.',
    url: 'https://chiroweb.co.kr/services/website',
  },
};

export default function WebsitePage() {
  return <WebsiteContent />;
}
