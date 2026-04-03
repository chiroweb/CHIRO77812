import type { Metadata } from 'next';
import RemodelingContent from './remodeling-content';

export const metadata: Metadata = {
  title: '홈페이지 리모델링 — 낡은 사이트를 현대적으로 전환',
  description:
    '2010년식 홈페이지, 매일 고객을 잃고 있습니다. 치로웹디자인이 반응형, SEO, AEO를 갖춘 현대적 사이트로 전환합니다. 기존 도메인·콘텐츠 유지.',
  alternates: { canonical: 'https://chiroweb.co.kr/services/remodeling' },
  openGraph: {
    title: '홈페이지 리모델링 — 낡은 사이트를 현대적으로 전환',
    description: '낡은 홈페이지가 매일 잃고 있는 고객을 되찾으세요.',
    url: 'https://chiroweb.co.kr/services/remodeling',
  },
};

export default function RemodelingPage() {
  return <RemodelingContent />;
}
