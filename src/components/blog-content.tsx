"use client";

import { useMemo } from "react";

interface BlogContentProps {
  html: string;
}

export default function BlogContent({ html }: BlogContentProps) {
  const isHtml = html.includes("<");

  const cleanHtml = useMemo(() => {
    if (!isHtml) return "";

    // Client-side: sanitize with DOMPurify if available
    if (typeof window !== "undefined") {
      try {
        // Dynamic import to avoid SSR issues
        const DOMPurify = require("dompurify");
        return DOMPurify.sanitize(html, {
          ALLOWED_TAGS: ["p", "h2", "h3", "h4", "strong", "em", "a", "ul", "ol", "li", "blockquote", "img", "br", "hr", "code", "pre", "s", "table", "thead", "tbody", "tr", "th", "td", "del", "input", "span", "div", "section"],
          ALLOWED_ATTR: ["href", "src", "alt", "class", "target", "rel", "type", "checked", "disabled"],
        });
      } catch {
        return html;
      }
    }

    // Server-side: trust remark-generated HTML (safe by construction)
    return html;
  }, [html, isHtml]);

  if (isHtml) {
    return (
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />
    );
  }

  return (
    <>
      {html.split("\n\n").map((paragraph, i) => (
        <p key={i} className="text-base text-[#6b6b6b] leading-[1.8] mb-6">
          {paragraph}
        </p>
      ))}
    </>
  );
}
