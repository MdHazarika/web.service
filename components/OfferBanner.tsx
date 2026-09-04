"use client";

import Link from "next/link";
import { useSiteConfig } from "./ConfigProvider";
import { defaultConfig } from "@/lib/siteConfig";

export function OfferBanner() {
  const { config, loading } = useSiteConfig();
  const { offers } = config;

  // During loading, use default config to prevent flicker
  // After loading, use the actual config from database
  const displayOffers = loading ? defaultConfig.offers : offers;

  if (!displayOffers.active || !displayOffers.message) return null;

  return (
    <div
      className="w-full py-2.5 text-center text-sm font-medium"
      style={{ backgroundColor: displayOffers.bgColor, color: displayOffers.textColor }}
    >
      <Link href={displayOffers.link || "/contact"} className="inline-block hover:underline">
        {displayOffers.message}
      </Link>
    </div>
  );
}
