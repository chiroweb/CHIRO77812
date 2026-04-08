# CHIRO Design Guide

> **모든 디자인/프론트엔드 작업 전에 반드시 이 가이드를 읽고 따라야 합니다.**
> Toyokoh 레퍼런스 기반, CHIRO 브랜드에 어댑트.

---

## 1. 브랜드 철학

Toyokoh가 "더럽고 위험한" 건설 산업을 "수술적 정밀함"으로 재정의했듯이,
CHIRO는 "저렴하고 템플릿 기반인" 웹 제작 시장을 **심리학 설계 + 코드 구현의 정밀함**으로 재정의합니다.

**핵심 키워드:** Surgical Precision, Clean, Motion-First, Immersive, Tech-Humanism
**분위기:** Structural Healthcare — 건설이 아닌 "정밀 시술"의 느낌

---

## 2. 컬러 시스템

| 역할 | 이름 | HEX | 용도 |
|------|------|-----|------|
| **Primary** | Deep Navy | `#001F3F` | 신뢰, 전문성. 다크 섹션 배경 |
| **Secondary** | Metallic Silver | `#C0C0C0` | 보조 텍스트, 디바이더, 캡션 |
| **Background** | Clinical White | `#FFFFFF` | 라이트 섹션 기본 배경 |
| **Background Alt** | Off-White | `#f5f5f0` | 라이트 섹션 대안 배경 |
| **Accent** | Laser Cyan | `#00D2FF` | 호버, 인터랙티브. **극히 드물게** |
| **Text Dark** | Near Black | `#111111` | 라이트 배경 위 본문 |
| **Text Light** | White | `#F5F5F5` | 다크 배경 위 본문 |
| **Caption** | Gray | `#6B7280` | 캡션, 라벨, 넘버링 |
| **Divider Dark** | | `rgba(255,255,255,0.12)` | 다크 배경 위 구분선 |
| **Divider Light** | | `rgba(0,0,0,0.08)` | 라이트 배경 위 구분선 |

### 사용 규칙
- 유채색은 Accent(#00D2FF)만, 극히 드물게
- 다크/라이트 톤 전환으로 시각적 깊이 확보
- AI 그라디언트(보라-파랑-핑크) 절대 금지

---

## 3. 타이포그래피

**폰트: Pretendard (전체 통일)** + JetBrains Mono (캡션/라벨)

| 역할 | Weight | Size | Line-height | Letter-spacing |
|------|--------|------|-------------|----------------|
| **Display** | 800 (extrabold) | 72-130px | 1.0 | -0.03em |
| **Heading** | 600 (semibold) | 28-48px | 1.2 | -0.01em |
| **Body** | 400 (regular) | 16-17px | 1.7 | 0 |
| **Caption** | 400 | 11-13px | 1.4 | 0.06-0.08em, uppercase |
| **Button** | 500 (medium) | 14px | 1.0 | 0.04em, uppercase |

### 타이포 원칙
- 거대한 Display와 작은 Caption 사이의 **극적 대비** (Toyokoh 핵심)
- uppercase는 캡션/라벨에만
- 숫자는 `tabular-nums`

---

## 4. 레이아웃

- **Max width:** 1400px
- **Desktop margin:** 80px (`px-20`)
- **Mobile margin:** 20px (`px-5`)
- **섹션 간 여백:** 120-200px (Toyokoh급 breathing room)
- **이미지 radius:** 0 원칙. 작은 마스크 이미지에 한해 `rounded-lg` 허용
- **구분선:** 0.5-1px, 라이트는 `#E5E5E3`, 다크는 `rgba(255,255,255,0.12)`

---

## 5. 모션 & 인터랙션

**"Motion-First" — 콘텐츠가 나타나는 게 아니라 "조립"되는 느낌**

### 원칙
- 각 섹션마다 **다른** 모션 타입 (동일 fade-in 반복 금지)
- 절제된 움직임 — 과하지 않게, 목적 있는 모션만
- GSAP: 핀 고정 + scrub 스크롤에만. Framer Motion: 뷰포트 진입 애니메이션

### 기본 값
```
duration: 0.6s (기본), 0.8s (섹션), 0.3s (호버)
easing: [0.25, 0.1, 0.25, 1]
stagger: 0.1s
```

### 모션 타입 풀
- Mask reveal (clipPath inset)
- Fade + translateY/X
- Scale reveal (0.95 → 1.0)
- Horizontal wipe
- Piano reveal (글자별 순차)
- Stagger (자식 요소 순차)

---

## 6. 이미지 & 미디어

- **쿨 톤 그레이딩:** 약간 청색/남색 기미
- **다크 오버레이:** rgba(0,31,63,0.55)
- **비디오:** autoplay muted loop playsinline
- **Lazy load:** 갤러리 등 다수 이미지는 IntersectionObserver

---

## 7. 안티패턴 (금지)

1. 3칼럼 카드 그리드 반복
2. 좌우 지그재그 반복
3. 의미 없는 아이콘 + 짧은 텍스트 그리드
4. 연속 2개 섹션 동일 레이아웃
5. 모든 섹션 동일 fade-in
6. "최고의/완벽한/혁신적인" 빈 수식어
7. AI 그라디언트 (보라-파랑-핑크)
8. 스톡 일러스트/3D 아이콘
9. 느낌표(!) 사용 금지 — 마침표(.)로

---

## 8. 톤 오브 보이스

- **정밀함:** "만든다" → "설계하고 구현한다"
- **증거 기반:** 수식어 대신 포트폴리오, 수치, 클라이언트명
- **존댓말 (~합니다)** 일관 사용
- 짧은 문장. 한 문장에 하나의 메시지
- "치로는~" (브랜드명 직접 사용)

---

## 9. 반응형

```
Desktop  : 1280px+
Tablet   : 768px ~ 1279px
Mobile   : ~767px
```

---

*이 가이드는 Toyokoh (toyokoh.com) 디자인 분석 기반입니다.*
*프로젝트 진행 중 업데이트될 수 있습니다.*
