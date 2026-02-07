import Link from "next/link";
import Divider from "@/components/ui/divider";

const footerLinks = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="px-5 md:px-8 pb-8">
      <Divider />
      <div className="max-w-[1280px] mx-auto pt-16 pb-8">
        <div className="grid grid-cols-4 md:grid-cols-12 gap-6">
          {/* Brand */}
          <div className="col-span-4 md:col-span-4">
            <p className="text-sm text-[#6b6b6b] leading-relaxed max-w-xs">
              기획이 곧 개발이 되는 투명함.
              <br />
              당신의 브랜드에 온전히 몰입합니다.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-span-2 md:col-span-2 md:col-start-7">
            <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-4">
              Menu
            </p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
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
          <div className="col-span-2 md:col-span-3 md:col-start-10">
            <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-4">
              Contact
            </p>
            <ul className="space-y-2 text-sm text-[#6b6b6b]">
              <li>hello@chiroweb.kr</li>
              <li>Seoul, South Korea</li>
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
