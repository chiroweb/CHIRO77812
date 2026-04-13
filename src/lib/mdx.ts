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
