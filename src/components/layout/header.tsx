"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-5 md:px-8 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-[#E0E0E0]"
            : "bg-transparent"
        }`}
      >
        <Link href="/" className="relative z-50">
          <Image
            src="/logo.svg"
            alt="CHIRO"
            width={80}
            height={24}
            className="h-6 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-[13px] tracking-[0.1em] uppercase text-[#1a1a1a] hover:opacity-50 transition-opacity duration-300 pb-1"
            >
              {item.label}
              {pathname === item.href && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#FF4D00]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 md:hidden w-6 h-6 flex flex-col justify-center gap-[5px] cursor-pointer"
          aria-label="메뉴"
        >
          <span
            className={`block w-full h-[1px] bg-[#1a1a1a] transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[3px]" : ""
            }`}
          />
          <span
            className={`block w-full h-[1px] bg-[#1a1a1a] transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[3px]" : ""
            }`}
          />
        </button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-white flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="relative text-4xl font-light tracking-tight text-[#1a1a1a]"
                  >
                    {item.label}
                    {pathname === item.href && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FF4D00]" />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
