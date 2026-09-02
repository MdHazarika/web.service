export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  stack: string[];
  liveUrl: string;
  gradient: string;
}

export const projects: Project[] = [
  {
    id: "shoply",
    name: "Shoply",
    tagline: "E-commerce storefront optimized for conversion",
    description:
      "A modern, high-performance online store with Stripe checkout, inventory management, and a clean product browsing experience.",
    tags: ["E-commerce", "SaaS"],
    stack: ["Next.js", "Stripe", "Tailwind CSS", "PostgreSQL"],
    liveUrl: "https://example.com/shoply",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    id: "ledgerly",
    name: "Ledgerly",
    tagline: "Finance dashboard for startups",
    description:
      "A real-time dashboard that helps founders track runway, revenue, and expenses with beautiful charts and automated reports.",
    tags: ["SaaS", "Dashboard"],
    stack: ["React", "TypeScript", "Recharts", "Supabase"],
    liveUrl: "https://example.com/ledgerly",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: "portfoliyo",
    name: "Portfoliyo",
    tagline: "Personal brand portfolio site",
    description:
      "A bold, animated portfolio for a creative director, featuring case studies, motion transitions, and an integrated contact flow.",
    tags: ["Portfolio", "Personal Brand"],
    stack: ["Next.js", "Framer Motion", "Sanity CMS"],
    liveUrl: "https://example.com/portfoliyo",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "greenplate",
    name: "GreenPlate",
    tagline: "Sustainable meal delivery app",
    description:
      "A mobile-first landing and ordering experience for a plant-based meal delivery service, with a playful brand and fast checkout.",
    tags: ["E-commerce", "Mobile"],
    stack: ["Next.js", "Shopify", "Tailwind CSS"],
    liveUrl: "https://example.com/greenplate",
    gradient: "from-emerald-500 to-teal-500",
  },
];
