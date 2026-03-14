import { cn } from "@/lib/utils";
import {
  Thermometer, AlertTriangle, CheckCircle, Clock, Refrigerator,
  TrendingUp, TrendingDown, Minus, Zap, ShieldAlert, Info
} from "lucide-react";
import { HealthScoreRing } from "@/components/atlas/HealthScoreRing";

interface StorageUnit {
  id: string;
  name: string;
  type: string;
  temp: number;
  optimal: string;
  status: "healthy" | "warning" | "danger";
  efficiency: number;
  powerUsage: string;
  door: "sealed" | "open" | "faulty";
}

const units: StorageUnit[] = [
  { id: "u1", name: "Kitchen Fridge", type: "Refrigerator", temp: 7.8, optimal: "2–5°C", status: "warning", efficiency: 74, powerUsage: "1.2 kW", door: "faulty" },
  { id: "u2", name: "Chest Freezer", type: "Freezer", temp: -17.2, optimal: "−18°C", status: "healthy", efficiency: 95, powerUsage: "0.8 kW", door: "sealed" },
  { id: "u3", name: "Pantry Cooler", type: "Cool Storage", temp: 14.1, optimal: "10–15°C", status: "healthy", efficiency: 88, powerUsage: "0.4 kW", door: "sealed" },
];

interface FoodItem {
  name: string;
  category: string;
  stored: string;
  expiresIn: string;
  riskLevel: "safe" | "monitor" | "consume-soon" | "at-risk";
  unit: string;
}

const foodItems: FoodItem[] = [
  { name: "Fresh Milk", category: "Dairy", stored: "Kitchen Fridge", expiresIn: "18 hrs", riskLevel: "at-risk", unit: "2L" },
  { name: "Spinach Bunch", category: "Produce", stored: "Kitchen Fridge", expiresIn: "1 day", riskLevel: "consume-soon", unit: "400g" },
  { name: "Cooked Beans", category: "Leftovers", stored: "Kitchen Fridge", expiresIn: "2 days", riskLevel: "monitor", unit: "800g" },
  { name: "Beef (minced)", category: "Meat", stored: "Chest Freezer", expiresIn: "14 days", riskLevel: "safe", unit: "1kg" },
  { name: "Ugali flour", category: "Dry Goods", stored: "Pantry Cooler", expiresIn: "3 months", riskLevel: "safe", unit: "5kg" },
  { name: "Tomatoes", category: "Produce", stored: "Kitchen Fridge", expiresIn: "3 days", riskLevel: "monitor", unit: "6 pcs" },
];

const riskConfig = {
  safe: { label: "Safe", color: "text-status-healthy bg-status-healthy-dim", dot: "bg-status-healthy" },
  monitor: { label: "Monitor", color: "text-status-info bg-status-info-dim", dot: "bg-status-info" },
  "consume-soon": { label: "Consume Soon", color: "text-status-warning bg-status-warning-dim", dot: "bg-status-warning animate-blink" },
  "at-risk": { label: "At Risk", color: "text-status-danger bg-status-danger-dim", dot: "bg-status-danger animate-blink" },
};

const statusConfig = {
  healthy: { bar: "bg-status-healthy", border: "border-status-healthy/20", text: "text-status-healthy" },
  warning: { bar: "bg-status-warning", border: "border-status-warning/25", text: "text-status-warning" },
  danger: { bar: "bg-status-danger", border: "border-status-danger/25", text: "text-status-danger" },
};

const tempHistory = [4.2, 4.8, 5.1, 5.6, 6.0, 6.4, 6.8, 7.2, 7.5, 7.8];

const recommendations = [
  {
    severity: "danger" as const,
    title: "Consume or relocate fresh milk",
    body: "Fridge Zone temp has risen to 7.8°C. At this rate, fresh milk reaches unsafe zone in ~18 hours. Move to chest freezer or consume today.",
    confidence: 89,
    sources: ["Temperature sensor", "Door seal signal", "Historical decay model"],
  },
  {
    severity: "warning" as const,
    title: "Check kitchen fridge door seal",
    body: "Door seal resistance has dropped 34% over 72 hours. This is the likely cause of temperature rise. Estimated energy waste: KSh 22/day.",
    confidence: 82,
    sources: ["Door seal sensor", "Power usage data"],
  },
  {
    severity: "info" as const,
    title: "Optimal cooling window: 6am–8am",
    body: "Pre-cooling the fridge before peak outdoor heat reduces compressor load by ~18% and keeps contents safer through afternoon heat.",
    confidence: 76,
    sources: ["Weather forecast", "Usage pattern model"],
  },
];

export function FoodStoragePage() {
  const spoilageScore = 42;

  return (
    <div className="p-4 space-y-4 animate-fade-in-up">
      {/* Header */}
      <div className="card-atlas rounded-xl border border-card-border p-5">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <p className="text-xs font-mono text-primary mb-1 uppercase tracking-widest">
              Food & Storage Intelligence
            </p>
            <h1 className="text-xl font-display font-bold text-foreground">
              Storage Health Overview
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Kitchen fridge at risk · 2 items need attention today ·{" "}
              <span className="text-status-warning font-medium">Action required</span>
            </p>
          </div>
          <div className="flex gap-5">
            <HealthScoreRing score={spoilageScore} label="Storage Health" sublabel="At Risk" size="sm" />
            <HealthScoreRing score={88} label="Freezer" sublabel="Optimal" size="sm" />
            <HealthScoreRing score={91} label="Pantry" sublabel="Good" size="sm" />
          </div>
        </div>
      </div>

      {/* Storage units */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {units.map((unit) => {
          const cfg = statusConfig[unit.status];
          return (
            <div key={unit.id} className={cn("card-atlas rounded-lg border p-4", cfg.border)}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={cn("p-2 rounded-md", unit.status === "healthy" ? "bg-status-healthy-dim" : unit.status === "warning" ? "bg-status-warning-dim" : "bg-status-danger-dim")}>
                    <Refrigerator className={cn("w-4 h-4", cfg.text)} />
                  </div>
                  <div>
                    <p className="text-sm font-display font-semibold text-foreground">{unit.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{unit.type}</p>
                  </div>
                </div>
                {unit.door === "faulty" && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-status-danger-dim text-status-danger font-mono">
                    Seal fault
                  </span>
                )}
              </div>

              {/* Temp display */}
              <div className="flex items-baseline gap-1 mb-1">
                <span className={cn("text-3xl font-display font-bold", cfg.text)}>
                  {unit.temp > 0 ? `${unit.temp}` : unit.temp}
                </span>
                <span className="text-lg text-muted-foreground font-mono">°C</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Optimal: {unit.optimal}</p>

              {/* Mini sparkline for fridge */}
              {unit.id === "u1" && (
                <div className="mb-3">
                  <p className="text-[10px] font-mono text-muted-foreground mb-1">12h temperature trend</p>
                  <div className="flex items-end gap-0.5 h-8">
                    {tempHistory.map((t, i) => {
                      const norm = (t - 3) / (9 - 3);
                      const h = Math.max(4, norm * 100);
                      const isHot = t > 7;
                      return (
                        <div
                          key={i}
                          className={cn("flex-1 rounded-sm transition-all", isHot ? "bg-status-danger" : t > 5.5 ? "bg-status-warning" : "bg-status-healthy")}
                          style={{ height: `${h}%`, opacity: 0.6 + i * 0.04 }}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Efficiency bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Efficiency</span>
                  <span className={cn("text-xs font-mono", cfg.text)}>{unit.efficiency}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all", cfg.bar)}
                    style={{ width: `${unit.efficiency}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
                <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                  <Zap className="w-3 h-3" /> {unit.powerUsage}
                </span>
                <span className={cn("text-xs font-mono font-medium", cfg.text, "capitalize")}>{unit.status}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Food freshness + AI recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Freshness windows */}
        <div className="card-atlas rounded-lg border border-card-border">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
            <h3 className="text-sm font-display font-semibold text-foreground">Freshness Windows</h3>
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
              {foodItems.filter(f => f.riskLevel === "at-risk" || f.riskLevel === "consume-soon").length} need attention
            </span>
          </div>
          <div className="divide-y divide-border/30">
            {foodItems.map((item, i) => {
              const cfg = riskConfig[item.riskLevel];
              return (
                <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-surface-2/50 transition-colors">
                  <span className={cn("w-2 h-2 rounded-full flex-shrink-0", cfg.dot)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.stored} · {item.unit}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={cn("text-xs font-mono px-1.5 py-0.5 rounded", cfg.color)}>
                      {cfg.label}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" /> {item.expiresIn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="px-4 py-2.5 border-t border-border/30">
            <button className="text-xs text-primary hover:text-primary-glow transition-colors font-medium w-full text-center">
              View full inventory →
            </button>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="card-atlas rounded-lg border border-card-border">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
              <h3 className="text-sm font-display font-semibold text-foreground">AI Recommendations</h3>
            </div>
            <span className="text-xs font-mono text-muted-foreground">Updated 4 min ago</span>
          </div>
          <div className="p-3 space-y-3">
            {recommendations.map((rec, i) => {
              const Icon = rec.severity === "danger" ? ShieldAlert : rec.severity === "warning" ? AlertTriangle : Info;
              const colorCfg = {
                danger: { icon: "text-status-danger", bg: "bg-status-danger-dim", border: "border-status-danger/20" },
                warning: { icon: "text-status-warning", bg: "bg-status-warning-dim", border: "border-status-warning/20" },
                info: { icon: "text-status-info", bg: "bg-status-info-dim", border: "border-status-info/20" },
              }[rec.severity];

              return (
                <div key={i} className={cn("rounded-md border p-3", colorCfg.border)}>
                  <div className="flex items-start gap-2.5 mb-2">
                    <div className={cn("p-1.5 rounded flex-shrink-0", colorCfg.bg)}>
                      <Icon className={cn("w-3.5 h-3.5", colorCfg.icon)} />
                    </div>
                    <p className="text-sm font-medium text-foreground leading-snug">{rec.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed pl-8 mb-2">{rec.body}</p>

                  {/* Confidence + sources */}
                  <div className="pl-8 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${rec.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground w-12 text-right">
                        {rec.confidence}% conf.
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {rec.sources.map((s, j) => (
                        <span key={j} className="text-[10px] font-mono bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Wastage stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Food Waste Avoided", value: "0.8 kg", note: "This week", icon: CheckCircle, color: "text-status-healthy bg-status-healthy-dim" },
          { label: "Estimated Spoilage Cost", value: "KSh 340", note: "If no action taken", icon: AlertTriangle, color: "text-status-danger bg-status-danger-dim" },
          { label: "Cold Storage Uptime", value: "97.4%", note: "Last 30 days", icon: TrendingUp, color: "text-status-info bg-status-info-dim" },
          { label: "Energy Used (cooling)", value: "2.4 kWh", note: "Today", icon: Zap, color: "text-muted-foreground bg-muted" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="card-atlas rounded-lg border border-card-border p-4">
              <div className={cn("w-8 h-8 rounded-md flex items-center justify-center mb-3", stat.color)}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-xl font-display font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              <p className="text-[10px] font-mono text-muted-foreground mt-1">{stat.note}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
