"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Notice } from "@/lib/types";

type FilterType = "all" | "banner" | "popup";

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("all");

  const fetchNotices = () => {
    const url = filter === "all" ? "/api/chiro/notices" : `/api/chiro/notices?type=${filter}`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setNotices(data.notices || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    fetchNotices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleDelete = async (id: number) => {
    if (!confirm("이 공지를 삭제하시겠습니까?")) return;

    const res = await fetch(`/api/chiro/notices/${id}`, { method: "DELETE" });
    if (res.ok) {
      setNotices((prev) => prev.filter((n) => n.id !== id));
    }
  };

  const togglePublished = async (notice: Notice) => {
    const res = await fetch(`/api/chiro/notices/${notice.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...notice,
        published: !notice.published,
      }),
    });
    if (res.ok) {
      setNotices((prev) =>
        prev.map((n) =>
          n.id === notice.id ? { ...n, published: !n.published } : n
        )
      );
    }
  };

  const sizeLabel = (size: string) => {
    switch (size) {
      case "small": return "S";
      case "medium": return "M";
      case "large": return "L";
      default: return "M";
    }
  };

  const tabs: { key: FilterType; label: string }[] = [
    { key: "all", label: "전체" },
    { key: "banner", label: "배너" },
    { key: "popup", label: "팝업" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light tracking-tight">공지 / 배너 관리</h1>
          <p className="text-sm text-[#9b9b9b] mt-1">상단 배너 및 팝업 공지를 관리합니다.</p>
        </div>
        <Link
          href="/chiro/notices/new"
          className="border border-[#1a1a1a] text-[#1a1a1a] px-6 py-2 text-sm tracking-[0.05em] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white"
        >
          새 공지 작성
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 text-sm transition-colors cursor-pointer ${
              filter === tab.key
                ? "bg-[#1a1a1a] text-white"
                : "bg-[#fafaf8] text-[#6b6b6b] hover:text-[#1a1a1a]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-[#9b9b9b]">불러오는 중...</p>
      ) : notices.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-[#e5e5e3]">
          <p className="text-sm text-[#9b9b9b]">아직 등록된 공지가 없습니다.</p>
        </div>
      ) : (
        <div className="border-t border-[#e5e5e3]">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="flex items-center justify-between py-4 border-b border-[#e5e5e3]"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      notice.published ? "bg-green-500" : "bg-[#e5e5e3]"
                    }`}
                  />
                  <span
                    className={`text-[10px] px-2 py-0.5 tracking-[0.1em] uppercase ${
                      notice.notice_type === "banner"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-purple-50 text-purple-600"
                    }`}
                  >
                    {notice.notice_type === "banner" ? "배너" : "팝업"}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-[#fafaf8] text-[#6b6b6b]">
                    {sizeLabel(notice.size)}
                  </span>
                  <Link
                    href={`/chiro/notices/${notice.id}/edit`}
                    className="text-base font-normal truncate hover:opacity-60 transition-opacity"
                  >
                    {notice.title}
                  </Link>
                </div>
                <div className="flex items-center gap-4 ml-5">
                  <span className="text-xs text-[#9b9b9b] font-[family-name:var(--font-jetbrains-mono)]">
                    {new Date(notice.created_at).toLocaleDateString("ko-KR")}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => togglePublished(notice)}
                  className="text-xs px-3 py-1 border border-[#e5e5e3] hover:border-[#1a1a1a] transition-colors cursor-pointer"
                >
                  {notice.published ? "비공개" : "공개"}
                </button>
                <Link
                  href={`/chiro/notices/${notice.id}/edit`}
                  className="text-xs px-3 py-1 border border-[#e5e5e3] hover:border-[#1a1a1a] transition-colors"
                >
                  수정
                </Link>
                <button
                  onClick={() => handleDelete(notice.id)}
                  className="text-xs px-3 py-1 border border-[#e5e5e3] text-[#FF4D00] hover:border-[#FF4D00] transition-colors cursor-pointer"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
