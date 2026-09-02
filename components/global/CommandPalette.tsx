"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Command } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const items = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Services", href: "/#services" },
  { label: "Plans", href: "/#plans" },
  { label: "Team", href: "/#team" },
  { label: "Book Consultation", href: "#book" },
  { label: "AI Consultant", href: "#ai-consultant" },
  { label: "Cost Calculator", href: "#cost-calculator" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  const filtered = useMemo(
    () => items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 p-4 pt-24 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-charcoal/90 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 p-4">
              <Search size={18} className="text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, sections, tools..."
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
              />
              <div className="flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-xs text-muted">
                <Command size={12} />K
              </div>
            </div>
            <div className="max-h-72 overflow-auto p-2">
              {filtered.length === 0 && <p className="p-4 text-sm text-muted">No results found.</p>}
              {filtered.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-foreground transition-colors hover:bg-white/5"
                >
                  {item.label}
                  <X size={14} className="rotate-45 text-muted" />
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
