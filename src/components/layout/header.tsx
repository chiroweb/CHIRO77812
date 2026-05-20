"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "서비스", href: "/services" },
  { label: "포트폴리오", href: "/portfolio" },
  { label: "요금제", href: "/pricing" },
  { label: "블로그", href: "/blog" },
  { label: "소개", href: "/about" },
];

const mobileNavItems = [
  { label: "서비스", href: "/services" },
  { label: "포트폴리오", href: "/portfolio" },
  { label: "요금제", href: "/pricing" },
  { label: "블로그", href: "/blog" },
  { label: "소개", href: "/about" },
  { label: "문의하기", href: "/contact" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 60);
      setHidden(currentY > lastScrollY.current && currentY > 200);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const darkSections = document.querySelectorAll('[data-theme="dark"]');
    if (darkSections.length === 0) {
      setDarkMode(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isInDark = entries.some(
          (entry) => entry.isIntersecting && entry.intersectionRatio > 0
        );
        setDarkMode(isInDark);
      },
      {
        rootMargin: "-0px 0px -95% 0px",
        threshold: [0, 0.01],
      }
    );

    darkSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  return (
    <>
      <header
        style={{ top: "var(--banner-height, 0px)" }}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {/* Pill container — expands when not scrolled, contracts to pill when scrolled */}
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] mx-auto ${
            scrolled
              ? "max-w-[720px] mt-4 rounded-full px-3 py-1 shadow-lg border"
              : "max-w-[1400px] mt-0 rounded-none px-5 md:px-8 lg:px-12 py-0"
          } ${
            scrolled
              ? darkMode
                ? "bg-[#0a0a0a]/70 backdrop-blur-2xl border-white/[0.08]"
                : "bg-white/70 backdrop-blur-2xl border-black/[0.06]"
              : "bg-transparent border-transparent"
          }`}
        >
          <div className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-[48px]" : "h-[56px]"
          }`}>
            {/* Left: Nav links */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 text-[13px] tracking-[0.01em] transition-all duration-300 rounded-full ${
                    isActive(pathname, item.href)
                      ? scrolled
                        ? darkMode ? "text-white bg-white/10" : "text-[#1a1a1a] bg-black/[0.05]"
                        : darkMode ? "text-white" : "text-[#1a1a1a]"
                      : scrolled
                        ? darkMode
                          ? "text-white/60 hover:text-white hover:bg-white/[0.06]"
                          : "text-[#6b6b6b] hover:text-[#1a1a1a] hover:bg-black/[0.03]"
                        : darkMode ? "text-white/70 hover:text-white" : "text-[#6b6b6b] hover:text-[#1a1a1a]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Center: Logo */}
            <div className={`transition-all duration-500 ${scrolled ? "" : "absolute left-1/2 -translate-x-1/2"}`}>
              <Link href="/" className="relative z-[70]">
                <span className={`text-[18px] md:text-[20px] font-extrabold tracking-[0.08em] transition-colors duration-300 ${
                  scrolled
                    ? darkMode ? "text-white" : "text-[#1a1a1a]"
                    : darkMode ? "text-white" : "text-[#1a1a1a]"
                }`}>
                  CHIRO
                </span>
              </Link>
            </div>

            {/* Right: CTA */}
            <div className="hidden md:flex items-center">
              <Link
                href="/contact"
                className={`text-[12px] tracking-[0.02em] px-4 py-2 rounded-full transition-all duration-300 ${
                  scrolled
                    ? darkMode
                      ? "bg-white text-[#0a0a0a] hover:bg-[#FF4D00] hover:text-white"
                      : "bg-[#1a1a1a] text-white hover:bg-[#FF4D00]"
                    : darkMode
                      ? "bg-white/15 text-white border border-white/20 hover:bg-white/25"
                      : "bg-[#1a1a1a] text-white hover:bg-[#FF4D00]"
                }`}
              >
                프로젝트 문의
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-[70] md:hidden min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-[6px] cursor-pointer"
              aria-label="메뉴"
            >
              <span
                className={`block w-5 h-[1.5px] rounded-full transition-all duration-300 origin-center ${
                  menuOpen
                    ? "rotate-45 translate-y-[3.75px] bg-[#1a1a1a]"
                    : scrolled
                      ? darkMode ? "bg-white" : "bg-[#1a1a1a]"
                      : darkMode ? "bg-white" : "bg-[#1a1a1a]"
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] rounded-full transition-all duration-300 origin-center ${
                  menuOpen
                    ? "-rotate-45 -translate-y-[3.75px] bg-[#1a1a1a]"
                    : scrolled
                      ? darkMode ? "bg-white" : "bg-[#1a1a1a]"
                      : darkMode ? "bg-white" : "bg-[#1a1a1a]"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu — full screen */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[65] bg-[#fafaf8] flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col gap-1">
              {mobileNavItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-3 text-[32px] font-light tracking-[-0.02em] transition-colors duration-300 ${
                      isActive(pathname, item.href)
                        ? "text-[#FF4D00]"
                        : "text-[#1a1a1a] hover:text-[#FF4D00]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute bottom-12 left-8 text-[11px] tracking-[0.1em] text-[#9b9b9b] uppercase font-[family-name:var(--font-jetbrains-mono)]"
            >
              © 2025 CHIRO Web Design
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
