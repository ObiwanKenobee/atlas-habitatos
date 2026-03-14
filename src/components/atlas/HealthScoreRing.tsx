import { cn } from "@/lib/utils";

interface HealthScoreRingProps {
  score: number;
  label: string;
  sublabel?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function HealthScoreRing({
  score,
  label,
  sublabel,
  size = "md",
  className,
}: HealthScoreRingProps) {
  const sizeMap = {
    sm: { r: 32, stroke: 4, viewBox: 80, textSize: "text-2xl", labelSize: "text-[10px]" },
    md: { r: 44, stroke: 5, viewBox: 104, textSize: "text-3xl", labelSize: "text-xs" },
    lg: { r: 58, stroke: 6, viewBox: 132, textSize: "text-4xl", labelSize: "text-sm" },
  };

  const cfg = sizeMap[size];
  const cx = cfg.viewBox / 2;
  const cy = cfg.viewBox / 2;
  const circumference = 2 * Math.PI * cfg.r;
  const progress = Math.max(0, Math.min(100, score));
  const dashOffset = circumference - (progress / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 80) return "hsl(145, 62%, 43%)";
    if (s >= 60) return "hsl(38, 94%, 54%)";
    return "hsl(4, 80%, 56%)";
  };

  const getTextColor = (s: number) => {
    if (s >= 80) return "text-status-healthy";
    if (s >= 60) return "text-status-warning";
    return "text-status-danger";
  };

  const color = getColor(score);

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative" style={{ width: cfg.viewBox, height: cfg.viewBox }}>
        <svg
          width={cfg.viewBox}
          height={cfg.viewBox}
          viewBox={`0 0 ${cfg.viewBox} ${cfg.viewBox}`}
          className="-rotate-90"
        >
          {/* Background ring */}
          <circle
            cx={cx} cy={cy} r={cfg.r}
            fill="none"
            stroke="hsl(220, 20%, 17%)"
            strokeWidth={cfg.stroke}
          />
          {/* Glow filter */}
          <defs>
            <filter id="ring-glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Progress ring */}
          <circle
            cx={cx} cy={cy} r={cfg.r}
            fill="none"
            stroke={color}
            strokeWidth={cfg.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            filter="url(#ring-glow)"
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
          {/* Outer subtle ring */}
          <circle
            cx={cx} cy={cy} r={cfg.r + cfg.stroke * 2}
            fill="none"
            stroke={color}
            strokeWidth={0.5}
            opacity={0.15}
            strokeDasharray="2 8"
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-display font-bold leading-none", cfg.textSize, getTextColor(score))}>
            {score}
          </span>
          <span className={cn("font-mono text-muted-foreground mt-0.5 leading-none", cfg.labelSize)}>
            /100
          </span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm font-display font-semibold text-foreground">{label}</p>
        {sublabel && (
          <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>
        )}
      </div>
    </div>
  );
}
