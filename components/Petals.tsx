import type { CSSProperties } from "react";

const COLORS = ["#f2a33a", "#e8772e", "#ffc94d", "#c2410c", "#b3122e"];

// Deterministic positions so server and client render identical markup.
export default function Petals({
  count,
  slow = false,
  className = "absolute inset-0",
}: {
  count: number;
  slow?: boolean;
  className?: string;
}) {
  return (
    <div aria-hidden className={`pointer-events-none overflow-hidden ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="petal"
          style={
            {
              left: `${(i * 37 + 7) % 100}%`,
              background: COLORS[i % COLORS.length],
              scale: String(0.6 + ((i * 7) % 10) / 20),
              "--d": `${(slow ? 20 : 11) + ((i * 5) % 8)}s`,
              "--delay": `-${(i * 13) % 19}s`,
              "--sway": `${i % 2 ? "" : "-"}${24 + ((i * 11) % 40)}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
