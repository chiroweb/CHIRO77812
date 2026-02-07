import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
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
