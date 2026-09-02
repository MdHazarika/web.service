"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export function StickyContact() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5 }}
      className="fixed bottom-6 left-6 z-[80]"
    >
      <Link
        href="/contact"
        className="flex items-center gap-2 rounded-full border border-white/10 bg-charcoal/80 px-5 py-3 text-sm font-medium text-foreground shadow-xl backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
      >
        <MessageCircle size={18} /> Let's talk
      </Link>
    </motion.div>
  );
}
