"use client";

import { cn } from "@/lib/utils";

interface MockBrowserProps {
  className?: string;
  title?: string;
  accent?: string;
  children?: React.ReactNode;
}

export function MockBrowser({ className, title = "pixel.forge", accent = "#0d9488", children }: MockBrowserProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-white/10 bg-[#0f0f0f] shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-charcoal px-3 py-2">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
        <div className="ml-4 flex-1 truncate rounded-sm bg-white/5 px-3 py-1 text-[10px] text-muted">
          {title}
        </div>
      </div>
      {children ? (
        <div className="relative h-full">{children}</div>
      ) : (
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
            <div className="h-3 w-20 shrink-0 rounded-sm bg-foreground/20" />
            <div className="flex gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-2 w-10 rounded-sm bg-foreground/10" />
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div>
              <div className="h-4 w-3/4 rounded-sm bg-foreground/20" />
              <div className="mt-2 h-3 w-1/2 rounded-sm bg-foreground/10" />
              <div className="mt-4 h-8 w-24 rounded-sm" style={{ backgroundColor: accent }} />
            </div>
            <div className="h-24 rounded-md bg-foreground/5" />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-sm bg-foreground/5" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
