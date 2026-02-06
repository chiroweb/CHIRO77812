interface PlaceholderProps {
  type?: "video" | "image";
  aspectRatio?: "video" | "square" | "portrait";
  className?: string;
}

export default function Placeholder({
  type = "image",
  aspectRatio = "video",
  className = "",
}: PlaceholderProps) {
  const ratios = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
  };

  return (
    <div
      className={`bg-[#f5f5f3] ${ratios[aspectRatio]} flex items-center justify-center border border-dashed border-[#e5e5e3] ${className}`}
    >
      <div className="flex flex-col items-center gap-2 text-[#9b9b9b]">
        {type === "video" ? (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        ) : (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        )}
        <span className="text-xs tracking-wider uppercase">
          {type === "video" ? "Video" : "Image"}
        </span>
      </div>
    </div>
  );
}
