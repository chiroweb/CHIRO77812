import Link from "next/link";
import Divider from "@/components/ui/divider";

const serviceLinks = [
  { label: "홈페이지 제작", href: "/services/website" },
  { label: "홈페이지 리모델링", href: "/services/remodeling" },
  { label: "SEO/AEO 통합 설계", href: "/services/seo-aeo" },
];

const infoLinks = [
  { label: "포트폴리오", href: "/portfolio" },
  { label: "후기", href: "/reviews" },
  { label: "요금제", href: "/pricing" },
  { label: "소개", href: "/about" },
];

const resourceLinks = [
  { label: "블로그", href: "/blog" },
  { label: "무료 진단", href: "/free-diagnosis" },
  { label: "문의", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="px-5 md:px-8 pb-8">
      <Divider />
      <div className="max-w-[1280px] mx-auto pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3">
            <p className="text-sm text-[#6b6b6b] leading-relaxed max-w-xs">
              기획이 곧 개발이 되는 투명함.
              <br />
              당신의 브랜드에 온전히 몰입합니다.
            </p>
          </div>

          {/* 서비스 */}
          <div className="col-span-1 md:col-span-2 md:col-start-5">
            <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-4">
              서비스
            </p>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 정보 */}
          <div className="col-span-1 md:col-span-2 md:col-start-7">
            <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-4">
              정보
            </p>
            <ul className="space-y-2">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 리소스 */}
          <div className="col-span-1 md:col-span-2 md:col-start-9">
            <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-4">
              리소스
            </p>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 md:col-span-2 md:col-start-11">
            <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-4">
              Contact
            </p>
            <ul className="space-y-2 text-sm text-[#6b6b6b]">
              <li>chiroweb75@gmail.com</li>
              <li>010-6815-0775</li>
              <li>대표 최정원</li>
              <li>센트럴 비즈한라 2740호</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-[#E0E0E0] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-[#9b9b9b] tracking-wider">
            &copy; {new Date().getFullYear()} CHIRO Web Design. All rights reserved.
          </p>
          <p className="text-xs text-[#9b9b9b] tracking-wider">
            Designed &amp; Developed by CHIRO
          </p>
        </div>
      </div>
    </footer>
  );
}
