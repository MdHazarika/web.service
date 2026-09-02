"use client";

import { cn } from "@/lib/utils";

interface MockPhoneProps {
  className?: string;
  accent?: string;
  children?: React.ReactNode;
}

export function MockPhone({ className, accent = "#0d9488", children }: MockPhoneProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[260px] overflow-hidden rounded-[2rem] border-4 border-white/10 bg-[#0f0f0f] p-2 shadow-sm",
        className
      )}
    >
      <div className="absolute left-1/2 top-2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/20" />
      <div className="mt-4 overflow-hidden rounded-2xl bg-charcoal">
        <div className="flex items-center justify-between px-3 py-2 text-[10px] text-muted">
          <span>9:41</span>
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-foreground/30" />
            <div className="h-2 w-2 rounded-full bg-foreground/30" />
            <div className="h-2 w-2 rounded-full bg-foreground/30" />
          </div>
        </div>
        {children ? (
          <div className="relative">{children}</div>
        ) : (
          <div className="space-y-3 p-3">
            <div className="h-4 w-2/3 rounded-sm bg-foreground/20" />
            <div className="h-3 w-1/2 rounded-sm bg-foreground/10" />
            <div className="h-24 rounded-md bg-foreground/5" />
            <div className="h-8 rounded-md" style={{ backgroundColor: accent }} />
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-14 rounded-sm bg-foreground/5" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
