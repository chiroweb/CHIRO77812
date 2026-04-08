const clients = [
  "NBPKOREA",
  "Man Solution",
  "FUNI",
  "STUDIO",
  "KAIROS",
  "HIVE WORKS",
];

function ClientStrip() {
  return (
    <>
      {clients.map((name, i) => (
        <span key={i} className="flex items-center gap-8 md:gap-10 shrink-0">
          <span className="text-[14px] font-medium text-[#888] whitespace-nowrap">
            {name}
          </span>
          <span className="flex items-center gap-1.5 shrink-0">
            <span className="w-[6px] h-[6px] rounded-full bg-[#00C853]" />
            <span className="text-[11px] text-[#aaa]">유지보수중</span>
          </span>
        </span>
      ))}
    </>
  );
}

export default function Clients() {
  return (
    <section className="h-[70px] bg-transparent border-y border-[#E0DCD6] flex items-center overflow-hidden">
      <div className="client-marquee flex items-center gap-8 md:gap-10 hover:[animation-play-state:paused]">
        <ClientStrip />
        <ClientStrip />
      </div>
    </section>
  );
}
