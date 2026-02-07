import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
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
    default: "치로웹디자인 — 당일 시작, 실시간 확인 | 웹 디자인 스튜디오",
    template: "%s | 치로웹디자인",
  },
  description:
    "상담 당일 빌드 시작, 실시간 링크로 제작 과정을 직접 확인. 소수 프로젝트에 깊이 집중하는 프리미엄 웹 디자인 스튜디오 치로.",
  keywords: [
    "홈페이지 제작",
    "웹디자인",
    "웹사이트 제작",
    "맞춤형 홈페이지",
    "웹디자인 스튜디오",
    "반응형 웹사이트",
    "기업 홈페이지",
    "브랜드 사이트",
    "치로웹디자인",
  ],
  icons: {
    icon: "https://chiro-web.s3.ap-northeast-2.amazonaws.com/image/chirologo.png",
    apple: "https://chiro-web.s3.ap-northeast-2.amazonaws.com/image/chirologo.png",
  },
  openGraph: {
    title: "치로웹디자인 — 당일 시작, 실시간 확인",
    description:
      "상담 당일 빌드 시작, 실시간 링크로 제작 과정을 직접 확인. 기다리지 않는 웹 디자인 스튜디오.",
    url: "https://chiroweb.co.kr",
    siteName: "치로웹디자인",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "https://chiro-web.s3.ap-northeast-2.amazonaws.com/image/ogphoto.png",
        width: 1200,
        height: 630,
        alt: "치로웹디자인 — 웹 디자인 스튜디오",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "치로웹디자인 — 당일 시작, 실시간 확인",
    description:
      "상담 당일 빌드 시작, 실시간 링크로 제작 과정을 직접 확인. 기다리지 않는 웹 디자인 스튜디오.",
    images: ["https://chiro-web.s3.ap-northeast-2.amazonaws.com/image/ogphoto.png"],
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
    "@type": "ProfessionalService",
    name: "치로웹디자인",
    alternateName: "CHIRO Web Design Studio",
    url: "https://chiroweb.co.kr",
    description:
      "상담 당일 빌드 시작, 실시간 링크로 제작 과정을 직접 확인. 소수 프로젝트에 깊이 집중하는 프리미엄 웹 디자인 스튜디오.",
    areaServed: "KR",
    serviceType: "웹 디자인",
    priceRange: "₩₩",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Seoul",
      addressCountry: "KR",
    },
    sameAs: [],
  };

  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${pretendard.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${bankGothic.variable} font-[family-name:var(--font-pretendard),system-ui,sans-serif] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
