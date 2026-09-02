import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";

export const metadata: Metadata = {
  title: "Our Work | InfoMyth Web Service",
  description: "See a selection of custom websites and web apps built by InfoMyth Web Service.",
};

export default function WorkPage() {
  return <PortfolioGrid />;
}
