import { cn } from "@/lib/utils";
import { MetricTile } from "../components/atlas/MetricTile";
import { HealthScoreRing } from "../components/atlas/HealthScoreRing";
import { Droplets, Zap, UtensilsCrossed, ShieldCheck, MapPin, Activity, TrendingUp, Users } from "lucide-react";

const zones = [
  { name: "Nakuru Central", foodRisk: "Medium", waterRisk: "Low", healthRisk: "Low", pop: "42k" },
  { name: "Rongai Sub-County", foodRisk: "High", waterRisk: "Medium", healthRisk: "Medium", pop: "28k" },
  { name: "Gilgil Ward", foodRisk: "Low", waterRisk: "High", healthRisk: "Low", pop: "19k" },
  { name: "Naivasha North", foodRisk: "Low", waterRisk: "Low", healthRisk: "High", pop: "31k" },
];

const riskColor = (r: string) => {
  if (r === "High") return "text-status-danger bg-status-danger-dim";
  if (r === "Medium") return "text-status-warning bg-status-warning-dim";
  return "text-status-healthy bg-status-healthy-dim";
};

export function CommunityPortal() {
  return (
    <div className="p-4 space-y-4 animate-fade-in-up">
      {/* Header */}
      <div className="card-atlas rounded-xl border border-card-border p-5">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-3.5 h-3.5 text-status-info" />
              <span className="text-xs font-mono text-muted-foreground">Nakuru County · Kenya · Community View</span>
            </div>
            <h1 className="text-xl font-display font-bold text-foreground">Regional Intelligence</h1>
            <p className="text-sm text-muted-foreground mt-1">
              4 wards active · Water stress elevated in Gilgil · Food supply disruption risk in Rongai
            </p>
          </div>
          <div className="flex gap-5">
            <HealthScoreRing score={62} label="County Health" sublabel="Moderate" size="sm" />
            <HealthScoreRing score={44} label="Water Stability" sublabel="Stressed" size="sm" />
            <HealthScoreRing score={75} label="Food Security" sublabel="Watchful" size="sm" />
          </div>
        </div>
      </div>

      {/* Region metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricTile label="Active Incidents" value="9" unit="" icon={Activity} status="warning" trend={{ direction: "up", label: "+4 this week" }} />
        <MetricTile label="Water Stress Zones" value="2" unit="of 4" icon={Droplets} status="danger" subtitle="Gilgil · High risk" />
        <MetricTile label="Food Risk Zones" value="1" unit="of 4" icon={UtensilsCrossed} status="warning" trend={{ direction: "up", label: "Rongai supply disruption" }} />
        <MetricTile label="Health Signals" value="3" unit="clusters" icon={ShieldCheck} status="warning" subtitle="Respiratory trend rising" />
        <MetricTile label="Households Monitored" value="4,820" unit="" icon={Users} status="healthy" trend={{ direction: "up", label: "+340 new this month" }} />
        <MetricTile label="Energy Grid" value="STABLE" unit="" icon={Zap} status="healthy" subtitle="No major outages" />
        <MetricTile label="Interventions Active" value="3" unit="" icon={TrendingUp} status="info" subtitle="2 in progress, 1 planned" />
        <MetricTile label="Atlas Coverage" value="68" unit="%" icon={Activity} status="info" trend={{ direction: "up", label: "+6% vs last month" }} />
      </div>

      {/* Zone breakdown table */}
      <div className="card-atlas rounded-lg border border-card-border">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <h3 className="text-sm font-display font-semibold text-foreground">Ward-Level Risk Summary</h3>
          <button className="text-xs text-primary hover:text-primary-glow transition-colors font-medium">
            Open Risk Map →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                {["Ward", "Population", "Food Risk", "Water Risk", "Health Risk", "Action"].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {zones.map((zone, i) => (
                <tr key={i} className="hover:bg-surface-2/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{zone.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono text-muted-foreground">{zone.pop}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("text-xs px-2 py-1 rounded-md font-mono", riskColor(zone.foodRisk))}>
                      {zone.foodRisk}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("text-xs px-2 py-1 rounded-md font-mono", riskColor(zone.waterRisk))}>
                      {zone.waterRisk}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("text-xs px-2 py-1 rounded-md font-mono", riskColor(zone.healthRisk))}>
                      {zone.healthRisk}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-primary hover:text-primary-glow font-medium transition-colors">
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Intervention board preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          {
            title: "Water intervention · Gilgil",
            status: "In Progress",
            actor: "County Water Board",
            update: "Borehole repair team dispatched. ETA 4h.",
            severity: "danger",
          },
          {
            title: "Food supply alert · Rongai",
            status: "Planned",
            actor: "Cooperative Network",
            update: "Emergency stock release from Nakuru Central warehouse approved.",
            severity: "warning",
          },
          {
            title: "Respiratory monitoring · Naivasha",
            status: "Active",
            actor: "County Health Dept",
            update: "Clinic staff briefed. 3 sentinel sites reporting elevated caseload.",
            severity: "warning",
          },
        ].map((item, i) => (
          <div key={i} className={cn(
            "card-atlas rounded-lg border p-4",
            item.severity === "danger" ? "border-status-danger/25" : "border-status-warning/25"
          )}>
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(
                "text-xs px-2 py-0.5 rounded font-mono",
                item.status === "In Progress" ? "bg-status-info-dim text-status-info" :
                item.status === "Active" ? "bg-status-warning-dim text-status-warning" :
                "bg-muted text-muted-foreground"
              )}>
                {item.status}
              </span>
            </div>
            <p className="text-sm font-display font-semibold text-foreground mb-1">{item.title}</p>
            <p className="text-xs text-muted-foreground mb-2">{item.actor}</p>
            <p className="text-xs text-foreground/70 leading-relaxed">{item.update}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
