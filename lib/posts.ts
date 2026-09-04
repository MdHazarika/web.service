export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

export const posts: Post[] = [
  {
    slug: "why-speed-matters",
    title: "Why Website Speed Matters More Than Ever",
    excerpt:
      "A one-second delay can cost conversions. Here is how we build sites that load in the blink of an eye.",
    category: "Performance",
    author: "InfoMyth Web Service Team",
    date: "2024-08-14",
    readTime: "4 min read",
    content: `
In a mobile-first world, speed is not a luxury — it is a competitive advantage. Studies show that a one-second delay in page load time can reduce conversions by up to 7%.

At InfoMyth Web Service, performance is built into every layer of our process:

- **Optimized assets**: Images are served in next-gen formats and lazy-loaded below the fold.
- **Efficient frameworks**: We use Next.js with static and server rendering where it makes sense.
- **Lean bundles**: Code splitting and tree shaking keep JavaScript payloads small.
- **Edge caching**: Content is cached close to the user for global audiences.

A fast site improves SEO, reduces bounce rate, and builds trust before a visitor even reads the headline. If your current site feels sluggish, it is probably costing you leads.

Want to know how fast your site could be? Book a free performance audit with our team.
    `.trim(),
  },
  {
    slug: "designing-for-conversion",
    title: "Designing Websites That Convert",
    excerpt:
      "Great design is not just visual — it is strategic. Learn the principles behind high-converting pages.",
    category: "Design",
    author: "InfoMyth Web Service Team",
    date: "2025-07-22",
    readTime: "5 min read",
    content: `
A beautiful website is table stakes. A website that converts is what moves the needle for your business.

We follow a few core principles on every project:

- **One clear goal per page**: Every section should drive the visitor toward a single action.
- **Visual hierarchy**: Headlines, spacing, and contrast guide attention naturally.
- **Social proof**: Testimonials, logos, and stats reduce perceived risk.
- **Friction-free forms**: Fewer fields, clear labels, and instant feedback increase submissions.

Conversion-focused design is a mix of psychology and craft. When done right, your website becomes your best salesperson — working 24/7.
    `.trim(),
  },
  {
    slug: " choosing-the-right-cms",
    title: "How to Choose the Right CMS for Your Business",
    excerpt:
      "Notion, Sanity, WordPress, or a custom dashboard? Here is how we help clients pick the right stack.",
    category: "Strategy",
    author: "InfoMyth Web Service Team",
    date: "2025-06-10",
    readTime: "6 min read",
    content: `
The right CMS depends on who will manage content, how often it changes, and what integrations you need.

- **Notion-style builders**: Great for simple marketing sites and small teams.
- **Headless CMS (Sanity, Contentful)**: Best for structured content, multi-channel publishing, and performance.
- **WordPress**: Familiar and flexible, but often needs more maintenance.
- **Custom admin panels**: Ideal for apps with complex workflows and user roles.

We always start with your team's workflow before recommending a platform. The best CMS is the one your team actually uses.
    `.trim(),
  },
  {
    slug: "ai-and-the-future-of-web",
    title: "AI and the Future of Web Experiences",
    excerpt:
      "From dynamic personalization to AI-assisted support, see how we are using AI to build smarter websites.",
    category: "Technology",
    author: "InfoMyth Web Service Team",
    date: "2026-05-28",
    readTime: "4 min read",
    content: `
Artificial intelligence is changing how websites are built and experienced. We are integrating AI in practical ways:

- **Personalized recommendations**: Content adapts based on visitor behavior and preferences.
- **AI proposal generators**: Visitors can describe their project and get tailored package suggestions.
- **Smart search and chat**: Faster answers for users, fewer support tickets for teams.
- **Content assistance**: Faster copy generation and SEO metadata for content creators.

The key is using AI to enhance the human experience, not replace it. The best sites feel intuitive, helpful, and surprisingly fast.
    `.trim(),
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
