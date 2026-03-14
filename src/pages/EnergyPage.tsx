import { cn } from "@/lib/utils";
import { Zap, TrendingDown, TrendingUp, Clock, Battery, Sun, AlertTriangle } from "lucide-react";
import { HealthScoreRing } from "@/components/atlas/HealthScoreRing";

const hourlyUsage = [0.8, 0.6, 0.5, 0.5, 0.7, 1.2, 2.1, 2.8, 2.4, 2.2, 2.6, 3.0, 3.2, 2.9, 2.7, 2.5, 3.0, 3.4, 3.2, 2.8, 2.2, 1.8, 1.4, 1.0];
const hours = ["12a","1","2","3","4","5","6","7","8","9","10","11","12p","1","2","3","4","5","6","7","8","9","10","11p"];

const appliances = [
  { name: "Kitchen Fridge", usage: 1.2, percent: 37, status: "warning" as const },
  { name: "Chest Freezer", usage: 0.8, percent: 25, status: "healthy" as const },
  { name: "Air System", usage: 0.6, percent: 19, status: "healthy" as const },
  { name: "Water Heater", usage: 0.4, percent: 13, status: "healthy" as const },
  { name: "Lighting", usage: 0.2, percent: 6, status: "healthy" as const },
];

const statusCfg = {
  healthy: { bar: "bg-status-healthy", text: "text-status-healthy" },
  warning: { bar: "bg-status-warning", text: "text-status-warning" },
  danger: { bar: "bg-status-danger", text: "text-status-danger" },
};

export function EnergyPage() {
  const maxUsage = Math.max(...hourlyUsage);
  const currentHour = 9; // 9am simulated

  return (
    <div className="p-4 space-y-4 animate-fade-in-up">
      {/* Header */}
      <div className="card-atlas rounded-xl border border-card-border p-5">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <p className="text-xs font-mono text-primary mb-1 uppercase tracking-widest">Energy Monitoring</p>
            <h1 className="text-xl font-display font-bold text-foreground">Power Usage & Optimization</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Current: <span className="text-primary font-mono">3.2 kW</span> · 12% below daily average ·{" "}
              <span className="text-status-healthy font-medium">Optimized</span>
            </p>
          </div>
          <div className="flex gap-5">
            <HealthScoreRing score={84} label="Energy Score" sublabel="Good" size="sm" />
            <HealthScoreRing score={91} label="Grid Stability" sublabel="Stable" size="sm" />
          </div>
        </div>
      </div>

      {/* Key metrics row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Today so far", value: "18.4 kWh", note: "vs 22.1 kWh avg", icon: Zap, color: "text-primary bg-primary-dim", delta: "↓ 17%" },
          { label: "Est. daily cost", value: "KSh 340", note: "at current rate", icon: TrendingDown, color: "text-status-healthy bg-status-healthy-dim", delta: "Saving KSh 80" },
          { label: "Peak hour", value: "6–7 PM", note: "Highest demand", icon: Clock, color: "text-status-warning bg-status-warning-dim", delta: "Pre-schedule advised" },
          { label: "Grid signal", value: "STABLE", note: "No fluctuations", icon: Battery, color: "text-status-healthy bg-status-healthy-dim", delta: "Normal" },
        ].map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="card-atlas rounded-lg border border-card-border p-4">
              <div className={cn("w-8 h-8 rounded-md flex items-center justify-center mb-3", m.color)}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-lg font-display font-bold text-foreground">{m.value}</p>
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="text-[10px] font-mono text-muted-foreground mt-1">{m.delta}</p>
            </div>
          );
        })}
      </div>

      {/* Usage chart */}
      <div className="card-atlas rounded-lg border border-card-border">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <h3 className="text-sm font-display font-semibold text-foreground">24h Power Usage (kW)</h3>
          <span className="text-xs font-mono text-muted-foreground">Live · Updated now</span>
        </div>
        <div className="p-4">
          <div className="flex items-end gap-0.5 h-24">
            {hourlyUsage.map((v, i) => {
              const h = (v / maxUsage) * 100;
              const isPast = i <= currentHour;
              const isPeak = v > 2.8;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                  <div
                    className={cn(
                      "w-full rounded-sm",
                      !isPast ? "opacity-30" : "",
                      isPeak ? "bg-status-warning" : "bg-primary"
                    )}
                    style={{ height: `${h}%`, minHeight: 2 }}
                  />
                </div>
              );
            })}
          </div>
          {/* Hour labels — sparse */}
          <div className="flex mt-1 text-[9px] font-mono text-muted-foreground">
            {hours.map((h, i) => (
              <div key={i} className="flex-1 text-center">
                {i % 6 === 0 ? h : ""}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Breakdown + Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Appliance breakdown */}
        <div className="card-atlas rounded-lg border border-card-border">
          <div className="px-4 py-3 border-b border-border/50">
            <h3 className="text-sm font-display font-semibold text-foreground">Appliance Breakdown</h3>
          </div>
          <div className="p-4 space-y-3">
            {appliances.map((a, i) => {
              const cfg = statusCfg[a.status];
              return (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-foreground">{a.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={cn("text-xs font-mono", cfg.text)}>{a.usage} kW</span>
                      <span className="text-xs text-muted-foreground">{a.percent}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", cfg.bar)} style={{ width: `${a.percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Optimization tips */}
        <div className="card-atlas rounded-lg border border-card-border">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
            <Sun className="w-4 h-4 text-status-warning" />
            <h3 className="text-sm font-display font-semibold text-foreground">Optimization Opportunities</h3>
          </div>
          <div className="p-3 space-y-2.5">
            {[
              { tip: "Schedule fridge defrost cycle for 3am", saving: "Save KSh 24/day", type: "auto", severity: "info" as const },
              { tip: "Pre-cool home at 5pm before peak hours", saving: "Save KSh 38/day", type: "schedule", severity: "info" as const },
              { tip: "Fix fridge door seal to stop energy leak", saving: "Save KSh 22/day", type: "action", severity: "warning" as const },
              { tip: "Reduce water heater standby temp by 5°C", saving: "Save KSh 14/week", type: "settings", severity: "info" as const },
            ].map((t, i) => {
              const Icon = t.severity === "warning" ? AlertTriangle : Zap;
              const cfg = t.severity === "warning"
                ? { icon: "text-status-warning", bg: "bg-status-warning-dim", border: "border-status-warning/20" }
                : { icon: "text-primary", bg: "bg-primary-dim", border: "border-border/30" };
              return (
                <div key={i} className={cn("flex items-start gap-2.5 p-2.5 rounded-md border", cfg.border)}>
                  <div className={cn("p-1.5 rounded flex-shrink-0 mt-0.5", cfg.bg)}>
                    <Icon className={cn("w-3 h-3", cfg.icon)} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-foreground leading-snug">{t.tip}</p>
                    <p className="text-[10px] font-mono text-status-healthy mt-0.5">{t.saving}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
