"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import TiptapEditor from "@/components/admin/tiptap-editor";

export default function NewPortfolioPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [clientName, setClientName] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [problem, setProblem] = useState("");
  const [result, setResult] = useState("");
  const [content, setContent] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [imageUrl, setImageUrl] = useState("");
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const generateSlug = (value: string) => {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slug) {
      setSlug(generateSlug(value));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/chiro/upload", { method: "POST", body: formData });
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
      const res = await fetch("/api/chiro/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, slug, category, client_name: clientName, site_url: siteUrl,
          problem, result, content, year, image_url: imageUrl, published,
        }),
      });

      if (res.ok) {
        router.push("/chiro/portfolio");
      } else {
        alert("저장에 실패했습니다.");
      }
    } catch {
      alert("오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-light tracking-tight">새 프로젝트</h1>
        <p className="text-sm text-[#9b9b9b] mt-1">새 포트폴리오 프로젝트를 추가합니다.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">프로젝트명</label>
          <input type="text" value={name} onChange={(e) => handleNameChange(e.target.value)} required
            className="w-full border-b border-[#e5e5e3] py-3 text-lg bg-transparent outline-none focus:border-[#1a1a1a] transition-colors" />
        </div>

        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">슬러그 (URL)</label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#9b9b9b]">/portfolio/</span>
            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)}
              className="flex-1 border-b border-[#e5e5e3] py-3 text-sm bg-transparent outline-none focus:border-[#1a1a1a] transition-colors font-[family-name:var(--font-jetbrains-mono)]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">카테고리</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required placeholder="Branding & Web"
              className="w-full border-b border-[#e5e5e3] py-3 text-sm bg-transparent outline-none focus:border-[#1a1a1a] transition-colors" />
          </div>
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">연도</label>
            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="2024"
              className="w-full border-b border-[#e5e5e3] py-3 text-sm bg-transparent outline-none focus:border-[#1a1a1a] transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">클라이언트명</label>
            <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="회사명 또는 클라이언트명"
              className="w-full border-b border-[#e5e5e3] py-3 text-sm bg-transparent outline-none focus:border-[#1a1a1a] transition-colors" />
          </div>
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">사이트 주소</label>
            <input type="url" value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} placeholder="https://example.com"
              className="w-full border-b border-[#e5e5e3] py-3 text-sm bg-transparent outline-none focus:border-[#1a1a1a] transition-colors" />
          </div>
        </div>

        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">과제 (Challenge)</label>
          <textarea value={problem} onChange={(e) => setProblem(e.target.value)} rows={3} placeholder="프로젝트의 핵심 과제를 설명하세요"
            className="w-full border-b border-[#e5e5e3] py-3 text-sm bg-transparent outline-none focus:border-[#1a1a1a] transition-colors resize-none" />
        </div>

        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">결과 (Result)</label>
          <textarea value={result} onChange={(e) => setResult(e.target.value)} rows={2} placeholder="프로젝트의 결과를 설명하세요"
            className="w-full border-b border-[#e5e5e3] py-3 text-sm bg-transparent outline-none focus:border-[#1a1a1a] transition-colors resize-none" />
        </div>

        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">대표 이미지</label>
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
          <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">상세 콘텐츠</label>
          <p className="text-xs text-[#9b9b9b] mb-4">프로젝트 진행 과정, 스크린샷, 상세 설명 등을 자유롭게 작성하세요.</p>
          <TiptapEditor content={content} onChange={setContent} />
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
