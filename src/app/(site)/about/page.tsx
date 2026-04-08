import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-[#999] text-[14px]">준비 중입니다.</p>
    </div>
  );
}
