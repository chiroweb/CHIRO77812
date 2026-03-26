"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import TiptapEditor from "@/components/admin/tiptap-editor";
import { uploadImageFile } from "@/lib/upload-client";
import {
  DEFAULT_PORTFOLIO_CATEGORY,
  PORTFOLIO_CATEGORIES,
  isPortfolioCategory,
} from "@/lib/portfolio-categories";

export default function EditPortfolioPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<string>(DEFAULT_PORTFOLIO_CATEGORY);
  const [clientName, setClientName] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [problem, setProblem] = useState("");
  const [result, setResult] = useState("");
  const [content, setContent] = useState("");
  const [year, setYear] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/chiro/portfolio/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setName(data.name || "");
        setSlug(data.slug || "");
        setCategory(
          isPortfolioCategory(data.category) ? data.category : DEFAULT_PORTFOLIO_CATEGORY
        );
        setClientName(data.client_name || "");
        setSiteUrl(data.site_url || "");
        setProblem(data.problem || "");
        setResult(data.result || "");
        setContent(data.content || "");
        setYear(data.year || "");
        setImageUrl(data.image_url || "");
        setPublished(data.published ?? true);
        setLoading(false);
      })
      .catch(() => {
        alert("프로젝트를 불러오지 못했습니다.");
        router.push("/chiro/portfolio");
      });
  }, [id, router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImageFile(file);
      setImageUrl(url);
    } catch (error) {
      alert(error instanceof Error ? error.message : "이미지 업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (uploading) {
      alert("이미지 업로드가 끝난 뒤 저장해 주세요.");
      return;
    }

    if (!imageUrl) {
      alert("대표 이미지를 먼저 업로드해 주세요.");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`/api/chiro/portfolio/${id}`, {
        method: "PUT",
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

  if (loading) {
    return <p className="text-sm text-[#9b9b9b]">불러오는 중...</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-light tracking-tight">프로젝트 수정</h1>
        <p className="text-sm text-[#9b9b9b] mt-1">포트폴리오 프로젝트를 수정합니다.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-10">
        {/* Left: Form fields */}
        <div className="flex-1 min-w-0 space-y-8">
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">프로젝트명</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
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
              <select value={category} onChange={(e) => setCategory(e.target.value)} required
                className="w-full border-b border-[#e5e5e3] py-3 text-sm bg-transparent outline-none focus:border-[#1a1a1a] transition-colors">
                {PORTFOLIO_CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">연도</label>
              <input type="text" value={year} onChange={(e) => setYear(e.target.value)}
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
            <textarea value={problem} onChange={(e) => setProblem(e.target.value)} rows={3}
              className="w-full border-b border-[#e5e5e3] py-3 text-sm bg-transparent outline-none focus:border-[#1a1a1a] transition-colors resize-none" />
          </div>

          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">결과 (Result)</label>
            <textarea value={result} onChange={(e) => setResult(e.target.value)} rows={2}
              className="w-full border-b border-[#e5e5e3] py-3 text-sm bg-transparent outline-none focus:border-[#1a1a1a] transition-colors resize-none" />
          </div>

          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">상세 콘텐츠</label>
            <p className="text-xs text-[#9b9b9b] mb-4">프로젝트 진행 과정, 스크린샷, 상세 설명 등을 자유롭게 작성하세요.</p>
            <TiptapEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Right: Sticky sidebar */}
        <div className="w-[280px] shrink-0">
          <div className="sticky top-8 space-y-6">
            {/* Image upload */}
            <div className="border border-[#e5e5e3] p-5">
              <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">대표 이미지</label>
              {imageUrl && (
                <div className="mb-3">
                  <img src={imageUrl} alt="Preview" className="w-full aspect-[4/3] object-cover border border-[#e5e5e3]" />
                </div>
              )}
              <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading || saving}
                className="w-full text-xs px-4 py-2.5 border border-[#e5e5e3] hover:border-[#1a1a1a] transition-colors disabled:opacity-50 cursor-pointer">
                {uploading ? "업로드 중..." : imageUrl ? "이미지 다시 업로드" : "이미지 업로드"}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <p className="mt-2 text-[11px] text-[#9b9b9b] leading-relaxed">
                {uploading
                  ? "업로드 중... 완료 전에는 저장할 수 없습니다."
                  : imageUrl
                    ? "업로드 완료"
                    : "목록 썸네일에 노출될 대표 이미지"}
              </p>
            </div>

            {/* Publish toggle */}
            <div className="border border-[#e5e5e3] p-5">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-4 h-4 accent-[#FF4D00]" />
                <span className="text-sm text-[#6b6b6b]">공개</span>
              </label>
            </div>

            {/* Action buttons */}
            <div className="space-y-2">
              <button type="submit" disabled={saving || uploading || !imageUrl}
                className="w-full border border-[#1a1a1a] text-[#1a1a1a] px-8 py-3 text-sm tracking-[0.05em] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white disabled:opacity-50 cursor-pointer">
                {uploading ? "이미지 업로드 중..." : saving ? "저장 중..." : "저장"}
              </button>
              <button type="button" onClick={() => router.back()}
                className="w-full border border-[#e5e5e3] text-[#6b6b6b] px-8 py-3 text-sm tracking-[0.05em] transition-all duration-300 hover:border-[#1a1a1a] hover:text-[#1a1a1a] cursor-pointer">
                취소
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
