"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/chiro", label: "대시보드", icon: "◻" },
  { href: "/chiro/blog", label: "블로그", icon: "✎" },
  { href: "/chiro/portfolio", label: "포트폴리오", icon: "◈" },
  { href: "/chiro/notices", label: "공지/배너", icon: "▣" },
  { href: "/chiro/contacts", label: "문의", icon: "✉" },
  { href: "/chiro/settings", label: "설정", icon: "⚙" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Login page: no sidebar
  if (pathname === "/chiro/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      <aside className="w-[240px] border-r border-[#e5e5e3] flex flex-col fixed top-0 left-0 bottom-0 bg-white z-40">
        <div className="h-16 flex items-center px-6 border-b border-[#e5e5e3]">
          <Link href="/chiro" className="text-sm tracking-[0.2em] uppercase font-medium text-[#1a1a1a]">
            CHIRO Admin
          </Link>
        </div>

        <nav className="flex-1 py-4">
          {navItems.map((item) => {
            const isActive =
              item.href === "/chiro"
                ? pathname === "/chiro"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors duration-200 ${
                  isActive
                    ? "text-[#1a1a1a] bg-[#fafaf8] border-r-2 border-r-[#FF4D00]"
                    : "text-[#6b6b6b] hover:text-[#1a1a1a] hover:bg-[#fafaf8]"
                }`}
              >
                <span className="text-xs">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-[#e5e5e3]">
          <Link href="/" className="text-xs text-[#9b9b9b] hover:text-[#1a1a1a] transition-colors">
            ← 사이트로 돌아가기
          </Link>
          <form action="/api/chiro/logout" method="POST" className="mt-3">
            <button
              type="submit"
              className="text-xs text-[#9b9b9b] hover:text-[#FF4D00] transition-colors cursor-pointer"
            >
              로그아웃
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-[240px] min-h-screen">
        <div className="p-8 max-w-[1200px]">
          {children}
        </div>
      </main>
    </div>
  );
}
