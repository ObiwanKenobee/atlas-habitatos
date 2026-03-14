import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Activity, Zap, Droplets, UtensilsCrossed,
  BellRing, BarChart3, Map, Settings, Users, ShieldCheck,
  ChevronLeft, ChevronRight, Home, Building2, Globe, Wrench, Terminal
} from "lucide-react";
import { CommandBar } from "./CommandBar";

type SurfaceType = "consumer" | "business" | "community" | "field" | "control";
type NavItem = { id: string; label: string; icon: typeof LayoutDashboard; badge?: number };

const surfaceConfig: Record<SurfaceType, {
  label: string;
  subtitle: string;
  icon: typeof Home;
  color: string;
  nav: NavItem[];
}> = {
  consumer: {
    label: "My Home",
    subtitle: "Household View",
    icon: Home,
    color: "text-primary",
    nav: [
      { id: "overview", label: "Overview", icon: LayoutDashboard },
      { id: "devices", label: "Devices", icon: Activity },
      { id: "food", label: "Food Storage", icon: UtensilsCrossed, badge: 1 },
      { id: "water-air", label: "Water & Air", icon: Droplets },
      { id: "energy", label: "Energy", icon: Zap },
      { id: "alerts", label: "Alerts", icon: BellRing, badge: 3 },
      { id: "reports", label: "Reports", icon: BarChart3 },
    ],
  },
  business: {
    label: "Operations",
    subtitle: "Business Dashboard",
    icon: Building2,
    color: "text-accent",
    nav: [
      { id: "overview", label: "Operations", icon: LayoutDashboard },
      { id: "assets", label: "Asset Health", icon: Activity, badge: 2 },
      { id: "risk-map", label: "Risk Map", icon: Map },
      { id: "forecasts", label: "Forecasts", icon: BarChart3 },
      { id: "service", label: "Service & Maintenance", icon: Wrench, badge: 4 },
      { id: "alerts", label: "Alerts", icon: BellRing, badge: 5 },
    ],
  },
  community: {
    label: "Community",
    subtitle: "Regional Intelligence",
    icon: Globe,
    color: "text-status-info",
    nav: [
      { id: "overview", label: "Regional Overview", icon: LayoutDashboard },
      { id: "food", label: "Food Systems", icon: UtensilsCrossed },
      { id: "water", label: "Water Systems", icon: Droplets },
      { id: "health", label: "Public Health", icon: ShieldCheck, badge: 2 },
      { id: "energy", label: "Energy Grid", icon: Zap },
      { id: "map", label: "Risk Map", icon: Map },
    ],
  },
  field: {
    label: "Field Agent",
    subtitle: "Technician View",
    icon: Wrench,
    color: "text-status-warning",
    nav: [
      { id: "tasks", label: "My Tasks", icon: LayoutDashboard, badge: 3 },
      { id: "install", label: "Install Device", icon: Activity },
      { id: "incidents", label: "Incident Log", icon: BellRing },
      { id: "survey", label: "Field Survey", icon: Map },
    ],
  },
  control: {
    label: "Control Center",
    subtitle: "Atlas Admin",
    icon: Terminal,
    color: "text-status-danger",
    nav: [
      { id: "tenants", label: "Tenant Monitor", icon: Users },
      { id: "alerts", label: "Alert Engine", icon: BellRing, badge: 7 },
      { id: "models", label: "Model Transparency", icon: Activity },
      { id: "simulation", label: "Simulation Studio", icon: BarChart3 },
      { id: "settings", label: "System Config", icon: Settings },
    ],
  },
};

const surfaces: SurfaceType[] = ["consumer", "business", "community", "field", "control"];

interface AppShellProps {
  activeView: string;
  onViewChange: (v: string) => void;
  activeSurface: SurfaceType;
  onSurfaceChange: (s: SurfaceType) => void;
  children: React.ReactNode;
}

export function AppShell({
  activeView,
  onViewChange,
  activeSurface,
  onSurfaceChange,
  children,
}: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const surface = surfaceConfig[activeSurface];
  const SurfaceIcon = surface.icon;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 flex-shrink-0",
          collapsed ? "w-14" : "w-56"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-3 py-4 border-b border-sidebar-border">
          <div className="w-7 h-7 rounded-md bg-gradient-teal flex items-center justify-center flex-shrink-0">
            <span className="text-primary-foreground font-display font-bold text-xs">A</span>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-display font-bold text-foreground leading-none">Atlas</p>
              <p className="text-xs text-muted-foreground leading-none mt-0.5 font-mono">HabitatOS</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-1 rounded hover:bg-sidebar-accent transition-colors"
          >
            {collapsed
              ? <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
              : <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground" />
            }
          </button>
        </div>

        {/* Surface switcher */}
        <div className="px-2 py-2 border-b border-sidebar-border">
          {surfaces.map((s) => {
            const cfg = surfaceConfig[s];
            const Icon = cfg.icon;
            return (
              <button
                key={s}
                onClick={() => onSurfaceChange(s)}
                title={cfg.label}
                className={cn(
                  "w-full flex items-center gap-2 px-2 py-1.5 rounded-md transition-all text-left",
                  activeSurface === s
                    ? "bg-sidebar-accent text-foreground"
                    : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <Icon className={cn("w-4 h-4 flex-shrink-0", activeSurface === s ? cfg.color : "")} />
                {!collapsed && (
                  <span className="text-xs font-medium truncate">{cfg.label}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Primary nav */}
        <nav className="flex-1 px-2 py-2 overflow-y-auto scrollbar-thin">
          {!collapsed && (
            <p className="text-[10px] font-mono text-muted-foreground px-2 mb-1.5 uppercase tracking-wider">
              {surface.subtitle}
            </p>
          )}
          {surface.nav.map((item) => {
            const NavIcon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                title={item.label}
                className={cn(
                  "w-full flex items-center gap-2.5 px-2 py-2 rounded-md mb-0.5 transition-all text-left relative",
                  activeView === item.id
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
                )}
              >
                <NavIcon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="text-xs font-medium flex-1 truncate">{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] bg-status-danger text-white px-1.5 py-0.5 rounded-full font-mono leading-none">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {collapsed && item.badge && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-status-danger" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom user */}
        <div className="px-2 py-2 border-t border-sidebar-border">
          <button className={cn(
            "w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-sidebar-accent transition-colors"
          )}>
            <div className="w-6 h-6 rounded-full bg-primary-dim border border-primary/30 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-display font-bold text-primary">AK</span>
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground truncate">Amara Korir</p>
                <p className="text-[10px] text-muted-foreground truncate font-mono">Resident</p>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-surface-1/80 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center gap-2">
            <SurfaceIcon className={cn("w-4 h-4", surface.color)} />
            <h2 className="text-sm font-display font-semibold text-foreground">
              {surface.nav.find(n => n.id === activeView)?.label ?? surface.label}
            </h2>
          </div>
          <div className="flex-1 max-w-sm">
            <CommandBar />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="relative p-2 rounded-lg hover:bg-surface-2 transition-colors">
              <BellRing className="w-4 h-4 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-status-danger" />
            </button>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-status-healthy-dim">
              <span className="w-1.5 h-1.5 rounded-full bg-status-healthy animate-pulse-glow" />
              <span className="text-xs font-mono text-status-healthy">Live</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}
