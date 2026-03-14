import { cn } from "@/lib/utils";
import { AlertTriangle, Info, ShieldAlert, TrendingUp, Clock, ChevronRight } from "lucide-react";

type AlertSeverity = "urgent" | "action" | "forecast" | "info";

interface AlertItem {
  id: string;
  severity: AlertSeverity;
  title: string;
  body: string;
  time: string;
  domain: string;
  actionable?: boolean;
}

const mockAlerts: AlertItem[] = [
  {
    id: "a1",
    severity: "urgent",
    title: "Cold storage temperature rising",
    body: "Fridge Zone B has risen to 8°C. Spoilage window: ~18 hours. Check door seal.",
    time: "3 min ago",
    domain: "Food Storage",
    actionable: true,
  },
  {
    id: "a2",
    severity: "action",
    title: "Water filter efficiency declining",
    body: "Purification rate at 71%. Recommended filter replacement within 5 days.",
    time: "47 min ago",
    domain: "Water & Air",
    actionable: true,
  },
  {
    id: "a3",
    severity: "forecast",
    title: "High heat stress expected",
    body: "Indoor temperature forecast: 28–32°C from 1pm–5pm. Pre-cool now to save energy.",
    time: "2 hr ago",
    domain: "Environment",
    actionable: false,
  },
  {
    id: "a4",
    severity: "info",
    title: "Power grid instability detected",
    body: "Minor voltage fluctuations in local grid. Cold chain backup threshold monitoring active.",
    time: "4 hr ago",
    domain: "Energy",
    actionable: false,
  },
];

const severityConfig: Record<AlertSeverity, {
  icon: typeof AlertTriangle;
  color: string;
  bg: string;
  bar: string;
  label: string;
}> = {
  urgent: {
    icon: ShieldAlert,
    color: "text-status-danger",
    bg: "bg-status-danger-dim",
    bar: "bg-status-danger",
    label: "Urgent",
  },
  action: {
    icon: AlertTriangle,
    color: "text-status-warning",
    bg: "bg-status-warning-dim",
    bar: "bg-status-warning",
    label: "Action Needed",
  },
  forecast: {
    icon: TrendingUp,
    color: "text-status-info",
    bg: "bg-status-info-dim",
    bar: "bg-status-info",
    label: "Forecast",
  },
  info: {
    icon: Info,
    color: "text-muted-foreground",
    bg: "bg-muted",
    bar: "bg-muted-foreground",
    label: "Info",
  },
};

interface AlertFeedProps {
  className?: string;
  limit?: number;
}

export function AlertFeed({ className, limit = 4 }: AlertFeedProps) {
  const alerts = mockAlerts.slice(0, limit);

  return (
    <div className={cn("card-atlas rounded-lg border border-card-border", className)}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-status-danger animate-blink" />
          <h3 className="text-sm font-display font-semibold text-foreground">Active Alerts</h3>
        </div>
        <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
          {alerts.length} active
        </span>
      </div>

      <div className="divide-y divide-border/30">
        {alerts.map((alert) => {
          const cfg = severityConfig[alert.severity];
          const SevIcon = cfg.icon;

          return (
            <div
              key={alert.id}
              className="flex gap-3 px-4 py-3.5 hover:bg-surface-2/50 transition-colors cursor-pointer group"
            >
              {/* Severity bar */}
              <div className={cn("w-0.5 rounded-full self-stretch flex-shrink-0", cfg.bar)} />

              {/* Icon */}
              <div className={cn("w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5", cfg.bg)}>
                <SevIcon className={cn("w-3.5 h-3.5", cfg.color)} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-foreground leading-snug">{alert.title}</p>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{alert.body}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={cn("text-xs font-mono px-1.5 py-0.5 rounded", cfg.bg, cfg.color)}>
                    {cfg.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{alert.domain}</span>
                  <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground font-mono">
                    <Clock className="w-3 h-3" />
                    {alert.time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-4 py-2.5 border-t border-border/30">
        <button className="text-xs text-primary hover:text-primary-glow transition-colors font-medium w-full text-center">
          View all alerts →
        </button>
      </div>
    </div>
  );
}
