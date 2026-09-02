"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, Briefcase, Flag, CheckCircle } from "lucide-react";
import { Reveal } from "./Reveal";

const locations = [
  { city: "New York", x: 26, y: 34, clients: 28, clientSuffix: "", projects: 42 },
  { city: "London", x: 48, y: 30, clients: 19, clientSuffix: "", projects: 31 },
  { city: "UAE", x: 58, y: 42, clients: 50, clientSuffix: "+", projects: 22 },
  { city: "Singapore", x: 76, y: 52, clients: 12, clientSuffix: "", projects: 18 },
  { city: "Sydney", x: 85, y: 72, clients: 9, clientSuffix: "", projects: 14 },
  { city: "São Paulo", x: 32, y: 68, clients: 11, clientSuffix: "", projects: 17 },
  { city: "Berlin", x: 51, y: 32, clients: 16, clientSuffix: "", projects: 25 },
  { city: "India", x: 64, y: 43, clients: 250, clientSuffix: "+", projects: 33 },
];

export function InteractiveWorldMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Global Reach</h2>
          <p className="mt-4 text-muted">Trusted by brands across continents. Hover the map to explore our footprint.</p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-5xl" delay={0.1}>
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl border border-white/10 bg-charcoal p-6 sm:p-10">
            <Image
              src="/images/world-map.png"
              alt="World map showing global reach"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
              className="pointer-events-none absolute inset-0 object-cover opacity-80"
            />

            {locations.map((loc) => (
              <motion.button
                key={loc.city}
                onMouseEnter={() => setHovered(loc.city)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setHovered(hovered === loc.city ? null : loc.city)}
                className="absolute z-10"
                style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                whileHover={{ scale: 1.2 }}
                animate={{ scale: hovered === loc.city ? 1.3 : 1 }}
              >
                <span className="relative flex h-4 w-4 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
                </span>
              </motion.button>
            ))}

            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="pointer-events-none absolute bottom-4 left-4 right-4 z-20 rounded-2xl border border-white/10 bg-charcoal/90 p-4 shadow-xl backdrop-blur-sm sm:left-auto sm:right-4 sm:w-72"
                >
                  {(() => {
                    const loc = locations.find((l) => l.city === hovered)!;
                    return (
                      <>
                        <div className="flex items-center gap-2 text-accent">
                          <MapPin size={16} />
                          <p className="font-heading text-lg font-semibold text-foreground">{loc.city}</p>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-muted">
                            <Users size={14} /> {loc.clients}{loc.clientSuffix} clients
                          </div>
                          <div className="flex items-center gap-2 text-muted">
                            <Briefcase size={14} /> {loc.projects} projects
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Flag, label: "Countries", value: "6+" },
            { icon: Users, label: "Clients", value: "300+" },
            { icon: Briefcase, label: "Projects", value: "350+" },
            { icon: CheckCircle, label: "Completed", value: "98%" },
          ].map((s) => (
            <Reveal key={s.label} delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-5 text-center">
                <s.icon size={20} className="mx-auto text-accent" />
                <p className="mt-2 font-heading text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-sm text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
