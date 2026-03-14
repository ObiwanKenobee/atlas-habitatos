import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  CheckSquare, MapPin, Wifi, WifiOff, Camera, Mic,
  ChevronRight, Circle, CheckCircle2, AlertTriangle,
  Wrench, FileText, Upload, Clock, User, ArrowRight, Droplets
} from "lucide-react";

type FieldView = "tasks" | "install" | "incidents" | "survey";

const tasks = [
  { id: "t1", priority: "high" as const, title: "Inspect fridge seal — Ongata Rongai", address: "Simba Estate, House 14B", eta: "9:30 AM", type: "Inspection", status: "pending" as const },
  { id: "t2", priority: "high" as const, title: "Install air sensor — Naivasha Clinic", address: "Naivasha County Clinic, Ward 3", eta: "11:00 AM", type: "Install", status: "pending" as const },
  { id: "t3", priority: "medium" as const, title: "Verify borehole sensor signal", address: "Gilgil Water Station, Pump 2", eta: "2:00 PM", type: "Verification", status: "completed" as const },
  { id: "t4", priority: "low" as const, title: "Firmware update — cold chain device", address: "Nakuru Market, Stall 44", eta: "3:30 PM", type: "Update", status: "pending" as const },
];

const installSteps = [
  { id: 1, label: "Identify Installation Site", desc: "Confirm address, take site photo, note environmental conditions" },
  { id: 2, label: "Scan Device QR Code", desc: "Point camera at device label to register serial number" },
  { id: 3, label: "Verify Connectivity", desc: "Test WiFi/LTE signal strength at mount point (minimum: 2 bars)" },
  { id: 4, label: "Calibrate Sensor", desc: "Run auto-calibration sequence. Takes ~90 seconds" },
  { id: 5, label: "Assign Room / Zone", desc: "Set device location in Atlas system (room, building, ward)" },
  { id: 6, label: "Submit Activation Report", desc: "Confirm device is live and submit installation record" },
];

const incidents = [
  {
    id: "i1",
    title: "Fridge door seal tear detected",
    location: "Ongata Rongai, House 14B",
    time: "8:47 AM",
    severity: "high" as const,
    status: "open" as const,
    notes: "Visible crack along lower seal. Temperature variance confirmed. Client notified.",
  },
  {
    id: "i2",
    title: "Borehole sensor offline",
    location: "Gilgil Water Station",
    time: "Yesterday 4:12 PM",
    severity: "medium" as const,
    status: "resolved" as const,
    notes: "Power line fault. Resolved by reconnecting junction box.",
  },
];

const priorityConfig = {
  high: { dot: "bg-status-danger animate-blink", text: "text-status-danger", badge: "bg-status-danger-dim text-status-danger" },
  medium: { dot: "bg-status-warning", text: "text-status-warning", badge: "bg-status-warning-dim text-status-warning" },
  low: { dot: "bg-muted-foreground", text: "text-muted-foreground", badge: "bg-muted text-muted-foreground" },
};

function TaskQueue() {
  return (
    <div className="space-y-4">
      {/* Sync status */}
      <div className="flex items-center justify-between p-3 rounded-lg border border-status-healthy/20 bg-status-healthy-dim">
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4 text-status-healthy" />
          <span className="text-sm font-medium text-status-healthy">Online · Synced 2 min ago</span>
        </div>
        <span className="text-xs font-mono text-muted-foreground">3 unsynced → 0 queued</span>
      </div>

      <div className="card-atlas rounded-lg border border-card-border">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <h3 className="text-sm font-display font-semibold text-foreground">Today's Route · 4 Tasks</h3>
          <span className="text-xs font-mono text-muted-foreground">Est. 6.5 hrs</span>
        </div>
        <div className="divide-y divide-border/30">
          {tasks.map((task) => {
            const cfg = priorityConfig[task.priority];
            return (
              <div key={task.id} className={cn(
                "flex items-start gap-3 px-4 py-4 hover:bg-surface-2/50 transition-colors cursor-pointer group",
                task.status === "completed" && "opacity-60"
              )}>
                <div className="mt-0.5 flex-shrink-0">
                  {task.status === "completed"
                    ? <CheckCircle2 className="w-5 h-5 text-status-healthy" />
                    : <Circle className={cn("w-5 h-5", cfg.text)} />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm font-medium", task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground")}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground truncate">{task.address}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={cn("text-xs font-mono px-1.5 py-0.5 rounded", cfg.badge)}>{task.type}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                      <Clock className="w-3 h-3" /> {task.eta}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 mt-0.5 flex-shrink-0" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function InstallWizard() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="space-y-4">
      <div className="card-atlas rounded-lg border border-card-border p-4">
        <p className="text-xs font-mono text-primary mb-1 uppercase tracking-widest">Device Onboarding</p>
        <h2 className="text-lg font-display font-bold text-foreground">Installation Wizard</h2>
        <p className="text-sm text-muted-foreground mt-1">Air sensor · SKU: ATL-AIR-001</p>
      </div>

      {/* Progress strip */}
      <div className="flex items-center gap-1">
        {installSteps.map((step, i) => (
          <div key={step.id} className="flex-1 flex items-center gap-1">
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0",
              step.id < currentStep ? "bg-status-healthy text-background" :
              step.id === currentStep ? "bg-primary text-primary-foreground" :
              "bg-muted text-muted-foreground"
            )}>
              {step.id < currentStep ? "✓" : step.id}
            </div>
            {i < installSteps.length - 1 && (
              <div className={cn("flex-1 h-0.5 rounded-full", step.id < currentStep ? "bg-status-healthy" : "bg-border")} />
            )}
          </div>
        ))}
      </div>

      {/* Active step */}
      <div className="card-atlas rounded-lg border border-primary/20 p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-mono font-bold flex items-center justify-center">
            {currentStep}
          </span>
          <h3 className="text-base font-display font-semibold text-foreground">
            {installSteps[currentStep - 1].label}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{installSteps[currentStep - 1].desc}</p>

        {/* Step-specific UI */}
        {currentStep === 1 && (
          <div className="space-y-3">
            <div className="rounded-lg border border-dashed border-border/60 p-6 flex flex-col items-center gap-2 text-center cursor-pointer hover:border-primary/40 transition-colors">
              <Camera className="w-8 h-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Tap to take site photo</p>
              <span className="text-xs font-mono text-muted-foreground">PNG / JPG · max 10MB</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-md border border-border/40 bg-surface-2/30">
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="text-sm font-medium text-foreground mt-0.5">Naivasha County Clinic</p>
              </div>
              <div className="p-3 rounded-md border border-border/40 bg-surface-2/30">
                <p className="text-xs text-muted-foreground">Zone</p>
                <p className="text-sm font-medium text-foreground mt-0.5">Ward 3 · Indoor</p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="rounded-lg border border-dashed border-primary/30 p-8 flex flex-col items-center gap-3 text-center">
            <div className="w-16 h-16 rounded-xl border-2 border-primary/40 flex items-center justify-center">
              <div className="w-8 h-8 border border-primary/60 rounded-sm" />
            </div>
            <p className="text-sm text-muted-foreground">Point camera at device QR code</p>
            <span className="text-xs font-mono bg-primary-dim text-primary px-2 py-1 rounded">Scanning…</span>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-3">
            {[
              { name: "WiFi: Atlas_Clinic_3", strength: 4, connected: true },
              { name: "WiFi: ClinicStaff", strength: 2, connected: false },
            ].map((net, i) => (
              <div key={i} className={cn(
                "flex items-center justify-between p-3 rounded-md border",
                net.connected ? "border-status-healthy/30 bg-status-healthy-dim" : "border-border/40"
              )}>
                <div className="flex items-center gap-2">
                  {net.connected ? <Wifi className="w-4 h-4 text-status-healthy" /> : <Wifi className="w-4 h-4 text-muted-foreground" />}
                  <span className="text-sm font-medium text-foreground">{net.name}</span>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4].map(b => (
                    <div key={b} className={cn("w-1 rounded-sm", b <= net.strength ? (net.connected ? "bg-status-healthy" : "bg-muted-foreground") : "bg-muted")}
                      style={{ height: `${b * 4 + 4}px` }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {currentStep >= 4 && (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="w-12 h-12 rounded-full bg-primary-dim border border-primary/30 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {currentStep === 4 ? "Calibration running… 78% complete" :
               currentStep === 5 ? "Device assigned to Ward 3 · Naivasha Clinic" :
               "Installation complete! Device live on Atlas network."}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/40">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(installSteps.length, currentStep + 1))}
            disabled={currentStep === installSteps.length}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary-glow transition-colors disabled:opacity-50"
          >
            {currentStep === installSteps.length - 1 ? "Submit" : "Continue"} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* All steps list */}
      <div className="card-atlas rounded-lg border border-card-border divide-y divide-border/30">
        {installSteps.map((step) => (
          <div key={step.id} className={cn(
            "flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-surface-2/30 transition-colors",
            step.id === currentStep && "bg-primary/5"
          )} onClick={() => setCurrentStep(step.id)}>
            <div className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0",
              step.id < currentStep ? "bg-status-healthy text-background" :
              step.id === currentStep ? "bg-primary text-primary-foreground" :
              "bg-muted text-muted-foreground"
            )}>
              {step.id < currentStep ? "✓" : step.id}
            </div>
            <div className="flex-1">
              <p className={cn("text-sm font-medium", step.id === currentStep ? "text-primary" : step.id < currentStep ? "text-muted-foreground" : "text-foreground")}>
                {step.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IncidentLog() {
  return (
    <div className="space-y-4">
      <button className="w-full flex items-center justify-center gap-2 p-3.5 rounded-lg border border-dashed border-primary/40 hover:border-primary/70 hover:bg-primary/5 transition-all text-sm font-medium text-primary">
        <FileText className="w-4 h-4" />
        Log New Incident
      </button>

      <div className="card-atlas rounded-lg border border-card-border">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <h3 className="text-sm font-display font-semibold text-foreground">Recent Incidents</h3>
          <span className="text-xs font-mono text-muted-foreground">{incidents.length} logged today</span>
        </div>
        <div className="divide-y divide-border/30">
          {incidents.map((inc) => {
            const sevCfg = inc.severity === "high"
              ? { dot: "bg-status-danger animate-blink", badge: "bg-status-danger-dim text-status-danger" }
              : { dot: "bg-status-warning", badge: "bg-status-warning-dim text-status-warning" };
            return (
              <div key={inc.id} className="px-4 py-4 hover:bg-surface-2/40 transition-colors">
                <div className="flex items-start gap-3">
                  <span className={cn("w-2 h-2 rounded-full flex-shrink-0 mt-1.5", sevCfg.dot)} />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-medium text-foreground">{inc.title}</p>
                      <span className={cn("text-xs font-mono px-1.5 py-0.5 rounded flex-shrink-0",
                        inc.status === "resolved" ? "bg-status-healthy-dim text-status-healthy" : sevCfg.badge
                      )}>
                        {inc.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <MapPin className="w-3 h-3" /> {inc.location}
                      <Clock className="w-3 h-3 ml-1" /> {inc.time}
                    </div>
                    <p className="text-xs text-muted-foreground bg-muted/50 rounded p-2 leading-relaxed">{inc.notes}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button className="flex items-center gap-1 text-xs text-primary hover:text-primary-glow transition-colors">
                        <Camera className="w-3 h-3" /> Add Photo
                      </button>
                      <button className="flex items-center gap-1 text-xs text-primary hover:text-primary-glow transition-colors">
                        <Mic className="w-3 h-3" /> Voice Note
                      </button>
                      <button className="flex items-center gap-1 text-xs text-primary hover:text-primary-glow transition-colors">
                        <Upload className="w-3 h-3" /> Sync
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Offline queue indicator */}
      <div className="flex items-center gap-3 p-3 rounded-lg border border-border/40 bg-surface-2/30">
        <WifiOff className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-foreground">Offline queue: 0 items pending</p>
          <p className="text-xs text-muted-foreground">All records synced · Last sync: 2 min ago</p>
        </div>
      </div>
    </div>
  );
}

export function FieldAgentPage({ view = "tasks" }: { view?: FieldView }) {
  return (
    <div className="p-4 space-y-4 animate-fade-in-up">
      {/* Header */}
      <div className="card-atlas rounded-xl border border-card-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-status-warning-dim border border-status-warning/30 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-display font-bold text-status-warning">JO</span>
          </div>
          <div>
            <p className="text-sm font-display font-semibold text-foreground">Julius Otieno · Field Technician</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="flex items-center gap-1 text-xs text-status-healthy font-mono">
                <Wifi className="w-3 h-3" /> Online
              </span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                <MapPin className="w-3 h-3" /> Nakuru Region
              </span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                <CheckSquare className="w-3 h-3" /> 1/4 tasks done
              </span>
            </div>
          </div>
        </div>
      </div>

      {view === "tasks" && <TaskQueue />}
      {view === "install" && <InstallWizard />}
      {view === "incidents" && <IncidentLog />}
      {view === "survey" && (
        <div className="space-y-3">
          <div className="card-atlas rounded-lg border border-card-border p-5">
            <h3 className="text-base font-display font-semibold text-foreground mb-1">Field Survey Mode</h3>
            <p className="text-sm text-muted-foreground">Capture community intelligence from the field — water sources, clinic load, crop conditions, storage site health.</p>
          </div>
          {[
            { icon: Droplets, label: "Water Source Condition", sub: "Borehole, river, tank status", badge: "bg-status-info-dim text-status-info" },
            { icon: User, label: "Clinic Congestion", sub: "Estimated patient load", badge: "bg-status-warning-dim text-status-warning" },
            { icon: Wrench, label: "Storage Site Health", sub: "Cold chain & market storage", badge: "bg-primary-dim text-primary" },
            { icon: AlertTriangle, label: "Environmental Hazard", sub: "Flooding, dust, crop stress", badge: "bg-status-danger-dim text-status-danger" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <button key={i} className="w-full card-atlas rounded-lg border border-card-border p-4 text-left flex items-center gap-3 hover:border-primary/30 transition-all group">
                <div className={cn("w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0", item.badge)}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
