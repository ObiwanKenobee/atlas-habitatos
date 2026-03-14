import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search, Terminal, ArrowRight } from "lucide-react";

const suggestions = [
  "Show high-risk devices",
  "Open food storage alerts",
  "Compare this week vs last week",
  "What needs attention now?",
  "Schedule appliance servicing",
];

interface CommandBarProps {
  className?: string;
}

export function CommandBar({ className }: CommandBarProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const filtered = suggestions.filter(s =>
    value.length > 0 && s.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200",
        focused
          ? "border-primary/60 bg-surface-2 shadow-glow"
          : "border-border bg-surface-1 hover:border-border/80"
      )}>
        <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Ask Atlas anything..."
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-mono"
        />
        <div className="flex items-center gap-1 flex-shrink-0">
          <kbd className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
        </div>
      </div>

      {focused && (
        <div className="absolute top-full left-0 right-0 mt-1.5 rounded-lg border border-border bg-surface-1 shadow-elevated overflow-hidden z-50">
          {value.length === 0 ? (
            <>
              <div className="px-3 py-2 border-b border-border/50">
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Terminal className="w-3 h-3" />
                  Try asking...
                </p>
              </div>
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  className="w-full text-left flex items-center justify-between px-3 py-2.5 hover:bg-surface-2 transition-colors group"
                  onClick={() => setValue(s)}
                >
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {s}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </>
          ) : filtered.length > 0 ? (
            filtered.map((s, i) => (
              <button
                key={i}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 hover:bg-surface-2 transition-colors group"
                onClick={() => setValue(s)}
              >
                <span className="text-sm text-foreground">{s}</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              </button>
            ))
          ) : (
            <div className="px-3 py-3 text-sm text-muted-foreground">
              Press Enter to send "{value}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
