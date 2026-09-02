"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, FileText, MessageSquare, Video, Download, CreditCard, BarChart3, Clock, Folder } from "lucide-react";
import { Reveal } from "./Reveal";

const sidebar = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Folder, label: "Projects" },
  { icon: FileText, label: "Invoices" },
  { icon: MessageSquare, label: "Messages" },
  { icon: Video, label: "Meetings" },
  { icon: Download, label: "Files" },
  { icon: CreditCard, label: "Payments" },
];

const progress = [
  { label: "Discovery", value: 100 },
  { label: "UI Design", value: 85 },
  { label: "Development", value: 40 },
  { label: "Launch", value: 0 },
];


export function ClientDashboardPreview() {
  return (
    <section className="bg-charcoal/30 py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Your project hub</h2>
          <p className="mt-4 text-muted">A preview of the client dashboard every project gets.</p>
        </Reveal>

        <Reveal className="mt-16" delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-charcoal/60 shadow-2xl">
            <div className="flex flex-col md:flex-row">
              <div className="border-b border-white/10 p-4 md:w-56 md:border-b-0 md:border-r">
                <div className="mb-6 font-heading font-bold text-foreground">InfoMyth Web Service</div>
                <nav className="space-y-2">
                  {sidebar.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
                    >
                      <item.icon size={18} />
                      {item.label}
                    </div>
                  ))}
                </nav>
              </div>

              <div className="flex-1 p-6">
                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "Active Projects", value: "3", icon: Folder },
                    { label: "Hours Tracked", value: "48h", icon: Clock },
                  ].map((card) => (
                    <div key={card.label} className="rounded-xl border border-white/10 bg-charcoal/40 p-4">
                      <card.icon size={20} className="text-accent" />
                      <p className="mt-2 text-2xl font-bold text-foreground">{card.value}</p>
                      <p className="text-xs text-muted">{card.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-6">
                  <div className="rounded-xl border border-white/10 bg-charcoal/40 p-5">
                    <h3 className="mb-4 flex items-center gap-2 font-heading font-semibold text-foreground">
                      <BarChart3 size={18} className="text-accent" /> Project Progress
                    </h3>
                    <div className="space-y-4">
                      {progress.map((p) => (
                        <div key={p.label}>
                          <div className="mb-1 flex justify-between text-xs text-muted">
                            <span>{p.label}</span>
                            <span>{p.value}%</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-white/10">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${p.value}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
