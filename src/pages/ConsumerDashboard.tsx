import { cn } from "@/lib/utils";
import {
  Thermometer, Droplets, Zap, Wind, UtensilsCrossed,
  ShieldCheck, TrendingUp, Leaf
} from "lucide-react";
import { MetricTile } from "../atlas/MetricTile";
import { AlertFeed } from "../atlas/AlertFeed";
import { DeviceGrid } from "../atlas/DeviceGrid";
import { HealthScoreRing } from "../atlas/HealthScoreRing";
import { ForecastPanel } from "../atlas/ForecastPanel";
import heroBg from "@/assets/hero-bg.jpg";

export function ConsumerDashboard() {
  return (
    <div className="p-4 space-y-4 animate-fade-in-up">
      {/* Hero banner */}
      <div
        className="relative rounded-xl overflow-hidden border border-card-border"
        style={{ minHeight: 140 }}
      >
        <img
          src={heroBg}
          alt="Atlas network"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="relative z-10 p-5 flex items-center justify-between gap-6">
          <div>
            <p className="text-xs font-mono text-primary mb-1 uppercase tracking-widest">
              Atlas HabitatOS · 14 Mar 2026 · 09:41 EAT
            </p>
            <h1 className="text-xl font-display font-bold text-foreground">
              Good morning, Amara.
            </h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              3 things need your attention today. Your home environment is{" "}
              <span className="text-status-warning font-medium">moderately healthy</span>.
            </p>
          </div>

          <div className="flex gap-6">
            <HealthScoreRing score={78} label="Home Health" sublabel="Moderate" size="md" />
            <HealthScoreRing score={91} label="Air Quality" sublabel="Good" size="md" />
            <HealthScoreRing score={58} label="Cold Chain" sublabel="At Risk" size="md" />
          </div>
        </div>
      </div>

      {/* Metric tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricTile
          label="Fridge Zone B"
          value="7.8"
          unit="°C"
          icon={Thermometer}
          status="warning"
          trend={{ direction: "up", label: "Rising +1.2°C in 2h" }}
        />
        <MetricTile
          label="Water Filter"
          value="71"
          unit="%"
          icon={Droplets}
          status="warning"
          trend={{ direction: "down", label: "Declining efficiency" }}
        />
        <MetricTile
          label="Power Usage"
          value="3.2"
          unit="kW"
          icon={Zap}
          status="healthy"
          trend={{ direction: "down", label: "12% below average" }}
        />
        <MetricTile
          label="Indoor Air"
          value="18"
          unit="AQI"
          icon={Wind}
          status="healthy"
          subtitle="Excellent — no action needed"
        />
        <MetricTile
          label="Food Risk"
          value="HIGH"
          unit=""
          icon={UtensilsCrossed}
          status="danger"
          trend={{ direction: "up", label: "Check storage unit now" }}
        />
        <MetricTile
          label="Security"
          value="OK"
          unit=""
          icon={ShieldCheck}
          status="healthy"
          subtitle="All sensors active"
        />
        <MetricTile
          label="Daily Savings"
          value="KSh 48"
          unit=""
          icon={TrendingUp}
          status="healthy"
          trend={{ direction: "down", label: "vs KSh 62 yesterday" }}
        />
        <MetricTile
          label="Waste Avoided"
          value="0.8"
          unit="kg"
          icon={Leaf}
          status="info"
          subtitle="This week · food & water"
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Alerts + Forecast */}
        <div className="lg:col-span-2 space-y-4">
          <AlertFeed />
          <ForecastPanel />
        </div>

        {/* Right: Device grid */}
        <div>
          <DeviceGrid />
        </div>
      </div>

      {/* Bottom actions bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Run Optimization", sub: "Save up to KSh 80 today", color: "border-primary/30 hover:border-primary/60" },
          { label: "Schedule Service", sub: "Fridge seal inspection", color: "border-status-warning/30 hover:border-status-warning/60" },
          { label: "View Monthly Report", sub: "February summary ready", color: "border-border hover:border-primary/30" },
          { label: "Add Device", sub: "Onboard new sensor", color: "border-border hover:border-primary/30" },
        ].map((action, i) => (
          <button
            key={i}
            className={cn(
              "card-atlas rounded-lg p-3.5 text-left border transition-all duration-200 group",
              action.color
            )}
          >
            <p className="text-sm font-display font-semibold text-foreground group-hover:text-primary transition-colors">
              {action.label}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{action.sub}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
