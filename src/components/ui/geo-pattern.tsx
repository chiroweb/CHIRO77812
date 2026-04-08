"use client";

/**
 * Geometric triangular tessellation pattern — twisted triangle stripes
 * with a 3D perspective feel. Renders as pure SVG.
 */

interface GeoPatternProps {
  className?: string;
}

export default function GeoPattern({ className = "" }: GeoPatternProps) {
  const cols = 6;
  const rows = 12;
  const cellW = 60;
  const cellH = 80;
  const width = cols * cellW;
  const height = rows * cellH;

  const triangles: React.ReactNode[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * cellW;
      const y = row * cellH;

      // Alternate pattern for twisted feel
      const isEven = (row + col) % 2 === 0;
      const variant = (row * cols + col) % 4;

      // Each cell gets 2 triangles forming a rectangle
      if (isEven) {
        // Top-left to bottom-right diagonal
        triangles.push(
          <polygon
            key={`${row}-${col}-a`}
            points={`${x},${y} ${x + cellW},${y} ${x},${y + cellH}`}
            fill={variant === 0 ? "#1a1a1a" : variant === 1 ? "#ffffff" : variant === 2 ? "#1a1a1a" : "#e8e8e6"}
            opacity={variant === 3 ? 0.6 : 1}
          />,
          <polygon
            key={`${row}-${col}-b`}
            points={`${x + cellW},${y} ${x + cellW},${y + cellH} ${x},${y + cellH}`}
            fill={variant === 0 ? "#ffffff" : variant === 1 ? "#1a1a1a" : variant === 2 ? "#e8e8e6" : "#1a1a1a"}
            opacity={variant === 2 ? 0.6 : 1}
          />
        );
      } else {
        // Top-right to bottom-left diagonal
        triangles.push(
          <polygon
            key={`${row}-${col}-a`}
            points={`${x},${y} ${x + cellW},${y} ${x + cellW},${y + cellH}`}
            fill={variant === 0 ? "#e8e8e6" : variant === 1 ? "#1a1a1a" : variant === 2 ? "#ffffff" : "#1a1a1a"}
            opacity={variant === 0 ? 0.6 : 1}
          />,
          <polygon
            key={`${row}-${col}-b`}
            points={`${x},${y} ${x + cellW},${y + cellH} ${x},${y + cellH}`}
            fill={variant === 0 ? "#1a1a1a" : variant === 1 ? "#ffffff" : variant === 2 ? "#1a1a1a" : "#e8e8e6"}
            opacity={variant === 3 ? 0.6 : 1}
          />
        );
      }
    }
  }

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        style={{ display: "block" }}
      >
        {triangles}
      </svg>
    </div>
  );
}
