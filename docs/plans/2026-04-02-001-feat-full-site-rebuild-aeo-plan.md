---
title: "feat: CHIRO 웹사이트 전면 재구축 — AEO/SEO 최대치 + 심리학 전환 아키텍처"
type: feat
status: active
date: 2026-04-02
deepened: 2026-04-02
---

# CHIRO 웹사이트 전면 재구축 — AEO/SEO 최대치 + 심리학 전환 아키텍처

## Overview

치로웹디자인(chiroweb.co.kr) 사이트를 현재 8개 라우트에서 15+ 페이지로 확장하고, 전 페이지에 걸쳐 AEO/SEO 최적화 인프라(FAQPage 스키마, BreadcrumbList, Organization JSON-LD, llms.txt)를 구축한다. 동시에 심리학 기반 전환 아키텍처(앵커링, 사회적 증거, 손실 회피, 희소성)를 모든 사용자 플로우에 녹여 "여긴 다르다"는 인식을 만든다.

경쟁사(옐로펜슬, 논웹스, 프레스캣) 중 FAQPage 스키마, 클린 URL, llms.txt를 갖춘 곳은 없다. 이번 리빌드로 치로가 기술적으로 전 경쟁사를 압도하는 구조를 확보한다.

## Problem Frame

**현재 상태:**
- 8개 라우트, 불완전한 SEO (BreadcrumbList 없음, Service/Review 스키마 없음)
- 홈페이지 H1 태그 부재 (히어로가 순수 비주얼)
- 서비스/포트폴리오/블로그가 클라이언트 사이드 데이터 패칭 (SSR 아님 → AI 크롤러가 콘텐츠 못 읽음)
- 포트폴리오 케이스 스터디에 `solution` 필드 없음
- 리뷰/후기 독립 페이지 없음, 요금제가 서비스 페이지에 묻힘
- 무료 진단 랜딩 페이지 없음 (아웃바운드 마케팅 불가)
- `llms.txt` 없음 (2026년 AI 크롤러 대응 불가)
- 이미지 최적화 부재 (`<img>` 태그 직접 사용, WebP 미지원)

**목표 상태:**
- 15+ 페이지, 전 페이지 FAQPage + BreadcrumbList 스키마
- 엔티티 정의형 H1으로 AI가 "치로웹디자인이 무엇인지" 즉답 가능
- SSR 전환으로 모든 콘텐츠가 크롤러에 노출
- 심리학 전환 퍼널 (희소성 → 사회적 증거 → 손실 회피 → CTA)
- 경쟁사 대비 유일한 llms.txt + 전 페이지 구조화 데이터 보유

## Requirements Trace

- R1. 모든 페이지에 고유 메타 타이틀(60자), 디스크립션(160자), OG 태그, canonical
- R2. 모든 페이지에 엔티티 정의형 H1 1개
- R3. 모든 페이지에 FAQ 섹션 + FAQPage JSON-LD (최소 3개 Q&A)
- R4. 모든 페이지에 Breadcrumb 네비게이션 + BreadcrumbList JSON-LD
- R5. 모든 페이지에 내부 링크 최소 3개
- R6. 사이트맵 15+ 정적 페이지 + 동적 페이지 포함
- R7. `/llms.txt` AI 크롤러용 사이트 안내 파일
- R8. Core Web Vitals 통과 (LCP < 2.5초) — `next/image` WebP 자동 변환
- R9. 심리학 전환 패턴 적용 (앵커링, 사회적 증거, 손실 회피, 희소성)
- R10. 신규 페이지: /services/website, /services/remodeling, /services/seo-aeo, /reviews, /pricing, /free-diagnosis, /about 리뉴얼
- R11. 포트폴리오 케이스 스터디 문제→해결→결과 구조 통일
- R12. Organization + WebSite + LocalBusiness JSON-LD 전역 삽입
- R13. hreflang="ko" 셀프 레퍼런스 태그 전 페이지

## Scope Boundaries

- **제외:** 북 시리즈(/blog/aeo-guide, /blog/seo-guide 및 챕터) — 별도 정리 예정
- **제외:** 뉴스레터 구독 시스템 — 추후 추가
- **제외:** 영문 사이트 / i18n 실제 구현 — hreflang 셀프 레퍼런스만
- **제외:** 자동 진단 리포트 생성 (Lighthouse API 연동) — 수동 리포트
- **제외:** 어드민 CMS 확장 (리뷰/요금제는 하드코딩)
- **포함하되 후순위:** Google Analytics 4, Search Console 연동 확인

## Context & Research

### 경쟁사 분석 핵심 시사점

| 경쟁사 | 강점 (훔칠 것) | 약점 (공략할 것) |
|--------|---------------|----------------|
| **논웹스** | 주간 3건 희소성 위젯, 100% 환불 보증, 실시간 캘린더 | AEO 없음, 디자인 평범, 케이스 스터디 없음 |
| **프레스캣** | 투명 가격표 + "인기" 앵커링, SEO 블로그 콘텐츠 | 디자인 2020년대, 포트폴리오 6개뿐, 구조화 데이터 없음 |
| **옐로펜슬** | 관계 중심 메시징, 마감 미스 제로 | 아임웹 기반 한계, 전문성 부족, 네이버 이메일 |

**글로벌 에이전시 영감:**
- **Instrument**: 3-필러 서비스 모델 (Brand/Marketing/Product) → 치로에 적용: 제작/리모델링/SEO-AEO
- **Huge Inc**: 문제→해결→결과+수치 케이스 스터디 → 포트폴리오 구조에 적용
- **BASIC/DEPT**: 사고 리더십 콘텐츠 생태계 → 블로그 + 북 시리즈 전략

### AEO 2026 핵심 전략

1. **Direct Answer Block**: H2 바로 아래 40-60단어 자족 문단 배치
2. **Definition-Lead Sentence**: "[엔티티]는 [카테고리]이며 [차별점]이다" 30단어 이내
3. **FAQPage Schema**: 페이지당 3-8개, 답변 30-80단어, DOM에 텍스트 반드시 존재
4. **Statistical Anchoring**: 300단어당 2+ 구체적 수치
5. **llms.txt**: 마크다운 형식, H1 + 인용 요약 + 섹션별 링크 목록

### 심리학 전환 패턴 (적용 위치)

| 바이어스 | 적용 위치 | 구현 방식 |
|---------|----------|----------|
| **앵커링** | /pricing | Enterprise(500만원) 먼저 → Business가 합리적으로 느껴짐 |
| **사회적 증거** | 홈페이지, /reviews | 실명+회사명+날짜, 프로젝트 수, 해외 브랜드 로고 |
| **손실 회피** | 홈페이지 비교표, /services/remodeling | "낡은 사이트가 매일 잃는 고객 수" 프레이밍 |
| **희소성** | 사이트 전역 배너 | "이번 달 수용 가능 프로젝트: N건" (기존 Notice 시스템 활용) |
| **권위** | /about, 전역 | 심리학 전공 기획자, 해외 호텔 브랜드 계열사 실적 |
| **호혜성** | /free-diagnosis, /blog | 무료 진단 + 무료 인사이트 제공 → 신뢰 축적 |
| **디폴트 효과** | /pricing | Business 플랜에 "Recommended" 배지 (이미 존재, 유지) |
| **커밋먼트** | 전환 퍼널 | 무료 진단(작은 예) → 상담(큰 예) 단계적 전환 |

### 심리학 미세 최적화 10가지 (구현 시 적용)

**1. 진입 3초 — 자기 관련성 효과 (Self-Reference Effect)**
- 히어로 서브카피에 타겟 명시: "기다리지 마십시오" 아래에 "중소기업 대표님, 아직도 2010년식 홈페이지를 쓰고 계신가요?" 같은 타겟 특정 문장 추가
- 자신과 관련된 정보를 3배 더 잘 기억함 → 방문자가 "이건 나한테 하는 말이네" 느끼게
- **적용 위치:** Unit 12 (홈페이지 Hero 섹션)

**2. 숫자 구체성 효과 (Specificity Effect)**
- 반올림 금지: "평균 4일" → "평균 3.8일", "만족도 100%" → "만족도 99.7%"
- 소수점이 있는 숫자가 오히려 진짜처럼 느껴짐 ("약 100개"보다 "97개"가 믿음직)
- **적용 위치:** Unit 12 (Numbers 섹션), 모든 통계 수치

**3. 비교표 프레이밍 효과**
- 치로 쪽에 부정어 금지: "추가 비용 없음" → "기본 포함". "없음"이라는 단어 자체가 부정적 연상
- 경쟁사 쪽에는 마찰 단어: "추가 비용 발생", "별도 견적 필요"
- 아이콘 색상: 치로 = 오렌지(#FF4D00) 체크, 경쟁사 = 연한 회색 엑스 (빨간 엑스는 공격적, 회색은 무심한 인식)
- 핵심 차이점 셀에 스크롤 도달 시 미세 펄스 애니메이션 (주의 편향/Attentional Bias)
- **적용 위치:** Unit 12 (Comparison), Unit 8 (SEO/AEO 비교표), Unit 13 (Pricing 비교표)

**4. CTA 미세 심리학 — 목표 기울기 효과 (Goal Gradient Effect)**
- "문의하기" → "30분 무료 상담 신청" (시간 명시 → 부담 감소)
- "무료 진단 신청" → "내 사이트 점수 확인하기" (결과 명시)
- "프로젝트 문의" → "견적 받아보기" (구체적 산출물 약속)
- CTA 버튼 바로 아래 마이크로카피: "평균 24시간 이내 응답" 또는 "부담 없이 물어보세요, 계약 강요 없습니다" (불안 제거/Anxiety Reduction)
- **적용 위치:** 전 페이지 CTA, MobileCtaBar, CtaBand, SubCtaBand

**5. 포트폴리오 결과 수치화**
- 수치 없는 프로젝트도 측정 가능한 지표로 프레이밍:
  - "모바일 호환성 0% → 100% 달성"
  - "Google PageSpeed 점수 32점 → 94점"
  - "제작 기간 업계 평균 6주 → 4일"
  - "검색 노출 0건 → 구글 색인 완료"
- Lighthouse 점수는 프로젝트 완료 후 측정 가능 → 납품 시 기록 습관화
- **적용 위치:** Unit 17 (케이스 스터디), Blocking Content Dependencies (solution 백필 시)

**6. 가격표 미끼 효과 (Decoy Effect) + Pennies-a-Day**
- Enterprise와 Business의 차이를 최소화 → Enterprise는 Business를 팔기 위한 미끼
- 월 환산 가격: "250만원" → "하루 약 6,800원으로 24시간 일하는 영업사원" (단위 전환 기법)
- **적용 위치:** Unit 13 (Pricing)

**7. 후기 맥락 효과 (Context Effect)**
- /reviews에 모으되, 관련 페이지에도 맥락 맞는 후기 1개씩 배치:
  - /services/remodeling → 리모델링 프로젝트 후기
  - /services/seo-aeo → "SEO 세팅까지 해주셔서..." 후기
  - /pricing → "가격 대비 퀄리티가..." 후기
- 같은 후기도 관련 맥락에서 노출 시 설득력 3배 이상
- **부정-긍정 전환 구조**: "처음에 1인이라 걱정했는데..." → 약점 인정 후 강점 부각 = 진실성 상승
- **적용 위치:** Unit 8, 9, 10, 13, 14 (서비스 상세 + 가격 + 후기 페이지)

**8. 무료 진단 리포트 설계 — Yes Set + 커밋먼트**
- 진단 리포트 구조:
  1. 3가지 잘 되고 있는 점 (칭찬 먼저 → 방어 심리 해제 → Yes Set)
  2. 5가지 개선 필요한 점 (문제 인식 유발)
  3. 개선 시 예상 효과 (기대감 생성)
  4. "이 중 2가지는 무료 상담에서 해결 방법을 알려드립니다" (다음 단계 유도)
- 이미 진단 받은 사람은 "여기까지 왔으니 상담도 받아보자" 심리 작동
- **적용 위치:** Unit 15 (free-diagnosis 결과 이메일 템플릿 설계 시 참조)

**9. 페이지 내 미세 인터랙션**
- **스크롤 진행 바**: 긴 서비스 페이지/블로그 글 상단에 얇은 진행 바 → 목표 기울기 효과로 끝까지 읽게 유도
- **FAQ "가장 많이 물어보는 질문" 배지**: 첫 번째 질문에 태그 → 밴드왜건 효과 (Bandwagon)
- **적용 위치:** Unit 3 (FAQ 컴포넌트에 인기 배지 옵션), Unit 8-10 (서비스 상세에 스크롤 바)

**10. 이탈 방지 장치**
- **푸터 이후 플로팅 CTA**: 하단 CTA 지나쳐 푸터까지 내려가면 우측 하단에 "아직 궁금한 게 있으신가요?" → 잔류 효과 (Zeigarnik Effect)
- **Exit-intent 팝업 (가격 페이지 전용)**: /pricing에서 마우스가 브라우저 상단으로 이동 시 "지금 상담 신청하면 SEO 초기 세팅 무료 포함" — **1회만** 표시 (반복 시 역효과)
- **적용 위치:** Unit 13 (Pricing exit-intent), 전역 레이아웃 (플로팅 CTA는 Phase 5에서 검토)

---

### Relevant Code and Patterns

- **페이지 패턴**: `page.tsx`에 metadata export + 클라이언트 컴포넌트 import (`src/app/(site)/services/page.tsx`)
- **섹션 컴포넌트**: `src/components/sections/` 에 독립 섹션 단위 (`hero.tsx`, `faq.tsx`, `comparison.tsx`)
- **디자인 시스템**: Space Grotesk Light + `.` 오렌지 마침표, JetBrains Mono 라벨, `#FF4D00` 액센트
- **애니메이션**: `src/lib/motion.ts` (fadeInUp, staggerContainer, viewportConfig)
- **JSON-LD 패턴**: `page.tsx`에서 `<script type="application/ld+json">` 직접 삽입
- **폴백 데이터**: 포트폴리오/블로그에 DB 불가 시 하드코딩 폴백 존재
- **라벨 컴포넌트**: `src/components/ui/section-label.tsx` ("01 — Portfolio" 형식)

### Key Files for This Work

| File | Role |
|------|------|
| `src/lib/schema.sql` | DB DDL — contact_submissions 확장 |
| `src/lib/types.ts` | TypeScript 인터페이스 — 새 타입 추가 |
| `src/app/layout.tsx` | 루트 메타데이터 + Organization JSON-LD |
| `src/app/(site)/layout.tsx` | 사이트 레이아웃 (Header, Footer, MobileCtaBar) |
| `src/app/sitemap.ts` | 사이트맵 — 신규 페이지 추가 |
| `src/app/robots.ts` | 로봇 — llms.txt 참조 추가 |
| `src/app/(site)/page.tsx` | 홈페이지 — 전면 리뉴얼 |
| `src/app/(site)/services/services-content.tsx` | 서비스 — 허브로 전환 |
| `src/components/sections/testimonials.tsx` | 후기 — 데이터 소스 통합 |
| `src/components/sections/faq.tsx` | FAQ — 재사용 가능 컴포넌트로 리팩토링 |

## Key Technical Decisions

- **리뷰/요금제 하드코딩**: 데이터 변경 빈도가 낮으므로 소스코드에 직접 작성. DB + 어드민 UI 구축 비용 절감. 추후 CMS 전환 가능하도록 데이터를 별도 파일(`src/data/reviews.ts`, `src/data/pricing.ts`)로 분리
- **북 시리즈 제외**: 사용자가 별도 정리 예정. 라우팅 구조(`/blog/aeo-guide/`)만 예약하되 페이지 구현은 하지 않음
- **무료 진단 = contact_submissions 확장**: 기존 테이블에 `type` VARCHAR + `website_url` TEXT 컬럼 추가. 어드민에서 type별 필터링 가능하도록 기존 contacts 목록 확장
- **Breadcrumb 이중 구현**: 시각적 UI 컴포넌트 + JSON-LD 스키마 동시. JetBrains Mono 스타일 일관성 유지
- **SSR 전환**: 포트폴리오/블로그 리스트를 클라이언트 사이드 fetch에서 서버 컴포넌트로 전환. AI 크롤러가 콘텐츠를 읽을 수 있도록
- **next/image 전면 도입**: 기존 `<img>` 태그를 `next/image`로 교체. Vercel에서 자동 WebP 변환 + lazy loading
- **JSON-LD @graph 패턴**: 페이지당 여러 `<script>` 태그 대신, 단일 `<script>` 안에 `@graph` 배열로 BreadcrumbList + FAQPage + Service 등을 통합. `@id` 참조로 엔티티 간 관계 명시 (예: Service의 provider가 Organization @id 참조). Google Rich Results Test 통과 + DOM 간결화
- **SSR 전환 패턴**: 서버 컴포넌트에서 `sql` 직접 호출 → 데이터를 props로 클라이언트 컴포넌트에 전달 → 클라이언트에서 Framer Motion + 필터링 처리. 기존 `useEffect` + `fetch` 패턴 제거. **반드시 폴백 데이터 패턴 유지** (try/catch + 하드코딩 폴백)
- **서비스 허브 전환**: 현재 /services는 4개 탭 + 프로세스 + 가격을 모두 담은 거대 페이지. 이를 허브(3카드 링크)로 축소하고, 상세 내용은 /services/website, /services/remodeling, /services/seo-aeo 개별 페이지로 분산. `src/data/services.ts`에 서비스 데이터를 분리하되 `thumbnailUrl`(허브용) vs `imageUrl`(상세용) 구분
- **FAQ 컴포넌트 범용화**: 현재 홈페이지 전용 `faq.tsx`를 props 기반 재사용 가능 컴포넌트로 리팩토링. `questions` prop으로 데이터 주입, JSON-LD 자동 생성
- **무료 진단 최소 허들**: /free-diagnosis 폼은 **웹사이트 URL + 이메일** 2개 필드만 수집. 이름/회사명/연락처는 진단 결과 전달 시 자연스럽게 수집 (커밋먼트 패턴: 작은 예 → 큰 예)
- **희소성 위젯 = 독립 ScarcityBar**: 기존 Notice 시스템이 아닌 별도 `ScarcityBar` 컴포넌트로 구현. Notice는 해제 가능한 임시 공지용이므로 상시 표시 희소성에 부적합. `site_settings` 테이블에 `available_project_count` 키로 데이터 관리
- **SubCtaBand id 수정**: `SubCtaBand`에 `id="cta-band"` 추가하여 MobileCtaBar 인터섹션 로직이 모든 서브 페이지에서 정상 작동하도록 수정 (현재 id 없어서 모바일 CTA 바가 항상 표시되는 버그)

## Open Questions

### Resolved During Planning

- **리뷰 데이터 관리** → 하드코딩 (`src/data/reviews.ts`)
- **요금제 데이터 관리** → 하드코딩 (`src/data/pricing.ts`)
- **북 시리즈 저장 방식** → 스코프 제외, 사용자가 별도 정리
- **무료 진단 데이터** → contact_submissions 확장 (type + website_url)
- **구현 우선순위** → 핵심 페이지 먼저 (SEO/AEO 서비스 + 메인)
- **라우팅 충돌 (/blog/aeo-guide vs /blog/[slug])** → Next.js에서 정적 폴더가 동적 [slug]보다 우선함. `src/app/(site)/blog/aeo-guide/page.tsx` 폴더 생성으로 해결 (북 시리즈 구현 시 적용)
- **WebP 변환** → next/image 컴포넌트로 서빙 시점 자동 변환. 업로드 파이프라인 변경 불필요

### Deferred to Implementation

- 각 페이지의 정확한 FAQ 질문/답변 텍스트 — 페이지 구현 시 작성
- 서비스 상세 페이지의 포트폴리오 예시 매핑 — 기존 포트폴리오 데이터 확인 후 결정
- 홈페이지 리뉴얼 시 기존 섹션 중 어디까지 재사용 가능한지 — 구현 시점에 판단

### Blocking Content Dependencies (구현 전 사용자 작성 필요)

- **포트폴리오 solution 필드 백필**: Phase 2 구현 전까지 기존 4개 프로젝트(NBPKOREA, Man Solution, FUNI, STUDIO)의 "치로는 어떻게 해결했나요?" 텍스트를 사용자가 직접 작성해야 함. 최소 뼈대 제안:
  - **NBPKOREA**: 문제(노후 사이트) → 해결(글로벌 브랜드 수준 반응형 리뉴얼 + SEO 세팅) → 결과(?)
  - **Man Solution**: 문제(?) → 해결(?) → 결과(?)
  - **FUNI**: 문제(?) → 해결(?) → 결과(?)
  - **STUDIO**: 문제(?) → 해결(?) → 결과(?)
  → 사용자에게 각 프로젝트별 3줄(문제/해결/결과) 작성 요청. Phase 2 착수 전 완료 필요.
- **블로그 콘텐츠 신선도**: 기존 블로그 글 3개의 마지막 발행일이 2025년 1월. 리모델링 런칭과 동시에 최소 1-2편의 신규 글(SEO/AEO 관련 추천) 발행 또는 기존 글 내용/날짜 업데이트 필요. 1년 방치된 블로그는 "관리 안 되는 사이트" 인상을 줌.
- **리뷰 데이터 확보**: `src/data/reviews.ts`에 들어갈 실제 고객 후기 수집. 기존 3개(김도현, 박서연, 이준혁) 외 추가 후기 필요. 실명+회사명+날짜+별점 포맷.

### Open Questions (신규 추가)

- **크몽/숨고 프로필**: /reviews 페이지에서 외부 검증 링크로 활용 가능한지? 프로필이 있다면 URL 필요
- **Google Business Profile**: 현재 등록 상태 확인 필요. Documentation에 "등록 및 최적화"라고 언급했지만 실제 등록 여부 미확인
- **기존 고객 크레딧 요청 시점**: 호텔 브랜드, NBP Korea 등에 사이트 크레딧(로고 사용 허가, 추천사) 요청은 런칭 전에 완료해야 /reviews, /portfolio에서 활용 가능
- **북 시리즈 라우팅 예약**: /blog/aeo-guide, /blog/seo-guide를 이번 빌드에서 빈 페이지(coming soon)로 만들지, 아니면 폴더만 생성해둘지 결정 필요

## High-Level Technical Design

> *This illustrates the intended approach and is directional guidance for review, not implementation specification. The implementing agent should treat it as context, not code to reproduce.*

### 사이트맵 아키텍처 (목표 상태)

```
src/app/(site)/
├── page.tsx                          ← 홈 리뉴얼 (10 섹션)
├── services/
│   ├── page.tsx                      ← 허브 (3카드)
│   ├── website/page.tsx              ★ 신규
│   ├── remodeling/page.tsx           ★ 신규
│   └── seo-aeo/page.tsx              ★ 신규 (최중요)
├── portfolio/
│   ├── page.tsx                      ← SSR 전환 + 필터
│   └── [slug]/page.tsx               ← 케이스 스터디 리뉴얼
├── about/page.tsx                    ← 리뉴얼
├── reviews/page.tsx                  ★ 신규
├── pricing/page.tsx                  ★ 신규
├── blog/
│   ├── page.tsx                      ← SSR 전환 + 카테고리 필터
│   ├── [slug]/page.tsx               ← 유지
│   ├── aeo-guide/                    ← 예약 (추후)
│   └── seo-guide/                    ← 예약 (추후)
├── contact/page.tsx                  ← LocalBusiness 스키마 추가
└── free-diagnosis/page.tsx           ★ 신규
```

### 공통 인프라 컴포넌트 의존 관계

```
src/lib/schema-helpers.ts             ← JSON-LD 빌더 함수 모음
src/components/seo/
├── breadcrumbs.tsx                   ← 시각적 + JSON-LD
├── faq-section.tsx                   ← 범용 FAQ + FAQPage JSON-LD
├── page-schema.tsx                   ← 페이지별 스키마 래퍼
└── internal-links.tsx                ← 관련 콘텐츠 링크 블록
src/data/
├── reviews.ts                        ← 하드코딩 리뷰 데이터
├── pricing.ts                        ← 하드코딩 요금제 데이터
├── services.ts                       ← 서비스 상세 데이터
└── site-navigation.ts                ← 브레드크럼 경로 맵
```

### 사용자 전환 플로우 (심리학 레이어)

```
[진입] ──→ 홈페이지
              │
              ├─ 히어로: 엔티티 정의 H1 + "심리학 기반 웹 설계" 권위
              ├─ 숫자 블록: 4개월/해외브랜드/4일/기업수 → 사회적 증거
              ├─ 서비스 3카드: 명확한 3-필러 → 인지 부하 감소
              ├─ Why CHIRO: 심리학+코드+속도+가격 → 차별화 앵커
              ├─ 포트폴리오 프리뷰: 문제→해결→결과 → 커밋먼트 유도
              ├─ 비교표: 치로 vs 일반 → 손실 회피 ("이것도 안 되는 곳?")
              ├─ 고객 후기: 실명+회사명+날짜 → 사회적 증거 강화
              ├─ 블로그 프리뷰: 전문성 시연 → 호혜성
              ├─ FAQ: AI가 추출 가능한 답변 → AEO
              └─ CTA: 무료 진단 + 문의 → 이중 전환 경로
                     │              │
                     ▼              ▼
              /free-diagnosis    /contact
              (낮은 허들)        (높은 허들)
```

## Implementation Units

### Phase 1: 공통 인프라 (모든 페이지의 기반)

- [ ] **Unit 1: JSON-LD 스키마 헬퍼 시스템**

  **Goal:** 전 페이지에서 재사용할 JSON-LD 빌더 함수 라이브러리 구축

  **Requirements:** R3, R4, R12

  **Dependencies:** None

  **Files:**
  - Create: `src/lib/schema-helpers.ts`
  - Create: `src/data/site-navigation.ts`
  - Modify: `src/app/layout.tsx` (Organization → Organization + WebSite 통합, hreflang)

  **Approach:**
  - `generateFAQSchema(questions: {q: string, a: string}[])` → FAQPage JSON-LD
  - `generateBreadcrumbSchema(items: {name: string, url: string}[])` → BreadcrumbList JSON-LD
  - `generateServiceSchema(service: ServiceData)` → Service JSON-LD
  - `generateReviewSchema(review: ReviewData)` → Review JSON-LD
  - `generateOfferSchema(plan: PricingPlan)` → Offer JSON-LD
  - `generateArticleSchema(article: ArticleData)` → Article JSON-LD
  - `generateLocalBusinessSchema()` → LocalBusiness JSON-LD
  - `site-navigation.ts`: 브레드크럼 경로 맵 (페이지 URL → 이름 매핑)
  - 루트 layout.tsx의 ProfessionalService를 Organization + WebSite로 확장하고, hreflang 셀프 레퍼런스 추가
  - **@graph 통합 패턴**: `generatePageSchema(schemas: object[])` → 단일 `<script>` 안에 `{"@context":"https://schema.org","@graph":[...]}` 형태로 통합. 개별 스키마 빌더가 각 타입을 반환하고, 이를 @graph에 모아서 한 번에 삽입

  **Patterns to follow:**
  - 기존 `src/app/(site)/page.tsx`의 `faqJsonLd` 인라인 패턴을 함수화
  - Schema.org 공식 스펙 준수
  - @graph 내 엔티티 간 @id 참조 (예: `"provider": {"@id": "https://chiroweb.co.kr/#organization"}`)

  **Test scenarios:**
  - 각 빌더 함수가 유효한 JSON-LD 출력 생성
  - Google Rich Results Test 통과 가능한 구조
  - 빈 배열/null 입력 시 안전한 폴백

  **Verification:**
  - 빌드 성공, 타입 에러 없음
  - 최소 1개 페이지에 적용 후 구조화 데이터 검증 도구로 확인

---

- [ ] **Unit 2: Breadcrumb 컴포넌트**

  **Goal:** 전 페이지에 적용할 시각적 + JSON-LD 브레드크럼 컴포넌트

  **Requirements:** R4

  **Dependencies:** Unit 1 (schema-helpers)

  **Files:**
  - Create: `src/components/seo/breadcrumbs.tsx`

  **Approach:**
  - Props: `items: {name: string, href: string}[]`
  - 시각적: JetBrains Mono 11px, uppercase, tracking-[0.15em] — 기존 SectionLabel과 톤 일치
  - 구분자: `>` 또는 `/` (미니멀 스타일)
  - JSON-LD: `generateBreadcrumbSchema()` 호출하여 `<script type="application/ld+json">` 자동 삽입
  - 홈 > 현재 경로까지 자동 빌드 (site-navigation.ts 참조)
  - 모바일에서도 표시 (가로 스크롤 또는 축약)

  **Patterns to follow:**
  - `src/components/ui/section-label.tsx` 디자인 언어
  - 기존 디자인 시스템: `#9b9b9b` 텍스트, `#1a1a1a` 현재 페이지

  **Test scenarios:**
  - 1단계 경로 (홈 > 서비스)
  - 3단계 경로 (홈 > 서비스 > SEO/AEO)
  - 모바일 뷰포트에서 오버플로우 처리

  **Verification:**
  - 컴포넌트가 올바른 BreadcrumbList JSON-LD를 렌더링
  - 시각적으로 기존 디자인 시스템과 조화

---

- [ ] **Unit 3: 범용 FAQ 섹션 컴포넌트**

  **Goal:** 모든 페이지에서 재사용 가능한 FAQ 아코디언 + FAQPage JSON-LD 자동 생성

  **Requirements:** R3

  **Dependencies:** Unit 1 (schema-helpers)

  **Files:**
  - Create: `src/components/seo/faq-section.tsx`
  - Modify: `src/components/sections/faq.tsx` (기존 홈페이지용 → 범용 컴포넌트 래핑)

  **Approach:**
  - Props: `questions: {question: string, answer: string}[]`, `sectionNumber?: string`, `sectionLabel?: string`
  - 기존 홈페이지 FAQ의 아코디언 UI를 추출하여 범용화
  - 아코디언 닫혀 있어도 DOM에 답변 텍스트 존재 (CSS `hidden`이 아닌 높이 0)
  - JSON-LD는 페이지 `<head>`가 아닌 섹션 내 `<script>` 태그로 삽입 (현재 패턴 유지)
  - 기존 `src/components/sections/faq.tsx`는 홈페이지 전용 질문 데이터를 가진 래퍼로 유지

  **Patterns to follow:**
  - 기존 `src/components/sections/faq.tsx` 아코디언 UI
  - `src/app/(site)/page.tsx`의 faqJsonLd 패턴

  **Test scenarios:**
  - 3개 질문, 5개 질문, 10개 질문 렌더링
  - 아코디언 토글 시 DOM에서 텍스트 항상 접근 가능
  - 빈 질문 배열 시 섹션 미렌더링

  **Verification:**
  - FAQPage JSON-LD 유효성 (Google Structured Data Testing Tool)
  - DOM에서 답변 텍스트 항상 존재 확인

---

- [ ] **Unit 4: 내부 링크 블록 컴포넌트**

  **Goal:** 관련 콘텐츠 링크를 페이지 하단에 자동 표시하여 R5 충족

  **Requirements:** R5

  **Dependencies:** None

  **Files:**
  - Create: `src/components/seo/internal-links.tsx`

  **Approach:**
  - 두 가지 모드:
    1. **수동 모드**: `links: {title: string, href: string, description: string}[]` props로 직접 지정
    2. **자동 모드**: `type: 'portfolio' | 'blog'` + `currentSlug` + `category`로 관련 콘텐츠 3개 자동 쿼리
  - 디자인: 가로 3-카드 그리드, 미니멀 스타일 (제목 + 한 줄 설명 + 화살표)
  - 정적 페이지 (서비스, 소개 등)는 수동 모드로 관련 페이지 직접 지정
  - 동적 페이지 (포트폴리오, 블로그)는 자동 모드로 같은 카테고리 내 관련 항목

  **Patterns to follow:**
  - `src/components/ui/button.tsx`의 화살표 스타일 (→)
  - 기존 그리드 패턴 (`grid-cols-1 md:grid-cols-3`)

  **Test scenarios:**
  - 수동 모드: 3개 링크 정상 렌더링
  - 자동 모드: 같은 카테고리 포트폴리오 3개 표시
  - 관련 콘텐츠 3개 미만일 때 있는 만큼만 표시

  **Verification:**
  - 모든 페이지에서 최소 3개 내부 링크 존재 확인

---

- [ ] **Unit 5: 데이터 파일 생성 (리뷰, 요금제, 서비스)**

  **Goal:** 하드코딩 데이터를 별도 파일로 분리하여 관리 편의성 확보

  **Requirements:** R9, R10

  **Dependencies:** None

  **Files:**
  - Create: `src/data/reviews.ts`
  - Create: `src/data/pricing.ts`
  - Create: `src/data/services.ts`

  **Approach:**
  - `reviews.ts`: 리뷰 배열 (name, company, projectType, date, rating 1-5, quote, portfolioSlug?). 기존 `testimonials.tsx`의 3개 후기를 이관 + 확장 가능 구조
  - `pricing.ts`: 3개 플랜 (Startup/Business/Enterprise). 기존 `services-content.tsx`의 `plans` 배열을 이관하되, 타사 비교 항목 + Offer 스키마용 필드 추가
  - `services.ts`: 3개 서비스 상세 데이터 (제작/리모델링/SEO-AEO). 각 서비스의 title, h1, description, features, process, faqs, relatedPortfolio 구조

  **Patterns to follow:**
  - 기존 `src/lib/blog-categories.ts`, `src/lib/portfolio-categories.ts` 데이터 분리 패턴

  **Test scenarios:**
  - TypeScript 타입 검증 통과
  - 기존 서비스 페이지의 데이터와 불일치 없음

  **Verification:**
  - 빌드 성공, 임포트 정상

---

- [ ] **Unit 6: DB 마이그레이션 (contact_submissions 확장)**

  **Goal:** 무료 진단 폼 데이터를 기존 contact_submissions에 저장할 수 있도록 확장

  **Requirements:** R10

  **Dependencies:** None

  **Files:**
  - Modify: `src/lib/schema.sql` (type + website_url 컬럼 추가)
  - Modify: `src/lib/types.ts` (ContactSubmission 인터페이스 확장)
  - Modify: `src/app/api/contact/route.ts` (type, website_url 필드 처리)

  **Approach:**
  - `ALTER TABLE contact_submissions ADD COLUMN type VARCHAR(50) DEFAULT 'contact';`
  - `ALTER TABLE contact_submissions ADD COLUMN website_url TEXT;`
  - 기존 문의는 모두 type='contact', 무료 진단은 type='diagnosis'
  - API 라우트에서 body.type에 따라 분기 (기본값 'contact')
  - 어드민 contacts 목록에 type 필터 추가 (간단한 UI 수정)

  **Patterns to follow:**
  - 기존 `POST /api/contact` 라우트 패턴

  **Test scenarios:**
  - 기존 contact 폼 제출이 정상 동작 (하위 호환성)
  - type='diagnosis' + website_url 제출 성공
  - website_url 없이 일반 문의 제출 시 null 허용

  **Verification:**
  - 기존 문의 기능 정상, 새 필드 저장 확인

---

- [ ] **Unit 7: 루트 레이아웃 SEO 인프라 강화**

  **Goal:** 전역 Organization + WebSite JSON-LD 확장, hreflang, llms.txt 연결

  **Requirements:** R1, R12, R13, R7

  **Dependencies:** Unit 1 (schema-helpers)

  **Files:**
  - Modify: `src/app/layout.tsx` (JSON-LD 확장, hreflang)
  - Create: `src/app/llms.txt/route.ts` (llms.txt API 라우트)
  - Modify: `src/app/robots.ts` (llms.txt 참조 추가)
  - Modify: `src/app/sitemap.ts` (신규 정적 페이지 추가)

  **Approach:**
  - Organization JSON-LD에 `founder`, `foundingDate`, `address` (상세), `contactPoint`, `sameAs` 추가
  - WebSite JSON-LD 추가 (SearchAction 포함)
  - 모든 페이지에 `<link rel="alternate" hreflang="ko" href="..." />` 셀프 레퍼런스
  - `llms.txt/route.ts`: GET 핸들러 (`export const dynamic = 'force-static'`) + `Content-Type: text/plain; charset=utf-8`. 구체적 내용 스펙:
    ```markdown
    # CHIRO Web Design Studio (치로웹디자인)

    > 심리학 기반 UI/UX 기획과 SEO/AEO 자동화를 기본 제공하는
    > 올인원 웹 에이전시. 커스텀 코딩으로 아임웹/카페24의
    > 기술적 한계를 넘어서는 웹사이트를 제작합니다.

    ## 서비스
    - [홈페이지 제작](https://chiroweb.co.kr/services/website): 반응형 기업 홈페이지, 브랜드 사이트, 랜딩페이지 제작
    - [홈페이지 리모델링](https://chiroweb.co.kr/services/remodeling): 구형 홈페이지를 현대적 반응형 사이트로 전환
    - [SEO/AEO 자동화](https://chiroweb.co.kr/services/seo-aeo): 코드 레벨 검색 최적화 및 AI 검색 노출 세팅

    ## 제작 사례
    - [NBP Korea](https://chiroweb.co.kr/portfolio/nbpkorea): B2B 제조사 글로벌 브랜드 사이트
    - (추가 포트폴리오 항목은 DB에서 동적 생성 가능)

    ## 요금
    - [요금 안내](https://chiroweb.co.kr/pricing): 99만원부터 시작하는 정찰제

    ## 인사이트
    - [블로그](https://chiroweb.co.kr/blog): 웹 디자인 & 마케팅 인사이트

    ## Optional
    - [회사 소개](https://chiroweb.co.kr/about): 심리학 전공 디렉터가 이끄는 웹 에이전시
    - [고객 후기](https://chiroweb.co.kr/reviews): 실제 고객 리뷰
    - [무료 진단](https://chiroweb.co.kr/free-diagnosis): 홈페이지 무료 SEO/AEO 진단
    - [문의](https://chiroweb.co.kr/contact): 프로젝트 상담 및 견적 문의
    ```
  - robots.ts에 AI 크롤러 룰 추가 (GPTBot, ClaudeBot, PerplexityBot 허용)
  - sitemap.ts에 신규 정적 페이지 8개 추가

  **Patterns to follow:**
  - 기존 `src/app/layout.tsx` JSON-LD 패턴
  - 기존 `src/app/robots.ts` 룰 구조
  - llms.txt 공식 스펙 (llmstxt.org)

  **Test scenarios:**
  - `/llms.txt` 접근 시 올바른 마크다운 텍스트 반환
  - robots.txt에 llms.txt 경로 포함
  - sitemap.xml에 15+ 페이지 URL 포함
  - Organization JSON-LD가 Google Structured Data Testing Tool 통과

  **Verification:**
  - 빌드 후 `/llms.txt`, `/sitemap.xml`, `/robots.txt` 정상 접근
  - 구조화 데이터 검증 통과

---

### Phase 2: 핵심 페이지 구현 (최우선)

- [ ] **Unit 8: /services/seo-aeo 페이지 (★ 최중요)**

  **Goal:** SEO/AEO 자동화 서비스 상세 페이지 — 치로의 기술적 우위를 가장 명확하게 전달하는 페이지

  **Requirements:** R1, R2, R3, R4, R5, R9, R10

  **Dependencies:** Unit 1, 2, 3, 4, 5

  **Files:**
  - Create: `src/app/(site)/services/seo-aeo/page.tsx`
  - Create: `src/app/(site)/services/seo-aeo/seo-aeo-content.tsx`

  **Approach:**
  - H1: "SEO/AEO 자동화 세팅 — 코드 레벨에서 시작되는 검색 최적화" (엔티티 정의형)
  - Direct Answer Block: H1 바로 아래 50단어 이내로 핵심 답변
  - 섹션 구성:
    1. 정의 블록: SEO/AEO가 왜 코드 레벨에서 시작되는지 (권위)
    2. 치로 기본 제공 항목 리스트: 스키마 마크업, 클린 URL, 시맨틱 HTML, 메타태그, sitemap, llms.txt 등 (구체적 수치)
    3. **기술 비교표**: 아임웹 vs 카페24 vs 치로 (HTML 테이블 — AI 추출 최적화)
    4. "치로만의 차이" 블록: 심리학 기획 + 코드 레벨 SEO 결합
    5. FAQ 최소 5개 (이 페이지가 AEO 시리즈의 관문)
    6. CTA: 무료 SEO 진단 + 문의
  - 스키마: Service + FAQPage + BreadcrumbList
  - 비교표는 `<table>` 태그로 구현 (AI 크롤러 추출 최적화)
  - 내부 링크: /free-diagnosis, /portfolio (SEO 관련 케이스), /blog (SEO 관련 글)

  **Patterns to follow:**
  - `src/app/(site)/services/services-content.tsx` 레이아웃/스타일 패턴
  - 30/70 분할 레이아웃 (sticky 왼쪽 라벨 + 스크롤 오른쪽 콘텐츠)

  **Test scenarios:**
  - H1 태그 1개만 존재
  - FAQPage JSON-LD 유효 (5개 이상 Q&A)
  - 비교표가 `<table>` 태그로 구현됨
  - 내부 링크 3개 이상

  **Verification:**
  - 페이지 접근 가능, SEO 메타데이터 정상
  - 구조화 데이터 (Service + FAQPage + BreadcrumbList) 검증 통과

---

- [ ] **Unit 9: /services/website 페이지**

  **Goal:** 홈페이지 제작 서비스 상세 페이지

  **Requirements:** R1, R2, R3, R4, R5, R10

  **Dependencies:** Unit 1, 2, 3, 4, 5

  **Files:**
  - Create: `src/app/(site)/services/website/page.tsx`
  - Create: `src/app/(site)/services/website/website-content.tsx`

  **Approach:**
  - H1: "기업 홈페이지 제작, 무엇이 포함되나요?" (질문형)
  - 섹션:
    1. 서비스 정의 (50단어 이내 Direct Answer)
    2. 포함 항목 리스트 (반응형, SEO, CMS, 실시간 빌드 등)
    3. 제작 프로세스 (기존 processSteps 재활용)
    4. 관련 포트폴리오 예시 2-3개
    5. FAQ 3개 이상
    6. CTA
  - 스키마: Service + FAQPage + BreadcrumbList
  - 기존 `services-content.tsx`의 homepage 서비스 데이터를 `src/data/services.ts`에서 가져옴

  **Patterns to follow:**
  - Unit 8과 동일한 레이아웃 패턴

  **Test scenarios:**
  - 서비스 상세 정보 + 포트폴리오 연결 렌더링
  - FAQ 3개 이상, 내부 링크 3개 이상

  **Verification:**
  - 페이지 접근 가능, 구조화 데이터 검증 통과

---

- [ ] **Unit 10: /services/remodeling 페이지**

  **Goal:** 리모델링 서비스 상세 페이지 — 손실 회피 심리 적극 활용

  **Requirements:** R1, R2, R3, R4, R5, R9, R10

  **Dependencies:** Unit 1, 2, 3, 4, 5

  **Files:**
  - Create: `src/app/(site)/services/remodeling/page.tsx`
  - Create: `src/app/(site)/services/remodeling/remodeling-content.tsx`

  **Approach:**
  - H1: "낡은 홈페이지, 매일 잃고 있는 고객을 되찾으세요" (손실 회피 프레이밍)
  - 섹션:
    1. 왜 리모델링이 필요한가 (2000년대식 사이트의 구체적 문제점 — 수치 포함)
    2. **전/후 비교**: NBP Korea 사례 (비주얼 비교 + 구체적 변화 수치)
    3. 리모델링 체크리스트: "이런 사이트라면 리모델링이 필요합니다" (체크리스트 UI)
    4. FAQ
    5. CTA: 무료 진단으로 연결 (/free-diagnosis)
  - 손실 회피 패턴: "매월 X명의 잠재 고객이 느린 사이트를 보고 떠납니다"
  - 내부 링크: /portfolio/nbpkorea, /free-diagnosis, /pricing

  **Patterns to follow:**
  - Unit 8과 동일한 레이아웃

  **Test scenarios:**
  - 전/후 비교 섹션이 시각적으로 명확
  - 체크리스트가 사용자 자가 진단 유도
  - CTA가 /free-diagnosis로 연결

  **Verification:**
  - 페이지 접근 가능, 구조화 데이터 검증 통과

---

- [ ] **Unit 11: /services 허브 페이지 전환**

  **Goal:** 현재 거대한 서비스 페이지를 3카드 허브로 전환

  **Requirements:** R1, R2, R3, R4, R10

  **Dependencies:** Unit 8, 9, 10 (서비스 상세 페이지들)

  **Files:**
  - Modify: `src/app/(site)/services/page.tsx` (metadata 업데이트)
  - Rewrite: `src/app/(site)/services/services-content.tsx` (허브 레이아웃으로 전환)

  **Approach:**
  - H1: "치로웹디자인의 서비스" (허브형)
  - 기존의 탭 + 프로세스 + 가격 구조를 제거하고 3카드 소개로 교체
  - 각 카드: 서비스 제목 + 한 줄 설명 + 핵심 포인트 3개 + "자세히 보기" 링크
  - 카드 스타일: 기존 `grid-cols-1 md:grid-cols-3` + 하버 효과
  - 하단에 FAQ 섹션 + CTA
  - 스키마: Service (3개 서비스) + FAQPage + BreadcrumbList
  - 기존 Pricing 섹션은 /pricing 페이지로 이동했으므로 제거

  **Patterns to follow:**
  - 기존 서비스 카드 스타일 (target cards 패턴)
  - Instrument의 3-필러 모델 (명확, 스캐너블)

  **Test scenarios:**
  - 3개 카드 → 각각 /services/website, /services/remodeling, /services/seo-aeo 링크
  - 기존 서비스 페이지의 프로세스/가격 정보가 사라짐 (상세 페이지로 이동)

  **Verification:**
  - 허브에서 3개 서비스 상세 페이지로 정상 네비게이션

---

- [ ] **Unit 12: 홈페이지 전면 리뉴얼**

  **Goal:** 10-섹션 홈페이지로 재구성 — 엔티티 정의 H1 + 심리학 전환 퍼널

  **Requirements:** R1, R2, R3, R4, R5, R8, R9, R12

  **Dependencies:** Unit 1, 2, 3, 4, 5, 7

  **Files:**
  - Modify: `src/app/(site)/page.tsx` (섹션 순서 변경 + 신규 섹션 추가)
  - Create: `src/components/sections/numbers.tsx` (이미 파일 존재하지만 미사용 → 활성화 또는 재작성)
  - Create: `src/components/sections/service-cards.tsx` (3카드 서비스 프리뷰)
  - Create: `src/components/sections/why-chiro.tsx` (4블록 차별화)
  - Create: `src/components/sections/blog-preview.tsx` (최신 블로그 3개)
  - Modify: `src/components/sections/hero.tsx` (엔티티 정의 H1 추가)
  - Modify: `src/components/sections/portfolio-preview.tsx` (문제→해결→결과 구조)
  - Modify: `src/components/sections/comparison.tsx` (AEO 세팅 포함 여부 행 추가)
  - Modify: `src/components/sections/testimonials.tsx` (src/data/reviews.ts 데이터 소스로 전환)

  **Approach:**
  - **새 섹션 순서:**
    1. Hero: 정의형 H1 ("심리학으로 설계하고 코드로 구현하는 웹 에이전시, 치로웹디자인") + 서브카피 "기다리지 마십시오." + CTA
    2. Numbers: 런칭 4개월 / 해외 브랜드 / 평균 4일 / 기업 계약 수 (사회적 증거)
    3. Service Cards: 3카드로 /services/website, /services/remodeling, /services/seo-aeo 링크 (인지 부하 감소)
    4. Why CHIRO: 심리학 기획 / 코드 레벨 SEO / 실시간 빌드 / 올인원 가격 (차별화)
    5. Portfolio Preview: 문제→해결→결과 구조 (커밋먼트)
    6. Comparison: 프로세스 + 기능 + AEO 세팅 포함 여부 비교 (손실 회피)
    7. Testimonials: src/data/reviews.ts에서 데이터 로드 (사회적 증거 강화)
    8. Blog Preview: 최신 블로그 3개 (호혜성)
    9. FAQ: 기존 10개 유지 + 범용 FAQ 컴포넌트 사용
    10. CTA Band: 무료 진단 + 문의 이중 CTA

  - Hero H1에 `<h1>` 태그 추가 (현재는 h1 없음)
  - Numbers 섹션: 기존 `numbers.tsx` 파일이 존재하나 미사용 상태 → 스펙에 맞게 수정/활성화
  - Blog Preview: `/api/blog` 서버 사이드 호출로 최신 3개 가져오기
  - Organization + WebSite + FAQPage 스키마 (Unit 7에서 처리한 전역 스키마 + 페이지 스키마)

  **Patterns to follow:**
  - 기존 홈페이지 섹션 구조 (각 섹션이 독립 컴포넌트)
  - `src/lib/motion.ts` 애니메이션 패턴 일관 적용

  **Test scenarios:**
  - H1 태그 정확히 1개 존재
  - 10개 섹션 순서대로 렌더링
  - 블로그 프리뷰가 최신 3개 표시 (DB 불가 시 폴백)
  - 숫자 블록 애니메이션 (카운트업)
  - 모바일/데스크톱 반응형

  **Verification:**
  - 페이지 로드 시 모든 섹션 정상 렌더링
  - 구조화 데이터 (Organization + WebSite + FAQPage) 검증 통과
  - Lighthouse Performance > 90

---

### Phase 3: 전환 퍼널 페이지

- [ ] **Unit 13: /pricing 독립 페이지**

  **Goal:** 요금제를 독립 페이지로 분리 — "홈페이지 제작 비용" 검색 시 AI 답변 소스

  **Requirements:** R1, R2, R3, R4, R5, R9, R10

  **Dependencies:** Unit 1, 2, 3, 4, 5

  **Files:**
  - Create: `src/app/(site)/pricing/page.tsx`
  - Create: `src/app/(site)/pricing/pricing-content.tsx`

  **Approach:**
  - H1: "홈페이지 제작 비용 안내 — 거품 없는 정찰제" (검색 쿼리 매칭)
  - Direct Answer Block: "치로웹디자인의 홈페이지 제작 비용은 99만원(Startup)부터 시작합니다..."
  - **앵커링 심리**: Enterprise(500만원) → Business(250만원, Recommended) → Startup(99만원) 순서
  - `src/data/pricing.ts`에서 데이터 로드
  - 타사 비교 섹션: 추가금 항목 대비 치로 기본 포함 비교표 (`<table>`)
  - FAQ: "추가 비용이 발생하나요?", "유지보수 비용은?", "어떤 플랜이 맞나요?" 등
  - 스키마: FAQPage + Offer (각 플랜별) + BreadcrumbList
  - 내부 링크: /services, /contact, /free-diagnosis

  **Patterns to follow:**
  - 기존 `services-content.tsx` 가격 카드 스타일 (대시 구분선, Business 오렌지 보더)

  **Test scenarios:**
  - Enterprise가 첫 번째로 표시 (앵커링)
  - Business에 "Recommended" 표시
  - 비교표가 `<table>` 태그
  - Offer JSON-LD 각 플랜별 유효

  **Verification:**
  - "홈페이지 제작 비용" 관련 Direct Answer Block 존재
  - 구조화 데이터 검증 통과

---

- [ ] **Unit 14: /reviews 페이지**

  **Goal:** 고객 후기 독립 페이지 — 사회적 증거의 핵심 거점

  **Requirements:** R1, R2, R3, R4, R5, R9, R10

  **Dependencies:** Unit 1, 2, 3, 4, 5

  **Files:**
  - Create: `src/app/(site)/reviews/page.tsx`
  - Create: `src/app/(site)/reviews/reviews-content.tsx`

  **Approach:**
  - H1: "치로웹디자인 고객 후기"
  - `src/data/reviews.ts`에서 데이터 로드
  - 각 리뷰: 실명 + 회사명 + 날짜 + 프로젝트 종류 + 별점(★) + 본문
  - 외부 플랫폼 링크 (크몽, 숨고 프로필 — 있으면)
  - 상단에 평균 별점 + 총 리뷰 수 요약 (aggregateRating)
  - FAQ: "후기는 실제인가요?", "프로젝트 완료 후 후기를 남길 수 있나요?" 등
  - 스키마: Review (각 후기별) + AggregateRating + FAQPage + BreadcrumbList
  - 내부 링크: /portfolio (해당 프로젝트), /contact, /pricing

  **Patterns to follow:**
  - 기존 `testimonials.tsx` 인용 스타일 확장
  - 별점: 오렌지(#FF4D00) 별 아이콘

  **Test scenarios:**
  - 각 리뷰가 Review JSON-LD 포함
  - aggregateRating 계산 정확
  - 별점 시각적 표시

  **Verification:**
  - 구조화 데이터 검증 통과 (Review + AggregateRating)

---

- [ ] **Unit 15: /free-diagnosis 랜딩 페이지**

  **Goal:** 아웃바운드 마케팅의 핵심 랜딩 — 콜드 메일 수신자의 전환 페이지

  **Requirements:** R1, R2, R3, R4, R5, R9, R10

  **Dependencies:** Unit 1, 2, 3, 4, 6

  **Files:**
  - Create: `src/app/(site)/free-diagnosis/page.tsx`
  - Create: `src/app/(site)/free-diagnosis/diagnosis-content.tsx`

  **Approach:**
  - H1: "내 홈페이지 무료 진단 받기"
  - **호혜성 + 커밋먼트 패턴**: 최소 허들로 무료 가치 제공 → 진단 결과 전달 시 추가 정보 수집 → 프로젝트 전환
  - 섹션:
    1. 히어로: "당신의 홈페이지는 몇 점인가요?" + 진단 항목 아이콘 (모바일, SEO, 속도, AEO)
    2. 진단 항목 설명: 4개 진단 영역 상세 (모바일 호환성, SEO 점수, 로딩 속도, AEO 준비도)
    3. 진단 후 받게 되는 리포트 예시 (시각적 목업)
    4. **진단 신청 폼: 웹사이트 URL + 이메일 (2개 필드만!)** — 이름/회사명/연락처는 진단 결과 이메일 발송 시 자연스럽게 수집. 필드 5개면 /contact와 차이 없고 커밋먼트 패턴이 무너짐
    5. FAQ: "비용이 발생하나요?", "진단 결과는 언제 받나요?", "어떤 항목을 진단하나요?"
  - 폼 제출: `POST /api/contact` (type='diagnosis', website_url + email만 필수, name은 빈 문자열 허용)
  - 스키마: FAQPage + Service + BreadcrumbList
  - 내부 링크: /services/seo-aeo, /reviews, /pricing
  - /free-diagnosis 페이지에서는 MobileCtaBar를 숨김 (이미 전환 페이지이므로 CTA 바가 방해). `data-hide-mobile-cta` 속성으로 처리

  **Patterns to follow:**
  - 기존 `contact-content.tsx` 폼 패턴 (EmailJS 연동)
  - 히어로 스타일: 기존 서비스 페이지 상단 패턴

  **Test scenarios:**
  - URL + 이메일 2개 필드만으로 폼 제출 성공
  - 기존 contact API 하위 호환 (name 빈 문자열 허용)
  - 모바일에서 MobileCtaBar 미표시

  **Verification:**
  - 폼 → DB 저장 → 어드민 확인 플로우 정상

---

### Phase 4: 기존 페이지 리뉴얼

- [ ] **Unit 16: /about 페이지 리뉴얼**

  **Goal:** 소개 페이지에 엔티티 정의 블록 + Person 스키마 + 연혁 추가

  **Requirements:** R1, R2, R3, R4, R5, R10

  **Dependencies:** Unit 1, 2, 3, 4

  **Files:**
  - Modify: `src/app/(site)/about/page.tsx` (metadata 업데이트)
  - Modify: `src/app/(site)/about/about-content.tsx` (섹션 재구성)

  **Approach:**
  - H1: "치로웹디자인은 어떤 회사인가요?" (질문형 → AI가 답변으로 추출)
  - 섹션 순서:
    1. 엔티티 정의 블록: 회사명, 대표(최정원), 전공(심리학), 설립연도, 핵심 서비스 — 구조화된 카드
    2. 디렉터 소개: 최정원 / 심리학 전공 / 호주 유학 / 사진 (Person 스키마)
    3. 철학: 기존 "디렉터의 편지" 유지 (정의 블록 아래)
    4. 연혁/마일스톤: 런칭 → 해외 브랜드(글로벌 호텔 계열사) → 중견기업 계약 → 현재
    5. 3가지 가치: 투명함, 몰입, 정제 (기존 유지)
    6. FAQ
  - **권위 패턴**: 심리학 전공 + 해외 글로벌 호텔 브랜드 계열사 = "이 사람은 다르다"
  - 스키마: AboutPage + Person (디렉터) + FAQPage + BreadcrumbList

  **Patterns to follow:**
  - 기존 `about-content.tsx` 디자인 스타일

  **Test scenarios:**
  - 엔티티 정의 블록이 AI가 추출 가능한 구조
  - Person 스키마 유효

  **Verification:**
  - 구조화 데이터 검증 통과

---

- [ ] **Unit 17: /portfolio 허브 + /portfolio/[slug] 케이스 스터디 리뉴얼**

  **Goal:** 포트폴리오를 필터 가능 그리드 + 문제→해결→결과 케이스 스터디로 전환

  **Requirements:** R1, R2, R3, R4, R5, R8, R11

  **Dependencies:** Unit 1, 2, 3, 4

  **Files:**
  - Modify: `src/app/(site)/portfolio/page.tsx` (SSR 전환)
  - Modify: `src/app/(site)/portfolio/portfolio-content.tsx` (SSR + 필터 UI)
  - Modify: `src/app/(site)/portfolio/[slug]/page.tsx` (케이스 스터디 구조 + solution 필드)
  - Modify: `src/lib/schema.sql` (portfolio_projects에 solution 컬럼 추가)
  - Modify: `src/lib/types.ts` (PortfolioProject에 solution 추가)

  **Approach:**
  - **⚠️ 사전 조건**: Phase 2 착수 전까지 사용자가 기존 4개 프로젝트의 solution 텍스트 작성 완료 필요 (Open Questions > Blocking Content Dependencies 참조)
  - **SSR 전환 2단계**: (1) 먼저 SSR로 데이터 패칭만 전환 (기존 레이아웃 유지), (2) 그 다음 카테고리 필터 UI 추가. 두 변경을 결합하지 않음
  - **허브 (/portfolio):**
    - H1: "치로웹디자인 제작 사례"
    - 서버 컴포넌트에서 `sql` 직접 호출 → 데이터를 props로 클라이언트 컴포넌트(Framer Motion + 필터)에 전달. **반드시 try/catch + 폴백 데이터 유지**
    - 업종별 필터 UI (기존 카테고리: 온라인 풀세팅, 소개홈페이지, 기업홈페이지, 쇼핑몰, saas)
    - `<img>` → `next/image`로 교체 (WebP 자동 변환)
    - 스키마: CollectionPage + BreadcrumbList
  
  - **케이스 스터디 (/portfolio/[slug]):**
    - 통일 구조:
      - 클라이언트 개요 (업종, 규모)
      - H2: "어떤 문제가 있었나요?" (problem)
      - H2: "치로는 어떻게 해결했나요?" (solution — 신규)
      - H2: "어떤 변화가 있었나요?" (result)
      - 사용 기술 태그
      - FAQ 2-3개
    - DB에 `solution` TEXT 컬럼 추가
    - 스키마: Article + FAQPage + BreadcrumbList

  **Patterns to follow:**
  - Huge Inc의 케이스 스터디 구조 (문제→해결→결과→수치)
  - 기존 `portfolio/[slug]/page.tsx` 서버 컴포넌트 패턴

  **Test scenarios:**
  - 필터 선택 시 URL searchParams 변경 + 목록 갱신
  - solution 필드가 null인 기존 프로젝트도 정상 렌더링 (조건부 표시)
  - next/image로 이미지 최적화

  **Verification:**
  - SSR로 전환된 페이지가 크롤러에 콘텐츠 노출
  - CollectionPage / Article 스키마 검증 통과

---

- [ ] **Unit 18: /contact 페이지 강화**

  **Goal:** LocalBusiness 스키마 추가 + 메타데이터에서 "무료 진단" 제거

  **Requirements:** R1, R2, R3, R4, R12

  **Dependencies:** Unit 1, 2, 3

  **Files:**
  - Modify: `src/app/(site)/contact/page.tsx` (metadata 업데이트, 스키마 추가)
  - Modify: `src/app/(site)/contact/contact-content.tsx` (Breadcrumb 추가, FAQ 추가)

  **Approach:**
  - H1: "프로젝트 문의" (유지)
  - 메타 디스크립션에서 "무료 진단" 문구 제거 (/free-diagnosis와 중복 방지)
  - LocalBusiness JSON-LD: 연락처 (이메일, 전화, 카카오톡), 주소, 영업시간
  - FAQ 추가: "상담은 어떻게 진행되나요?", "응답까지 얼마나 걸리나요?"
  - Breadcrumb: 홈 > 문의
  - 내부 링크: /pricing, /free-diagnosis, /services

  **Patterns to follow:**
  - 기존 `contact-content.tsx` 폼 유지

  **Test scenarios:**
  - LocalBusiness JSON-LD 유효
  - "무료 진단" 메타 텍스트 미포함

  **Verification:**
  - 구조화 데이터 검증 통과

---

- [ ] **Unit 19: /blog 허브 리뉴얼**

  **Goal:** 블로그를 SSR + 카테고리 필터로 전환

  **Requirements:** R1, R2, R3, R4, R5, R8

  **Dependencies:** Unit 1, 2, 3, 4

  **Files:**
  - Modify: `src/app/(site)/blog/page.tsx` (SSR 전환)
  - Modify: `src/app/(site)/blog/blog-content.tsx` (SSR + 카테고리 필터 + 발행일 표시)

  **Approach:**
  - H1: "웹 디자인 & 마케팅 인사이트"
  - 클라이언트 사이드 fetch → 서버 컴포넌트 + searchParams 기반 카테고리 필터
  - 카테고리 필터: 전체 / 홈페이지 관리법 / 마케팅 / 웹사이트 제작 / 개인이야기
  - 각 글에 발행일 표시 (기존에는 발행일 미표시)
  - 피처드 포스트 (첫 번째 게시물 대형 카드) 유지
  - 스키마: Blog + BreadcrumbList + FAQPage
  - 내부 링크: /services, /contact, /about

  **Patterns to follow:**
  - 기존 `blog-content.tsx` 카드 스타일

  **Test scenarios:**
  - 카테고리 필터 동작
  - SSR로 콘텐츠 크롤러 노출
  - 발행일 표시

  **Verification:**
  - 서버 사이드 렌더링 확인

---

### Phase 5: 마무리 & 최적화

- [ ] **Unit 20: next/image 전면 도입 + 이미지 최적화**

  **Goal:** 모든 `<img>` 태그를 `next/image`로 교체하여 Core Web Vitals 충족

  **Requirements:** R8

  **Dependencies:** Phase 2-4 완료

  **Files:**
  - Modify: 포트폴리오, 블로그, 서비스 페이지 내 모든 `<img>` 태그
  - Modify: `next.config.ts` (remotePatterns 설정 — Vercel Blob 도메인)

  **Approach:**
  - `<img src="..." />` → `<Image src="..." width={} height={} alt="..." />` 일괄 교체
  - Vercel Blob 도메인을 `next.config.ts` remotePatterns에 추가
  - lazy loading은 next/image 기본 동작
  - LCP 요소(히어로 이미지)는 `priority` prop 추가
  - 포트폴리오 썸네일: `sizes="(max-width: 768px) 100vw, 33vw"` 반응형

  **Patterns to follow:**
  - Next.js Image Optimization 공식 문서

  **Test scenarios:**
  - WebP 포맷으로 서빙 확인 (브라우저 DevTools)
  - LCP < 2.5초
  - 이미지 lazy loading 동작

  **Verification:**
  - Lighthouse Performance > 90
  - Core Web Vitals 통과

---

- [ ] **Unit 21: 전 페이지 SEO 메타데이터 + Breadcrumb 통합 적용**

  **Goal:** 모든 15+ 페이지에 R1-R5 요구사항 최종 적용 및 검증

  **Requirements:** R1, R2, R3, R4, R5, R6, R13

  **Dependencies:** Phase 1-4 완료

  **Files:**
  - 모든 `page.tsx` 파일 검토 및 업데이트
  - `src/app/sitemap.ts` 최종 업데이트

  **Approach:**
  - 체크리스트 기반 검증:
    - [ ] 각 페이지 고유 메타 타이틀 (60자 이내)
    - [ ] 각 페이지 고유 메타 디스크립션 (160자 이내)
    - [ ] 각 페이지 OG 태그 (title, description, image)
    - [ ] 각 페이지 canonical URL
    - [ ] 각 페이지 H1 태그 1개 (엔티티 정의형)
    - [ ] 각 페이지 FAQ 섹션 + FAQPage JSON-LD (최소 3개)
    - [ ] 각 페이지 Breadcrumb + BreadcrumbList JSON-LD
    - [ ] 각 페이지 내부 링크 최소 3개
    - [ ] 각 페이지 hreflang="ko" 셀프 레퍼런스
  - sitemap.ts에 누락된 페이지 없는지 최종 확인
  - 동적 OG 이미지 생성 확장 (각 서비스 페이지별 고유 OG 이미지 — `opengraph-image.tsx` 수정)

  **Test scenarios:**
  - 모든 페이지의 SEO 체크리스트 통과
  - sitemap.xml에 모든 페이지 포함
  - Google Rich Results Test 전 페이지 통과

  **Verification:**
  - SEO 감사 도구로 전 페이지 일괄 검증

---

- [ ] **Unit 22: 네비게이션/헤더 업데이트**

  **Goal:** 15+ 페이지를 반영한 헤더 네비게이션 재구성

  **Requirements:** R10

  **Dependencies:** Phase 2-4 완료

  **Files:**
  - Modify: `src/components/layout/header.tsx`
  - Modify: `src/components/layout/footer.tsx`

  **Approach:**
  - 헤더 메뉴 구조:
    - 서비스 (데스크톱: hover 드롭다운으로 홈페이지 제작 / 리모델링 / SEO·AEO 표시)
    - 포트폴리오
    - 후기
    - 요금제
    - 소개
    - 블로그
    - 문의 (CTA 버튼)
  - **데스크톱 드롭다운**: `group-hover` + absolute 패널. 별도 state 관리하지 않음 (기존 scrolled, menuOpen과 충돌 방지)
  - **모바일 메뉴 주의**: 현재 5개 항목 → 9개로 증가. `text-4xl`(36px) + `gap-8`(32px) × 9 = 612px → iPhone SE(603px 가용) 초과. 서비스 하위 3개는 들여쓰기 + 작은 폰트(`text-2xl`)로 시각적 계층 구분. 또는 2열 레이아웃 고려
  - **Active state 수정**: `pathname === item.href` → `pathname.startsWith(item.href)` 로 변경. /services/seo-aeo에서도 "서비스" 메뉴가 활성 표시되도록
  - 푸터: 전체 사이트맵 링크 + 무료 진단 CTA 추가

  **Patterns to follow:**
  - 기존 `header.tsx` 네비게이션 패턴
  - 드롭다운은 CSS group-hover 방식 (JS state 최소화)

  **Test scenarios:**
  - 모든 메뉴 항목이 올바른 페이지로 링크
  - 모바일 메뉴 9개 항목이 뷰포트에 안착 (iPhone SE 기준)
  - /services/website에서 "서비스" 메뉴 활성 표시
  - 서비스 드롭다운 hover → 3개 서브링크 표시

  **Verification:**
  - 네비게이션 전 항목 클릭 테스트
  - 모바일 뷰포트 오버플로우 없음

---

- [ ] **Unit 23: 희소성 위젯 (ScarcityBar)**

  **Goal:** "이번 달 수용 가능 프로젝트: N건" 상시 표시 배너로 긴급성 심리 유발

  **Requirements:** R9

  **Dependencies:** Unit 6 (site_settings 활용)

  **Files:**
  - Create: `src/components/ui/scarcity-bar.tsx`
  - Modify: `src/app/(site)/layout.tsx` (ScarcityBar 삽입)

  **Approach:**
  - `site_settings` 테이블에 `available_project_count` 키 추가 (값: "2" 등)
  - 기존 어드민 `/chiro/settings` 페이지에서 수정 가능 (기존 key-value 구조 그대로 활용)
  - 값이 0이거나 키가 없으면 바 숨김
  - **해제 불가** (Notice 시스템과 다름 — 희소성 신호는 지속되어야 함)
  - 디자인: Header 바로 아래 또는 내부에 thin strip. JetBrains Mono 11px, `bg-[#1a1a1a]` 배경, 흰색 텍스트, 오렌지 숫자
  - 논웹스의 "주간 3건 예약" 위젯에서 영감. 차이점: 치로는 월간 기준 + 실제 수치 기반

  **Patterns to follow:**
  - `src/components/ui/site-banner.tsx`의 layout offset 패턴 (`--banner-height` CSS 변수)
  - JetBrains Mono 라벨 스타일

  **Test scenarios:**
  - available_project_count = 2 → "이번 달 수용 가능: 2건" 표시
  - available_project_count = 0 → 바 숨김
  - 키 미존재 → 바 숨김
  - 모바일/데스크톱 반응형

  **Verification:**
  - 어드민 settings에서 값 변경 시 즉시 반영

---

- [ ] **Unit 24: 기존 버그 수정 + EmailJS 정리**

  **Goal:** 15+ 페이지 확장 전 기존 기술 부채 해결

  **Requirements:** R8, R10

  **Dependencies:** None (Phase 1과 병렬 가능)

  **Files:**
  - Modify: `src/components/ui/sub-cta-band.tsx` (id="cta-band" 추가)
  - Modify: `src/components/ui/mobile-cta-bar.tsx` (data-hide-mobile-cta 감지 로직 추가)
  - Create: `src/lib/emailjs.ts` (EmailJS 설정 + 전송 유틸리티 추출)
  - Modify: `src/app/(site)/contact/contact-content.tsx` (EmailJS 유틸리티 사용으로 전환)
  - Modify: `src/components/sections/numbers.tsx` (스페이싱 수정: `py-[72px] md:py-[120px] px-5 md:px-8`)

  **Approach:**
  - **SubCtaBand id 수정**: `<section>` 태그에 `id="cta-band"` 추가. 현재 id가 없어서 MobileCtaBar 인터섹션 로직이 서브 페이지에서 작동 안 함 (모바일 CTA 바가 항상 표시되는 버그)
  - **MobileCtaBar 페이지별 숨김**: 루트 요소에 `data-hide-mobile-cta` 속성이 있으면 바를 표시하지 않음. /free-diagnosis 등 자체 전환 페이지에서 사용
  - **EmailJS 추출**: `contact-content.tsx`에 하드코딩된 `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`를 `src/lib/emailjs.ts`로 추출. /free-diagnosis 폼에서도 재사용. 환경 변수(`NEXT_PUBLIC_EMAILJS_*`)로 전환
  - **Numbers 컴포넌트 스페이싱**: 현재 `py-[120px] px-8`로 되어 있어 모바일 패딩 규칙(`py-[72px] md:py-[120px] px-5 md:px-8`) 미준수

  **Test scenarios:**
  - SubCtaBand 있는 페이지에서 MobileCtaBar가 CTA 섹션 도달 시 숨겨짐
  - /free-diagnosis에서 MobileCtaBar 미표시
  - 기존 contact 폼 EmailJS 전송 정상 동작
  - Numbers 섹션 모바일에서 패딩 올바름

  **Verification:**
  - 모바일 실기기 테스트로 CTA 바 동작 확인

---

- [ ] **Unit 25: 런칭 전 콘텐츠 신선도 확보**

  **Goal:** 리모델링 런칭 시 "관리되는 사이트" 인상 확보

  **Requirements:** R8, R9

  **Dependencies:** Phase 4 완료 (블로그 SSR 전환 후)

  **Files:**
  - 어드민 CMS를 통한 콘텐츠 업데이트 (코드 변경 아님)

  **Approach:**
  - **블로그**: 런칭과 동시에 최소 1-2편의 신규 글 발행. 추천 주제:
    1. "2026년 홈페이지 SEO/AEO 체크리스트" — /services/seo-aeo로의 자연스러운 내부 링크 + AEO 쿼리 캡처
    2. "우리 홈페이지를 리모델링한 이야기" — 치로 자체 리뉴얼 케이스 스터디 (메타 콘텐츠)
  - 또는 기존 3편의 발행일/내용 업데이트 (최소한 발행일이 2026년이 되도록)
  - **포트폴리오**: solution 필드 백필 완료 확인
  - **리뷰**: src/data/reviews.ts에 최소 5개 리뷰 데이터 확보

  **Verification:**
  - /blog에 2026년 날짜의 글이 최소 1개 이상 표시
  - /portfolio/[slug]에서 "치로는 어떻게 해결했나요?" 섹션이 빈 칸 없이 표시

---

## System-Wide Impact

- **Interaction graph:** 서비스 허브(3카드) → 서비스 상세(3페이지) → 포트폴리오 케이스 → 전환 페이지(pricing/reviews/free-diagnosis) → contact. 모든 페이지가 이 플로우를 지원하는 내부 링크 필요.
- **Error propagation:** DB 장애 시 포트폴리오/블로그의 SSR 전환이 빈 페이지를 만들 수 있음 → **모든 서버 컴포넌트에 try/catch + 폴백 데이터 패턴 반드시 유지** (기존 패턴: `portfolio-content.tsx` lines 22-27, `blog-content.tsx` lines 20-45)
- **State lifecycle risks:** contact_submissions 테이블 확장 시 기존 데이터에 type=null 발생 → DEFAULT 'contact' 설정 필수. 또한 기존 `company` 컬럼이 `projectType` 저장에 오용 중 (`/api/contact/route.ts` line 26 주석 참조) → /free-diagnosis 추가 시 이 기술 부채가 확대되므로 Unit 6에서 정리
- **API surface parity:** `/api/contact` 엔드포인트가 type/website_url을 처리하면서도 기존 폼과 하위 호환 유지 필요. /free-diagnosis 폼은 name 필드 빈 문자열 허용
- **MobileCtaBar 일관성:** SubCtaBand에 `id="cta-band"` 없는 기존 버그가 15+ 페이지에서 증폭됨 → Unit 24에서 수정. /free-diagnosis 같은 자체 전환 페이지에서는 `data-hide-mobile-cta`로 숨김
- **Header active state:** `pathname === item.href` 비교가 nested routes(/services/*)에서 작동 안 함 → `pathname.startsWith()` 전환 필수 (Unit 22)
- **Mobile menu overflow:** 메뉴 항목 5→9개 증가 시 iPhone SE(667px)에서 뷰포트 초과 가능. 측정 후 폰트 크기/레이아웃 조정 필요
- **JSON-LD 관리:** 페이지당 여러 `<script>` 대신 @graph 패턴으로 통합. 엔티티 간 @id 참조로 Organization ↔ Service ↔ Person 관계 명시
- **Integration coverage:** 전 페이지 JSON-LD 유효성 → 빌드 후 일괄 검증 스크립트 필요

## Risks & Dependencies

| Risk | Impact | Mitigation |
|------|--------|-----------|
| 서비스 페이지 분리 시 기존 SEO 순위 영향 | Medium | 301 리다이렉트 불필요 (기존 /services URL 유지, 하위 URL 추가) |
| 포트폴리오 SSR 전환 시 기존 폴백 누락 | **High** | 모든 서버 컴포넌트에 try/catch + 폴백 데이터 패턴 유지. SSR 전환과 필터 UI 추가를 분리하여 변경 결합 방지 |
| contact_submissions 마이그레이션 | Low | ALTER TABLE은 비파괴적, DEFAULT 값으로 기존 데이터 안전. company 컬럼 오용 문제 동시 정리 |
| 15+ 페이지의 JSON-LD 관리 복잡도 | Medium | schema-helpers.ts 중앙 관리 + @graph 패턴 + 타입 안전성 |
| 홈페이지 리뉴얼 시 기존 전환율 하락 | Medium | A/B 테스트 또는 점진적 롤아웃 고려 |
| 이미지 최적화 시 Vercel Blob 도메인 설정 누락 | Low | next.config.ts remotePatterns 사전 설정 |
| **콘텐츠 의존성으로 구현 지연** | **High** | solution 백필, 리뷰 데이터, 블로그 신규 글 — 모두 사용자 작성 필요. Phase 2 착수 전 Blocking Content Dependencies 완료 확인 |
| **모바일 메뉴 뷰포트 초과** | Medium | 9개 메뉴 항목 시 iPhone SE에서 612px 필요 (603px 가용). 구현 전 실기기 측정 후 폰트/레이아웃 조정 |
| **EmailJS 크레덴셜 중복** | Low | /free-diagnosis 폼 추가 전에 Unit 24에서 EmailJS 설정을 공유 유틸리티로 추출. 미처리 시 2곳에 하드코딩된 API 키 발생 |

## Documentation / Operational Notes

- Google Search Console에서 신규 페이지 색인 요청 (15+ URL 수동 제출)
- Google Business Profile에 새 서비스 페이지 URL 업데이트
- llms.txt 생성 후 주요 AI 크롤러(GPTBot, ClaudeBot, PerplexityBot)의 접근 확인
- 배포 후 Lighthouse 전 페이지 일괄 검사 (LCP < 2.5초 확인)
- robots.txt에 AI 크롤러 허용 규칙 추가 확인

## Sources & References

- **경쟁사 분석:** 옐로펜슬(yellopencil.com), 논웹스(nonwebs.co.kr), 프레스캣(presscat.co.kr)
- **글로벌 영감:** BASIC/DEPT(basicagency.com), Instrument(instrument.com), Huge Inc(hugeinc.com)
- **AEO 2026:** CXL AEO Guide, GenOptima, Frase.io, AirOps
- **llms.txt:** llmstxt.org 공식 스펙, Rankability 가이드, Next.js 구현 가이드
- **FAQPage 스키마:** Google Developers, TechMarg 2026 가이드, Frase.io AI Search
- **심리학 전환:** CXL Cognitive Biases, Growth.Design 106 Biases, WiserNotify CTA Statistics
- Related code: `src/app/(site)/services/services-content.tsx`, `src/app/(site)/page.tsx`, `src/lib/schema.sql`
