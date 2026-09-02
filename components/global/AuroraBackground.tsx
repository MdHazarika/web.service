"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <motion.div
        className="absolute -left-1/3 -top-1/4 h-[70vh] w-[70vh] rounded-full bg-gradient-to-br from-accent/20 to-transparent blur-[120px]"
        animate={{ x: [0, 80, 0], y: [0, 60, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/3 top-1/3 h-[60vh] w-[60vh] rounded-full bg-gradient-to-bl from-cyan-500/15 to-transparent blur-[100px]"
        animate={{ x: [0, -70, 0], y: [0, -50, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 h-[50vh] w-[50vh] rounded-full bg-gradient-to-tl from-accent-light/15 to-transparent blur-[90px]"
        animate={{ x: [0, 50, 0], y: [0, -40, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
    </div>
  );
}
