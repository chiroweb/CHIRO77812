import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_KR, JetBrains_Mono } from "next/font/google";
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

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const notoSerifKR = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CHIRO — Web Design Studio",
  description:
    "기획이 곧 개발이 되는 투명함. 당신의 브랜드에 온전히 몰입합니다. 치로웹디자인은 소수의 프로젝트에 깊이 집중하는 웹 디자인 스튜디오입니다.",
  keywords: ["웹디자인", "홈페이지 제작", "치로웹디자인", "웹사이트 제작"],
  openGraph: {
    title: "CHIRO — Web Design Studio",
    description: "기획이 곧 개발이 되는 투명함. 당신의 브랜드에 온전히 몰입합니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} ${notoSansJP.variable} ${jetbrainsMono.variable} ${notoSerifKR.variable} font-[family-name:var(--font-pretendard),var(--font-noto-sans-jp),system-ui,sans-serif] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
