import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type StatusType = "healthy" | "warning" | "danger" | "info" | "offline" | "neutral";

interface MetricTileProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  status?: StatusType;
  trend?: { direction: "up" | "down" | "stable"; label: string };
  subtitle?: string;
  className?: string;
  onClick?: () => void;
}

const statusConfig: Record<StatusType, { dot: string; badge: string; border: string }> = {
  healthy: {
    dot: "bg-status-healthy animate-pulse-glow",
    badge: "bg-status-healthy-dim text-status-healthy",
    border: "border-status-healthy/20",
  },
  warning: {
    dot: "bg-status-warning",
    badge: "bg-status-warning-dim text-status-warning",
    border: "border-status-warning/20",
  },
  danger: {
    dot: "bg-status-danger animate-blink",
    badge: "bg-status-danger-dim text-status-danger",
    border: "border-status-danger/20",
  },
  info: {
    dot: "bg-status-info",
    badge: "bg-status-info-dim text-status-info",
    border: "border-status-info/20",
  },
  offline: {
    dot: "bg-status-offline",
    badge: "bg-status-offline-dim text-status-offline",
    border: "border-status-offline/20",
  },
  neutral: {
    dot: "bg-muted-foreground",
    badge: "bg-muted text-muted-foreground",
    border: "border-border",
  },
};

export function MetricTile({
  label,
  value,
  unit,
  icon: Icon,
  status = "neutral",
  trend,
  subtitle,
  className,
  onClick,
}: MetricTileProps) {
  const cfg = statusConfig[status];

  return (
    <div
      className={cn(
        "card-atlas rounded-lg p-4 flex flex-col gap-3 transition-all duration-200",
        onClick && "cursor-pointer hover:border-primary/40 hover:shadow-glow",
        `border ${cfg.border}`,
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className={cn("p-2 rounded-md", cfg.badge)}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} />
          <span className={cn("text-xs font-mono capitalize", cfg.badge.split(" ")[1])}>
            {status}
          </span>
        </div>
      </div>

      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-display font-bold text-foreground">{value}</span>
          {unit && <span className="text-sm text-muted-foreground font-mono">{unit}</span>}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
      </div>

      {(trend || subtitle) && (
        <div className="border-t border-border/50 pt-2.5 mt-auto">
          {trend && (
            <p className="text-xs text-muted-foreground">
              <span className={cn(
                "font-medium",
                trend.direction === "up" && status === "healthy" ? "text-status-healthy" : "",
                trend.direction === "down" && status === "danger" ? "text-status-danger" : "",
                trend.direction === "up" && status === "danger" ? "text-status-danger" : "",
                trend.direction === "down" && status === "healthy" ? "text-status-healthy" : "",
              )}>
                {trend.direction === "up" ? "↑" : trend.direction === "down" ? "↓" : "→"}{" "}
              </span>
              {trend.label}
            </p>
          )}
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      )}
    </div>
  );
}
