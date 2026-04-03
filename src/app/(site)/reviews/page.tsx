import type { Metadata } from 'next';
import ReviewsContent from './reviews-content';

export const metadata: Metadata = {
  title: '고객 후기 — 치로웹디자인 실제 고객 리뷰',
  description: '치로웹디자인 실제 고객 후기. 실명, 회사명, 프로젝트 종류와 함께 투명하게 공개합니다. 평균 별점 5.0.',
  alternates: { canonical: 'https://chiroweb.co.kr/reviews' },
  openGraph: {
    title: '고객 후기 — 치로웹디자인 실제 고객 리뷰',
    description: '실명 기반 투명한 고객 후기. 평균 별점 5.0.',
    url: 'https://chiroweb.co.kr/reviews',
  },
};

export default function ReviewsPage() {
  return <ReviewsContent />;
}
