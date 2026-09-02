export interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  timeline?: string;
  popular?: boolean;
  custom?: boolean;
  priceLabel?: string;
}

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 15999,
    description: "A focused, high-converting site to get you online fast.",
    timeline: "2 - 3 weeks",
    features: [
      "Custom landing / multi-section design",
      "Mobile-first responsive",
      "Basic SEO setup",
      "Contact form",
      "Newsletter signup",
      "Social media links",
      "Core Web Vitals ready",
      "1 round of revisions",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: 55999,
    description: "A multi-page site with content, SEO, and automation for growing brands.",
    timeline: "4 - 6 weeks",
    features: [
      "Up to 25-30 pages",
      "Blog + CMS setup",
      "Advanced SEO setup",
      "Contact + newsletter forms",
      "Google Analytics & Search Console",
      "Social sharing & Open Graph",
      "Animations & micro-interactions",
      "2 rounds of revisions",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 97999,
    description: "A fully custom build with advanced features, animations, and integrations.",
    timeline: "8 - 12 weeks",
    features: [
      "Custom design & animations",
      "CMS or e-commerce integration",
      "Advanced SEO + performance",
      "3rd-party integrations",
      "Priority support",
    ],
  },
  {
    id: "custom",
    name: "Let's Talk",
    price: 0,
    description: "Full customization, enterprise scope, or anything outside the box.",
    features: [
      "Unlimited scope",
      "Dedicated team",
      "SLA & priority support",
      "Custom integrations",
      "Direct founder access",
    ],
    custom: true,
  },
];

export interface AppPlan extends Plan {
  priceMax?: number;
}

export const appPlans: AppPlan[] = [
  {
    id: "app-starter",
    name: "App Development",
    price: 299999,
    priceMax: 799999,
    description: "Native-quality mobile apps for iOS & Android with backend, auth, and payments.",
    timeline: "10 - 16 weeks",
    features: [
      "iOS + Android",
      "User authentication",
      "Payment gateway",
      "Admin dashboard",
      "1 year maintenance",
    ],
    popular: true,
  },
  {
    id: "app-custom",
    name: "Let's Talk",
    price: 0,
    description: "Fully custom apps: games, e-commerce, courier, logistics, and niche platforms.",
    timeline: "Custom",
    features: [
      "Game, e-commerce, courier, others",
      "Custom architecture",
      "Dedicated development team",
      "Scalable backend",
      "Ongoing support",
    ],
    custom: true,
  },
];
