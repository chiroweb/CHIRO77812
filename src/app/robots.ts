import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // 정적 애셋은 색인 대상에서 제외 (크롤링 예산 절약 + "크롤링됨 - 색인 생성 안 됨" 방지)
  const commonDisallow = [
    "/chiro/",
    "/api/",
    "/_next/",
    "/_next/static/",
    "/_next/image",
    "/favicon.ico",
    "/apple-icon.png",
    "/icon.svg",
    "/opengraph-image",
    "/*.woff2$",
    "/*.woff$",
    "/*.ttf$",
    "/*.ico$",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: commonDisallow,
      },
      {
        userAgent: "Yeti",
        allow: "/",
        disallow: commonDisallow,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: commonDisallow,
      },
      {
        userAgent: "Daumoa",
        allow: "/",
        disallow: commonDisallow,
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/portfolio/", "/public/"],
        disallow: ["/_next/", "/api/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: commonDisallow,
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: commonDisallow,
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: commonDisallow,
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: commonDisallow,
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: commonDisallow,
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: commonDisallow,
      },
    ],
    sitemap: "https://chiroweb.co.kr/sitemap.xml",
    // llms.txt available at https://chiroweb.co.kr/llms.txt
  };
}
