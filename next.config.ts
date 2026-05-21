import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "chiro-web.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:all*(woff2|woff|ttf|otf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:all*(png|jpg|jpeg|webp|avif|svg|gif|ico|mp4)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // 이전 사이트 .html URL → 새 URL (301 영구 리다이렉트)
      {
        source: "/about.html",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/portfolio.html",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/contact.html",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      // www → non-www 리다이렉트
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.chiroweb.co.kr" }],
        destination: "https://chiroweb.co.kr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
