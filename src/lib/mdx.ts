import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

/* ─────────────────────────────────────
   Types
───────────────────────────────────── */

export interface MdxFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  keywords?: string[];
  schemaType?: "BlogPosting" | "HowTo" | "FAQPage" | "TechArticle";
  coverImage?: string;
}

export interface MdxPost {
  frontmatter: MdxFrontmatter;
  content: string; // raw markdown
  html: string; // rendered HTML
}

/* ─────────────────────────────────────
   Paths
───────────────────────────────────── */

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

/* ─────────────────────────────────────
   Core functions
───────────────────────────────────── */

/** Get all MDX file slugs */
export function getMdxSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

/** Get a single MDX post by slug */
export async function getMdxPost(slug: string): Promise<MdxPost | null> {
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const mdPath = path.join(CONTENT_DIR, `${slug}.md`);

  const filePath = fs.existsSync(mdxPath)
    ? mdxPath
    : fs.existsSync(mdPath)
      ? mdPath
      : null;

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const result = await remark().use(gfm).use(html).process(content);

  return {
    frontmatter: {
      title: data.title || slug,
      slug: data.slug || slug,
      excerpt: data.excerpt || "",
      category: data.category || "블로그",
      publishedAt: data.publishedAt || new Date().toISOString().split("T")[0],
      updatedAt: data.updatedAt,
      author: data.author || "치로웹디자인",
      keywords: data.keywords || [],
      schemaType: data.schemaType || "BlogPosting",
      coverImage: data.coverImage,
    },
    content,
    html: result.toString(),
  };
}

/** Get all MDX posts, sorted by publishedAt desc */
export async function getAllMdxPosts(): Promise<MdxPost[]> {
  const slugs = getMdxSlugs();
  const posts = await Promise.all(slugs.map((slug) => getMdxPost(slug)));

  return posts
    .filter((p): p is MdxPost => p !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    );
}

/* ─────────────────────────────────────
   HowTo schema helpers
───────────────────────────────────── */

const HOWTO_TITLE_PATTERNS = [
  "가이드", "방법론", "방법", "체크리스트", "공식", "순서", "단계",
  "하는 법", "쓰는 법", "만드는 법", "고르는 법", "작성법", "활용법",
  "전략", "프로세스",
];

const STEP_SKIP_HEADINGS = [
  "자주 묻는 질문", "faq", "결론", "마무리", "참고", "관련 글",
  "더 읽기", "참고 자료", "정리", "맺음말",
];

/** Heuristic: title strongly suggests step-by-step content */
export function isHowToCandidate(title: string): boolean {
  const lower = title.toLowerCase();
  return HOWTO_TITLE_PATTERNS.some((p) => title.includes(p) || lower.includes(p.toLowerCase()));
}

/** Extract HowToStep array from raw markdown by parsing `## ` headings */
export function extractHowToSteps(
  rawMarkdown: string
): { name: string; text: string }[] {
  const lines = rawMarkdown.split("\n");
  const steps: { name: string; text: string }[] = [];
  let current: { name: string; bodyLines: string[] } | null = null;

  const pushCurrent = () => {
    if (!current) return;
    const name = current.name.trim();
    const lower = name.toLowerCase();
    const skip = STEP_SKIP_HEADINGS.some(
      (s) => name.includes(s) || lower.includes(s),
    );
    if (skip) {
      current = null;
      return;
    }
    const body = current.bodyLines
      .join(" ")
      .replace(/\s+/g, " ")
      .replace(/[*_`>#-]/g, "")
      .trim();
    if (name && body) {
      steps.push({ name, text: body.slice(0, 300) });
    }
    current = null;
  };

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+?)\s*$/);
    if (h2) {
      pushCurrent();
      current = { name: h2[1], bodyLines: [] };
      continue;
    }
    if (line.match(/^#\s+/)) {
      pushCurrent();
      continue;
    }
    if (current) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("---")) {
        current.bodyLines.push(trimmed);
      }
    }
  }
  pushCurrent();

  return steps;
}
