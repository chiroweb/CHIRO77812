"use client";

const services = [
  {
    number: "01",
    title: "웹사이트 기획 & 개발",
    description: "페이지 수 제한 없음. 반응형. 커스텀.",
    icon: <WebIcon />,
  },
  {
    number: "02",
    title: "SEO / AEO / GEO",
    description: "구글, AI, 지역 검색. 전부 대응.",
    icon: <SearchIcon />,
  },
  {
    number: "03",
    title: "구글 비즈니스 & 네이버 플레이스",
    description: "온라인 거점 등록부터 최적화까지.",
    icon: <MapIcon />,
  },
  {
    number: "04",
    title: "도메인 · 호스팅 · 유지보수",
    description: "무료 제공. 추가 비용 없음.",
    icon: <ShieldIcon />,
  },
];

export default function ServiceEditorial() {
  return (
    <section className="bg-[#f7f7f5] px-5 md:px-8 lg:px-16 pt-[120px] md:pt-[160px] pb-[40px] md:pb-[60px]">
      <div className="max-w-[1280px] mx-auto">
        {/* ── Intro ── */}
        <p className="text-[12px] tracking-[0.15em] uppercase text-[#999] mb-8 font-[family-name:var(--font-jetbrains-mono)]">
          Service
        </p>

        <h2 className="text-[15vw] md:text-[12vw] font-extrabold text-[#1a1a1a] tracking-[-0.03em] leading-[0.9] mb-8">
          ALL—IN—ONE
        </h2>

        <p className="text-[16px] md:text-[18px] text-[#999] leading-[1.7] mb-[80px] md:mb-[120px] max-w-lg">
          업계 최초. 홈페이지 하나에 마케팅까지 전부 포함.
        </p>

        {/* ── Card Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {services.map((service) => (
            <div
              key={service.number}
              className="bg-transparent rounded-2xl p-6 md:p-8 flex flex-col min-h-[220px] md:min-h-[260px] border border-[#E0DCD6] hover:border-[#FF4D00] hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              {/* Icon */}
              <div className="mb-5 text-[#1a1a1a]">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-[15px] md:text-[17px] font-bold text-[#1a1a1a] tracking-[-0.01em] leading-[1.3] mb-2">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[12px] md:text-[13px] text-[#888] leading-[1.6] mt-auto">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── Closing ── */}
        <div className="mt-[24px] md:mt-[32px] text-center">
          <p className="text-[32px] md:text-[44px] lg:text-[56px] font-extrabold text-[#1a1a1a] tracking-[-0.03em] leading-[1.1]">
            별도 비용, <span className="text-[#FF4D00]">없습니다.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Icons ── */

function WebIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="26" height="20" rx="2" />
      <line x1="3" y1="11" x2="29" y2="11" />
      <circle cx="7" cy="8" r="1" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="8" r="1" fill="currentColor" stroke="none" />
      <line x1="9" y1="17" x2="16" y2="17" />
      <line x1="9" y1="21" x2="13" y2="21" />
      <rect x="19" y="14" width="6" height="8" rx="1" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="14" r="8" />
      <line x1="20" y1="20" x2="27" y2="27" />
      <path d="M11 11l2 4 3-2 2 3" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4C11.6 4 8 7.6 8 12c0 6 8 16 8 16s8-10 8-16c0-4.4-3.6-8-8-8z" />
      <circle cx="16" cy="12" r="3" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3L4 8v7c0 7.5 5.1 14.5 12 16 6.9-1.5 12-8.5 12-16V8L16 3z" />
      <path d="M12 16l3 3 5-6" />
    </svg>
  );
}
