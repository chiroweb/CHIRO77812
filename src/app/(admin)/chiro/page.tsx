"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ContactSubmission } from "@/lib/types";

interface Stats {
  blogPosts: number;
  publishedBlogPosts: number;
  portfolioProjects: number;
  totalContacts: number;
  unreadContacts: number;
  recentContacts: ContactSubmission[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/chiro/stats")
      .then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      })
      .then((data) => {
        if (data.recentContacts) {
          setStats(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-sm text-[#9b9b9b]">불러오는 중...</p>;
  }

  if (!stats) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-[#9b9b9b] mb-4">데이터를 불러오지 못했습니다.</p>
        <p className="text-xs text-[#9b9b9b]">
          DB가 설정되지 않았다면{" "}
          <Link href="/api/setup" className="text-[#FF4D00] underline">
            /api/setup
          </Link>
          을 먼저 호출하세요.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-light tracking-tight">대시보드</h1>
        <p className="text-sm text-[#9b9b9b] mt-1">CHIRO 사이트 현황을 한눈에 확인합니다.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[#e5e5e3] mb-12">
        <Link href="/chiro/blog" className="bg-white p-6 hover:bg-[#fafaf8] transition-colors">
          <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-2">블로그 글</p>
          <p className="text-3xl font-light font-[family-name:var(--font-jetbrains-mono)]">
            {stats.blogPosts}
          </p>
          <p className="text-xs text-[#9b9b9b] mt-1">공개 {stats.publishedBlogPosts}건</p>
        </Link>

        <Link href="/chiro/portfolio" className="bg-white p-6 hover:bg-[#fafaf8] transition-colors">
          <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-2">포트폴리오</p>
          <p className="text-3xl font-light font-[family-name:var(--font-jetbrains-mono)]">
            {stats.portfolioProjects}
          </p>
          <p className="text-xs text-[#9b9b9b] mt-1">프로젝트</p>
        </Link>

        <Link href="/chiro/contacts" className="bg-white p-6 hover:bg-[#fafaf8] transition-colors">
          <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-2">문의</p>
          <p className="text-3xl font-light font-[family-name:var(--font-jetbrains-mono)]">
            {stats.totalContacts}
          </p>
          <p className="text-xs text-[#9b9b9b] mt-1">총 접수</p>
        </Link>

        <Link href="/chiro/contacts" className="bg-white p-6 hover:bg-[#fafaf8] transition-colors">
          <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-2">미확인</p>
          <p className="text-3xl font-light font-[family-name:var(--font-jetbrains-mono)] text-[#FF4D00]">
            {stats.unreadContacts}
          </p>
          <p className="text-xs text-[#9b9b9b] mt-1">읽지 않은 문의</p>
        </Link>
      </div>

      {/* Recent Contacts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-light tracking-tight">최근 문의</h2>
          <Link href="/chiro/contacts" className="text-xs text-[#9b9b9b] hover:text-[#1a1a1a] transition-colors">
            전체보기 →
          </Link>
        </div>
        {stats.recentContacts.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-[#e5e5e3]">
            <p className="text-sm text-[#9b9b9b]">아직 접수된 문의가 없습니다.</p>
          </div>
        ) : (
          <div className="border-t border-[#e5e5e3]">
            {stats.recentContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between py-3 border-b border-[#e5e5e3]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {!contact.read && (
                    <span className="w-2 h-2 rounded-full bg-[#FF4D00] shrink-0" />
                  )}
                  <span className="text-sm truncate">{contact.name}</span>
                  <span className="text-xs text-[#9b9b9b] truncate hidden md:inline">
                    {contact.message.slice(0, 60)}...
                  </span>
                </div>
                <span className="text-xs text-[#9b9b9b] font-[family-name:var(--font-jetbrains-mono)] shrink-0 ml-4">
                  {new Date(contact.created_at).toLocaleDateString("ko-KR")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
