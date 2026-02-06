# CHIRO Web Design - Design Guide

> 이 문서는 치로웹디자인 홈페이지의 모든 디자인 결정을 기록합니다.
> 모든 컴포넌트와 페이지는 이 가이드를 따라야 합니다.

---

## 1. 브랜드 아이덴티티

### 핵심 키워드
- **투명함** — 과정을 숨기지 않는다
- **몰입** — 소수의 프로젝트에 집중한다
- **정제** — 불필요한 것을 걷어낸다

### 톤 & 매너
- 일본 편집 디자인 감성 (잡지, 건축 사무소 스타일)
- 텍스트가 디자인의 축 (이미지 보조적 역할)
- 과시하지 않되, 자신감 있는 태도

---

## 2. 컬러 시스템

```
Primary Background  : #FFFFFF (순백)
Secondary Background: #FAFAF8 (미색, 섹션 교차 시 사용 가능하나 기본은 실선 구분)
Text Primary        : #1A1A1A (차콜, 본문/제목)
Text Secondary      : #6B6B6B (보조 텍스트, 캡션)
Text Tertiary       : #9B9B9B (비활성, 플레이스홀더)
Line/Border         : #E5E5E3 (실선 구분선, 테이블 선)
Accent              : #1A1A1A (CTA 아웃라인, 호버 배경)
```

### 사용 규칙
- 배경은 항상 #FFFFFF 또는 #FAFAF8만 사용
- 유채색 금지. 흑백 + 미색 체계를 절대 깨지 않는다
- 호버/활성 상태: 차콜(#1A1A1A) 배경 + 흰색 텍스트 반전

---

## 3. 타이포그래피

### 서체
| 용도 | 서체 | Fallback |
|------|------|----------|
| 한글 본문/제목 | Pretendard | system-ui, sans-serif |
| 일본어 | Noto Sans JP | sans-serif |
| 영문 강조 | Pretendard (동일) | system-ui |
| 코드/숫자 강조 | JetBrains Mono | monospace |

### 타입 스케일
```
Display   : 56px / font-light    / tracking-tight   / line-height: 1.1
H1        : 40px / font-light    / tracking-tight   / line-height: 1.2
H2        : 32px / font-normal   / tracking-normal  / line-height: 1.3
H3        : 24px / font-normal   / tracking-normal  / line-height: 1.4
Body      : 16px / font-normal   / tracking-normal  / line-height: 1.7
Body SM   : 14px / font-normal   / tracking-wide    / line-height: 1.6
Caption   : 12px / font-normal   / tracking-wider   / line-height: 1.5
```

### 타이포 규칙
- 제목은 항상 `font-light` — 가늘고 큰 글씨로 공간감 확보
- 본문 행간(line-height)은 1.7 이상 — 읽기 편안한 여유
- 영문 섹션 라벨은 `uppercase tracking-[0.2em] text-xs` — 구조 표시용
- 숫자(가격 등)는 `tabular-nums` — 정렬 유지

---

## 4. 그리드 & 레이아웃

### 그리드 시스템
```
Desktop   : 12컬럼 / max-w-[1280px] / gap-6 / px-8
Tablet    : 8컬럼  / gap-5 / px-6
Mobile    : 4컬럼  / gap-4 / px-5
```

### 여백 체계
```
섹션 간 간격     : py-32 (128px) — desktop
                  py-24 (96px)  — tablet
                  py-20 (80px)  — mobile
섹션 내부 요소 간 : gap-16 (64px)
컴포넌트 내부     : gap-8 (32px)
텍스트 블록 간    : gap-4 (16px)
```

### 구분선 규칙
- 두께: `border-[0.5px]` 또는 `border` (1px)
- 색상: `border-[#E5E5E3]`
- 섹션 구분: 전체 너비(full-width) 실선
- 그리드 내부: 컨텐츠 너비에 맞춘 실선
- 테이블: 모든 셀에 실선 적용 (일본 팸플릿 스타일)

---

## 5. 컴포넌트 스타일

### 버튼 (CTA)

**Primary — 아웃라인**
```
border: 1px solid #1A1A1A
color: #1A1A1A
padding: 12px 32px
font-size: 14px
letter-spacing: 0.05em
transition: all 0.3s ease

Hover:
  background: #1A1A1A
  color: #FFFFFF
```

**Secondary — 텍스트 링크**
```
color: #1A1A1A
border-bottom: 1px solid #1A1A1A
padding-bottom: 2px
+ 화살표(→) 아이콘

Hover:
  border-bottom-color: transparent
  transform: translateX(4px) — 화살표만
```

### 카드 (포트폴리오)
```
border: 1px solid #E5E5E3
padding: 32px
background: #FFFFFF

Hover:
  이미지 플레이스홀더가 fade-in (opacity 0 → 1, 0.4s)
  border-color: #1A1A1A
```

### 입력 필드
```
border-bottom: 1px solid #E5E5E3  (밑줄만, 박스 아님)
padding: 12px 0
font-size: 16px
background: transparent

Focus:
  border-bottom-color: #1A1A1A
  transition: 0.3s
```

### 미디어 플레이스홀더
```
background: #F5F5F3
aspect-ratio: 16/9 (비디오) 또는 4/3 (이미지)
display: flex, items-center, justify-center
border: 1px dashed #E5E5E3

내부:
  아이콘 (play 또는 image) + "Video" / "Image" 텍스트
  color: #9B9B9B
```

---

## 6. 네비게이션

### 구조
```
[로고(좌측)]                    [메뉴 텍스트(우측)]

메뉴 항목: Services / Portfolio / About / Blog / Contact
```

### 스타일
```
position: fixed
background: rgba(255, 255, 255, 0.9)
backdrop-filter: blur(8px)
border-bottom: 1px solid #E5E5E3
height: 64px
z-index: 50

메뉴 텍스트:
  font-size: 13px
  letter-spacing: 0.1em
  text-transform: uppercase
  color: #1A1A1A

Active:
  border-bottom: 1px solid #1A1A1A (텍스트 아래)
```

### 모바일
- 우측 햄버거 아이콘 (세 줄, 얇은 선)
- 클릭 시 풀스크린 오버레이 메뉴
- 메뉴 항목 세로 중앙 배치, Display 사이즈

---

## 7. 애니메이션 가이드 (Framer Motion)

### 원칙
- **절제된 움직임** — 일본 디자인답게 과하지 않게
- **목적 있는 모션** — 시선 유도와 정보 계층 표현에만 사용
- **일관된 타이밍** — 전체 사이트에서 동일한 easing/duration

### 기본 값
```
duration: 0.6s (기본), 0.8s (섹션 전환), 0.3s (호버/마이크로)
easing: [0.25, 0.1, 0.25, 1] (cubic-bezier, 자연스러운 감속)
stagger: 0.1s (리스트 아이템 간 지연)
```

### 적용 패턴
| 요소 | 효과 | 트리거 |
|------|------|--------|
| 섹션 텍스트 | fadeIn + translateY(20px → 0) | 뷰포트 진입 |
| 구분선 | scaleX(0 → 1), origin-left | 뷰포트 진입 |
| 포트폴리오 이미지 | opacity(0 → 1) | 호버 |
| CTA 버튼 | 배경색 전환 | 호버 |
| 네비게이션 | opacity + blur | 스크롤 |
| 모바일 메뉴 | clipPath reveal | 클릭 |
| 히어로 그리드 선 | strokeDashoffset 애니메이션 | 페이지 로드 |

---

## 8. 카피 톤 가이드

### 문체
- **존댓말 (~합니다)** 일관 사용
- 짧은 문장. 한 문장에 하나의 메시지
- 수식어 최소화. 사실 위주의 서술

### 금지 표현
- "최고의", "완벽한", "혁신적인" 등 과장 형용사
- "저희는~" 보다는 "치로는~" (브랜드명 직접 사용)
- 느낌표(!) 사용 금지 — 마침표(.)로 끝내기

### 권장 표현
- "~를 설계합니다" (만든다 → 설계한다)
- "~에 몰입합니다" (집중한다 → 몰입한다)
- "~을 닦습니다" (준비한다 → 닦다)

### 영문 라벨
- 각 섹션 상단에 영문 라벨을 작게 배치
- 예: `01 — Philosophy`, `02 — Process`, `03 — Portfolio`
- uppercase, tracking-[0.2em], text-xs, text-secondary

---

## 9. 페이지별 구조 요약

### 메인 (/)
1. Hero — 풀스크린 비디오 플레이스홀더 + 그리드 선 애니메이션
2. Philosophy — 텍스트 중심, 부티크 전략 메시지
3. Live Process — 좌우 분할 (기획서 | 빌드 타임랩스)
4. Portfolio Preview — 4~6개 프로젝트 카드

### 서비스 (/services)
- 3단 가격 비교표 (스타트업 / 비즈니스 / 엔터프라이즈)
- 금액 공개, "실시간 피드백 링크" 항목 강조

### 포트폴리오 (/portfolio)
- 프로젝트 카드 그리드 (이름 + 문제 + 결과)
- 호버 시 이미지 노출

### 소개 (/about)
- 디렉터의 편지 (흑백 사진 + 에세이)
- 연혁 아닌 "왜"에 집중

### 블로그 (/blog)
- MDX 기반 리스트/상세
- 잡지 편집 레이아웃

### 문의 (/contact)
- 이름, 연락처, 서술형 질문 1개
- [무료 진단 및 프로세스 체험 신청] 버튼

---

## 10. 반응형 브레이크포인트

```
Desktop  : 1280px+ (기준)
Tablet   : 768px ~ 1279px
Mobile   : ~767px
```

데스크톱 퍼스트로 설계 후 축소 적응.

---

## 11. 성능 기준

- Lighthouse 점수 90+ (Performance, Accessibility, SEO)
- First Contentful Paint < 1.5s
- 폰트: `font-display: swap` + 서브셋 적용
- 이미지: next/image + WebP + lazy loading
- JS 번들: 필요한 페이지에서만 Framer Motion 로드

---

*이 가이드는 프로젝트 진행 중 업데이트될 수 있습니다.*
