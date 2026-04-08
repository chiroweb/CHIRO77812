"use client";

import { useState, useEffect } from "react";

interface SettingRow {
  key: string;
  value: string;
}

let cachedCount: number | null = null;

export default function ScarcityBar() {
  const [count, setCount] = useState<number | null>(cachedCount);

  useEffect(() => {
    if (cachedCount !== null) {
      setCount(cachedCount);
      return;
    }
    fetch("/api/settings")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((settings: SettingRow[]) => {
        const setting = settings.find(
          (s) => s.key === "available_project_count"
        );
        if (setting) {
          const value = parseInt(setting.value, 10);
          if (!isNaN(value) && value > 0) {
            cachedCount = value;
            setCount(value);
          }
        }
      })
      .catch(() => {});
  }, []);

  if (count === null) return null;

  return (
    <div className="bg-[#1a1a1a] text-center py-2 px-5">
      <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.1em] text-white/80">
        이번 달 수용 가능 프로젝트:{" "}
        <span className="text-[#FF4D00] font-medium">{count}건</span>
      </p>
    </div>
  );
}
