# CHIRO Design Guide v2

> **모든 디자인/프론트엔드 작업 전에 반드시 이 가이드를 읽고 따라야 합니다.**
> 홈페이지 실제 구현 기반. 2026-04-08 업데이트.

---

## 1. 브랜드 철학

CHIRO는 "저렴하고 템플릿 기반인" 웹 제작 시장을 **심리학 설계 + 코드 레벨 구현의 정밀함**으로 재정의합니다.

**핵심 키워드:** Surgical Precision, Clean, Motion-First, Immersive, Tech-Humanism
**분위기:** 정밀하되 따뜻한. 기술적이되 인간적인.

---

## 2. 컬러 시스템

| 역할 | HEX | 용도 |
|------|-----|------|
| **Dark BG** | `#1a1a1a` | 다크 섹션 배경 (WhyChiro, Portfolio, Gallery) |
| **Deep Navy** | `#001F3F` | 히어로 배경, 이미지 폴백 |
| **Dark Overlay** | `#0D1117` | 갤러리 섹션 배경 |
| **Off-White** | `#f5f5f0` | 라이트 섹션 배경 (AllInOne, About, FAQ) |
| **Light BG** | `#F0F0F0` | CTA 섹션 배경 |
| **Text Dark** | `#111111` | 라이트 배경 본문 |
| **Text Light** | `#F5F5F5` | 다크 배경 본문 |
| **Caption** | `#6B7280` | 캡션, 라벨 |
| **Text Muted** | `#666` / `#999` | 보조 텍스트 |
| **Accent Orange** | `#FF4D00` | 호버 강조 (네비 CTA) |
| **Divider Light** | `#ddd` | 라이트 배경 구분선 (FAQ 등) |
| **Divider Dark** | `rgba(255,255,255,0.12)` | 다크 배경 구분선 |

### 사용 규칙
- 유채색은 Accent Orange만, 호버/활성 상태에 한정
- 다크 ↔ 라이트 톤 전환으로 시각적 깊이 확보
- AI 그라디언트(보라-파랑-핑크) 절대 금지
- 섹션 간 배경색 전환: `#f5f5f0` → 그라데이션 → `#1a1a1a` 자연스럽게

---

## 3. 타이포그래피

**본문: Pretendard (전체 통일)** | **캡션/라벨: JetBrains Mono** | **제목 영문: 시스템**

| 역할 | Weight | Size | Line-height | Letter-spacing | 예시 |
|------|--------|------|-------------|----------------|------|
| **Display** | 800 | 44-150px | 0.85-1.0 | -0.03em | CHIRO, WHY CHIRO?, WE GROW |
| **Section Title** | 800 | 32-72px | 1.0 | -0.03em | FREQUENTLY ASKED, ALL IN ONE |
| **Body** | 400 | 14-17px | 1.8-1.9 | 0.01em | 본문 단락 |
| **Body Accent** | 500 | 15-17px | 1.9 | 0.01em | 강조 본문 (첫 줄) |
| **Caption** | 400 | 11-13px | 1.4 | 0.06-0.08em, uppercase | ( About ), ( FAQ ), ( Gallery ) |
| **Small Text** | 400 | 12-13px | 1.9 | 0.02em | WhyChiro 본문, 포함 항목 |
| **Button** | 500 | 12-14px | 1.0 | 0.02-0.04em, uppercase | READ MORE, VIEW PROJECT |
| **Stats Value** | 600 | 15px | - | - | 2주, 43%, 4개월 |

### 타이포 원칙
- 거대한 Display와 작은 Caption 사이의 **극적 대비**
- uppercase는 영문 Display + 캡션/라벨에만
- 한글 Display: 28-76px (영문보다 작게)
- 숫자는 `tabular-nums`
- 캡션 라벨 형식: `( Label )` — 괄호 안에 공백 포함

---

## 4. 레이아웃

- **Max width:** 1400px
- **Desktop margin:** 80px (`px-20`)
- **Tablet margin:** 48px (`px-12`)
- **Mobile margin:** 20px (`px-5`)
- **섹션 간 여백:** 120-200px (`py-[120px] md:py-[160px]`)
- **이미지 radius:** 기본 0. 포트폴리오 미디어 `rounded-2xl`, 갤러리 `rounded-lg`, 네비 필 `rounded-full`
- **구분선:** 1px, 라이트 `#ddd`, 다크 `rgba(255,255,255,0.12)`

### 섹션 배경 흐름 (홈페이지)
```
Hero          — #001F3F (비디오 + 오버레이)
AllInOne      — #f5f5f0
AboutEditorial — #f5f5f0
ExpandingImage — #f5f5f0 → #1a1a1a (그라데이션)
WhyChiroPin   — #1a1a1a (다크, sticky)
Portfolio     — #1a1a1a (다크, sticky)
Gallery       — #0D1117 (다크, sticky)
NewsList      — #f5f5f0
CtaContact    — #F0F0F0 (마스크 비디오)
FAQ           — #f5f5f0
Footer        — 라이트
```

---

## 5. 네비게이션

### 히어로 (스크롤 전)
- 전체 너비, 투명 배경
- 모든 텍스트 **흰색** (text-white / text-white/70)
- CTA 버튼: 반투명 흰색 보더 (`bg-white/15 border-white/20`)
- 높이: 56px

### 스크롤 후 (필 전환)
- **max-width 720px**, 가운데 정렬
- **rounded-full** (완전 알약 형태)
- `backdrop-blur-2xl` 글래스모피즘
- 라이트: `bg-white/70 border-black/[0.06]`
- 다크: `bg-[#0a0a0a]/70 border-white/[0.08]`
- 높이: 48px
- 전환: 700ms `cubic-bezier(0.76, 0, 0.24, 1)`
- 다크 섹션 자동 감지 (`data-theme="dark"`)

---

## 6. 모션 & 인터랙션

**"Motion-First" — 콘텐츠가 나타나는 게 아니라 "조립"되는 느낌**

### 기본 값
```
duration: 0.5-0.8s (섹션별), 0.3s (호버)
easing: [0.25, 0.1, 0.25, 1] (Framer), [0.16, 1, 0.3, 1] (메인)
stagger: 0.04s (글자별), 0.1s (요소별)
scrub: 0.3-0.6 (GSAP)
```

### 구현된 모션 타입
| 모션 | 섹션 | 방식 |
|------|------|------|
| **Piano reveal** | WhyChiro, Gallery 타이틀 | 글자별 순차 clipPath + translateY |
| **ClipPath expand** | ExpandingImage | GSAP scrub, inset 축소 → full |
| **Parallax float** | WhyChiro 배경 이미지 | GSAP scrub, yPercent 이동 |
| **Scale + parallax** | Gallery 3컬럼 | GSAP scrub, scale 1.5→1 + 컬럼별 yPercent |
| **Blind wipe** | Portfolio 미디어 전환 | GSAP scrub, clipPath inset(0 0 100% 0) |
| **Fade + translateY** | AllInOne, About 텍스트 | Framer whileInView |
| **AnimatePresence** | Portfolio 텍스트 전환 | Framer mode="wait", y 25→0 |
| **Mask expand** | CTA Contact | CSS transition, clipPath + hover |
| **IntersectionObserver** | WhyChiro, Gallery 타이틀 | threshold 기반 state toggle |

### 원칙
- 각 섹션마다 **다른** 모션 타입 (동일 fade-in 반복 금지)
- GSAP: 핀 고정(sticky) + scrub 스크롤에만
- Framer Motion: 뷰포트 진입 애니메이션, 요소 전환
- CSS transition: 호버, 단순 상태 변경

---

## 7. 이미지 & 미디어

### 저장소
- **S3**: `s3://chiro-web/public/` — 비디오, 포트폴리오 이미지, 갤러리 이미지
- **Vercel Blob**: 관리자 업로드 이미지 (DB 연동)
- **public/**: 로컬 이미지 (히어로 비디오, why/gallery 보조)

### S3 URL 패턴
```
https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/[경로]
```

### 규칙
- 비디오: `autoPlay muted loop playsInline`
- Lazy load: 갤러리 등 다수 이미지는 `loading="lazy"`
- 포트폴리오 이미지: `object-contain` (비율 유지)
- 갤러리 좌/우: `object-cover`, 세로 `3/4` 비율
- 갤러리 가운데: `object-cover`, 가로 `16/9` 비율
- 다크 오버레이: `bg-black/20` ~ `bg-black/40`

---

## 8. 컴포넌트 패턴

### Sticky 스크롤 섹션
```
wrapper: minHeight 200-400vh, relative
inner: sticky top-0, h-screen, overflow-hidden
```
사용: WhyChiro, Portfolio, Gallery, ExpandingImage

### 아코디언 (FAQ)
- `max-height` 방식 (display:none 아님) — AI 크롤러 대응
- 500ms 이징 전환
- 2컬럼 레이아웃 (각 독립 상태)

### 포트폴리오 쇼케이스
- 서버 컴포넌트에서 DB 조회 → props 전달
- 미디어: 바깥 래퍼 `rounded-2xl overflow-hidden` + 안쪽 clipPath
- 텍스트: `AnimatePresence mode="wait"` 전환

### CTA 이중 진입점
- ① 낮은 허들 (무료 진단)
- ② 높은 허들 (프로젝트 상담)
- 마스크 호버 확장: clipPath transition 700ms

---

## 9. 안티패턴 (금지)

1. 3칼럼 카드 그리드 반복
2. 좌우 지그재그 반복
3. 의미 없는 아이콘 + 짧은 텍스트 그리드
4. 연속 2개 섹션 동일 레이아웃
5. 모든 섹션 동일 fade-in
6. "최고의/완벽한/혁신적인" 빈 수식어
7. AI 그라디언트 (보라-파랑-핑크)
8. 스톡 일러스트/3D 아이콘
9. 느낌표(!) 사용 금지 — 마침표(.)로
10. `display:none`으로 FAQ 답변 숨기기 (AI 크롤러 차단됨)
11. `overflow-x-hidden`을 main/body에 (sticky 깨짐) — html에만 허용

---

## 10. 톤 오브 보이스

- **정밀함:** "만든다" → "설계하고 구현한다"
- **증거 기반:** 수식어 대신 포트폴리오, 수치, 클라이언트명
- **존댓말 (~합니다)** 일관 사용
- 짧은 문장. 한 문장에 하나의 메시지
- "치로는~" (브랜드명 직접 사용)
- 영문 Display는 대문자: ALL IN ONE SOLUTION, WHY CHIRO?, WE GROW WITH YOU

---

## 11. 반응형

```
Desktop  : 1280px+
Tablet   : 768px ~ 1279px
Mobile   : ~767px
```

### 네비
- Desktop: 필 형태 (좌 nav | 우 CTA)
- Mobile: 햄버거 → 풀스크린 메뉴

### 포트폴리오
- Desktop: 좌 58% 미디어 | 우 42% 텍스트
- Mobile: 상 50vh 미디어 | 하 50vh 텍스트

### FAQ
- Desktop: 2컬럼 (좌 5개, 우 5개)
- Mobile: 1컬럼 스택

---

## 12. SEO/AEO 구조

- FAQPage JSON-LD 스키마 (FAQ 섹션 자동 생성)
- Organization JSON-LD (layout.tsx)
- WebSite JSON-LD (layout.tsx)
- `overflow-x-hidden`은 `<html>`에만 적용
- 모든 FAQ 답변은 DOM에 항상 존재 (max-height 방식)

---

*이 가이드는 실제 홈페이지 구현 기반입니다. 2026-04-08 업데이트.*
