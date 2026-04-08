---
title: "feat: CHIRO Design Specification v1.0 전면 구현"
type: feat
status: active
date: 2026-04-06
origin: /Users/choejeong-won/Downloads/CHIRO_Design_Specification_v1.0.docx
---

# feat: CHIRO Design Specification v1.0 전면 구현

## Overview

CHIRO 웹사이트를 디자인 스펙 v1.0 기준으로 전면 재구축. 현재 구현(단일 다크 톤, 1회 핀 전환, 에디토리얼 매거진 플로우)을 **Toyokoh급 3막 다크/라이트/다크 구조 + 10개 섹션 + 2개 전환 브릿지**로 교체.

## Problem Frame

현재 구현은 "팀원 E 에디토리얼 매거진 플로우" 기반이며, 스펙 v1.0과 다음이 근본적으로 다름:
- 색상 구조 (전 다크 vs 3막 전환)
- 액센트 컬러 (#FF4D00 vs #3B82F6)
- 히어로 핀 깊이 (1단계 vs 3단계)
- 포트폴리오 인터랙션 (비대칭 매거진 vs clip-path 비디오 전환)
- 라이트 섹션 부재 (ALL-IN-ONE, 서비스)
- 핵심 섹션 누락 (이미지 브릿지, 3열 갤러리, 브랜드 약속, 블로그)

## Requirements Trace

- R1. 3막 톤 구조: 다크(히어로~케이스) → 라이트(ALL-IN-ONE~서비스) → 다크(브릿지~CTA)
- R2. 히어로 3단계 핀: Phase 0(CHIRO) → Phase 1(브랜드) → Phase 2(신뢰). 3vh 스크롤
- R3. 포트폴리오 케이스: clip-path 비디오 전환 + sticky 우측 텍스트
- R4. 다크→라이트 그라디언트 전환 브릿지 (300px, mix-blend-mode)
- R5. ALL-IN-ONE: 라이트 배경, 좌측 65% 대형 타이포 + 우측 30% 이미지, 피아노 리빌
- R6. 서비스 에디토리얼: 4개 서비스 각각 다른 레이아웃
- R7. 이미지 핀 브릿지: 마진 축소 → 풀블리드 → 핀 → 다크 오버레이
- R8. 3열 카운터스크롤 갤러리 + 피아노 리빌 타이포
- R9. 브랜드 약속: 중앙 텍스트 + 수렴 이미지 패럴랙스
- R10. 블로그: Toyokoh 뉴스 스타일 수직 리스트
- R11. CTA: 히어로 비디오 복귀(blur+dim) + 텍스트 펄스
- R12. 컬러 시스템: Primary Dark #0D1117, Primary Light #F0F0EC, Accent Blue #3B82F6
- R13. 안티패턴 준수: 3칼럼 카드 금지, 동일 레이아웃 연속 금지, radius:0 원칙 등

## Scope Boundaries

- 다국어(EN/JA) 지원은 이번 구현 범위 밖 — KO 우선
- 포트폴리오 서브페이지(/portfolio/[slug])는 기존 유지, 홈 섹션만 교체
- 어드민 CMS, 블로그 작성 기능은 기존 유지
- SEO/AEO 스키마는 기존 유지, 섹션 구조만 변경
- 에셋(비디오, 이미지) 없는 항목은 placeholder 사용

## Context & Research

### Relevant Code and Patterns

- `src/components/sections/hero.tsx` — 현재 GSAP ScrollTrigger pin 패턴. 3단계로 확장 필요
- `src/app/(site)/page.tsx` — 섹션 조립 지점
- `src/app/globals.css` — @theme inline 컬러 토큰, 키프레임 애니메이션
- `src/lib/motion.ts` — Framer Motion 변형 헬퍼
- `src/app/layout.tsx` — 폰트 설정 (Pretendard, Space Grotesk, JetBrains Mono, Cormorant Garamond, Bank Gothic)
- GSAP `gsap` + `ScrollTrigger` 이미 설치됨 (gsap@3.14.2)
- Framer Motion `framer-motion@12.30.1` 이미 설치됨

### Institutional Learnings

- GSAP pin에서 React DOM 충돌 발생 경험 → pin 대상을 별도 wrapper div로 감싸야 함
- 비디오 autoplay는 muted+playsinline 필수

## Key Technical Decisions

- **GSAP vs Framer Motion 역할 분리**: 핀 고정 + scrub 기반 스크롤 애니메이션은 GSAP ScrollTrigger. 뷰포트 진입 기반 단발 애니메이션(fade-up, stagger)은 Framer Motion. 혼용하되 같은 요소에 중복 적용 금지.
- **SplitText 대안**: GSAP SplitText는 클럽 플러그인(유료). 피아노 리빌은 텍스트를 span으로 수동 분할하거나 Framer Motion stagger로 구현.
- **컬러 토큰**: globals.css @theme inline의 기존 토큰을 스펙 v1.0 팔레트로 교체. 컴포넌트에서는 토큰 참조 대신 하드코딩(스펙 색상이 섹션별로 다르므로).
- **기존 섹션 파일**: belief.tsx, proof.tsx, scope.tsx, work.tsx, process.tsx, contact-cta.tsx는 삭제하고 스펙 기반으로 새로 작성. hero.tsx는 3단계 핀으로 대폭 수정.
- **이미지 lazy load**: 갤러리 12-15개 이미지는 IntersectionObserver 기반 lazy load 필수.

## Open Questions

### Resolved During Planning

- **Monument Extended 폰트**: 유료 폰트. Space Grotesk + Bank Gothic으로 대체. ALL-IN-ONE 대형 타이포에 Bank Gothic 사용.
- **SplitText 라이선스**: 무료 대안으로 수동 span 분할 + CSS clip-path mask reveal 조합 사용.

### Deferred to Implementation

- 비디오 hue-rotate + sepia 색 전환의 정확한 타이밍 — 실제 비디오 톤 보면서 조정
- 갤러리 카운터스크롤 정확한 속도 계수 — 실제 스크롤 테스트 후 미세 조정
- 포트폴리오 clip-path 전환의 정확한 inset 값 — 실제 비디오 비율 보면서 결정

## Implementation Units

### Phase A: 기반 시스템 변경

- [ ] **Unit 1: 컬러 시스템 + 글로벌 CSS 교체**

  **Goal:** 스펙 v1.0 팔레트로 전환. 액센트 #FF4D00 → #3B82F6, 라이트 배경 #F0F0EC 추가.

  **Requirements:** R12

  **Dependencies:** None

  **Files:**
  - Modify: `src/app/globals.css`

  **Approach:**
  - @theme inline 토큰을 스펙 팔레트로 교체
  - Divider Dark/Light, Video Overlay, Caption Gray 토큰 추가
  - 기존 client-marquee, tagline-scroll 키프레임 유지 (재사용 가능)
  - 갤러리 카운터스크롤용 키프레임 추가

  **Patterns to follow:**
  - 현재 `globals.css` @theme inline 구조

  **Verification:**
  - 사이트 전체에서 #FF4D00 참조 없음
  - 새 토큰이 Tailwind에서 사용 가능

- [ ] **Unit 2: 기존 섹션 파일 정리**

  **Goal:** 현재 에디토리얼 매거진 플로우 섹션 파일 삭제. 새 구조로 교체 준비.

  **Requirements:** 전체

  **Dependencies:** None

  **Files:**
  - Delete: `src/components/sections/belief.tsx`
  - Delete: `src/components/sections/proof.tsx`
  - Delete: `src/components/sections/scope.tsx`
  - Delete: `src/components/sections/work.tsx`
  - Delete: `src/components/sections/process.tsx`
  - Delete: `src/components/sections/contact-cta.tsx`
  - Modify: `src/app/(site)/page.tsx` (Hero만 남기기)

  **Verification:**
  - page.tsx에 Hero만 import되어 있음
  - 빌드 에러 없음

### Phase B: 다크 섹션 (1막)

- [ ] **Unit 3: Hero 3단계 핀 전환**

  **Goal:** Phase 0(CHIRO 오버사이즈) → Phase 1(브랜드 스테이트먼트 마스크 리빌) → Phase 2(신뢰 충격 수치) 3단계 핀 스크롤. 총 3vh 스크롤 길이.

  **Requirements:** R2

  **Dependencies:** Unit 1

  **Files:**
  - Modify: `src/components/sections/hero.tsx`

  **Approach:**
  - GSAP ScrollTrigger pin, scrub:1, end: "+=300%"
  - Phase 0→1: CHIRO scale 1→0.3, position tween to 좌상단. 비디오 brightness 100→40%. 캡션 (00)→(01).
  - Phase 1→2: 스테이트먼트 opacity out + translateY -40px. 신뢰 문장 2줄 마스크 리빌. 우하단 수치 캡션.
  - Phase 2→해제: content scale 0.95 + blur 4px 후퇴. 다음 섹션 올라옴.
  - 비디오 Phase 2에서 hue-rotate(10deg) + sepia(0.05) 미세 전환
  - Mobile: CHIRO 50vw, 텍스트 36px

  **Patterns to follow:**
  - 현재 hero.tsx의 GSAP context + cleanup 패턴
  - pin wrapper div 패턴 (DOM 충돌 방지)

  **Test scenarios:**
  - 3단계 전환이 스크롤에 따라 순차 실행
  - 핀 해제 후 다음 섹션으로 자연스럽게 이어짐
  - 모바일에서 텍스트 크기 적절

  **Verification:**
  - 3vh 스크롤로 3단계 전환 완료
  - 핀 해제 시 blur + scale 후퇴 효과

- [ ] **Unit 4: Portfolio Case Study (clip-path 비디오 전환)**

  **Goal:** Toyokoh (Our Business) 방식. 좌측 55-60% 비디오 clip-path 전환 + 우측 35% sticky 텍스트. 2-3개 프로젝트.

  **Requirements:** R3

  **Dependencies:** Unit 1

  **Files:**
  - Create: `src/components/sections/case-study.tsx`

  **Approach:**
  - 좌측: 비디오가 스크롤에 따라 clip-path: inset(X% 0 0 0)로 위에서 잘려나감. 아래 비디오 드러남.
  - 우측: sticky position. 비디오 전환 시점에 동기하여 텍스트 fade-out → fade-in.
  - 넘버링 (01)→(02)→(03) 카운터 전환
  - GSAP ScrollTrigger scrub로 clip-path 애니메이션
  - 상단 ( Work ) 괄호 캡션
  - Mobile: 수직 스택, 비디오 풀폭 → 텍스트 아래

  **Test scenarios:**
  - 스크롤 시 비디오가 위에서 잘려나가며 다음 비디오 드러남
  - sticky 텍스트가 비디오 전환과 동기
  - 모바일에서 수직 스택

  **Verification:**
  - clip-path 비디오 전환 + sticky 텍스트 동기 작동

### Phase C: 톤 전환 + 라이트 섹션 (2막)

- [ ] **Unit 5: Dark→Light 전환 브릿지**

  **Goal:** 300px 여백 구간에서 #0D1117 → #F0F0EC 그라디언트 전환. 중간에 ( What we do ) 캡션, mix-blend-mode: difference.

  **Requirements:** R4

  **Dependencies:** Unit 4

  **Files:**
  - Create: `src/components/sections/tone-bridge.tsx`

  **Approach:**
  - CSS linear-gradient 배경을 스크롤 위치에 바인딩 (GSAP 또는 CSS scroll-driven)
  - 캡션 텍스트에 mix-blend-mode: difference 적용

  **Verification:**
  - 다크에서 라이트로 자연스러운 그라디언트 전환
  - 캡션이 양쪽 배경에서 가독성 확보

- [ ] **Unit 6: ALL-IN-ONE 섹션 (라이트)**

  **Goal:** 라이트 배경 #F0F0EC. 좌측 65% "ALL-IN-ONE" 대형 타이포 (Bank Gothic, 80-96px) + 서브텍스트. 우측 30% 이미지 패럴랙스. 피아노 리빌(단어별 순차 마스크).

  **Requirements:** R5

  **Dependencies:** Unit 1

  **Files:**
  - Create: `src/components/sections/all-in-one.tsx`

  **Approach:**
  - "ALL-IN-ONE" 텍스트를 단어/글자 단위로 span 분할
  - Framer Motion stagger로 순차 마스크 리빌 (clipPath inset)
  - 우측 이미지: Framer Motion useScroll + useTransform으로 0.9x 패럴랙스
  - 서브텍스트: "마케팅부터 자동화까지, 온라인 거점의 모든 시스템을 구축합니다."
  - Mobile: 텍스트 풀폭 48px, 이미지 하단

  **Verification:**
  - 라이트 배경 위 다크 텍스트
  - 피아노 리빌 애니메이션 작동
  - 이미지 패럴랙스

- [ ] **Unit 7: Services Editorial (4개 서비스, 각기 다른 레이아웃)**

  **Goal:** 라이트 배경. 4개 서비스 각각 다른 레이아웃. 안티패턴(동일 구조 반복) 위반 금지.

  **Requirements:** R6, R13

  **Dependencies:** Unit 1

  **Files:**
  - Create: `src/components/sections/services-editorial.tsx`

  **Approach:**
  - 서비스 1: 좌측 큰 이미지(55%) + 우측 텍스트 + (01) 넘버링 오버랩
  - 서비스 2: 이미지 없음. 풀폭 텍스트 밴드. 대형 Heading + 수평 라인 구분. 인용문 느낌
  - 서비스 3: 우측 이미지(40%) + 좌측 텍스트 + (03) 넘버링. 서비스 1과 좌우 반전 + 이미지 크기 다름
  - 서비스 4: 수치 클러스터 + 한 줄 설명. 미니멀
  - 서비스 간 간격 160px
  - 각 서비스 fade-up 애니메이션 (translateY 40→0, opacity 0→1)
  - Mobile: 모두 수직 스택, 간격 80px

  **Test scenarios:**
  - 4개 서비스 레이아웃이 모두 다름
  - 연속 2개 섹션이 같은 레이아웃 아님

  **Verification:**
  - 안티패턴 #1(3칼럼 카드), #2(지그재그 반복), #5(아이콘 그리드) 위반 없음

### Phase D: 톤 전환 + 다크 섹션 (3막)

- [ ] **Unit 8: Image Pin Bridge (라이트→다크 전환)**

  **Goal:** 풀블리드 이미지. 마진 80px→0, radius 8px→0 확대 → 핀 고정 → 다크 오버레이 0→0.92 → 핀 해제.

  **Requirements:** R7

  **Dependencies:** Unit 7

  **Files:**
  - Create: `src/components/sections/image-bridge.tsx`

  **Approach:**
  - GSAP ScrollTrigger pin + scrub
  - Step 1: margin, border-radius tween (0.5배속 확장)
  - Step 2: 100vw×100vh 도달 시 핀
  - Step 3: 핀 상태에서 오버레이 opacity 0→0.92
  - Step 4: 핀 해제
  - 이미지: object-fit: cover, 시네마틱 브릿지 사진
  - 오버레이: 별도 div, bg #0D1117

  **Verification:**
  - 이미지가 마진 있는 상태에서 풀블리드로 확대
  - 핀 후 다크 오버레이 전환
  - 해제 후 다크 섹션으로 자연스럽게 이어짐

- [ ] **Unit 9: Portfolio Gallery (3열 카운터스크롤)**

  **Goal:** 3열 이미지 그리드, 각 열 다른 방향/속도로 스크롤. SELECTED PROJECTS 피아노 리빌. 이미지 호버 인터랙션.

  **Requirements:** R8

  **Dependencies:** Unit 1

  **Files:**
  - Create: `src/components/sections/gallery.tsx`

  **Approach:**
  - 3열 컨테이너, 각 열에 4-5개 세로 4:5 이미지
  - GSAP ScrollTrigger로 각 열 translateY 바인딩: L +0.3x, C -0.5x, R +0.2x
  - 이미지 위 다크 오버레이 rgba(13,17,23,0.55)
  - 텍스트 오버레이: ( Gallery ), SELECTED PROJECTS (피아노 리빌), Since/Projects 수치, VIEW ALL WORK 버튼
  - 호버: 해당 이미지 오버레이 0.55→0.15, 나머지 0.55→0.75
  - 이미지 lazy load (IntersectionObserver)
  - Mobile: 3열→2열, 호버 제거, 탭 토글, 텍스트 48px

  **Test scenarios:**
  - 3열이 각각 다른 방향/속도로 스크롤
  - 호버 시 해당 이미지만 밝아지고 나머지 어두워짐
  - 모바일에서 2열 + 탭

  **Verification:**
  - 카운터스크롤 방향/속도 차이 체감 가능
  - SELECTED PROJECTS 피아노 리빌 작동

- [ ] **Unit 10: Brand Promise (Epilogue)**

  **Goal:** 중앙 디스플레이 세리프 텍스트 피아노 리빌 + 주변 포트폴리오 이미지 3-4장 수렴 패럴랙스.

  **Requirements:** R9

  **Dependencies:** Unit 9

  **Files:**
  - Create: `src/components/sections/brand-promise.tsx`

  **Approach:**
  - 중앙 텍스트: Cormorant Garamond, 56-72px. 피아노 리빌 (stagger 0.03s)
  - 배경 이미지 3-4장: 스크롤 연동 translateX/Y 바깥→안쪽 + scale 1.2→0.6, opacity 0.3
  - 갤러리에서 보여준 이미지 재활용
  - Mobile: 텍스트 36px, 이미지 2장, 모션 단순화

  **Verification:**
  - 텍스트 피아노 리빌 작동
  - 이미지가 스크롤에 따라 수렴

- [ ] **Unit 11: Blog 섹션**

  **Goal:** Toyokoh 뉴스 스타일. 수직 리스트, 행마다 날짜+카테고리+제목. 1px 구분선. 행 높이 80-100px.

  **Requirements:** R10

  **Dependencies:** Unit 1

  **Files:**
  - Create: `src/components/sections/blog-list.tsx`

  **Approach:**
  - 상단: ( Blog ) 캡션 + "Latest Insights" 디스플레이 28px
  - 최근 포스트 3-4개 (DB에서 fetch 또는 정적 데이터)
  - 행: 날짜 + 카테고리 태그 + 제목. 1px 구분선
  - 호버: 행 배경 rgba(255,255,255,0.03), 제목 언더라인
  - 마지막 "View all →" 링크
  - Mobile: 동일 구조, 터치 하이라이트

  **Verification:**
  - 행 호버 인터랙션 작동
  - 포스트 데이터 표시

- [ ] **Unit 12: CTA (Contact) — 비디오 복귀**

  **Goal:** 히어로와 동일한 비디오 복귀 (blur 6px + brightness 25% + 0.3x speed). 극도로 미니멀. 텍스트 펄스 애니메이션.

  **Requirements:** R11

  **Dependencies:** Unit 1

  **Files:**
  - Create: `src/components/sections/cta-contact.tsx`

  **Approach:**
  - 비디오: hero-video.mp4 재사용, filter: blur(6px) brightness(0.25), playbackRate 0.3
  - 중앙 정렬, 상하 여백 200px+
  - 캡션: ( Contact ), 헤드라인: Cormorant 48-56px, 서브: Pretendard 16px opacity 60%
  - CTA: GET IN TOUCH 보더 버튼 + 이메일
  - 헤드라인 펄스: opacity 0.85↔1.0, 2s 주기, CSS animation infinite
  - 버튼 호버: outline→solid fill
  - Mobile: 텍스트 36px, 전화번호 추가, 버튼 풀폭

  **Verification:**
  - 비디오 blur + dim 상태로 재생
  - 텍스트 펄스 애니메이션 작동

### Phase E: 조립 + 통합

- [ ] **Unit 13: page.tsx 조립 + 전체 통합**

  **Goal:** 10개 섹션 + 2개 브릿지를 page.tsx에 조립. 스크롤 플로우 전체 검증.

  **Requirements:** 전체

  **Dependencies:** Unit 3~12 전부

  **Files:**
  - Modify: `src/app/(site)/page.tsx`

  **Approach:**
  - 섹션 순서: Hero → CaseStudy → ToneBridge → AllInOne → ServicesEditorial → ImageBridge → Gallery → BrandPromise → BlogList → CtaContact
  - 전체 빌드 확인
  - 섹션 간 여백 검증 (160-300px 스펙 준수)
  - 안티패턴 최종 점검

  **Test scenarios:**
  - 전체 스크롤 플로우가 자연스럽게 이어짐
  - 3막 톤 전환 (다크→라이트→다크) 명확
  - 모바일 반응형

  **Verification:**
  - 빌드 에러 없음
  - 10개 섹션 + 2개 브릿지 모두 렌더링
  - 안티패턴 10개 항목 모두 준수

## System-Wide Impact

- **Interaction graph:** GSAP ScrollTrigger 인스턴스가 최소 4개 (히어로 핀, 케이스 스터디, 이미지 브릿지, 갤러리). 페이지 언마운트 시 전부 cleanup 필수.
- **Error propagation:** 비디오 로드 실패 시 poster fallback. 갤러리 이미지 로드 실패 시 placeholder bg.
- **State lifecycle risks:** GSAP pin이 React DOM과 충돌할 수 있음 — 모든 pin 대상은 wrapper div 패턴 사용.
- **API surface parity:** 블로그 섹션이 기존 /api/posts 또는 DB 연동 필요할 수 있음.
- **Integration coverage:** 전체 스크롤 플로우 테스트는 수동 브라우저 확인 필요.

## Risks & Dependencies

- **에셋 부재 리스크**: 갤러리용 스크린샷 12-15개, 브릿지 이미지 1개, 서비스 이미지 2개 필요. 없으면 placeholder 사용하되 최종 품질에 영향.
- **GSAP 성능 리스크**: ScrollTrigger 인스턴스 4개 + 갤러리 12-15개 이미지. 모바일에서 프레임 드롭 가능. will-change + lazy load로 완화.
- **SplitText 부재**: 피아노 리빌을 수동 span 분할로 구현 시 텍스트 변경 유지보수 비용 증가.

## Sources & References

- **Origin document:** /Users/choejeong-won/Downloads/CHIRO_Design_Specification_v1.0.docx
- Reference sites: Toyokoh, BLAED, Aupale Vodka
- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
