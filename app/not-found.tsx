import Link from "next/link";
import { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, Search } from "lucide-react";
import { ButterflyLarge } from "@/components/ui/ButterflyLarge";

export const metadata: Metadata = {
  title: "Page Not Found | InfoMyth Web Service",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-24 text-center">
      <ButterflyLarge className="absolute right-12 top-12 z-10 scale-50 opacity-80" />
      <div className="rounded-full border border-white/10 bg-accent/10 p-6 text-accent">
        <Search size={40} strokeWidth={1.5} />
      </div>
      <h1 className="mt-8 font-heading text-5xl font-bold tracking-tight sm:text-6xl">
        404
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted">
        We couldn&apos;t find the page you were looking for. It might have been moved or no longer exists.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "lg" }),
            "inline-flex items-center gap-2"
          )}
        >
          <Home size={18} />
          Back to home
        </Link>
        <Link
          href="/work"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          View our work
        </Link>
      </div>
    </main>
  );
}
