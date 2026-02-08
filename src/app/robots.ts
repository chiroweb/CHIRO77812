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
    ],
    sitemap: "https://chiroweb.co.kr/sitemap.xml",
  };
}
