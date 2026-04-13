import type { Metadata } from 'next';
import DiagnosisContent from './diagnosis-content';

export const metadata: Metadata = {
  title: '무료 홈페이지 진단 — SEO/AEO 점수 확인',
  description: '현재 사이트의 SEO 구조, AEO 호환성, 페이지 속도를 무료로 진단합니다. 5분이면 결과를 확인할 수 있습니다.',
  alternates: { canonical: 'https://chiroweb.co.kr/free-diagnosis' },
  openGraph: {
    title: '무료 홈페이지 진단 — SEO/AEO 점수 확인',
    description: '현재 사이트의 SEO 구조, AEO 호환성, 페이지 속도를 무료로 진단합니다. 5분이면 결과를 확인할 수 있습니다.',
    url: 'https://chiroweb.co.kr/free-diagnosis',
  },
};

export default function FreeDiagnosisPage() {
  return <DiagnosisContent />;
}
