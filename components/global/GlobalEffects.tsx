"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { CommandPalette } from "./CommandPalette";
import { BackToTop } from "./BackToTop";
import { StickyContact } from "./StickyContact";
import { CookieConsent } from "./CookieConsent";

export function GlobalEffects() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[100] h-[2px] origin-left bg-accent"
        style={{ scaleX }}
      />
      <CommandPalette />
      <BackToTop />
      <StickyContact />
      <CookieConsent />
    </>
  );
}
