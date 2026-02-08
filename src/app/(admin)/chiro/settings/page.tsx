"use client";

import { useEffect, useState } from "react";

const defaultSettings: Record<string, { label: string; placeholder: string }> = {
  site_title: { label: "사이트 제목", placeholder: "CHIRO — Web Design Studio" },
  site_description: { label: "사이트 설명", placeholder: "기획이 곧 개발이 되는 투명함..." },
  contact_email: { label: "이메일", placeholder: "hello@chiroweb.kr" },
  contact_location: { label: "위치", placeholder: "Seoul, South Korea" },
  response_time: { label: "응답 시간 안내", placeholder: "영업일 기준 24시간 내에 답변을 드립니다." },
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/chiro/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings(data.settings || {});
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch("/api/chiro/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      alert("저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-[#9b9b9b]">불러오는 중...</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-light tracking-tight">사이트 설정</h1>
        <p className="text-sm text-[#9b9b9b] mt-1">사이트 기본 정보를 설정합니다.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
        {Object.entries(defaultSettings).map(([key, config]) => (
          <div key={key}>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
              {config.label}
            </label>
            <input
              type="text"
              value={settings[key] || ""}
              onChange={(e) => setSettings((prev) => ({ ...prev, [key]: e.target.value }))}
              placeholder={config.placeholder}
              className="w-full border-b border-[#e5e5e3] py-3 text-sm bg-transparent outline-none focus:border-[#1a1a1a] transition-colors"
            />
          </div>
        ))}

        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="border border-[#1a1a1a] text-[#1a1a1a] px-8 py-3 text-sm tracking-[0.05em] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white disabled:opacity-50 cursor-pointer"
          >
            {saving ? "저장 중..." : "저장"}
          </button>
          {saved && (
            <span className="text-sm text-green-600">저장되었습니다.</span>
          )}
        </div>
      </form>
    </div>
  );
}
