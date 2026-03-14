import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ForecastItem {
  label: string;
  value: string;
  confidence: number;
  direction: "up" | "down" | "stable";
  risk: "low" | "medium" | "high";
  reasoning: string;
}

const forecasts: ForecastItem[] = [
  {
    label: "Food Spoilage Risk",
    value: "Rising in 18h",
    confidence: 84,
    direction: "up",
    risk: "high",
    reasoning: "Cold storage temp variance + door seal signal",
  },
  {
    label: "Indoor Air Comfort",
    value: "Declining pm",
    confidence: 71,
    direction: "down",
    risk: "medium",
    reasoning: "Heat forecast + low ventilation mode",
  },
  {
    label: "Energy Cost Today",
    value: "KSh 340 est.",
    confidence: 91,
    direction: "stable",
    risk: "low",
    reasoning: "Consistent usage pattern, no anomaly detected",
  },
  {
    label: "Water Pressure",
    value: "Stable",
    confidence: 78,
    direction: "stable",
    risk: "low",
    reasoning: "Supply normal, purifier load balanced",
  },
];

const riskColors = {
  low: "text-status-healthy bg-status-healthy-dim",
  medium: "text-status-warning bg-status-warning-dim",
  high: "text-status-danger bg-status-danger-dim",
};

const directionIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

interface ForecastPanelProps {
  className?: string;
}

export function ForecastPanel({ className }: ForecastPanelProps) {
  return (
    <div className={cn("card-atlas rounded-lg border border-card-border", className)}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-accent" />
          <h3 className="text-sm font-display font-semibold text-foreground">24h Intelligence Forecast</h3>
        </div>
        <span className="text-xs font-mono text-muted-foreground">Updated 8 min ago</span>
      </div>

      <div className="p-4 grid gap-3">
        {forecasts.map((item, i) => {
          const DirIcon = directionIcons[item.direction];
          return (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-md bg-surface-2/50 border border-border/30 hover:border-primary/20 transition-colors"
            >
              <div className={cn("p-1.5 rounded flex-shrink-0", riskColors[item.risk])}>
                <DirIcon className="w-3.5 h-3.5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <span className={cn("text-xs font-mono px-1.5 py-0.5 rounded flex-shrink-0 capitalize", riskColors[item.risk])}>
                    {item.risk} risk
                  </span>
                </div>
                <p className="text-xs font-mono text-primary mt-0.5">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.reasoning}</p>

                {/* Confidence bar */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${item.confidence}%`, opacity: 0.7 + (item.confidence / 100) * 0.3 }}
                    />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground w-8 text-right">
                    {item.confidence}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-4 pb-3 pt-0">
        <button className="text-xs text-primary hover:text-primary-glow transition-colors font-medium w-full text-center">
          Explore scenario forecasts →
        </button>
      </div>
    </div>
  );
}
