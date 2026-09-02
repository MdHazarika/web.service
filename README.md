# InfoMyth Web Service — Web Development Agency Site

A premium, modern marketing website for a web development agency built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and **Framer Motion**.

## Features

- Dark/light theme toggle
- Responsive sticky glass-morphism navbar
- Animated hero, services, pricing, portfolio, process, and testimonials
- Contact/order form with server-side logging endpoint
- SEO metadata, sitemap, and robots.txt
- Custom design tokens (charcoal palette + vivid violet accent)

## Tech Stack

- [Next.js 14 App Router](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 3.4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)
- [shadcn/ui](https://ui.shadcn.com/)

## Getting Started

```bash
cd site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Deployment

This project is configured for **Vercel**.

1. Push the `site/` directory to a Git repository.
2. Import the repository in [Vercel](https://vercel.com).
3. Vercel will auto-detect Next.js and deploy.

> **Note:** The `/api/contact` route is used for form submissions. For purely static hosting you will need to replace that with a serverless function or form backend service.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in any real values:

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_SITE_URL` — canonical site URL for sitemap/OG metadata
- `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — only needed if you enable Stripe (Part 8, optional)

## Customization Checklist

- [x] Replace `InfoMyth Web Service` business name and `hello@infomythweb.com` email
- [ ] Swap placeholder stats, testimonials, and project details for real content
- [ ] Update `lib/projects.ts` and `lib/plans.ts` with actual case studies/pricing
- [ ] Replace `https://infomythweb.com` metadata URL with your real domain
- [ ] Hook `/api/contact` to a real email service (Resend, SendGrid, etc.)

## Project Structure

```
app/
  page.tsx          # Homepage
  layout.tsx        # Root layout, fonts, metadata
  globals.css       # Tailwind directives + CSS variables
  contact/          # Contact/order form
  work/             # Portfolio page
  api/contact/      # Form submission API route
  sitemap.ts        # Generated sitemap
  robots.ts         # Generated robots.txt
components/
  layout/           # Navbar, Footer, ThemeToggle
  sections/         # Hero, Services, Pricing, Process, Testimonials, PortfolioGrid
  ui/               # Button, Input, Textarea, Select
lib/
  utils.ts          # cn() helper
  plans.ts          # Pricing plan data
  projects.ts       # Portfolio project data
```

## License

MIT — free to use for personal or commercial projects.
