import { cn } from "@/lib/utils";
import {
  Droplets, Wind, Thermometer, AlertTriangle, CheckCircle,
  Info, TrendingDown, Activity, Gauge
} from "lucide-react";
import { HealthScoreRing } from "@/components/atlas/HealthScoreRing";

const waterReadings = [
  { label: "pH Level", value: "7.1", optimal: "6.5–8.5", status: "healthy" as const, note: "Neutral, safe to drink" },
  { label: "Turbidity", value: "1.8 NTU", optimal: "< 4 NTU", status: "healthy" as const, note: "Clear" },
  { label: "Chlorine", value: "0.3 mg/L", optimal: "0.2–0.5", status: "healthy" as const, note: "Within range" },
  { label: "Filter Life", value: "71%", optimal: "Replace at 20%", status: "warning" as const, note: "Replace within 5 days" },
  { label: "Flow Rate", value: "4.2 L/min", optimal: "3–6 L/min", status: "healthy" as const, note: "Normal" },
  { label: "Pressure", value: "2.8 bar", optimal: "2–4 bar", status: "healthy" as const, note: "Stable" },
];

const airReadings = [
  { label: "AQI Score", value: "18", optimal: "< 50 is Good", status: "healthy" as const, unit: "AQI" },
  { label: "CO₂", value: "612", optimal: "< 1000 ppm", status: "healthy" as const, unit: "ppm" },
  { label: "PM2.5", value: "8.2", optimal: "< 12 μg/m³", status: "healthy" as const, unit: "μg/m³" },
  { label: "Humidity", value: "68", optimal: "40–60%", status: "warning" as const, unit: "%" },
  { label: "Indoor Temp", value: "24.3", optimal: "20–26°C", status: "healthy" as const, unit: "°C" },
  { label: "VOC Index", value: "Low", optimal: "Low is Safe", status: "healthy" as const, unit: "" },
];

const statusColors = {
  healthy: { text: "text-status-healthy", bg: "bg-status-healthy-dim", bar: "bg-status-healthy", dot: "bg-status-healthy" },
  warning: { text: "text-status-warning", bg: "bg-status-warning-dim", bar: "bg-status-warning", dot: "bg-status-warning animate-blink" },
  danger: { text: "text-status-danger", bg: "bg-status-danger-dim", bar: "bg-status-danger", dot: "bg-status-danger animate-blink" },
};

const hourlyAqi = [14, 15, 16, 14, 13, 15, 18, 22, 26, 24, 20, 18];
const hourlyLabels = ["9am", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8pm"];

const waterUsage = [32, 45, 28, 38, 42, 55, 61, 48, 35, 29, 22, 18];

const recommendations = [
  {
    type: "warning" as const,
    title: "Schedule water filter replacement",
    body: "Filter efficiency at 71%. Purification quality will degrade below safe threshold in ~5 days. Order replacement now.",
    confidence: 91,
  },
  {
    type: "warning" as const,
    title: "Humidity above comfort zone",
    body: "Living room humidity at 68% — above the 40–60% comfort range. Run dehumidifier or increase ventilation.",
    confidence: 84,
  },
  {
    type: "info" as const,
    title: "Air quality will worsen 1pm–5pm",
    body: "Outdoor AQI forecast is 45–60 this afternoon. Close windows during that window to maintain indoor air quality.",
    confidence: 77,
  },
];

export function WaterAirPage() {
  return (
    <div className="p-4 space-y-4 animate-fade-in-up">
      {/* Header */}
      <div className="card-atlas rounded-xl border border-card-border p-5">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <p className="text-xs font-mono text-primary mb-1 uppercase tracking-widest">
              Water & Air Intelligence
            </p>
            <h1 className="text-xl font-display font-bold text-foreground">
              Environment Quality
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Water quality healthy · Humidity elevated · Filter replacement due soon
            </p>
          </div>
          <div className="flex gap-5">
            <HealthScoreRing score={82} label="Water Quality" sublabel="Good" size="sm" />
            <HealthScoreRing score={91} label="Air Quality" sublabel="Excellent" size="sm" />
            <HealthScoreRing score={65} label="Comfort Index" sublabel="Moderate" size="sm" />
          </div>
        </div>
      </div>

      {/* Water + Air readings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Water */}
        <div className="card-atlas rounded-lg border border-card-border">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-status-info" />
              <h3 className="text-sm font-display font-semibold text-foreground">Water System</h3>
            </div>
            <span className="text-xs font-mono text-status-healthy bg-status-healthy-dim px-2 py-0.5 rounded">
              Purifier Active
            </span>
          </div>
          <div className="p-4 grid grid-cols-2 gap-2.5">
            {waterReadings.map((r, i) => {
              const cfg = statusColors[r.status];
              return (
                <div key={i} className={cn("rounded-md border p-3", r.status === "warning" ? "border-status-warning/20" : "border-border/30")}>
                  <p className="text-xs text-muted-foreground mb-1">{r.label}</p>
                  <p className={cn("text-lg font-display font-bold", cfg.text)}>{r.value}</p>
                  <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{r.note}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", cfg.dot)} />
                    <span className="text-[10px] text-muted-foreground">{r.optimal}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Water usage chart */}
          <div className="px-4 pb-4">
            <p className="text-xs font-mono text-muted-foreground mb-2">Daily water usage (L/hr)</p>
            <div className="flex items-end gap-1 h-12">
              {waterUsage.map((v, i) => {
                const h = (v / 65) * 100;
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-status-info"
                    style={{ height: `${h}%`, opacity: 0.5 + (v / 120) }}
                  />
                );
              })}
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] font-mono text-muted-foreground">9am</span>
              <span className="text-[10px] font-mono text-muted-foreground">8pm</span>
            </div>
          </div>
        </div>

        {/* Air */}
        <div className="card-atlas rounded-lg border border-card-border">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-status-healthy" />
              <h3 className="text-sm font-display font-semibold text-foreground">Air Quality</h3>
            </div>
            <span className="text-xs font-mono text-muted-foreground">Bedroom + Living Room</span>
          </div>
          <div className="p-4 grid grid-cols-2 gap-2.5">
            {airReadings.map((r, i) => {
              const cfg = statusColors[r.status];
              return (
                <div key={i} className={cn("rounded-md border p-3", r.status === "warning" ? "border-status-warning/20" : "border-border/30")}>
                  <p className="text-xs text-muted-foreground mb-1">{r.label}</p>
                  <div className="flex items-baseline gap-0.5">
                    <p className={cn("text-lg font-display font-bold", cfg.text)}>{r.value}</p>
                    {r.unit && <span className="text-xs text-muted-foreground font-mono">{r.unit}</span>}
                  </div>
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", cfg.dot)} />
                    <span className="text-[10px] text-muted-foreground">{r.optimal}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AQI hourly chart */}
          <div className="px-4 pb-4">
            <p className="text-xs font-mono text-muted-foreground mb-2">AQI hourly trend (today)</p>
            <div className="flex items-end gap-1 h-12">
              {hourlyAqi.map((v, i) => {
                const h = (v / 30) * 100;
                const color = v > 50 ? "bg-status-danger" : v > 30 ? "bg-status-warning" : "bg-status-healthy";
                return (
                  <div
                    key={i}
                    className={cn("flex-1 rounded-sm", color)}
                    style={{ height: `${h}%`, opacity: 0.7 }}
                  />
                );
              })}
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] font-mono text-muted-foreground">9am</span>
              <span className="text-[10px] font-mono text-muted-foreground">8pm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="card-atlas rounded-lg border border-card-border">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
          <h3 className="text-sm font-display font-semibold text-foreground">Environment Recommendations</h3>
        </div>
        <div className="p-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          {recommendations.map((rec, i) => {
            const Icon = rec.type === "warning" ? AlertTriangle : Info;
            const cfg = rec.type === "warning"
              ? { icon: "text-status-warning", bg: "bg-status-warning-dim", border: "border-status-warning/20" }
              : { icon: "text-status-info", bg: "bg-status-info-dim", border: "border-status-info/20" };

            return (
              <div key={i} className={cn("rounded-md border p-3", cfg.border)}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={cn("p-1.5 rounded", cfg.bg)}>
                    <Icon className={cn("w-3.5 h-3.5", cfg.icon)} />
                  </div>
                  <p className="text-sm font-medium text-foreground leading-tight">{rec.title}</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">{rec.body}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${rec.confidence}%` }} />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">{rec.confidence}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Order Filter Replacement", sub: "Ships in 1–2 days", color: "border-status-warning/30 hover:border-status-warning/60" },
          { label: "Run Ventilation Cycle", sub: "15-min air exchange", color: "border-primary/30 hover:border-primary/60" },
          { label: "View Water History", sub: "7-day quality log", color: "border-border hover:border-primary/30" },
          { label: "Set Humidity Alert", sub: "Notify above 65%", color: "border-border hover:border-primary/30" },
        ].map((a, i) => (
          <button key={i} className={cn("card-atlas rounded-lg p-3.5 text-left border transition-all duration-200 group", a.color)}>
            <p className="text-sm font-display font-semibold text-foreground group-hover:text-primary transition-colors">{a.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{a.sub}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
