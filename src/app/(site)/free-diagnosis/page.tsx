import type { Metadata } from 'next';
import DiagnosisContent from './diagnosis-content';

export const metadata: Metadata = {
  title: '무료 홈페이지 진단 — SEO/AEO 점수 확인',
  description: '내 홈페이지의 SEO, 모바일 호환성, 로딩 속도, AEO 준비도를 무료로 진단받으세요. 웹사이트 URL과 이메일만 입력하면 전문 리포트를 보내드립니다.',
  alternates: { canonical: 'https://chiroweb.co.kr/free-diagnosis' },
  openGraph: {
    title: '무료 홈페이지 진단 — SEO/AEO 점수 확인',
    description: '웹사이트 URL만 입력하세요. 무료 SEO/AEO 진단 리포트를 보내드립니다.',
    url: 'https://chiroweb.co.kr/free-diagnosis',
  },
};

export default function FreeDiagnosisPage() {
  return <DiagnosisContent />;
}
