import type { Metadata } from 'next';
import SeoAeoContent from './seo-aeo-content';

export const metadata: Metadata = {
  title: 'SEO/AEO 자동화 — AI 검색 시대의 검색 노출 전략',
  description:
    '구글, ChatGPT, Perplexity가 읽을 수 있는 사이트. llms.txt, 구조화 데이터, 시맨틱 HTML을 코드 레벨에서 구현하는 AEO 자동화.',
  alternates: { canonical: 'https://chiroweb.co.kr/services/seo-aeo' },
  openGraph: {
    title: 'SEO/AEO 자동화 — AI 검색 시대의 검색 노출 전략',
    description:
      '구글, ChatGPT, Perplexity가 읽을 수 있는 사이트. llms.txt, 구조화 데이터, 시맨틱 HTML을 코드 레벨에서 구현하는 AEO 자동화.',
    url: 'https://chiroweb.co.kr/services/seo-aeo',
  },
};

export default function SeoAeoPage() {
  return <SeoAeoContent />;
}
