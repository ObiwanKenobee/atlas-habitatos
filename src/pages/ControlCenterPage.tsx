import { cn } from "@/lib/utils";
import {
  Users, Activity, AlertTriangle, BarChart3, Settings,
  TrendingUp, TrendingDown, CheckCircle, XCircle, Clock,
  Sliders, Eye, Cpu, GitBranch, Layers, ChevronRight, Info
} from "lucide-react";
import { HealthScoreRing } from "@/components/atlas/HealthScoreRing";

type ControlView = "tenants" | "alerts" | "models" | "simulation" | "settings";

const tenants = [
  { name: "Korir Household", type: "Consumer", devices: 6, health: 78, alerts: 3, plan: "Standard", status: "active" as const },
  { name: "Nakuru Restaurant Chain", type: "Business", devices: 28, health: 71, alerts: 7, plan: "Business", status: "active" as const },
  { name: "Naivasha Clinic", type: "Business", devices: 14, health: 84, alerts: 1, plan: "Business", status: "active" as const },
  { name: "Nakuru County Water Board", type: "Community", devices: 42, health: 55, alerts: 12, plan: "Enterprise", status: "active" as const },
  { name: "Rongai Cooperative Farm", type: "Business", devices: 9, health: 61, alerts: 4, plan: "Standard", status: "degraded" as const },
];

const alertRules = [
  { name: "Cold chain temp > 8°C", triggered: 23, falsePos: "4%", threshold: "8.0°C", status: "active" as const },
  { name: "Water filter < 25% efficiency", triggered: 8, falsePos: "2%", threshold: "25%", status: "active" as const },
  { name: "Door seal resistance drop", triggered: 11, falsePos: "18%", threshold: "−30%", status: "review" as const },
  { name: "Humidity spike > 72%", triggered: 6, falsePos: "9%", threshold: "72%", status: "active" as const },
  { name: "Power instability > 3 events/hr", triggered: 2, falsePos: "0%", threshold: "3/hr", status: "active" as const },
];

const models = [
  {
    name: "Cold Chain Spoilage Predictor",
    version: "v2.4.1",
    accuracy: 87,
    drift: 0.3,
    lastTrained: "2026-03-10",
    inputs: ["Temperature variance", "Door seal resistance", "Ambient humidity", "Power stability"],
    status: "healthy" as const,
  },
  {
    name: "Water Quality Forecaster",
    version: "v1.8.0",
    accuracy: 81,
    drift: 1.2,
    lastTrained: "2026-02-28",
    inputs: ["pH readings", "Turbidity trend", "Rainfall data", "Usage pattern"],
    status: "warning" as const,
  },
  {
    name: "Indoor Air Comfort Model",
    version: "v1.2.3",
    accuracy: 79,
    drift: 0.6,
    lastTrained: "2026-03-05",
    inputs: ["AQI sensor", "Temperature", "Humidity", "Weather forecast"],
    status: "healthy" as const,
  },
];

interface ControlCenterPageProps {
  view?: ControlView;
}

function TenantMonitor() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Tenants", value: "5", note: "Active this month", color: "text-foreground" },
          { label: "Total Devices", value: "99", note: "Across all tenants", color: "text-foreground" },
          { label: "Active Alerts", value: "27", note: "Across all tenants", color: "text-status-warning" },
          { label: "Avg Health Score", value: "70", note: "/100 composite", color: "text-status-warning" },
        ].map((m, i) => (
          <div key={i} className="card-atlas rounded-lg border border-card-border p-4">
            <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
            <p className={cn("text-2xl font-display font-bold", m.color)}>{m.value}</p>
            <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{m.note}</p>
          </div>
        ))}
      </div>

      <div className="card-atlas rounded-lg border border-card-border">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <h3 className="text-sm font-display font-semibold text-foreground">Tenant Fleet</h3>
          <button className="text-xs text-primary hover:text-primary-glow transition-colors font-medium">Add tenant →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                {["Tenant", "Type", "Devices", "Health", "Alerts", "Plan", "Status"].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-mono text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {tenants.map((t, i) => (
                <tr key={i} className="hover:bg-surface-2/30 transition-colors cursor-pointer group">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono text-muted-foreground">{t.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono text-foreground">{t.devices}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full", t.health >= 80 ? "bg-status-healthy" : t.health >= 60 ? "bg-status-warning" : "bg-status-danger")}
                          style={{ width: `${t.health}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground">{t.health}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("text-sm font-mono", t.alerts > 5 ? "text-status-danger" : t.alerts > 0 ? "text-status-warning" : "text-status-healthy")}>
                      {t.alerts}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono bg-muted text-muted-foreground px-2 py-0.5 rounded">{t.plan}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("text-xs font-mono px-2 py-0.5 rounded",
                      t.status === "active" ? "bg-status-healthy-dim text-status-healthy" : "bg-status-warning-dim text-status-warning"
                    )}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AlertEngine() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Rules Active", value: "5", color: "text-foreground" },
          { label: "Triggered Today", value: "50", color: "text-status-warning" },
          { label: "False Positive Avg", value: "6.6%", color: "text-status-info" },
          { label: "Under Review", value: "1", color: "text-status-warning" },
        ].map((m, i) => (
          <div key={i} className="card-atlas rounded-lg border border-card-border p-4">
            <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
            <p className={cn("text-2xl font-display font-bold", m.color)}>{m.value}</p>
          </div>
        ))}
      </div>

      <div className="card-atlas rounded-lg border border-card-border">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <h3 className="text-sm font-display font-semibold text-foreground">Alert Rules</h3>
          <button className="text-xs text-primary hover:text-primary-glow transition-colors font-medium flex items-center gap-1">
            <Sliders className="w-3 h-3" /> Tune thresholds
          </button>
        </div>
        <div className="divide-y divide-border/30">
          {alertRules.map((rule, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3.5 hover:bg-surface-2/40 transition-colors">
              <div className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0",
                rule.status === "active" ? "bg-status-healthy" : "bg-status-warning animate-blink"
              )} />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{rule.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Threshold: {rule.threshold}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono text-foreground">{rule.triggered} triggers</p>
                <p className={cn("text-xs font-mono", parseFloat(rule.falsePos) > 10 ? "text-status-warning" : "text-muted-foreground")}>
                  {rule.falsePos} false+
                </p>
              </div>
              <span className={cn("text-xs px-1.5 py-0.5 rounded font-mono flex-shrink-0",
                rule.status === "active" ? "bg-status-healthy-dim text-status-healthy" : "bg-status-warning-dim text-status-warning"
              )}>
                {rule.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ModelTransparency() {
  return (
    <div className="space-y-4">
      {models.map((model, i) => (
        <div key={i} className={cn("card-atlas rounded-lg border p-5",
          model.status === "warning" ? "border-status-warning/20" : "border-card-border"
        )}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-display font-semibold text-foreground">{model.name}</h3>
                <span className="text-xs font-mono text-muted-foreground">{model.version}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Trained {model.lastTrained}
                </span>
                <span className={cn("px-1.5 py-0.5 rounded",
                  model.status === "warning" ? "bg-status-warning-dim text-status-warning" : "bg-status-healthy-dim text-status-healthy"
                )}>
                  {model.status === "warning" ? "Drift detected" : "Stable"}
                </span>
              </div>
            </div>
            <HealthScoreRing score={model.accuracy} label="Accuracy" size="sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Accuracy bar */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Model accuracy</span>
                <span className="font-mono text-foreground">{model.accuracy}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full", model.accuracy >= 85 ? "bg-status-healthy" : "bg-status-warning")}
                  style={{ width: `${model.accuracy}%` }}
                />
              </div>
            </div>

            {/* Drift */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Model drift</span>
                <span className={cn("font-mono", model.drift > 1 ? "text-status-warning" : "text-status-healthy")}>
                  {model.drift}% / week
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full", model.drift > 1 ? "bg-status-warning" : "bg-status-healthy")}
                  style={{ width: `${Math.min(model.drift * 20, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Input signals */}
          <div className="mt-3 pt-3 border-t border-border/40">
            <p className="text-xs text-muted-foreground mb-2">Input signals</p>
            <div className="flex flex-wrap gap-1.5">
              {model.inputs.map((inp, j) => (
                <span key={j} className="text-xs font-mono bg-primary-dim text-primary px-2 py-0.5 rounded">
                  {inp}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-border/40 flex gap-3">
            <button className="flex items-center gap-1 text-xs text-primary hover:text-primary-glow transition-colors font-medium">
              <Eye className="w-3 h-3" /> View predictions
            </button>
            <button className="flex items-center gap-1 text-xs text-primary hover:text-primary-glow transition-colors font-medium">
              <GitBranch className="w-3 h-3" /> Retrain model
            </button>
            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Layers className="w-3 h-3" /> Explainability log
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function SimulationStudio() {
  return (
    <div className="space-y-4">
      <div className="card-atlas rounded-xl border border-primary/20 p-5">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-display font-bold text-foreground">Simulation Studio</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Build what-if scenarios. Adjust variables and project outcomes across cold chain, water, energy, and health systems.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Scenario builder */}
        <div className="card-atlas rounded-lg border border-card-border">
          <div className="px-4 py-3 border-b border-border/50">
            <h3 className="text-sm font-display font-semibold text-foreground">Scenario Variables</h3>
          </div>
          <div className="p-4 space-y-4">
            {[
              { label: "Power instability duration", value: "6", unit: "hours", min: 0, max: 24 },
              { label: "Cold unit temp variance", value: "3.2", unit: "°C above optimal", min: 0, max: 10 },
              { label: "Households affected", value: "240", unit: "units", min: 0, max: 1000 },
            ].map((v, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <label className="text-xs text-muted-foreground">{v.label}</label>
                  <span className="text-xs font-mono text-primary">{v.value} {v.unit}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full relative">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(parseFloat(v.value) / v.max) * 100}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background cursor-pointer"
                    style={{ left: `calc(${(parseFloat(v.value) / v.max) * 100}% - 6px)` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] font-mono text-muted-foreground">{v.min}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">{v.max}</span>
                </div>
              </div>
            ))}

            <button className="w-full mt-2 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary-glow transition-colors">
              Run Simulation
            </button>
          </div>
        </div>

        {/* Projected outcomes */}
        <div className="card-atlas rounded-lg border border-card-border">
          <div className="px-4 py-3 border-b border-border/50">
            <h3 className="text-sm font-display font-semibold text-foreground">Projected Outcomes</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Based on current scenario inputs</p>
          </div>
          <div className="p-4 space-y-3">
            {[
              { label: "Cold chain failure probability", current: "12%", projected: "+22%", severity: "danger" as const, delta: "↑" },
              { label: "Spoilage cost (household)", current: "KSh 180", projected: "KSh 340", severity: "danger" as const, delta: "↑" },
              { label: "Energy overconsumption", current: "0%", projected: "+8%", severity: "warning" as const, delta: "↑" },
              { label: "Household comfort index", current: "81/100", projected: "61/100", severity: "warning" as const, delta: "↓" },
            ].map((out, i) => {
              const cfg = out.severity === "danger"
                ? { color: "text-status-danger", bg: "bg-status-danger-dim" }
                : { color: "text-status-warning", bg: "bg-status-warning-dim" };
              return (
                <div key={i} className="flex items-center justify-between p-3 rounded-md border border-border/40 bg-surface-2/30">
                  <div>
                    <p className="text-xs text-muted-foreground">{out.label}</p>
                    <p className="text-sm font-mono text-foreground mt-0.5">{out.current}</p>
                  </div>
                  <div className="text-right">
                    <span className={cn("text-xs px-1.5 py-0.5 rounded font-mono font-bold", cfg.bg, cfg.color)}>
                      {out.delta} {out.projected}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-4 pb-4 pt-1">
            <div className="flex items-start gap-2 p-3 rounded-md bg-primary/5 border border-primary/15">
              <Info className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Simulation uses Cold Chain Spoilage Predictor v2.4.1 with 84% confidence interval.
                Results are probabilistic, not deterministic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ControlCenterPage({ view = "tenants" }: ControlCenterPageProps) {
  return (
    <div className="p-4 space-y-4 animate-fade-in-up">
      {/* Header */}
      <div className="card-atlas rounded-xl border border-status-danger/15 p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-mono text-status-danger mb-1 uppercase tracking-widest">
              Atlas Control Center · Internal
            </p>
            <h1 className="text-xl font-display font-bold text-foreground">System Operations</h1>
            <p className="text-sm text-muted-foreground mt-1">
              5 tenants active · 99 devices monitored · 1 model under review
            </p>
          </div>
          <div className="flex gap-5">
            <HealthScoreRing score={88} label="Platform Health" sublabel="Good" size="sm" />
            <HealthScoreRing score={94} label="Uptime" sublabel="Excellent" size="sm" />
            <HealthScoreRing score={71} label="Model Health" sublabel="Monitor" size="sm" />
          </div>
        </div>
      </div>

      {view === "tenants" && <TenantMonitor />}
      {view === "alerts" && <AlertEngine />}
      {view === "models" && <ModelTransparency />}
      {view === "simulation" && <SimulationStudio />}
      {view === "settings" && (
        <div className="card-atlas rounded-lg border border-card-border p-6">
          <h3 className="text-base font-display font-semibold text-foreground mb-2">System Configuration</h3>
          <p className="text-sm text-muted-foreground">Global platform settings, API configuration, tenant policies, and environment variables.</p>
        </div>
      )}
    </div>
  );
}
