"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Video, Phone, Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const times = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
const types = [
  { id: "meet", label: "Google Meet", icon: Video },
  { id: "zoom", label: "Zoom", icon: Video },
  { id: "phone", label: "Phone Call", icon: Phone },
];

export function BookConsultation() {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [type, setType] = useState("meet");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const calendarDays: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const submit = async () => {
    if (selectedDate && time && name && email) {
      const meetingLabel = types.find((t) => t.id === type)?.label || type;
      const formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

      try {
        await fetch("/api/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            date: formattedDate,
            time,
            meetingType: meetingLabel,
          }),
        });
      } catch (err) {
        console.error("[Booking submission error]", err);
      }

      setConfirmed(true);
    }
  };

  const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(viewDate);
  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <section id="book" className="bg-charcoal/30 py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Book a free consultation</h2>
          <p className="mt-4 text-muted">Pick a date, time, and meeting type that works for you.</p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-3xl" delay={0.1}>
          <div className="rounded-xl border border-white/10 bg-charcoal p-6 sm:p-10">
            <p className="mb-6 text-center text-sm text-muted">
              Prefer a simple form?{" "}
              <Link href="/free-consultation" className="text-accent hover:underline">
                Request a free consultation here
              </Link>
              .
            </p>
            <AnimatePresence mode="wait">
              {!confirmed ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Calendar size={16} className="text-accent" /> Select a date
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setViewDate(new Date(year, month - 1, 1))}
                          className="rounded-lg border border-white/10 bg-charcoal/40 px-2 py-1 text-sm text-foreground hover:border-accent/50"
                          aria-label="Previous month"
                        >
                          ←
                        </button>
                        <span className="min-w-[10rem] text-center text-sm font-medium text-foreground">{monthLabel}</span>
                        <button
                          type="button"
                          onClick={() => setViewDate(new Date(year, month + 1, 1))}
                          className="rounded-lg border border-white/10 bg-charcoal/40 px-2 py-1 text-sm text-foreground hover:border-accent/50"
                          aria-label="Next month"
                        >
                          →
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted">
                      {weekdays.map((d) => (
                        <div key={d} className="py-2">{d}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.map((d, i) => {
                        if (!d) return <div key={i} className="aspect-square" />;
                        const disabled = d < today;
                        const isSelected = selectedDate && d.toDateString() === selectedDate.toDateString();
                        return (
                          <button
                            key={d.toISOString()}
                            type="button"
                            disabled={disabled}
                            onClick={() => setSelectedDate(d)}
                            className={cn(
                              "aspect-square rounded-lg text-sm transition-colors",
                              isSelected
                                ? "bg-accent text-white"
                                : disabled
                                  ? "cursor-not-allowed text-white/20"
                                  : "border border-transparent bg-charcoal/40 text-foreground hover:border-accent/50"
                            )}
                          >
                            {d.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                      <Clock size={16} className="text-accent" /> Available times
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {times.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTime(t)}
                          className={cn(
                            "rounded-full px-4 py-2 text-sm transition-colors",
                            time === t
                              ? "bg-accent text-white"
                              : "border border-white/10 bg-charcoal/40 text-foreground hover:border-accent/50"
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-foreground">Meeting type</label>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {types.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setType(t.id)}
                          className={cn(
                            "flex items-center justify-center gap-2 rounded-xl border p-3 text-sm transition-colors",
                            type === t.id
                              ? "border-accent bg-accent/10 text-foreground"
                              : "border-white/10 bg-charcoal/40 text-muted hover:text-foreground"
                          )}
                        >
                          <t.icon size={16} /> {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <button
                    type="button"
                    onClick={submit}
                    disabled={!selectedDate || !time || !name || !email}
                    className={cn(buttonVariants({ size: "lg" }), "w-full disabled:opacity-50")}
                  >
                    Confirm Booking
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Check size={28} />
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-bold text-foreground">Booking confirmed</h3>
                  <p className="mt-2 text-muted">
                    See you on {selectedDate?.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })} at {time} via {types.find((t) => t.id === type)?.label}.
                  </p>
                  <p className="mt-1 text-sm text-muted">A calendar invite has been sent to {email}.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
