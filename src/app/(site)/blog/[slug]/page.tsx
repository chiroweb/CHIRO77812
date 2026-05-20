import type { Metadata } from "next";
import Link from "next/link";
import BlogContent from "@/components/blog-content";
import { sql } from "@/lib/db";
import {
  extractHowToSteps,
  getMdxPost,
  getMdxSlugs,
  isHowToCandidate,
} from "@/lib/mdx";

/* ─────────────────────────────────────
   Types
───────────────────────────────────── */

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

/* ─────────────────────────────────────
   DB fallback
───────────────────────────────────── */

async function fetchDbPost(slug: string) {
  try {
    const decoded = decodeURIComponent(slug);
    const result = await sql`
      SELECT * FROM blog_posts
      WHERE slug = ${decoded} AND published = true
    `;
    if (result.rows.length > 0) return result.rows[0];
  } catch {
    // Fall through
  }
  return null;
}

/* ─────────────────────────────────────
   Static params — MDX slugs for static generation
───────────────────────────────────── */

export function generateStaticParams() {
  return getMdxSlugs().map((slug) => ({ slug }));
}

/* ─────────────────────────────────────
   Metadata — MDX first, DB fallback
───────────────────────────────────── */

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  // 1. MDX first
  const mdxPost = await getMdxPost(slug);
  if (mdxPost) {
    const { frontmatter: fm } = mdxPost;
    return {
      title: fm.title,
      description: fm.excerpt,
      keywords: fm.keywords,
      openGraph: {
        title: `${fm.title} | 치로웹디자인`,
        description: fm.excerpt,
        url: `https://chiroweb.co.kr/blog/${slug}`,
        type: "article",
      },
      alternates: {
        canonical: `https://chiroweb.co.kr/blog/${slug}`,
      },
    };
  }

  // 2. DB fallback
  const dbPost = await fetchDbPost(slug);
  const title = dbPost?.title || "블로그";
  const excerpt = dbPost?.excerpt || "치로웹디자인 블로그";

  return {
    title,
    description: excerpt,
    openGraph: {
      title: `${title} | 치로웹디자인`,
      description: excerpt,
      url: `https://chiroweb.co.kr/blog/${slug}`,
      type: "article",
    },
    alternates: {
      canonical: `https://chiroweb.co.kr/blog/${slug}`,
    },
  };
}

/* ─────────────────────────────────────
   Page Component — MDX first, DB fallback
───────────────────────────────────── */

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  // ── 1. Try MDX ──
  const mdxPost = await getMdxPost(slug);

  if (mdxPost) {
    const { frontmatter: fm, html: contentHtml, content: rawMd } = mdxPost;
    const dateStr = new Date(fm.publishedAt).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const publishedISO = new Date(fm.publishedAt).toISOString();
    const modifiedISO = fm.updatedAt
      ? new Date(fm.updatedAt).toISOString()
      : publishedISO;
    const pageUrl = `https://chiroweb.co.kr/blog/${slug}`;
    const author = {
      "@type": "Person" as const,
      name: fm.author || "최정원",
      url: "https://chiroweb.co.kr/about",
    };
    const publisher = {
      "@type": "Organization" as const,
      name: "치로웹디자인",
      url: "https://chiroweb.co.kr",
    };

    // Auto-emit HowTo when frontmatter says so OR when title strongly suggests
    // step-by-step content AND we can extract at least 3 meaningful steps.
    const howToSteps =
      fm.schemaType === "HowTo" || isHowToCandidate(fm.title)
        ? extractHowToSteps(rawMd)
        : [];
    const useHowTo =
      (fm.schemaType === "HowTo" && howToSteps.length >= 2) ||
      (isHowToCandidate(fm.title) && howToSteps.length >= 3);

    const jsonLd = useHowTo
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: fm.title,
          description: fm.excerpt,
          datePublished: publishedISO,
          dateModified: modifiedISO,
          author,
          publisher,
          mainEntityOfPage: pageUrl,
          ...(fm.keywords && { keywords: fm.keywords.join(", ") }),
          ...(fm.coverImage && { image: fm.coverImage }),
          step: howToSteps.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.name,
            text: s.text,
            url: `${pageUrl}#step-${i + 1}`,
          })),
        }
      : {
          "@context": "https://schema.org",
          "@type": fm.schemaType || "BlogPosting",
          headline: fm.title,
          description: fm.excerpt,
          datePublished: publishedISO,
          dateModified: modifiedISO,
          author,
          publisher,
          mainEntityOfPage: pageUrl,
          ...(fm.keywords && { keywords: fm.keywords.join(", ") }),
          ...(fm.coverImage && { image: fm.coverImage }),
        };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* ── Hero ── */}
        <section
          className="pt-[140px] md:pt-[180px] pb-[80px] md:pb-[100px] px-5 md:px-12 lg:px-20"
          style={{ backgroundColor: "#1a1a1a" }}
          data-theme="dark"
        >
          <div className="max-w-[800px] mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.06em] uppercase text-white/30 hover:text-white transition-colors duration-300 font-[family-name:var(--font-jetbrains-mono)] mb-16 md:mb-20"
            >
              ← Blog
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] tracking-[0.04em] uppercase font-[family-name:var(--font-jetbrains-mono)]"
                style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
              >
                {fm.category}
              </span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-white/30">
                {dateStr}
              </span>
            </div>

            <h1 className="text-[32px] md:text-[44px] lg:text-[52px] font-extrabold text-white tracking-[-0.03em] leading-[1.1]">
              {fm.title}
            </h1>

            {fm.excerpt && (
              <p className="text-[15px] md:text-[16px] text-white/40 leading-[1.8] mt-6">
                {fm.excerpt}
              </p>
            )}

            {fm.author && (
              <p className="mt-8 text-[13px] text-white/25 font-[family-name:var(--font-jetbrains-mono)] tracking-[0.04em]">
                by {fm.author}
              </p>
            )}
          </div>
        </section>

        {/* ── Content ── */}
        <section className="px-5 md:px-12 lg:px-20 py-[80px] md:py-[120px] bg-[#f5f5f0]">
          <div className="max-w-[800px] mx-auto">
            <BlogContent html={contentHtml} />
          </div>
        </section>

        {/* ── Keywords ── */}
        {fm.keywords && fm.keywords.length > 0 && (
          <section className="px-5 md:px-12 lg:px-20 pb-[60px] bg-[#f5f5f0]">
            <div className="max-w-[800px] mx-auto flex flex-wrap gap-2">
              {fm.keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-3 py-1 rounded-full text-[11px] tracking-[0.04em] bg-[#e8e8e0] text-[#666] font-[family-name:var(--font-jetbrains-mono)]"
                >
                  {kw}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ── Back ── */}
        <section className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 py-12">
          <div className="max-w-[800px] mx-auto text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[13px] tracking-[0.04em] uppercase font-medium text-[#111] hover:text-[#FF4D00] transition-colors duration-300"
            >
              ← 블로그로 돌아가기
            </Link>
          </div>
        </section>
      </>
    );
  }

  // ── 2. DB fallback ──
  const dbPost = await fetchDbPost(slug);

  if (!dbPost) {
    return (
      <section className="pt-32 pb-32 px-5 md:px-12 lg:px-20 bg-[#f5f5f0]">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-8">
            ( NOT FOUND )
          </p>
          <h1 className="text-[48px] md:text-[72px] font-extrabold tracking-[-0.03em] leading-[0.9] text-[#111] uppercase mb-8">
            POST
            <br />
            <span className="text-[#C0C0C0]">NOT FOUND.</span>
          </h1>
          <Link
            href="/blog"
            className="text-[13px] tracking-[0.04em] uppercase font-medium text-[#111] hover:text-[#FF4D00] transition-colors duration-300"
          >
            ← 블로그로 돌아가기
          </Link>
        </div>
      </section>
    );
  }

  const title = dbPost.title;
  const category = dbPost.category;
  const date = new Date(dbPost.created_at).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const contentHtml = dbPost.content || "";
  const dateISO = new Date(dbPost.created_at).toISOString();
  const excerpt = dbPost.excerpt || "";

  const blogPostJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    datePublished: dateISO,
    dateModified: dbPost?.updated_at ? new Date(dbPost.updated_at).toISOString() : dateISO,
    author: {
      "@type": "Person",
      name: "최정원",
      url: "https://chiroweb.co.kr/about",
    },
    publisher: {
      "@type": "Organization",
      name: "치로웹디자인",
      url: "https://chiroweb.co.kr",
    },
    mainEntityOfPage: `https://chiroweb.co.kr/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />

      {/* ── Hero ── */}
      <section
        className="pt-[140px] md:pt-[180px] pb-[80px] md:pb-[100px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#1a1a1a" }}
        data-theme="dark"
      >
        <div className="max-w-[800px] mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.06em] uppercase text-white/30 hover:text-white transition-colors duration-300 font-[family-name:var(--font-jetbrains-mono)] mb-16 md:mb-20"
          >
            ← Blog
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] tracking-[0.04em] uppercase font-[family-name:var(--font-jetbrains-mono)]"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
            >
              {category || "Blog"}
            </span>
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-white/30">
              {date}
            </span>
          </div>

          <h1 className="text-[32px] md:text-[44px] lg:text-[52px] font-extrabold text-white tracking-[-0.03em] leading-[1.1]">
            {title}
          </h1>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="px-5 md:px-12 lg:px-20 py-[80px] md:py-[120px] bg-[#f5f5f0]">
        <div className="max-w-[800px] mx-auto">
          <BlogContent html={contentHtml} />
        </div>
      </section>

      {/* ── Back ── */}
      <section className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 py-12">
        <div className="max-w-[800px] mx-auto text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[13px] tracking-[0.04em] uppercase font-medium text-[#111] hover:text-[#FF4D00] transition-colors duration-300"
          >
            ← 블로그로 돌아가기
          </Link>
        </div>
      </section>
    </>
  );
}
