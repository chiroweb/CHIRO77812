"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { PortfolioProject } from "@/lib/types";

const SortablePortfolioList = dynamic(
  () => import("@/components/admin/sortable-portfolio"),
  { ssr: false }
);

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/portfolio")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleReorder = useCallback(async (reordered: PortfolioProject[]) => {
    setProjects(reordered);
    // Save to server
    await fetch("/api/admin/portfolio/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderedIds: reordered.map((p) => p.id) }),
    });
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    if (!confirm("이 프로젝트를 삭제하시겠습니까?")) return;
    const res = await fetch(`/api/admin/portfolio/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light tracking-tight">포트폴리오 관리</h1>
          <p className="text-sm text-[#9b9b9b] mt-1">프로젝트를 추가하고 드래그로 순서를 변경하세요.</p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="border border-[#1a1a1a] text-[#1a1a1a] px-6 py-2 text-sm tracking-[0.05em] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white"
        >
          새 프로젝트
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-[#9b9b9b]">불러오는 중...</p>
      ) : projects.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-[#e5e5e3]">
          <p className="text-sm text-[#9b9b9b]">아직 등록된 프로젝트가 없습니다.</p>
        </div>
      ) : (
        <SortablePortfolioList
          projects={projects}
          onReorder={handleReorder}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
