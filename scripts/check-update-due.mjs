#!/usr/bin/env node
/**
 * 90일 이상 갱신되지 않은 블로그 글을 찾아 리포트.
 * 사용: `npm run check:updates` 또는 `node scripts/check-update-due.mjs`
 * 옵션: `--threshold 60` (기본 80일), `--limit 30` (상위 N개)
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? Number(args[i + 1]) : fallback;
};

const THRESHOLD = getArg("threshold", 80);
const LIMIT = getArg("limit", 50);
const DIR = "src/content/blog";

const today = new Date();
const rows = [];

for (const file of readdirSync(DIR).filter((f) => f.endsWith(".mdx"))) {
  const raw = readFileSync(join(DIR, file), "utf-8");
  const { data } = matter(raw);
  if (!data.publishedAt) continue;
  const last = data.updatedAt || data.publishedAt;
  const lastDate = new Date(last);
  const days = Math.floor((today - lastDate) / 86_400_000);
  rows.push({
    slug: data.slug || file.replace(/\.mdx$/, ""),
    title: data.title || "(제목 없음)",
    category: data.category || "—",
    last,
    days,
  });
}

const due = rows
  .filter((r) => r.days >= THRESHOLD)
  .sort((a, b) => b.days - a.days)
  .slice(0, LIMIT);

console.log("");
console.log(`📝 콘텐츠 갱신 점검 — ${today.toISOString().slice(0, 10)}`);
console.log(
  `   임계값 ${THRESHOLD}일 / 전체 ${rows.length}편 / 갱신 대상 ${due.length}편`,
);
console.log("");

if (due.length === 0) {
  console.log("✅ 모든 글이 신선합니다.");
  process.exit(0);
}

const pad = (s, n) => String(s).padEnd(n, " ").slice(0, n);
console.log(
  pad("일수", 6) + pad("카테고리", 12) + pad("최종", 12) + "제목",
);
console.log("-".repeat(80));
for (const r of due) {
  console.log(
    pad(`${r.days}d`, 6) +
      pad(r.category, 12) +
      pad(r.last, 12) +
      pad(r.title, 60),
  );
}

console.log("");
console.log(`💡 갱신 시 frontmatter의 updatedAt 을 오늘 날짜로 바꾸세요.`);
process.exit(due.length > 0 ? 1 : 0);
