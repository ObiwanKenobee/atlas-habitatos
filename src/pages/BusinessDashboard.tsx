import { cn } from "@/lib/utils";
import { MetricTile } from "../components/atlas/MetricTile";
import { AlertFeed } from "../components/atlas/AlertFeed";
import { HealthScoreRing } from "../components/atlas/HealthScoreRing";
import {
  Thermometer, Zap, Wrench, Package, TrendingUp,
  Users, MapPin, Activity
} from "lucide-react";

const zones = [
  { name: "Cold Kitchen", status: "warning", devices: 8, risk: "Medium", temp: "6.2°C" },
  { name: "Storage Bay A", status: "healthy", devices: 12, risk: "Low", temp: "4.1°C" },
  { name: "Prep Zone", status: "healthy", devices: 5, risk: "Low", temp: "18.4°C" },
  { name: "Delivery Bay", status: "danger", devices: 3, risk: "High", temp: "12.8°C" },
];

const statusColors = {
  healthy: "text-status-healthy bg-status-healthy-dim",
  warning: "text-status-warning bg-status-warning-dim",
  danger: "text-status-danger bg-status-danger-dim",
  offline: "text-status-offline bg-status-offline-dim",
};

export function BusinessDashboard() {
  return (
    <div className="p-4 space-y-4 animate-fade-in-up">
      {/* Header */}
      <div className="card-atlas rounded-xl border border-card-border p-5">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-mono text-muted-foreground">Nakuru · Restaurant Chain · 4 Locations</span>
            </div>
            <h1 className="text-xl font-display font-bold text-foreground">Operations Overview</h1>
            <p className="text-sm text-muted-foreground mt-1">
              2 active incidents · Cold chain monitoring elevated · Staff action queue: 5 open
            </p>
          </div>
          <div className="flex gap-5">
            <HealthScoreRing score={71} label="Asset Health" sublabel="Moderate" size="sm" />
            <HealthScoreRing score={85} label="Uptime" sublabel="Good" size="sm" />
            <HealthScoreRing score={48} label="Cold Chain" sublabel="At Risk" size="sm" />
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricTile label="Active Alerts" value="7" unit="" icon={Activity} status="warning" trend={{ direction: "up", label: "+3 since yesterday" }} />
        <MetricTile label="Avg Cold Temp" value="5.8" unit="°C" icon={Thermometer} status="warning" trend={{ direction: "up", label: "0.6° above optimal" }} />
        <MetricTile label="Energy Today" value="48.2" unit="kWh" icon={Zap} status="healthy" trend={{ direction: "down", label: "8% vs last week" }} />
        <MetricTile label="Open Tickets" value="5" unit="" icon={Wrench} status="danger" subtitle="2 overdue SLA" />
        <MetricTile label="Spoilage Risk" value="HIGH" unit="" icon={Package} status="danger" trend={{ direction: "up", label: "Delivery Bay critical" }} />
        <MetricTile label="Staff Actions" value="5" unit="pending" icon={Users} status="warning" subtitle="Dispatch 2 technicians" />
        <MetricTile label="Cost Savings" value="KSh 2,400" unit="" icon={TrendingUp} status="healthy" subtitle="This month vs baseline" />
        <MetricTile label="Facility Score" value="71" unit="/100" icon={Activity} status="warning" trend={{ direction: "down", label: "↓ from 78 last week" }} />
      </div>

      {/* Zone overview + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Zone cards */}
        <div className="card-atlas rounded-lg border border-card-border">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
            <h3 className="text-sm font-display font-semibold text-foreground">Zone Status</h3>
            <span className="text-xs font-mono text-muted-foreground">4 zones active</span>
          </div>
          <div className="p-3 grid gap-2">
            {zones.map((zone, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-md bg-surface-2/50 border border-border/30 hover:border-primary/20 transition-colors cursor-pointer">
                <div className={cn("w-2 h-2 rounded-full flex-shrink-0",
                  zone.status === "healthy" ? "bg-status-healthy" :
                  zone.status === "warning" ? "bg-status-warning animate-blink" :
                  "bg-status-danger animate-blink"
                )} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{zone.name}</p>
                  <p className="text-xs text-muted-foreground">{zone.devices} devices</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono text-foreground">{zone.temp}</p>
                  <span className={cn("text-xs px-1.5 py-0.5 rounded font-mono",
                    statusColors[zone.status as keyof typeof statusColors]
                  )}>
                    {zone.risk} risk
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <AlertFeed limit={3} />
      </div>

      {/* Forecast strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          {
            title: "Cold chain failure probability",
            value: "+22%",
            note: "If power instability continues for 6+ hours",
            severity: "danger",
          },
          {
            title: "Spoilage cost projection",
            value: "KSh 15,000",
            note: "At current trajectory without intervention",
            severity: "warning",
          },
          {
            title: "Optimization opportunity",
            value: "14% savings",
            note: "Fridge scheduling adjustment available",
            severity: "healthy",
          },
        ].map((f, i) => (
          <div key={i} className={cn(
            "card-atlas rounded-lg border p-4",
            f.severity === "danger" ? "border-status-danger/20" :
            f.severity === "warning" ? "border-status-warning/20" :
            "border-status-healthy/20"
          )}>
            <p className="text-xs text-muted-foreground font-mono mb-2">{f.title}</p>
            <p className={cn("text-2xl font-display font-bold",
              f.severity === "danger" ? "text-status-danger" :
              f.severity === "warning" ? "text-status-warning" :
              "text-status-healthy"
            )}>{f.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{f.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
