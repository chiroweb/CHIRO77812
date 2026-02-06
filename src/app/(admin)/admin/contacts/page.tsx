"use client";

import { useEffect, useState } from "react";
import type { ContactSubmission } from "@/lib/types";

export default function AdminContactsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/admin/contacts")
      .then((r) => r.json())
      .then((data) => {
        setSubmissions(data.submissions || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleRead = async (sub: ContactSubmission) => {
    const res = await fetch(`/api/admin/contacts/${sub.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !sub.read }),
    });
    if (res.ok) {
      setSubmissions((prev) =>
        prev.map((s) => (s.id === sub.id ? { ...s, read: !s.read } : s))
      );
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("이 문의를 삭제하시겠습니까?")) return;
    const res = await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    if (res.ok) {
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      if (selectedId === id) setSelectedId(null);
    }
  };

  const selected = submissions.find((s) => s.id === selectedId);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-light tracking-tight">문의 관리</h1>
        <p className="text-sm text-[#9b9b9b] mt-1">접수된 문의를 확인합니다.</p>
      </div>

      {loading ? (
        <p className="text-sm text-[#9b9b9b]">불러오는 중...</p>
      ) : submissions.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-[#e5e5e3]">
          <p className="text-sm text-[#9b9b9b]">접수된 문의가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* List */}
          <div className="border-t border-[#e5e5e3]">
            {submissions.map((sub) => (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedId(sub.id);
                  if (!sub.read) toggleRead(sub);
                }}
                className={`w-full text-left py-4 px-4 border-b border-[#e5e5e3] transition-colors cursor-pointer ${
                  selectedId === sub.id ? "bg-[#fafaf8]" : "hover:bg-[#fafaf8]"
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  {!sub.read && (
                    <span className="w-2 h-2 rounded-full bg-[#FF4D00] shrink-0" />
                  )}
                  <span className="text-sm font-normal truncate">{sub.name}</span>
                  <span className="text-xs text-[#9b9b9b] ml-auto font-[family-name:var(--font-jetbrains-mono)] shrink-0">
                    {new Date(sub.created_at).toLocaleDateString("ko-KR")}
                  </span>
                </div>
                <p className="text-xs text-[#9b9b9b] truncate ml-5">{sub.email}</p>
              </button>
            ))}
          </div>

          {/* Detail */}
          {selected ? (
            <div className="border border-[#e5e5e3] p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-lg font-normal">{selected.name}</h3>
                  <p className="text-sm text-[#9b9b9b] mt-1">{selected.email}</p>
                  {selected.company && (
                    <p className="text-sm text-[#9b9b9b]">{selected.company}</p>
                  )}
                </div>
                <span className="text-xs text-[#9b9b9b] font-[family-name:var(--font-jetbrains-mono)]">
                  {new Date(selected.created_at).toLocaleString("ko-KR")}
                </span>
              </div>
              <div className="border-t border-[#e5e5e3] pt-6">
                <p className="text-sm text-[#6b6b6b] leading-[1.8] whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>
              <div className="flex gap-2 mt-6 pt-4 border-t border-[#e5e5e3]">
                <button
                  onClick={() => toggleRead(selected)}
                  className="text-xs px-3 py-1 border border-[#e5e5e3] hover:border-[#1a1a1a] transition-colors cursor-pointer"
                >
                  {selected.read ? "읽지 않음으로 표시" : "읽음으로 표시"}
                </button>
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="text-xs px-3 py-1 border border-[#e5e5e3] text-[#FF4D00] hover:border-[#FF4D00] transition-colors cursor-pointer"
                >
                  삭제
                </button>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-[#e5e5e3] flex items-center justify-center min-h-[300px]">
              <p className="text-sm text-[#9b9b9b]">문의를 선택하세요</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
