import type { Metadata } from 'next';
import RemodelingContent from './remodeling-content';

export const metadata: Metadata = {
  title: '홈페이지 리모델링 — 느린 사이트를 AEO 대응 구조로 전환',
  description:
    '낡은 디자인과 느린 속도를 현대적으로 전환합니다. SEO/AEO 구조를 코드 레벨에서 새로 설계하고, 기존 콘텐츠와 도메인 자산을 보존합니다.',
  alternates: { canonical: 'https://chiroweb.co.kr/services/remodeling' },
  openGraph: {
    title: '홈페이지 리모델링 — 느린 사이트를 AEO 대응 구조로 전환',
    description: '낡은 디자인과 느린 속도를 현대적으로 전환합니다. SEO/AEO 구조를 코드 레벨에서 새로 설계하고, 기존 콘텐츠와 도메인 자산을 보존합니다.',
    url: 'https://chiroweb.co.kr/services/remodeling',
  },
};

export default function RemodelingPage() {
  return <RemodelingContent />;
}
