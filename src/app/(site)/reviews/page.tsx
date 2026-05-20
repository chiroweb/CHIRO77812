import type { Metadata } from 'next';
import ReviewsContent from './reviews-content';

export const metadata: Metadata = {
  title: '고객 후기 — 치로웹디자인 클라이언트 리뷰',
  description: '실제 클라이언트가 남긴 치로웹디자인 후기. 코드 기반 홈페이지 제작과 AEO·SEO 통합 설계의 실제 결과.',
  alternates: { canonical: 'https://chiroweb.co.kr/reviews' },
  openGraph: {
    title: '고객 후기 — 치로웹디자인 클라이언트 리뷰',
    description: '실제 클라이언트가 남긴 치로웹디자인 후기. 코드 기반 홈페이지 제작과 AEO·SEO 통합 설계의 실제 결과.',
    url: 'https://chiroweb.co.kr/reviews',
  },
};

export default function ReviewsPage() {
  return <ReviewsContent />;
}
