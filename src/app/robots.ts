import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/chiro/", "/api/"],
      },
      {
        userAgent: "Yeti",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Daumoa",
        allow: "/",
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/portfolio/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
    ],
    sitemap: "https://chiroweb.co.kr/sitemap.xml",
    // llms.txt available at https://chiroweb.co.kr/llms.txt
  };
}
