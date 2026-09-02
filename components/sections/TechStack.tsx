"use client";

import { motion } from "framer-motion";
import { Layers, Server, Cloud, Database, Brain, Shield, CreditCard, Globe, Smartphone, FileCode, BarChart3, FlaskConical } from "lucide-react";
import { Reveal } from "./Reveal";

const stacks = [
  {
    icon: Layers,
    title: "Frontend",
    tools: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Redux",
      "Zustand",
      "Shadcn UI",
      "Sass",
    ],
  },
  {
    icon: Server,
    title: "Backend",
    tools: [
      "Node.js",
      "Express",
      "NestJS",
      "GraphQL",
      "tRPC",
      "REST APIs",
      "Python",
      "Django",
      "FastAPI",
      "WebSockets",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    tools: [
      "AWS",
      "Vercel",
      "Cloudflare",
      "Docker",
      "Firebase",
      "Google Cloud",
      "Azure",
      "Kubernetes",
      "Terraform",
      "CI/CD",
    ],
  },
  {
    icon: Database,
    title: "Databases",
    tools: [
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "Redis",
      "MySQL",
      "SQLite",
      "Firestore",
      "DynamoDB",
      "Prisma",
      "Elasticsearch",
    ],
  },
  {
    icon: Brain,
    title: "AI & ML",
    tools: [
      "OpenAI",
      "LangChain",
      "TensorFlow",
      "Hugging Face",
      "Anthropic Claude",
      "Google Gemini",
      "Pinecone",
      "Vector Search",
      "AI Agents",
      "Prompt Engineering",
    ],
  },
  {
    icon: Shield,
    title: "Security & Auth",
    tools: [
      "Auth.js",
      "Clerk",
      "NextAuth",
      "OAuth 2.0",
      "SSO",
      "JWT",
      "OWASP",
      "HTTPS",
      "RBAC",
      "Penetration Testing",
    ],
  },
  {
    icon: CreditCard,
    title: "Payments",
    tools: [
      "Stripe",
      "PayPal",
      "Razorpay",
      "Square",
      "LemonSqueezy",
      "Paddle",
      "UPI",
      "Apple Pay",
      "Google Pay",
    ],
  },
  {
    icon: Globe,
    title: "Hosting & DNS",
    tools: [
      "Vercel",
      "Netlify",
      "AWS",
      "DigitalOcean",
      "Cloudflare Pages",
      "Hostinger",
      "GoDaddy",
      "cPanel",
      "Namecheap",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile & PWA",
    tools: [
      "React Native",
      "Flutter",
      "Swift",
      "Kotlin",
      "iOS",
      "Android",
      "Progressive Web Apps",
      "Expo",
    ],
  },
  {
    icon: FileCode,
    title: "CMS & Headless",
    tools: [
      "WordPress",
      "Webflow",
      "Strapi",
      "Contentful",
      "Sanity",
      "Ghost",
      "Shopify",
      "Wix",
      "Squarespace",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics & Growth",
    tools: [
      "Google Analytics",
      "Google Tag Manager",
      "Mixpanel",
      "Hotjar",
      "Microsoft Clarity",
      "Search Console",
      "A/B Testing",
      "Conversion Tracking",
    ],
  },
  {
    icon: FlaskConical,
    title: "Testing & QA",
    tools: [
      "Jest",
      "Cypress",
      "Playwright",
      "Selenium",
      "Vitest",
      "React Testing Library",
      "Postman",
      "Load Testing",
    ],
  },
];

export function TechStack() {
  return (
    <section className="py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Tools we master</h2>
          <p className="mt-4 text-muted">Modern, battle-tested technologies chosen for performance and scale.</p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stacks.map((stack, i) => (
            <Reveal key={stack.title} delay={i * 0.06}>
              <motion.div
                className="group relative rounded-2xl border border-white/10 bg-charcoal/40 p-6 backdrop-blur-sm"
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative inline-flex rounded-xl bg-accent/10 p-3 text-accent">
                  <stack.icon size={24} />
                </div>
                <h3 className="relative mt-4 font-heading text-lg font-semibold text-foreground">{stack.title}</h3>
                <div className="relative mt-3 flex flex-wrap gap-2">
                  {stack.tools.map((tool) => (
                    <span key={tool} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-muted">
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
