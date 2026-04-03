import type { Metadata } from 'next';
import SeoAeoContent from './seo-aeo-content';

export const metadata: Metadata = {
  title: 'SEO/AEO 자동화 세팅 — 코드 레벨 검색 최적화',
  description:
    '치로웹디자인의 SEO/AEO 자동화 세팅. 코드 레벨에서 시작되는 검색 최적화로 구글, 네이버는 물론 AI 검색(ChatGPT, Perplexity)에도 노출되는 웹사이트를 만듭니다.',
  alternates: { canonical: 'https://chiroweb.co.kr/services/seo-aeo' },
  openGraph: {
    title: 'SEO/AEO 자동화 세팅 — 코드 레벨 검색 최적화',
    description:
      '코드 레벨에서 시작되는 검색 최적화. 구조화 데이터, 클린 URL, 시맨틱 HTML, llms.txt까지 기본 제공.',
    url: 'https://chiroweb.co.kr/services/seo-aeo',
  },
};

export default function SeoAeoPage() {
  return <SeoAeoContent />;
}
