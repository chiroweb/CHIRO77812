import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Yeti",
        allow: "/",
      },
    ],
    sitemap: "https://chiroweb.co.kr/sitemap.xml",
  };
}
