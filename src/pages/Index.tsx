import { useState } from "react";
import { AppShell } from "@/components/atlas/AppShell";
import { ConsumerDashboard } from "./ConsumerDashboard";
import { BusinessDashboard } from "./BusinessDashboard";
import { CommunityPortal } from "./CommunityPortal";
import { DeviceGrid } from "@/components/atlas/DeviceGrid";
import { AlertFeed } from "@/components/atlas/AlertFeed";
import { ForecastPanel } from "@/components/atlas/ForecastPanel";

type SurfaceType = "consumer" | "business" | "community" | "field" | "control";

const PlaceholderView = ({ title, description }: { title: string; description: string }) => (
  <div className="flex flex-col items-center justify-center h-64 text-center p-8">
    <div className="w-12 h-12 rounded-xl bg-primary-dim flex items-center justify-center mb-4">
      <span className="text-primary font-display font-bold text-lg">A</span>
    </div>
    <h2 className="text-lg font-display font-semibold text-foreground mb-2">{title}</h2>
    <p className="text-sm text-muted-foreground max-w-xs">{description}</p>
    <div className="mt-4 flex items-center gap-2 text-xs font-mono text-muted-foreground bg-muted px-3 py-1.5 rounded-md">
      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
      Coming in next iteration
    </div>
  </div>
);

export default function Index() {
  const [activeSurface, setActiveSurface] = useState<SurfaceType>("consumer");
  const [activeView, setActiveView] = useState("overview");

  const handleSurfaceChange = (s: SurfaceType) => {
    setActiveSurface(s);
    setActiveView("overview");
  };

  const renderView = () => {
    // Consumer surface
    if (activeSurface === "consumer") {
      switch (activeView) {
        case "overview": return <ConsumerDashboard />;
        case "devices": return <div className="p-4"><DeviceGrid /></div>;
        case "alerts": return <div className="p-4"><AlertFeed /></div>;
        case "food": return <PlaceholderView title="Food & Storage Intelligence" description="Spoilage risk forecasting, cold unit performance, freshness windows, and wastage trends." />;
        case "water-air": return <PlaceholderView title="Water & Air" description="Water quality indicators, usage patterns, purification status, humidity, and ventilation recommendations." />;
        case "energy": return <PlaceholderView title="Energy Monitoring" description="Real-time power usage, cost estimates, optimization suggestions, and grid stability feed." />;
        case "reports": return <PlaceholderView title="Household Reports" description="Monthly savings, food waste avoided, water preserved, and environment health score." />;
        default: return <ConsumerDashboard />;
      }
    }

    // Business surface
    if (activeSurface === "business") {
      switch (activeView) {
        case "overview": return <BusinessDashboard />;
        case "assets": return <div className="p-4"><DeviceGrid /></div>;
        case "risk-map": return <PlaceholderView title="Risk Map" description="Facility locations, zone heatmap, outage zones, flood exposure, and supply chain stress." />;
        case "forecasts": return <div className="p-4"><ForecastPanel /></div>;
        case "service": return <PlaceholderView title="Service & Maintenance" description="Open tickets, technician dispatch, device repair queue, SLA timers, and resolution analytics." />;
        case "alerts": return <div className="p-4"><AlertFeed /></div>;
        default: return <BusinessDashboard />;
      }
    }

    // Community surface
    if (activeSurface === "community") {
      switch (activeView) {
        case "overview": return <CommunityPortal />;
        case "food": return <PlaceholderView title="Food Systems Panel" description="Market price patterns, cold chain reliability, crop stress signals, and storage network health." />;
        case "water": return <PlaceholderView title="Water Systems Panel" description="Purification site status, borehole signals, contamination alerts, and demand pressure." />;
        case "health": return <PlaceholderView title="Public Health Signals" description="Symptom trend clusters, clinic load, medicine demand signals, and environmental correlations." />;
        case "energy": return <PlaceholderView title="Energy & Infrastructure" description="Outages, grid instability, high-consumption clusters, and cold-chain dependency zones." />;
        case "map": return <PlaceholderView title="Regional Risk Map" description="County-scale geospatial view with risk overlays, alert pins, and boundary analysis." />;
        default: return <CommunityPortal />;
      }
    }

    // Field agent surface
    if (activeSurface === "field") {
      return <PlaceholderView
        title={`Field Agent: ${activeView}`}
        description="Mobile-first offline-capable interface for technicians — tasks, device install wizard, incident logging, and field surveys."
      />;
    }

    // Control center
    if (activeSurface === "control") {
      return <PlaceholderView
        title={`Control Center: ${activeView}`}
        description="Internal Atlas admin — tenant monitoring, alert engine tuning, model transparency, and simulation studio."
      />;
    }

    return <ConsumerDashboard />;
  };

  return (
    <AppShell
      activeView={activeView}
      onViewChange={setActiveView}
      activeSurface={activeSurface}
      onSurfaceChange={handleSurfaceChange}
    >
      {renderView()}
    </AppShell>
  );
}
