import type { Metadata } from 'next';
import RemodelingContent from './remodeling-content';

export const metadata: Metadata = {
  title: '홈페이지 리모델링 — 2000년대식 사이트를 현대적으로',
  description:
    '모바일 미호환, 느린 속도, 검색 노출 안 되는 기존 사이트를 반응형+SEO+AEO 구조로 전면 재설계합니다.',
  alternates: { canonical: 'https://chiroweb.co.kr/services/remodeling' },
  openGraph: {
    title: '홈페이지 리모델링 — 2000년대식 사이트를 현대적으로',
    description: '모바일 미호환, 느린 속도, 검색 노출 안 되는 기존 사이트를 반응형+SEO+AEO 구조로 전면 재설계합니다.',
    url: 'https://chiroweb.co.kr/services/remodeling',
  },
};

export default function RemodelingPage() {
  return <RemodelingContent />;
}
