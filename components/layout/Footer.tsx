import Link from "next/link";
import { Phone, Mail } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const socials = [
  { href: "https://instagram.com", icon: InstagramIcon, label: "Instagram" },
  { href: "https://x.com", icon: XIcon, label: "X" },
  { href: "https://linkedin.com", icon: LinkedInIcon, label: "LinkedIn" },
];

const phone = "+91 99547 93494";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal/50 py-12">
      <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} InfoMyth Web Service. All rights reserved.
        </p>
        <nav className="flex flex-wrap justify-center gap-4 text-sm text-muted">
          <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
          <Link href="/work" className="transition-colors hover:text-foreground">Work</Link>
          <Link href="/free-consultation" className="transition-colors hover:text-foreground">Free Consultation</Link>
          <Link href="/contact" className="transition-colors hover:text-foreground">Contact</Link>
          <Link href="/privacy" className="transition-colors hover:text-foreground">Privacy</Link>
          <Link href="/terms" className="transition-colors hover:text-foreground">Terms</Link>
        </nav>
        <div className="flex items-center gap-4">
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <Phone size={16} /> {phone}
          </a>
          <a
            href="mailto:hello.infomyth@gmail.com"
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <Mail size={16} /> hello.infomyth@gmail.com
          </a>
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-muted transition-colors hover:text-foreground"
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
