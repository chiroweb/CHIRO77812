"use client";

export default function Tagline() {
  const text = "AI 시대의 유일무이 올인원 서비스";

  return (
    <section className="h-[8vh] flex items-center bg-white overflow-hidden">
      <div className="tagline-scroll flex whitespace-nowrap">
        <span className="text-[5vw] md:text-[2.5vw] font-extrabold tracking-[0.15em] text-[#1a1a1a] leading-none select-none px-[4vw]">
          {text}
        </span>
        <span className="text-[5vw] md:text-[2.5vw] font-extrabold tracking-[0.15em] text-[#1a1a1a] leading-none select-none px-[4vw]">
          {text}
        </span>
        {/* Duplicate for seamless loop */}
        <span className="text-[5vw] md:text-[2.5vw] font-extrabold tracking-[0.15em] text-[#1a1a1a] leading-none select-none px-[4vw]">
          {text}
        </span>
        <span className="text-[5vw] md:text-[2.5vw] font-extrabold tracking-[0.15em] text-[#1a1a1a] leading-none select-none px-[4vw]">
          {text}
        </span>
      </div>
    </section>
  );
}
