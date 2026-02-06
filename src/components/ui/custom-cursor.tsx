"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorMode = "default" | "hover" | "view";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 250 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 250 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    const handleElementHover = () => {
      const addHoverListeners = () => {
        // View mode elements (portfolio list)
        const viewElements = document.querySelectorAll('[data-cursor="view"]');
        viewElements.forEach((el) => {
          el.addEventListener("mouseenter", () => setCursorMode("view"));
          el.addEventListener("mouseleave", () => setCursorMode("default"));
        });

        // Regular hover elements
        const interactiveElements = document.querySelectorAll(
          'a:not([data-cursor="view"]), button, [role="button"], input, textarea, select, [data-cursor="hover"]'
        );
        interactiveElements.forEach((el) => {
          el.addEventListener("mouseenter", () => {
            if (cursorMode !== "view") setCursorMode("hover");
          });
          el.addEventListener("mouseleave", () => setCursorMode("default"));
        });
      };

      addHoverListeners();

      const observer = new MutationObserver(addHoverListeners);
      observer.observe(document.body, { childList: true, subtree: true });

      return observer;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    const observer = handleElementHover();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer?.disconnect();
    };
  }, [cursorX, cursorY, visible, cursorMode]);

  if (typeof window !== "undefined") {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return null;
  }

  const getCursorSize = () => {
    switch (cursorMode) {
      case "view":
        return 72;
      case "hover":
        return 48;
      default:
        return 32;
    }
  };

  const getDotSize = () => {
    switch (cursorMode) {
      case "view":
        return 0;
      case "hover":
        return 6;
      default:
        return 4;
    }
  };

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Outer ring with VIEW text */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
        }}
      >
        <motion.div
          animate={{
            width: getCursorSize(),
            height: getCursorSize(),
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="rounded-full border border-white -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        >
          {cursorMode === "view" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[9px] tracking-[0.15em] uppercase text-white font-medium"
            >
              VIEW
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Center dot - hidden in view mode */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          animate={{
            width: getDotSize(),
            height: getDotSize(),
            opacity: visible && cursorMode !== "view" ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full bg-white -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>
    </>
  );
}
