"use client";

import Link from "next/link";
import { useSiteConfig } from "./ConfigProvider";

export function OfferBanner() {
  const { config } = useSiteConfig();
  const { offers } = config;

  if (!offers.active || !offers.message) return null;

  return (
    <div
      className="w-full py-2.5 text-center text-sm font-medium"
      style={{ backgroundColor: offers.bgColor, color: offers.textColor }}
    >
      <Link href={offers.link || "/contact"} className="inline-block hover:underline">
        {offers.message}
      </Link>
    </div>
  );
}
