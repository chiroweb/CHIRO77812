"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPortfolioPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [problem, setProblem] = useState("");
  const [result, setResult] = useState("");
  const [year, setYear] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/portfolio/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setName(data.name || "");
        setCategory(data.category || "");
        setProblem(data.problem || "");
        setResult(data.result || "");
        setYear(data.year || "");
        setImageUrl(data.image_url || "");
        setPublished(data.published ?? true);
        setLoading(false);
      })
      .catch(() => {
        alert("프로젝트를 불러오지 못했습니다.");
        router.push("/admin/portfolio");
      });
  }, [id, router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setImageUrl(data.url);
    } catch {
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/portfolio/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category, problem, result, year, image_url: imageUrl, published }),
      });

      if (res.ok) {
        router.push("/admin/portfolio");
      } else {
        alert("저장에 실패했습니다.");
      }
    } catch {
      alert("오류가 발생했습니다.");
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
        <h1 className="text-2xl font-light tracking-tight">프로젝트 수정</h1>
        <p className="text-sm text-[#9b9b9b] mt-1">포트폴리오 프로젝트를 수정합니다.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">프로젝트명</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
            className="w-full border-b border-[#e5e5e3] py-3 text-lg bg-transparent outline-none focus:border-[#1a1a1a] transition-colors" />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">카테고리</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required
              className="w-full border-b border-[#e5e5e3] py-3 text-sm bg-transparent outline-none focus:border-[#1a1a1a] transition-colors" />
          </div>
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">연도</label>
            <input type="text" value={year} onChange={(e) => setYear(e.target.value)}
              className="w-full border-b border-[#e5e5e3] py-3 text-sm bg-transparent outline-none focus:border-[#1a1a1a] transition-colors" />
          </div>
        </div>

        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">문제점</label>
          <textarea value={problem} onChange={(e) => setProblem(e.target.value)} rows={3}
            className="w-full border-b border-[#e5e5e3] py-3 text-sm bg-transparent outline-none focus:border-[#1a1a1a] transition-colors resize-none" />
        </div>

        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">결과</label>
          <textarea value={result} onChange={(e) => setResult(e.target.value)} rows={2}
            className="w-full border-b border-[#e5e5e3] py-3 text-sm bg-transparent outline-none focus:border-[#1a1a1a] transition-colors resize-none" />
        </div>

        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">이미지</label>
          {imageUrl && (
            <div className="mb-3">
              <img src={imageUrl} alt="Preview" className="w-48 h-36 object-cover border border-[#e5e5e3]" />
            </div>
          )}
          <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}
            className="text-xs px-4 py-2 border border-[#e5e5e3] hover:border-[#1a1a1a] transition-colors cursor-pointer">
            {uploading ? "업로드 중..." : "이미지 업로드"}
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </div>

        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-4 h-4 accent-[#FF4D00]" />
            <span className="text-sm text-[#6b6b6b]">공개</span>
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving}
            className="border border-[#1a1a1a] text-[#1a1a1a] px-8 py-3 text-sm tracking-[0.05em] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white disabled:opacity-50 cursor-pointer">
            {saving ? "저장 중..." : "저장"}
          </button>
          <button type="button" onClick={() => router.back()}
            className="border border-[#e5e5e3] text-[#6b6b6b] px-8 py-3 text-sm tracking-[0.05em] transition-all duration-300 hover:border-[#1a1a1a] hover:text-[#1a1a1a] cursor-pointer">
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
