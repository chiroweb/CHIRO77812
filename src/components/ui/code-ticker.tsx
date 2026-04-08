"use client";

interface CodeTickerProps {
  code: string;
  className?: string;
  speed?: number;
  variant?: "light" | "dark";
}

export default function CodeTicker({
  code,
  className = "",
  speed = 30,
  variant = "light",
}: CodeTickerProps) {
  const colorMap =
    variant === "light"
      ? {
          keyword: "text-[#FF4D00]",
          string: "text-[#4a4a4a]",
          comment: "text-[#7a7a7a]",
          base: "text-[#2a2a2a]",
        }
      : {
          keyword: "text-[#FF4D00]",
          string: "text-white/70",
          comment: "text-white/40",
          base: "text-white/60",
        };

  function highlightCode(raw: string) {
    const lines = raw.split("\n");
    return lines.map((line, i) => {
      let highlighted = line;

      // Comments
      if (line.trimStart().startsWith("//") || line.trimStart().startsWith("///")) {
        return (
          <span key={i} className={colorMap.comment}>
            {line}
            {"\n"}
          </span>
        );
      }

      // Strings
      highlighted = line;
      const parts: React.ReactNode[] = [];
      let remaining = highlighted;
      let partKey = 0;

      // Match keywords
      const keywords =
        /\b(const|let|var|function|async|await|return|export|import|from|if|else|true|false|module|pub|fun|struct|interface|type|class|extends|implements|new|this|default|void|null|undefined)\b/g;
      const stringPattern = /(["'`])(?:(?!\1).)*\1/g;
      const numberPattern = /\b(\d+\.?\d*)\b/g;

      // Simple approach: process line character by character for tokens
      const tokens: { text: string; type: "keyword" | "string" | "number" | "base" }[] = [];
      const combinedPattern =
        /(["'`])(?:(?!\1).)*\1|\b(?:const|let|var|function|async|await|return|export|import|from|if|else|true|false|module|pub|fun|struct|interface|type|class|extends|implements|new|this|default|void|null|undefined)\b|\b\d+\.?\d*\b/g;

      let lastIndex = 0;
      let match;

      while ((match = combinedPattern.exec(line)) !== null) {
        if (match.index > lastIndex) {
          tokens.push({ text: line.slice(lastIndex, match.index), type: "base" });
        }

        const m = match[0];
        if (m.startsWith('"') || m.startsWith("'") || m.startsWith("`")) {
          tokens.push({ text: m, type: "string" });
        } else if (/^\d/.test(m)) {
          tokens.push({ text: m, type: "number" });
        } else {
          tokens.push({ text: m, type: "keyword" });
        }

        lastIndex = match.index + m.length;
      }

      if (lastIndex < line.length) {
        tokens.push({ text: line.slice(lastIndex), type: "base" });
      }

      return (
        <span key={i}>
          {tokens.map((token, j) => (
            <span
              key={j}
              className={
                token.type === "keyword"
                  ? colorMap.keyword
                  : token.type === "string"
                    ? colorMap.string
                    : token.type === "number"
                      ? colorMap.keyword
                      : colorMap.base
              }
            >
              {token.text}
            </span>
          ))}
          {"\n"}
        </span>
      );
    });
  }

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ contain: "paint" }}
      aria-hidden="true"
    >
      <div
        className="code-ticker-scroll"
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        <pre
          className={`font-[family-name:var(--font-jetbrains-mono)] text-[10px] md:text-xs leading-[1.8] whitespace-pre select-none ${colorMap.base}`}
        >
          {highlightCode(code)}
        </pre>
        <pre
          className={`font-[family-name:var(--font-jetbrains-mono)] text-[10px] md:text-xs leading-[1.8] whitespace-pre select-none ${colorMap.base}`}
        >
          {highlightCode(code)}
        </pre>
      </div>
    </div>
  );
}
