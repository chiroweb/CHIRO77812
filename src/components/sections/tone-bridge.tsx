"use client";

export default function ToneBridge() {
  return (
    <div className="relative h-[300px] w-full" style={{ background: "linear-gradient(to bottom, #0D1117, #F0F0EC)" }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-[12px] tracking-[0.08em] uppercase font-[family-name:var(--font-jetbrains-mono)]"
          style={{ mixBlendMode: "difference", color: "#F5F5F5" }}
        >
          ( What we do )
        </span>
      </div>
    </div>
  );
}
