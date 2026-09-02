"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const CONSENT_KEY = "cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(CONSENT_KEY) : null;
    if (!stored) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-[100] border-t border-white/10 bg-charcoal/95 p-4 shadow-2xl backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-6 sm:rounded-2xl"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3 sm:items-center">
              <Cookie size={20} className="mt-0.5 shrink-0 text-accent sm:mt-0" />
              <p className="text-sm leading-relaxed text-muted">
                We use cookies to improve your experience and analyze site traffic.
                You can accept or decline them anytime.
              </p>
            </div>
            <div className="flex items-center gap-2 sm:shrink-0">
              <button
                onClick={decline}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "text-muted hover:text-foreground"
                )}
              >
                Decline
              </button>
              <button
                onClick={accept}
                className={cn(buttonVariants({ size: "sm" }))}
              >
                Accept
              </button>
              <button
                onClick={decline}
                className="p-2 text-muted transition-colors hover:text-foreground"
                aria-label="Close cookie banner"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
