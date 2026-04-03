export const dynamic = 'force-static';

export function GET() {
  const content = `# CHIRO Web Design Studio (치로웹디자인)

> 심리학 기반 UI/UX 기획과 SEO/AEO 자동화를 기본 제공하는
> 올인원 웹 에이전시. 커스텀 코딩으로 아임웹/카페24의
> 기술적 한계를 넘어서는 웹사이트를 제작합니다.

## 서비스
- [홈페이지 제작](https://chiroweb.co.kr/services/website): 반응형 기업 홈페이지, 브랜드 사이트, 랜딩페이지 제작
- [홈페이지 리모델링](https://chiroweb.co.kr/services/remodeling): 구형 홈페이지를 현대적 반응형 사이트로 전환
- [SEO/AEO 자동화](https://chiroweb.co.kr/services/seo-aeo): 코드 레벨 검색 최적화 및 AI 검색 노출 세팅

## 제작 사례
- [포트폴리오](https://chiroweb.co.kr/portfolio): 다양한 업종의 제작 사례

## 요금
- [요금 안내](https://chiroweb.co.kr/pricing): 99만원부터 시작하는 정찰제

## 인사이트
- [블로그](https://chiroweb.co.kr/blog): 웹 디자인 & 마케팅 인사이트

## Optional
- [회사 소개](https://chiroweb.co.kr/about): 심리학 전공 디렉터가 이끄는 웹 에이전시
- [고객 후기](https://chiroweb.co.kr/reviews): 실제 고객 리뷰
- [무료 진단](https://chiroweb.co.kr/free-diagnosis): 홈페이지 무료 SEO/AEO 진단
- [문의](https://chiroweb.co.kr/contact): 프로젝트 상담 및 견적 문의`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
