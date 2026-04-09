import type { Metadata } from 'next';
import SeoAeoContent from './seo-aeo-content';

export const metadata: Metadata = {
  title: 'SEO/AEO 최적화 — AI 검색 시대의 검색 노출 전략',
  description:
    '구글, ChatGPT, Perplexity가 읽을 수 있는 홈페이지. 코드 레벨에서 시작하는 SEO/AEO 자동화 세팅.',
  alternates: { canonical: 'https://chiroweb.co.kr/services/seo-aeo' },
  openGraph: {
    title: 'SEO/AEO 최적화 — AI 검색 시대의 검색 노출 전략',
    description:
      '구글, ChatGPT, Perplexity가 읽을 수 있는 홈페이지. 코드 레벨에서 시작하는 SEO/AEO 자동화 세팅.',
    url: 'https://chiroweb.co.kr/services/seo-aeo',
  },
};

export default function SeoAeoPage() {
  return <SeoAeoContent />;
}
