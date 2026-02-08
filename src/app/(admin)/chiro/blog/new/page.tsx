"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const TiptapEditor = dynamic(() => import("@/components/admin/tiptap-editor"), {
  ssr: false,
  loading: () => <div className="border border-[#e5e5e3] min-h-[400px] flex items-center justify-center text-sm text-[#9b9b9b]">에디터 로딩 중...</div>,
});

export default function NewBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Insight");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/chiro/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, excerpt, category, content, published }),
      });

      if (res.ok) {
        router.push("/chiro/blog");
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
        <h1 className="text-2xl font-light tracking-tight">새 블로그 글</h1>
        <p className="text-sm text-[#9b9b9b] mt-1">새로운 블로그 글을 작성합니다.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
            제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="글 제목을 입력하세요"
            className="w-full border-b border-[#e5e5e3] py-3 text-lg bg-transparent outline-none focus:border-[#1a1a1a] transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
              카테고리
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Insight"
              className="w-full border-b border-[#e5e5e3] py-3 text-sm bg-transparent outline-none focus:border-[#1a1a1a] transition-colors"
            />
          </div>
          <div className="flex items-end pb-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 accent-[#FF4D00]"
              />
              <span className="text-sm text-[#6b6b6b]">공개</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
            요약
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            placeholder="글의 요약을 입력하세요"
            className="w-full border-b border-[#e5e5e3] py-3 text-sm bg-transparent outline-none focus:border-[#1a1a1a] transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
            내용
          </label>
          <TiptapEditor content={content} onChange={setContent} />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="border border-[#1a1a1a] text-[#1a1a1a] px-8 py-3 text-sm tracking-[0.05em] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white disabled:opacity-50 cursor-pointer"
          >
            {saving ? "저장 중..." : "저장"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="border border-[#e5e5e3] text-[#6b6b6b] px-8 py-3 text-sm tracking-[0.05em] transition-all duration-300 hover:border-[#1a1a1a] hover:text-[#1a1a1a] cursor-pointer"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
