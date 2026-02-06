"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        setError("비밀번호가 올바르지 않습니다.");
      }
    } catch {
      setError("로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-[360px] px-6">
        <div className="mb-12">
          <h1 className="text-sm tracking-[0.2em] uppercase font-medium text-[#1a1a1a] mb-2">
            CHIRO Admin
          </h1>
          <p className="text-sm text-[#9b9b9b]">관리자 로그인</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-4"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="비밀번호를 입력하세요"
              className="w-full border-b border-[#e5e5e3] py-3 text-base bg-transparent outline-none focus:border-[#1a1a1a] transition-colors duration-300 placeholder:text-[#9b9b9b]"
            />
          </div>

          {error && (
            <p className="text-sm text-[#FF4D00] mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full border border-[#1a1a1a] text-[#1a1a1a] px-8 py-3 text-sm tracking-[0.05em] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white disabled:opacity-50 cursor-pointer"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}
