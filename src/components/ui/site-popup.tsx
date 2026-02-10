"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DOMPurify from "dompurify";
import type { Notice } from "@/lib/types";

const sizeWidth = {
  small: 400,
  medium: 560,
  large: 720,
};

export default function SitePopup() {
  const [popups, setPopups] = useState<Notice[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch("/api/notices")
      .then((r) => r.json())
      .then((data) => {
        const allPopups = (data.notices || []).filter(
          (n: Notice) => n.notice_type === "popup"
        );

        // Filter out "오늘 하루 보지 않기" dismissed popups
        const now = new Date().toDateString();
        const filtered = allPopups.filter((p: Notice) => {
          try {
            const dismissedDate = localStorage.getItem(`popup_dismissed_${p.id}`);
            return dismissedDate !== now;
          } catch {
            return true;
          }
        });

        if (filtered.length > 0) {
          setPopups(filtered);
          setVisible(true);
        }
      })
      .catch(() => {});
  }, []);

  const handleClose = () => {
    if (currentIndex < popups.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setVisible(false);
    }
  };

  const handleDismissToday = () => {
    const popup = popups[currentIndex];
    if (popup) {
      try {
        localStorage.setItem(
          `popup_dismissed_${popup.id}`,
          new Date().toDateString()
        );
      } catch { /* ignore */ }
    }
    handleClose();
  };

  if (!visible || popups.length === 0) return null;

  const popup = popups[currentIndex];
  const width = sizeWidth[popup.size] || sizeWidth.medium;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-5"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative bg-white overflow-hidden shadow-2xl"
            style={{ width: "100%", maxWidth: width }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm hover:bg-white transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="#1a1a1a" strokeWidth="1.5" />
              </svg>
            </button>

            {/* Image */}
            {popup.image_url && (
              <div className="w-full">
                <img
                  src={popup.image_url}
                  alt={popup.title}
                  className="w-full object-cover"
                  style={{ maxHeight: width * 0.6 }}
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-medium mb-3">{popup.title}</h3>

              {popup.content && (
                <div
                  className="text-sm text-[#6b6b6b] leading-relaxed mb-4 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(popup.content, {
                      ALLOWED_TAGS: ["p", "h2", "h3", "h4", "strong", "em", "a", "ul", "ol", "li", "blockquote", "br", "hr"],
                      ALLOWED_ATTR: ["href", "target", "rel", "class"],
                    }),
                  }}
                />
              )}

              {popup.link_url && (
                <a
                  href={popup.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-[#1a1a1a] text-[#1a1a1a] px-6 py-2.5 text-sm tracking-[0.05em] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white"
                >
                  {popup.link_text || "자세히 보기"}
                </a>
              )}
            </div>

            {/* Footer: 오늘 하루 보지 않기 */}
            <div className="px-6 md:px-8 pb-5 flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  onChange={handleDismissToday}
                  className="w-3.5 h-3.5 accent-[#FF4D00]"
                />
                <span className="text-xs text-[#9b9b9b]">오늘 하루 보지 않기</span>
              </label>
              {popups.length > 1 && (
                <span className="text-xs text-[#9b9b9b]">
                  {currentIndex + 1} / {popups.length}
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
