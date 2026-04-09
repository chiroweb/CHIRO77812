---
title: "feat: CHIRO 전체 세부 페이지 제작"
type: feat
status: active
date: 2026-04-09
---

# CHIRO 전체 세부 페이지 제작

## Overview

메인 페이지 완성 후, 12개 세부 페이지를 Toyokoh 레퍼런스 톤앤매너로 제작한다. 기존 구현된 서브페이지(services/website, services/remodeling, services/seo-aeo, blog, blog/[slug], portfolio/[slug], reviews, free-diagnosis, contact)는 새 디자인 시스템에 맞춰 리빌드하고, 플레이스홀더 상태인 허브 페이지(/services, /portfolio, /pricing, /about)는 신규 제작한다.

## Problem Frame

현재 메인 페이지는 Toyokoh 기반의 고급 디자인(모션, 다크/라이트 교차, 패럴렉스)으로 완성되었지만, 세부 페이지들은 이전 디자인 시스템의 30/70 split 레이아웃이거나 "준비 중" 플레이스홀더다. 메인 페이지와 세부 페이지 간 톤앤매너 불일치를 해결해야 한다.

## Requirements Trace

- R1. 모든 세부 페이지가 DESIGN_GUIDE.md v2 톤앤매너를 따른다
- R2. Toyokoh 레퍼런스 세부 페이지 패턴 반영 (거대 히어로, 다크/라이트 교차, 넘버드 섹션)
- R3. 각 페이지에 FAQPage JSON-LD 스키마 포함 (max-height 아코디언)
- R4. 각 페이지에 Breadcrumbs + 관련 JSON-LD 포함
- R5. 각 페이지 끝에 Contact CTA 포함
- R6. 모든 페이지를 sitemap.ts와 site-navigation.ts에 등록
- R7. DB 연동 페이지(portfolio, blog)는 서버 컴포넌트에서 fetch + fallback
- R8. 안티패턴 금지 (카드 그리드 반복, 지그재그, 동일 fade-in 등)
- R9. 각 섹션마다 다른 레이아웃/모션 (DESIGN_GUIDE 원칙)
- R10. 반응형 (Desktop 1280+, Tablet 768-1279, Mobile ~767)

## Scope Boundaries

- 관리자(admin) 페이지는 건드리지 않는다
- 메인 페이지 기존 섹션은 수정하지 않는다
- 실사 이미지/비디오 에셋은 사용자가 별도 제공 (S3 업로드 필요 시 진행)
- 블로그 본문 에디터(TipTap) 기능은 변경하지 않는다

## Context & Research

### 기존 구현 현황

| 페이지 | 상태 | 데이터 소스 |
|--------|------|------------|
| /services | 플레이스홀더 | - |
| /services/website | 구현됨 (이전 디자인) | data/services.ts |
| /services/remodeling | 구현됨 (이전 디자인) | data/services.ts |
| /services/seo-aeo | 구현됨 (이전 디자인) | data/services.ts |
| /portfolio | 플레이스홀더 | - |
| /portfolio/[slug] | 구현됨 (이전 디자인) | DB (Neon) |
| /pricing | 플레이스홀더 | - |
| /about | 플레이스홀더 | - |
| /blog | 구현됨 (이전 디자인) | DB (Neon) |
| /blog/[slug] | 구현됨 (이전 디자인) | DB (Neon) |
| /reviews | 구현됨 (이전 디자인) | data/reviews.ts |
| /free-diagnosis | 구현됨 (이전 디자인) | API POST |
| /contact | 구현됨 (이전 디자인) | API POST |

### 기존 서브페이지 패턴 (이전 디자인)

- `page.tsx` (서버) + `xxx-content.tsx` (클라이언트) 분리 패턴
- SectionLabel 넘버링 (01, 02, 03)
- 30/70 split 레이아웃 (좌 라벨, 우 콘텐츠)
- FAQSection + InternalLinks + SubCtaBand 공통 패턴
- Breadcrumbs + JSON-LD 기본 포함

### 새 디자인 시스템 패턴 (홈페이지 기반)

- 거대 Display 텍스트 히어로 + ( Label ) 캡션
- 다크/라이트 섹션 교차 (dark: `#1a1a1a`, light: `#f5f5f0`)
- Framer Motion whileInView 애니메이션
- `( Label )` 형식 캡션 — JetBrains Mono, 11-13px, uppercase
- 글자별 Piano reveal (타이틀)
- 넘버드 리스트 (큰 01/02/03 + 제목 + 구분선)
- 패럴렉스 플로팅 이미지
- AnimatePresence 전환
- 2컬럼 FAQ 아코디언

### 재사용 가능 컴포넌트 (신규 제작)

| 컴포넌트 | 용도 | 위치 |
|----------|------|------|
| SubpageHero | 세부 페이지 히어로 (거대 텍스트 + 라벨 + 이미지) | components/sections/subpage-hero.tsx |
| NumberedSection | 다크 넘버드 리스트 (01/02/03 + 제목 + 설명) | components/sections/numbered-section.tsx |
| ComparisonTable | 비교표 (아임웹/카페24/치로) | components/sections/comparison-table.tsx |
| ProcessTimeline | 제작 프로세스 스텝 | components/sections/process-timeline.tsx |
| PortfolioGrid | 필터링 가능한 프로젝트 그리드 | components/sections/portfolio-grid.tsx |
| ReviewGrid | 별점 + 필터 리뷰 그리드 | components/sections/review-grid.tsx |
| ContactCtaSection | 다크 CTA (메인 CTA와 동일 톤) | components/sections/contact-cta-section.tsx |
| FaqTwoColumn | 2컬럼 FAQ 아코디언 (홈페이지 faq-home 확장) | components/sections/faq-two-column.tsx |
| StatsRow | 수치 블록 (2주, 43%, 4개월) | components/sections/stats-row.tsx |
| SubNav | 하단 고정 섹션 앵커 네비 (Toyokoh ABOUT US MENU) | components/ui/sub-nav.tsx |

### Institutional Learnings

- **전체 구현 필수**: 스코프를 줄이지 말 것. 모든 섹션을 포괄적으로 구현 (feedback_full_redesign_execution)
- **품질 바**: 일반적인 카드/그리드 금지. 각 섹션이 고유하고 대담한 레이아웃 필요 (feedback_redesign_quality)
- **GSAP 핀 래퍼**: GSAP ScrollTrigger pin은 별도 wrapper div 필수
- **GSAP/Framer 분리**: 같은 요소에 둘 다 적용 금지
- **GSAP 클린업**: 페이지 언마운트 시 ScrollTrigger 정리 필수

## Key Technical Decisions

- **기존 서브페이지 리빌드 방식**: 기존 `xxx-content.tsx` 파일을 새 디자인으로 완전 교체. 기존 page.tsx의 metadata는 유지/확장
- **컴포넌트 재사용**: SubpageHero, FaqTwoColumn, ContactCtaSection 등 공통 컴포넌트를 먼저 제작하여 모든 페이지에서 재사용
- **데이터**: 정적 데이터는 `data/` 디렉토리 파일, DB 데이터는 서버 컴포넌트에서 직접 쿼리
- **모션 레벨**: 세부 페이지는 홈페이지보다 모션 절제. Framer Motion whileInView 위주, GSAP는 특수 섹션에만
- **다크 섹션**: `data-theme="dark"` 속성으로 네비 색상 자동 전환

## Implementation Units

### Phase 1: 공통 컴포넌트 (재사용 빌딩 블록)

- [ ] **Unit 1: SubpageHero 컴포넌트**

**Goal:** 모든 세부 페이지에서 사용하는 히어로 컴포넌트. Toyokoh About 히어로 패턴.

**Requirements:** R1, R2

**Files:**
- Create: `src/components/sections/subpage-hero.tsx`

**Approach:**
- Props: `title` (거대 Display), `label` (( Label ) 캡션), `description?`, `image?`, `dark?`
- 라이트: 흰 배경 + 검정 텍스트 + 하단 와이드 이미지
- 다크: 다크 배경 + 흰 텍스트 + 이미지 오버레이
- Framer Motion fadeInUp 애니메이션

**Patterns to follow:**
- 홈페이지 AllInOne 섹션 타이포 스타일
- Toyokoh About US 히어로 레이아웃

---

- [ ] **Unit 2: FaqTwoColumn + ContactCtaSection + StatsRow**

**Goal:** 모든 페이지 하단에 공통으로 들어가는 3개 컴포넌트

**Requirements:** R3, R5

**Files:**
- Create: `src/components/sections/faq-two-column.tsx`
- Create: `src/components/sections/contact-cta-section.tsx`
- Create: `src/components/sections/stats-row.tsx`

**Approach:**
- FaqTwoColumn: faq-home.tsx 패턴 확장. Props로 FAQ 데이터 + 스키마 이름 받음
- ContactCtaSection: 다크 배경 CTA. 이중 진입점 (무료 진단 + 프로젝트 상담). `id="cta-band"` 포함
- StatsRow: 3-4개 수치를 가로로 나열. 다크/라이트 모드 지원

---

- [ ] **Unit 3: NumberedSection + ProcessTimeline + ComparisonTable**

**Goal:** 콘텐츠 표현용 공통 컴포넌트 3개

**Requirements:** R2, R8, R9

**Files:**
- Create: `src/components/sections/numbered-section.tsx`
- Create: `src/components/sections/process-timeline.tsx`
- Create: `src/components/sections/comparison-table.tsx`

**Approach:**
- NumberedSection: Toyokoh "BASIC MANAGEMENT POLICY" 패턴. 다크 배경, 큰 넘버 + 제목 + 설명. 구분선으로 분리
- ProcessTimeline: 세로 타임라인. 좌측 넘버/라벨, 우측 설명
- ComparisonTable: 아임웹/카페24/치로 비교. 체크마크/X 표시. 스크롤 가능

---

- [ ] **Unit 4: SubNav + PortfolioGrid + ReviewGrid**

**Goal:** 네비게이션 보조 + 필터링 그리드 컴포넌트

**Requirements:** R2, R7

**Files:**
- Create: `src/components/ui/sub-nav.tsx`
- Create: `src/components/sections/portfolio-grid.tsx`
- Create: `src/components/sections/review-grid.tsx`

**Approach:**
- SubNav: 하단 고정 rounded-full 필. 앵커 링크 배열 Props. Toyokoh "ABOUT US MENU" 패턴
- PortfolioGrid: DB 데이터 기반. 업종별 필터 탭 + 카드 그리드. 카드는 이미지 + 이름 + 카테고리
- ReviewGrid: data/reviews.ts 기반. 유형별 필터 + 별점 카드

---

### Phase 2: 허브 페이지 (신규)

- [ ] **Unit 5: /services 허브**

**Goal:** 서비스 3개를 소개하는 허브 페이지

**Requirements:** R1, R2, R3, R5, R6

**Files:**
- Modify: `src/app/(site)/services/page.tsx`
- Create: `src/app/(site)/services/services-hub-content.tsx`
- Modify: `src/data/site-navigation.ts`
- Modify: `src/app/sitemap.ts`

**Approach:**
- SubpageHero("SERVICES", "( Our Services )")
- 3개 서비스 카드 (website, remodeling, seo-aeo) — 각각 다른 레이아웃, 링크 포함
- 공통 포함 항목 (NumberedSection)
- ProcessTimeline (제작 프로세스)
- 대표 포트폴리오 3개 (DB 연동 — 서버 컴포넌트에서 fetch하여 props 전달)
- FaqTwoColumn + ContactCtaSection

---

- [ ] **Unit 6: /portfolio 허브**

**Goal:** 포트폴리오 전체 목록 페이지

**Requirements:** R1, R2, R5, R6, R7

**Files:**
- Modify: `src/app/(site)/portfolio/page.tsx`
- Create: `src/app/(site)/portfolio/portfolio-hub-content.tsx`

**Approach:**
- SubpageHero("PORTFOLIO", "( Our Work )")
- 요약 수치 (StatsRow: 총 프로젝트 수, 업종 수, 평균 기간)
- PortfolioGrid (DB에서 전체 프로젝트 fetch, 필터링은 클라이언트)
- ContactCtaSection

---

- [ ] **Unit 7: /pricing**

**Goal:** 요금제 안내 페이지

**Requirements:** R1, R2, R3, R5, R6

**Files:**
- Modify: `src/app/(site)/pricing/page.tsx`
- Create: `src/app/(site)/pricing/pricing-hub-content.tsx`

**Approach:**
- SubpageHero("PRICING", "( Plans )")
- Direct Answer 블록 (가격 범위 한 줄 요약)
- 3개 플랜 카드 (data/pricing.ts 활용) — 각각 다른 강조, 추천 플랜 하이라이트
- 기본 포함 항목 (NumberedSection)
- ComparisonTable (타사 비교)
- 플랜별 추천 대상 섹션
- FaqTwoColumn + ContactCtaSection
- Offer JSON-LD 스키마

---

- [ ] **Unit 8: /about**

**Goal:** 회사 소개 페이지. Toyokoh About 패턴 핵심 적용.

**Requirements:** R1, R2, R3, R5, R6

**Files:**
- Modify: `src/app/(site)/about/page.tsx`
- Create: `src/app/(site)/about/about-hub-content.tsx`

**Approach:**
- SubpageHero("ABOUT", "( About CHIRO )") + 와이드 이미지
- SubNav 하단 고정 (미션/디렉터/가치/연혁/회사정보)
- ( MISSION ) 섹션: 거대 Display 텍스트 + 우측 이미지 + 본문
- ( DIRECTOR ) 섹션: CEO 메시지 패턴. 다크-라이트 분할 + 인물 사진
- ( VALUES ) 섹션: NumberedSection 3개 핵심 가치
- ( HISTORY ) 섹션: 세로 타임라인 (라이트 배경)
- ( COMPANY ) 섹션: 다크 배경 2열 key-value 테이블
- StatsRow (실적 수치)
- FaqTwoColumn + ContactCtaSection
- Person JSON-LD (디렉터), Organization JSON-LD 확장

---

### Phase 3: 서비스 서브페이지 리빌드

- [ ] **Unit 9: /services/website 리빌드**

**Goal:** 이전 30/70 디자인을 새 톤앤매너로 전면 교체

**Requirements:** R1, R2, R8, R9

**Files:**
- Modify: `src/app/(site)/services/website/page.tsx` (metadata 확장)
- Rewrite: `src/app/(site)/services/website/website-content.tsx`

**Approach:**
- SubpageHero + 서비스 정의 Direct Answer
- 제작 가능 유형 (NumberedSection 또는 그리드)
- 포함 항목 상세
- ProcessTimeline
- 관련 포트폴리오 (DB 연동)
- 고객 후기 1-2개
- FaqTwoColumn + ContactCtaSection

---

- [ ] **Unit 10: /services/remodeling 리빌드**

**Goal:** 손실 회피 프레이밍 + Before/After 포함한 리모델링 페이지

**Requirements:** R1, R2, R8, R9

**Files:**
- Modify: `src/app/(site)/services/remodeling/page.tsx`
- Rewrite: `src/app/(site)/services/remodeling/remodeling-content.tsx`

**Approach:**
- SubpageHero (손실 회피 메시지)
- 리모델링 필요 이유 (다크 섹션)
- 자가 진단 체크리스트 (인터랙티브)
- Before/After 비교 섹션
- ProcessTimeline
- 관련 포트폴리오
- FaqTwoColumn + 무료 진단 CTA

---

- [ ] **Unit 11: /services/seo-aeo 리빌드**

**Goal:** SEO/AEO 전문 서비스 페이지. 기술적 깊이 + 비교표

**Requirements:** R1, R2, R8, R9

**Files:**
- Modify: `src/app/(site)/services/seo-aeo/page.tsx`
- Rewrite: `src/app/(site)/services/seo-aeo/seo-aeo-content.tsx`

**Approach:**
- SubpageHero + Direct Answer
- 코드 레벨 이유 섹션 (다크)
- 기본 제공 항목 (NumberedSection)
- ComparisonTable (아임웹/카페24/치로)
- 플랫폼별 전략 (ChatGPT/Perplexity/Gemini)
- 측정 가능한 결과 수치 (StatsRow)
- 관련 포트폴리오
- FaqTwoColumn + 무료 진단 CTA

---

### Phase 4: 나머지 페이지 리빌드

- [ ] **Unit 12: /portfolio/[slug] 리빌드**

**Goal:** 개별 포트폴리오 상세 페이지 디자인 업그레이드

**Requirements:** R1, R2, R7

**Files:**
- Modify: `src/app/(site)/portfolio/[slug]/page.tsx`
- Rewrite: `src/app/(site)/portfolio/[slug]/portfolio-detail-content.tsx`

**Approach:**
- SubpageHero (프로젝트명 + 한 줄 요약)
- 프로젝트 개요 (업종/규모/기간) — 메타 카드
- 문제 → 해결 → 결과 수치 (스토리텔링 흐름)
- 사용 기술 스택 태그
- 사이트 스크린샷 (와이드 이미지)
- 고객 후기
- 다른 프로젝트 추천 (DB에서 3개)
- ContactCtaSection

---

- [ ] **Unit 13: /blog + /blog/[slug] 리빌드**

**Goal:** 블로그 허브 + 상세 페이지 디자인 업그레이드

**Requirements:** R1, R2, R7

**Files:**
- Modify: `src/app/(site)/blog/page.tsx`
- Rewrite: `src/app/(site)/blog/blog-content.tsx` (또는 신규)
- Modify: `src/app/(site)/blog/[slug]/page.tsx`

**Approach:**
- 허브: SubpageHero + 피처드 글 1개 + 카테고리 필터 + 최신 글 리스트
- 상세: 제목/카테고리/발행일/읽기시간 히어로 + 작성자 정보 + 본문 + 핵심 요약 박스 + 관련 글 3개
- BlogPosting JSON-LD 유지

---

- [ ] **Unit 14: /reviews 리빌드**

**Goal:** 리뷰 페이지 디자인 업그레이드

**Requirements:** R1, R2

**Files:**
- Modify: `src/app/(site)/reviews/page.tsx`
- Rewrite: `src/app/(site)/reviews/reviews-content.tsx`

**Approach:**
- SubpageHero + 평균 별점 요약
- ReviewGrid (유형별 필터)
- 외부 플랫폼 링크 (크몽, 숨고)
- FaqTwoColumn + ContactCtaSection

---

- [ ] **Unit 15: /free-diagnosis + /contact 리빌드**

**Goal:** 진단/문의 페이지 디자인 업그레이드

**Requirements:** R1, R2

**Files:**
- Modify: `src/app/(site)/free-diagnosis/page.tsx`
- Rewrite: `src/app/(site)/free-diagnosis/diagnosis-content.tsx`
- Modify: `src/app/(site)/contact/page.tsx`
- Rewrite: `src/app/(site)/contact/contact-content.tsx`

**Approach:**
- free-diagnosis: SubpageHero + 진단 4항목 설명 + 리포트 예시 + 신청 폼 + FAQ
- contact: SubpageHero + 문의 수단 (폼/카카오톡/이메일/전화) + 응답 시간 + 상담 방식 + 위치 정보 + FAQ
- LocalBusiness JSON-LD

---

### Phase 5: 마무리

- [ ] **Unit 16: 네비게이션 등록 + 사이트맵 + llms.txt 업데이트**

**Goal:** 모든 새 페이지를 검색엔진과 네비에 등록

**Requirements:** R6

**Files:**
- Modify: `src/data/site-navigation.ts`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/llms.txt/route.ts`
- Modify: `src/components/layout/header.tsx` (네비 링크 확인)

**Approach:**
- site-navigation.ts에 모든 신규 경로 등록 (부모-자식 관계)
- sitemap.ts staticPages 배열에 추가
- llms.txt에 주요 섹션 페이지 추가

---

## System-Wide Impact

- **네비게이션**: 모든 페이지에서 header.tsx의 필 전환 + 다크모드 감지 정상 작동 확인 필요
- **MobileCtaBar**: `id="cta-band"` 포함된 CTA가 각 페이지에 있어야 모바일 하단바 정상 동작
- **data-theme="dark"**: 다크 섹션마다 이 속성 추가하여 네비 색상 자동 전환
- **Lenis**: 모든 페이지가 site layout의 LenisProvider 안에서 렌더링되므로 스무스 스크롤 자동 적용
- **DB 쿼리**: portfolio, blog 페이지는 서버 컴포넌트에서 쿼리. try/catch + fallback 필수

## Risks & Dependencies

- **이미지 에셋**: About 디렉터 사진, 서비스 이미지 등 사용자 제공 필요. 에셋 없으면 placeholder로 진행
- **DB 데이터**: portfolio_projects 테이블에 충분한 데이터가 있어야 포트폴리오 허브가 의미 있음
- **모션 성능**: 세부 페이지에서 GSAP 과다 사용 시 모바일 성능 저하. Framer Motion 위주로 절제
- **빌드 시간**: 12개 페이지 동시 작업 시 HMR 느려질 수 있음. 페이지 단위로 커밋

## Execution Strategy

**권장 순서:**
1. Phase 1 (공통 컴포넌트) → 반드시 먼저
2. Phase 2 (허브 페이지) → /about부터 (Toyokoh 패턴 가장 많이 적용)
3. Phase 3 (서비스 서브) → 기존 데이터 활용
4. Phase 4 (나머지) → blog/portfolio는 DB 의존
5. Phase 5 (마무리) → 전체 등록

**페이지당 예상 작업:** 컴포넌트 재사용으로 각 페이지 1-2시간 수준

## Sources & References

- **Design Guide**: `DESIGN_GUIDE.md` (v2, 2026-04-08)
- **Toyokoh Reference**: toyokoh.com About/Recruit 세부 페이지 스크린샷 (사용자 제공)
- **Existing Plan**: `docs/plans/2026-04-06-001-feat-design-spec-v1-implementation-plan.md`
- **Auto Memory**: feedback_full_redesign_execution, feedback_redesign_quality, reference_design_guide
