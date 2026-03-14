import { cn } from "@/lib/utils";
import {
  Thermometer, Wind, Droplets, Zap, Wifi, WifiOff, Refrigerator,
  AirVent, FlaskConical, Activity, ChevronRight
} from "lucide-react";

type DeviceStatus = "online" | "warning" | "error" | "offline";

interface Device {
  id: string;
  name: string;
  type: string;
  room: string;
  status: DeviceStatus;
  metric: string;
  metricUnit: string;
  lastSeen: string;
  icon: typeof Thermometer;
}

const devices: Device[] = [
  {
    id: "d1", name: "Kitchen Fridge", type: "Cold Storage",
    room: "Kitchen", status: "warning", metric: "7.8", metricUnit: "°C",
    lastSeen: "now", icon: Refrigerator,
  },
  {
    id: "d2", name: "Air System", type: "HVAC",
    room: "Living Room", status: "online", metric: "22.4", metricUnit: "°C",
    lastSeen: "now", icon: AirVent,
  },
  {
    id: "d3", name: "Water Purifier", type: "Water System",
    room: "Kitchen", status: "online", metric: "71", metricUnit: "%",
    lastSeen: "2m ago", icon: FlaskConical,
  },
  {
    id: "d4", name: "Air Sensor", type: "Indoor Sensor",
    room: "Bedroom", status: "online", metric: "18", metricUnit: "AQI",
    lastSeen: "now", icon: Wind,
  },
  {
    id: "d5", name: "Smart Meter", type: "Energy",
    room: "Utility", status: "online", metric: "3.2", metricUnit: "kW",
    lastSeen: "now", icon: Zap,
  },
  {
    id: "d6", name: "Humidity Node", type: "Env Sensor",
    room: "Hallway", status: "offline", metric: "--", metricUnit: "%",
    lastSeen: "6h ago", icon: Droplets,
  },
];

const statusConfig: Record<DeviceStatus, { dot: string; ring: string; text: string }> = {
  online: { dot: "bg-status-healthy", ring: "border-status-healthy/20", text: "text-status-healthy" },
  warning: { dot: "bg-status-warning animate-blink", ring: "border-status-warning/30", text: "text-status-warning" },
  error: { dot: "bg-status-danger animate-blink", ring: "border-status-danger/30", text: "text-status-danger" },
  offline: { dot: "bg-status-offline", ring: "border-border", text: "text-muted-foreground" },
};

interface DeviceGridProps {
  className?: string;
}

export function DeviceGrid({ className }: DeviceGridProps) {
  return (
    <div className={cn("card-atlas rounded-lg border border-card-border", className)}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-display font-semibold text-foreground">Devices & Sensors</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground">
            {devices.filter(d => d.status === "online").length}/{devices.length} online
          </span>
        </div>
      </div>

      <div className="divide-y divide-border/30">
        {devices.map((device) => {
          const cfg = statusConfig[device.status];
          const DevIcon = device.icon;
          const isOnline = device.status !== "offline";

          return (
            <div
              key={device.id}
              className={cn(
                "flex items-center gap-3 px-4 py-3 hover:bg-surface-2/50 transition-colors cursor-pointer group",
                `border-l-2 ${cfg.ring.replace("border-", "border-l-")}`
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0",
                isOnline ? "bg-primary-dim" : "bg-muted"
              )}>
                <DevIcon className={cn("w-4 h-4", isOnline ? "text-primary" : "text-muted-foreground")} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground truncate">{device.name}</p>
                  <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", cfg.dot)} />
                </div>
                <p className="text-xs text-muted-foreground">
                  {device.type} · {device.room}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <div className={cn(
                  "flex items-baseline gap-0.5",
                  device.status === "warning" ? "text-status-warning" :
                  device.status === "offline" ? "text-muted-foreground" : "text-foreground"
                )}>
                  <span className="text-sm font-mono font-semibold">{device.metric}</span>
                  <span className="text-xs text-muted-foreground">{device.metricUnit}</span>
                </div>
                <div className="flex items-center justify-end gap-1 mt-0.5">
                  {device.status === "offline"
                    ? <WifiOff className="w-2.5 h-2.5 text-muted-foreground" />
                    : <Wifi className="w-2.5 h-2.5 text-status-healthy" />
                  }
                  <span className="text-xs font-mono text-muted-foreground">{device.lastSeen}</span>
                </div>
              </div>

              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </div>
          );
        })}
      </div>

      <div className="px-4 py-2.5 border-t border-border/30">
        <button className="text-xs text-primary hover:text-primary-glow transition-colors font-medium w-full text-center">
          Manage all devices →
        </button>
      </div>
    </div>
  );
}
