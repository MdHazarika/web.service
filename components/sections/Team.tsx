"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Reveal } from "./Reveal";

const team = [
  {
    name: "Alex Morgan",
    role: "Founder & Lead Developer",
    bio: "Full-stack engineer obsessed with clean code, performance, and products that convert.",
  },
  {
    name: "Samira Patel",
    role: "Creative Director",
    bio: "Designs interfaces that feel premium, intuitive, and unmistakably on-brand.",
  },
  {
    name: "Jordan Lee",
    role: "Senior Frontend Engineer",
    bio: "Turns complex interactions into smooth, accessible, and responsive experiences.",
  },
  {
    name: "Casey Rivera",
    role: "Strategy & Growth",
    bio: "Connects business goals to the right features, messaging, and launch plans.",
  },
];

function Avatar({ name }: { name: string }) {
  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 text-accent">
      <User size={32} />
    </div>
  );
}

export function Team() {
  return (
    <section id="team" className="bg-charcoal/30 py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Meet the team
          </h2>
          <p className="mt-4 text-muted">
            A small, senior crew that cares deeply about craft, clarity, and results.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <motion.div
                className="flex h-full flex-col items-center rounded-2xl border border-white/10 bg-charcoal/40 p-6 text-center transition-colors hover:border-accent/30"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <Avatar name={member.name} />
                <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-accent">{member.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {member.bio}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
