"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Butterfly3D } from "./Butterfly3D";

interface ButterflyTextProps {
  children: string;
  landing?: number[];
}

export function ButterflyText({ children, landing = [] }: ButterflyTextProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const chars = useMemo(() => children.split(""), [children]);

  const set = useMemo(() => new Set(landing), [landing]);

  return (
    <span className="relative inline">
      {chars.map((char, i) => (
        <span key={`${i}-${char}`} className="relative inline-block">
          <span className="inline-block">{char === " " ? "\u00A0" : char}</span>
          {set.has(i) && ready && (
            <motion.span
              className="pointer-events-none absolute -top-5 -left-2 z-10"
              initial={{ opacity: 0, x: -20, y: -30, scale: 0.4, rotate: -15 }}
              animate={{
                opacity: 1,
                x: 0,
                y: [0, -6, 0, -4, 0],
                scale: 1,
                rotate: [0, 3, -2, 1, 0],
              }}
              transition={{
                opacity: { duration: 0.6, ease: "easeOut" },
                x: { duration: 0.9, ease: "easeOut" },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.8, ease: "backOut" },
                rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                delay: i * 0.05,
              }}
            >
              <Butterfly3D landed />
            </motion.span>
          )}
        </span>
      ))}
    </span>
  );
}
