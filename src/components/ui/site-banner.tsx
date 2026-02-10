"use client";

import { useState, useEffect } from "react";
import type { Notice } from "@/lib/types";

const sizeConfig = {
  small: { height: 40, showLink: false, showImage: false },
  medium: { height: 56, showLink: true, showImage: false },
  large: { height: 80, showLink: true, showImage: true },
};

export default function SiteBanner() {
  const [banners, setBanners] = useState<Notice[]>([]);
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Restore dismissed state from sessionStorage
    try {
      const stored = sessionStorage.getItem("dismissed_banners");
      if (stored) setDismissed(new Set(JSON.parse(stored)));
    } catch { /* ignore */ }

    fetch("/api/notices")
      .then((r) => r.json())
      .then((data) => {
        const b = (data.notices || []).filter(
          (n: Notice) => n.notice_type === "banner"
        );
        setBanners(b);
      })
      .catch(() => {});
  }, []);

  const handleDismiss = (id: number) => {
    const next = new Set(dismissed);
    next.add(id);
    setDismissed(next);
    try {
      sessionStorage.setItem("dismissed_banners", JSON.stringify([...next]));
    } catch { /* ignore */ }
  };

  const visibleBanners = banners.filter((b) => !dismissed.has(b.id));

  useEffect(() => {
    // Set CSS variable for header offset
    const totalHeight = visibleBanners.reduce((sum, b) => {
      return sum + (sizeConfig[b.size]?.height || 56);
    }, 0);
    document.documentElement.style.setProperty("--banner-height", `${totalHeight}px`);
    return () => {
      document.documentElement.style.setProperty("--banner-height", "0px");
    };
  }, [visibleBanners]);

  if (visibleBanners.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60]">
      {visibleBanners.map((banner) => {
        const config = sizeConfig[banner.size] || sizeConfig.medium;

        return (
          <div
            key={banner.id}
            className="relative flex items-center justify-center gap-3 px-5 md:px-8"
            style={{
              height: config.height,
              backgroundColor: banner.bg_color,
              color: banner.text_color,
            }}
          >
            {/* Image (large only) */}
            {config.showImage && banner.image_url && (
              <img
                src={banner.image_url}
                alt=""
                className="h-[60%] object-contain"
              />
            )}

            {/* Text */}
            <span className="text-xs md:text-sm truncate max-w-[70%]">
              {banner.title}
            </span>

            {/* Link (medium/large) */}
            {config.showLink && banner.link_url && (
              <a
                href={banner.link_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs underline underline-offset-2 opacity-80 hover:opacity-100 transition-opacity shrink-0"
                style={{ color: banner.text_color }}
              >
                {banner.link_text || "자세히 보기"}
              </a>
            )}

            {/* Close button */}
            <button
              onClick={() => handleDismiss(banner.id)}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              style={{ color: banner.text_color }}
              aria-label="닫기"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}
