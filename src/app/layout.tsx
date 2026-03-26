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
    default:
      "웹사이트 제작 비용 하나로 마케팅까지 끝내는 솔루션 | CHIRO 치로웹디자인",
    template: "%s | 치로웹디자인",
  },
  description:
    "비싼 제작비와 유지비에 속지 마세요. 호주 유학생 출신 기획자의 글로벌 마케팅 세팅부터 홈페이지 제작까지, 타사 대비 30% 저렴한 풀패키지로 당신의 비즈니스를 온라인에 완벽하게 정착시켜 드립니다.",
  keywords: [
    "홈페이지 제작 비용",
    "홈페이지 유지비",
    "매출 오르는 홈페이지",
    "중소기업 홈페이지 제작",
    "중소기업 마케팅 세팅",
    "해외 마케팅 대행",
    "가성비 홈페이지",
    "홈페이지 리뉴얼 비용",
    "소상공인 홈페이지",
    "온라인 마케팅 세팅",
    "치로웹디자인",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "웹사이트 제작 비용 하나로 마케팅까지 끝내는 솔루션 CHIRO",
    description:
      "호주 유학생 출신 기획자의 글로벌 마케팅 세팅 + 타사 대비 30% 저렴한 풀패키지. 비싼 유지비 없이 매출이 오르는 홈페이지를 만들어 드립니다.",
    url: "https://chiroweb.co.kr",
    siteName: "치로웹디자인",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "https://chiroweb.co.kr/opengraph-image",
        width: 1200,
        height: 630,
        alt: "웹사이트 제작 비용 하나로 마케팅까지 끝내는 솔루션 CHIRO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "웹사이트 제작 비용 하나로 마케팅까지 끝내는 솔루션 CHIRO",
    description:
      "호주 유학생 출신 기획자의 글로벌 마케팅 세팅 + 타사 대비 30% 저렴한 풀패키지. 비싼 유지비 없이 매출이 오르는 홈페이지를 만들어 드립니다.",
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
    "@type": "ProfessionalService",
    name: "치로웹디자인",
    alternateName: "CHIRO Web Design Studio",
    url: "https://chiroweb.co.kr",
    description:
      "웹사이트 제작 비용 하나로 글로벌 마케팅 세팅까지. 호주 유학생 출신 기획자가 타사 대비 30% 저렴한 풀패키지로 비즈니스를 온라인에 정착시켜 드립니다.",
    areaServed: "KR",
    serviceType: [
      "웹사이트 제작",
      "Marketing Consulting",
      "Business Setup Service",
      "글로벌 마케팅 세팅",
    ],
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
