# 치로웹디자인 SEO 현황 보고서

> 작성일: 2026-03-26
> 도메인: https://chiroweb.co.kr

---

## 1. 메타데이터 설정

### 루트 레이아웃 (`src/app/layout.tsx`)

| 항목 | 값 |
|------|-----|
| metadataBase | `https://chiroweb.co.kr` |
| title 템플릿 | `%s \| 치로웹디자인` |
| description | 설정됨 |
| keywords | 9개 (웹디자인, 홈페이지 제작 등) |
| robots | index: true, follow: true |
| canonical | `https://chiroweb.co.kr` |

### 페이지별 메타데이터

| 페이지 | metadata | OG | canonical | 비고 |
|--------|----------|-----|-----------|------|
| 홈 (`/`) | 루트 상속 | O | O | FAQ 스키마 포함 |
| 서비스 (`/services`) | O | O | O | |
| 포트폴리오 (`/portfolio`) | O | O | O | |
| 포트폴리오 상세 (`/portfolio/[slug]`) | 동적 생성 | O | O | `generateMetadata()` |
| 소개 (`/about`) | O | O | O | |
| 블로그 (`/blog`) | O | O | O | |
| 블로그 상세 (`/blog/[slug]`) | 동적 생성 | O | O | `generateMetadata()` + article 타입 |
| 문의 (`/contact`) | O | O | O | |

---

## 2. OpenGraph 설정

- **기본 OG 이미지**: S3 호스팅 (`chiro-web.s3.ap-northeast-2.amazonaws.com/image/ogphoto.png`, 1200x630)
- **타입**: website (기본), article (블로그 글)
- **로케일**: ko_KR
- **사이트명**: 치로웹디자인
- 모든 주요 페이지에 개별 OG title/description 설정됨
- 블로그/포트폴리오 상세 페이지는 DB 데이터로 동적 생성

---

## 3. 구조화된 데이터 (JSON-LD)

| 스키마 타입 | 위치 | 내용 |
|------------|------|------|
| ProfessionalService | 루트 레이아웃 | 업체명, URL, 서비스 유형, 가격대, 주소 |
| FAQPage | 홈페이지 | 10개 Q&A (서비스, 가격, 일정, SEO 등) |
| BlogPosting | 블로그 상세 | headline, author, publisher, 날짜 |

---

## 4. 사이트맵 (`src/app/sitemap.ts`)

동적 생성 방식으로 구현됨.

### 정적 페이지

| URL | priority | changeFrequency |
|-----|----------|-----------------|
| `/` | 1.0 | weekly |
| `/services` | 0.9 | monthly |
| `/portfolio` | 0.9 | weekly |
| `/about` | 0.7 | monthly |
| `/blog` | 0.8 | weekly |
| `/contact` | 0.8 | monthly |

### 동적 페이지
- 블로그 글: DB에서 조회, `lastModified` 반영
- 포트폴리오 프로젝트: DB에서 조회, sort order 적용
- DB 오류 시 fallback 처리됨

---

## 5. robots.ts (`src/app/robots.ts`)

| User-Agent | Allow | Disallow |
|-----------|-------|----------|
| * (전체) | `/` | `/chiro/`, `/api/` |
| Yeti (네이버) | `/` | `/chiro/`, `/api/` |
| Daumoa (다음) | `/` | `/chiro/`, `/api/` |
| Googlebot | `/` | `/chiro/`, `/api/` |
| Googlebot-Image | `/portfolio/` | - |

사이트맵 참조: `https://chiroweb.co.kr/sitemap.xml`

---

## 6. 검색엔진 인증

| 검색엔진 | 방식 | 상태 |
|----------|------|------|
| Google Search Console | HTML 파일 + meta 태그 | 설정 완료 |
| Naver 웹마스터 | HTML 파일 + meta 태그 | 설정 완료 |

---

## 7. URL 관리

### 301 리다이렉트 (`next.config.ts`)

| 기존 URL | 리다이렉트 대상 |
|----------|----------------|
| `/about.html` | `/about` |
| `/portfolio.html` | `/portfolio` |
| `/contact.html` | `/contact` |
| `/index.html` | `/` |
| `www.chiroweb.co.kr/*` | `chiroweb.co.kr/*` |

### Canonical URL
- 모든 페이지에 `alternates.canonical` 설정됨
- 동적 페이지는 slug 기반 canonical 자동 생성

### 슬러그 생성 (`src/lib/slug.ts`)
- 한글 지원, URL-friendly 변환
- `slugify` 라이브러리 사용
- 실패 시 타임스탬프 기반 fallback

---

## 8. 기술적 SEO

| 항목 | 상태 |
|------|------|
| 시맨틱 HTML | `<nav>`, `<main>`, `<footer>` 사용 |
| Next.js Image 최적화 | 적용됨 (lazy loading, priority) |
| 폰트 최적화 | `display: swap` 사용 |
| 모바일 반응형 | Tailwind 기반 mobile-first |
| 콘텐츠 보안 | DOMPurify로 블로그 HTML sanitize |
| favicon / apple-icon | 설정됨 |

---

## 9. 현재 상태 평가

### 잘 되어 있는 부분

- 모든 페이지에 메타데이터 + canonical + OG 완비
- 구조화된 데이터 3종 (ProfessionalService, FAQ, BlogPosting)
- 한국 검색엔진 최적화 (네이버, 다음 크롤러 설정)
- 동적 사이트맵 + 동적 메타데이터 생성
- 레거시 URL 301 리다이렉트
- www → non-www 정규화

### 개선 가능한 부분

| 항목 | 설명 | 우선순위 |
|------|------|----------|
| 동적 OG 이미지 | 블로그/포트폴리오별 자동 생성 OG 이미지 (현재 공통 이미지 1개) | 중 |
| Breadcrumb 스키마 | 계층 구조 표현을 위한 BreadcrumbList JSON-LD | 중 |
| Portfolio 스키마 | 포트폴리오 상세에 CreativeWork 스키마 추가 | 낮음 |
| preconnect 힌트 | S3 등 외부 리소스에 대한 preconnect 추가 | 낮음 |
| Service 스키마 | 서비스 페이지에 Service 타입 JSON-LD 추가 | 낮음 |
