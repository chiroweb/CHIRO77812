"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const TiptapEditor = dynamic(() => import("@/components/admin/tiptap-editor"), {
  ssr: false,
  loading: () => (
    <div className="border border-[#e5e5e3] min-h-[200px] flex items-center justify-center text-sm text-[#9b9b9b]">
      에디터 로딩 중...
    </div>
  ),
});

export default function EditNoticePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [noticeType, setNoticeType] = useState<"banner" | "popup">("banner");
  const [size, setSize] = useState<"small" | "medium" | "large">("medium");
  const [content, setContent] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bgColor, setBgColor] = useState("#1a1a1a");
  const [textColor, setTextColor] = useState("#ffffff");
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`/api/chiro/notices/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setTitle(data.title || "");
        setNoticeType(data.notice_type || "banner");
        setSize(data.size || "medium");
        setContent(data.content || "");
        setLinkUrl(data.link_url || "");
        setLinkText(data.link_text || "");
        setImageUrl(data.image_url || "");
        setBgColor(data.bg_color || "#1a1a1a");
        setTextColor(data.text_color || "#ffffff");
        setPublished(data.published || false);
        setLoading(false);
      })
      .catch(() => {
        alert("공지를 불러오지 못했습니다.");
        router.push("/chiro/notices");
      });
  }, [id, router]);

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
      const res = await fetch(`/api/chiro/notices/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          notice_type: noticeType,
          size,
          content,
          link_url: linkUrl || null,
          link_text: linkText || null,
          image_url: imageUrl || null,
          bg_color: bgColor,
          text_color: textColor,
          published,
        }),
      });

      if (res.ok) {
        router.push("/chiro/notices");
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
        <h1 className="text-2xl font-light tracking-tight">공지 수정</h1>
        <p className="text-sm text-[#9b9b9b] mt-1">공지 내용을 수정합니다.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
            제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border-b border-[#e5e5e3] py-3 text-lg bg-transparent outline-none focus:border-[#1a1a1a] transition-colors"
          />
        </div>

        {/* Type + Size + Published */}
        <div className="grid grid-cols-3 gap-8">
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
              유형
            </label>
            <div className="flex gap-2">
              {(["banner", "popup"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setNoticeType(type)}
                  className={`px-4 py-2 text-sm border transition-colors cursor-pointer ${
                    noticeType === type
                      ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                      : "border-[#e5e5e3] text-[#6b6b6b] hover:border-[#1a1a1a]"
                  }`}
                >
                  {type === "banner" ? "배너" : "팝업"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
              크기
            </label>
            <div className="flex gap-2">
              {(["small", "medium", "large"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 text-sm border transition-colors cursor-pointer ${
                    size === s
                      ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                      : "border-[#e5e5e3] text-[#6b6b6b] hover:border-[#1a1a1a]"
                  }`}
                >
                  {s === "small" ? "소" : s === "medium" ? "중" : "대"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-end pb-2">
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

        {/* Colors */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
              배경색
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-10 h-10 border border-[#e5e5e3] cursor-pointer"
              />
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="flex-1 border-b border-[#e5e5e3] py-2 text-sm bg-transparent outline-none focus:border-[#1a1a1a] transition-colors font-[family-name:var(--font-jetbrains-mono)]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
              글자색
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-10 h-10 border border-[#e5e5e3] cursor-pointer"
              />
              <input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="flex-1 border-b border-[#e5e5e3] py-2 text-sm bg-transparent outline-none focus:border-[#1a1a1a] transition-colors font-[family-name:var(--font-jetbrains-mono)]"
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
            미리보기
          </label>
          <div
            className="px-4 py-3 text-sm text-center"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            {title || "공지 내용 미리보기"}
          </div>
        </div>

        {/* Link */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
              링크 URL (선택)
            </label>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full border-b border-[#e5e5e3] py-3 text-sm bg-transparent outline-none focus:border-[#1a1a1a] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
              링크 텍스트 (선택)
            </label>
            <input
              type="text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="자세히 보기"
              className="w-full border-b border-[#e5e5e3] py-3 text-sm bg-transparent outline-none focus:border-[#1a1a1a] transition-colors"
            />
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
            이미지 (선택)
          </label>
          <div className="flex items-center gap-4">
            <label className="border border-[#e5e5e3] px-4 py-2 text-sm text-[#6b6b6b] hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors cursor-pointer">
              {uploading ? "업로드 중..." : "이미지 선택"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
            {imageUrl && (
              <div className="flex items-center gap-2">
                <img src={imageUrl} alt="미리보기" className="h-10 object-contain" />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="text-xs text-[#FF4D00] hover:underline cursor-pointer"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content (TipTap) */}
        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
            내용 (선택)
          </label>
          <TiptapEditor content={content} onChange={setContent} />
        </div>

        {/* Actions */}
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
