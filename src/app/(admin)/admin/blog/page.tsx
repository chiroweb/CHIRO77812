"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/blog")
      .then((r) => r.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("이 글을 삭제하시겠습니까?")) return;

    const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const togglePublished = async (post: BlogPost) => {
    const res = await fetch(`/api/admin/blog/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: post.title,
        content: post.content || "",
        excerpt: post.excerpt,
        category: post.category,
        published: !post.published,
      }),
    });
    if (res.ok) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id ? { ...p, published: !p.published } : p
        )
      );
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light tracking-tight">블로그 관리</h1>
          <p className="text-sm text-[#9b9b9b] mt-1">게시글을 작성하고 관리합니다.</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="border border-[#1a1a1a] text-[#1a1a1a] px-6 py-2 text-sm tracking-[0.05em] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white"
        >
          새 글 작성
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-[#9b9b9b]">불러오는 중...</p>
      ) : posts.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-[#e5e5e3]">
          <p className="text-sm text-[#9b9b9b]">아직 작성된 글이 없습니다.</p>
        </div>
      ) : (
        <div className="border-t border-[#e5e5e3]">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between py-4 border-b border-[#e5e5e3]"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      post.published ? "bg-green-500" : "bg-[#e5e5e3]"
                    }`}
                  />
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="text-base font-normal truncate hover:opacity-60 transition-opacity"
                  >
                    {post.title}
                  </Link>
                </div>
                <div className="flex items-center gap-4 ml-5">
                  <span className="text-xs text-[#9b9b9b]">{post.category}</span>
                  <span className="text-xs text-[#9b9b9b] font-[family-name:var(--font-jetbrains-mono)]">
                    {new Date(post.created_at).toLocaleDateString("ko-KR")}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => togglePublished(post)}
                  className="text-xs px-3 py-1 border border-[#e5e5e3] hover:border-[#1a1a1a] transition-colors cursor-pointer"
                >
                  {post.published ? "비공개" : "공개"}
                </button>
                <Link
                  href={`/admin/blog/${post.id}/edit`}
                  className="text-xs px-3 py-1 border border-[#e5e5e3] hover:border-[#1a1a1a] transition-colors"
                >
                  수정
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
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
