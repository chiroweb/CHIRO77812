import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/PretendardVariable.woff2",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const bankGothic = localFont({
  src: [
    {
      path: "../../public/fonts/BankGothicMediumBT.ttf",
      style: "normal",
      weight: "500",
    },
  ],
  variable: "--font-bank-gothic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chiroweb.co.kr"),
  title: {
    default:
      "다시 만들 일 없는 홈페이지 — 심리학·AEO 코드 웹 에이전시, 치로웹디자인",
    template: "%s | 치로웹디자인",
  },
  description:
    "예쁘기만 한 홈페이지는 1년 안에 잊혀집니다. 치로는 ChatGPT·Perplexity가 인용하는 사이트만 만듭니다. 빌더로는 불가능한 AEO·SEO 통합 설계와 심리학 기반 전환 구조를 코드 레벨에서 구현하는 소수 정예 웹 스튜디오. 평균 7.5일 제작, 175만원부터.",
  keywords: [
    // 1층: 전문 용어 선점 (한국 1위 노림)
    "AEO",
    "AEO·SEO 통합 설계",
    "AEO 최적화",
    "llms.txt",
    "GEO 검색 최적화",
    "AI 검색 최적화",
    "ChatGPT 인용 사이트",
    "Perplexity 노출",
    // 2층: 경쟁사 약점
    "아임웹 단점",
    "카페24 한계",
    "코드 기반 홈페이지",
    "커스텀 홈페이지 제작",
    // 3층: 업종 + 제작
    "호텔 홈페이지 제작",
    "제조업 홈페이지 제작",
    "스타트업 홈페이지 제작",
    // 4층: 가격 키워드 (보조)
    "홈페이지 제작 비용",
    "중소기업 홈페이지 제작",
    // 브랜드
    "치로웹디자인",
    "CHIRO 웹디자인",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "다시 만들 일 없는 홈페이지 — 심리학·AEO 코드 웹 에이전시, 치로웹디자인",
    description:
      "예쁘기만 한 홈페이지는 1년 안에 잊혀집니다. ChatGPT·Perplexity가 인용하는 사이트, 심리학 기반 전환 구조, 빌더 한계 없는 코드 레벨 AEO·SEO. 디렉터 직접 주도 스튜디오.",
    url: "https://chiroweb.co.kr",
    siteName: "치로웹디자인",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "https://chiroweb.co.kr/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AEO·SEO 통합 설계 웹 에이전시 치로웹디자인",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "다시 만들 일 없는 홈페이지 — 치로웹디자인",
    description:
      "예쁘기만 한 홈페이지는 1년 안에 잊혀집니다. ChatGPT·Perplexity가 인용하는 코드 기반 AEO·SEO 통합 설계, 심리학 전환 구조.",
    images: ["https://chiroweb.co.kr/opengraph-image"],
  },
  verification: {
    google: "google856a1b8c4d5e6f2a",
    other: {
      "naver-site-verification": ["naverfe9f2a8d8c1f58e2a98d1c8e2547d8eb"],
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://chiroweb.co.kr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": "https://chiroweb.co.kr/#organization",
    name: "치로웹디자인",
    alternateName: "CHIRO Web Design Studio",
    url: "https://chiroweb.co.kr",
    description:
      "AEO·SEO 통합 설계와 코드 기반 구조화 데이터 구현을 전문으로 하는 디렉터 직접 주도의 소수 정예 웹 스튜디오. ChatGPT·Perplexity 인용 최적화, llms.txt, FAQ 스키마, 시맨틱 HTML을 모든 프로젝트에 기본 적용. 175만원부터, 평균 7.5일 제작.",
    areaServed: "KR",
    serviceType: [
      "AEO·SEO 통합 설계 (Answer Engine Optimization)",
      "SEO 코드 레벨 구현",
      "커스텀 홈페이지 제작",
      "홈페이지 리모델링",
      "구조화 데이터 (JSON-LD) 설계",
      "llms.txt 구현",
    ],
    priceRange: "₩₩",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Incheon",
      addressRegion: "인천광역시",
      addressCountry: "KR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.4563,
      longitude: 126.7052,
    },
    founder: {
      "@type": "Person",
      name: "최정원",
      jobTitle: "Creative Director",
    },
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@chiroweb.co.kr",
      contactType: "customer service",
      availableLanguage: ["Korean", "English"],
    },
    sameAs: [
      "https://www.instagram.com/chiro.web",
      "https://www.threads.net/@chiro.web",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://chiroweb.co.kr/#website",
    name: "치로웹디자인",
    url: "https://chiroweb.co.kr",
    publisher: { "@id": "https://chiroweb.co.kr/#organization" },
  };

  return (
    <html lang="ko" className="overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <link rel="alternate" hrefLang="ko" href="https://chiroweb.co.kr" />
      </head>
      <body
        className={`${pretendard.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${bankGothic.variable} ${cormorant.variable} font-[family-name:var(--font-pretendard),system-ui,sans-serif] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
