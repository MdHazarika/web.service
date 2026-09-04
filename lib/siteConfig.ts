import { plans, appPlans } from "./plans";

export interface GlobalStyles {
  primaryColor: string;
  accentColor: string;
  borderRadius: string;
}

export interface Offer {
  active: boolean;
  message: string;
  link: string;
  bgColor: string;
  textColor: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  rating?: number;
}

export interface SectionVisibility {
  [key: string]: boolean;
}

export interface SiteConfig {
  offers: Offer;
  globalStyles: GlobalStyles;
  plans: (typeof plans)[number][];
  appPlans: (typeof appPlans)[number][];
  testimonials: Testimonial[];
  stats: {
    launchedWebsites: string;
  };
  sections: SectionVisibility;
}

export const defaultConfig: SiteConfig = {
  offers: {
    active: true,
    message: "40% off on all website plans for limited time!",
    link: "/#plans",
    bgColor: "#0d9488",
    textColor: "#ffffff",
  },
  globalStyles: {
    primaryColor: "#0d9488",
    accentColor: "#8b5cf6",
    borderRadius: "0.75rem",
  },
  plans,
  appPlans,
  testimonials: [
    { quote: "InfoMyth Web Service turned our vague idea into a site that actually drives leads. The process was fast and the design feels premium.", name: "Arjun Sharma", role: "Founder, Guwahati, Assam", rating: 5 },
    { quote: "We shipped a full rebrand and new marketing site in under three weeks. Communication was clear and the quality was outstanding.", name: "Priya Desai", role: "CMO, Mumbai, Maharashtra", rating: 5 },
    { quote: "Our portfolio finally matches the level of our work. The animations are subtle, the load time is fast, and clients love it.", name: "Rahul Verma", role: "Creative Director, Hyderabad, Telangana", rating: 4 },
    { quote: "The e-commerce build paid for itself in the first month. Conversions are up and the checkout experience is buttery smooth.", name: "Ananya Reddy", role: "Owner, Bengaluru, Karnataka", rating: 5 },
    { quote: "Professional, creative, and always on time. The team built a stunning platform that elevated our brand across the UAE.", name: "Omar Al-Rashid", role: "CEO, Dubai, UAE", rating: 5 },
    { quote: "From discovery to launch, everything was smooth. The website now generates consistent inbound leads for our business.", name: "Fatima Al-Hassan", role: "Marketing Director, Abu Dhabi, UAE", rating: 5 },
    { quote: "InfoMyth Web Service understood our market and delivered a site that feels premium and converts visitors into customers.", name: "Khalid Al-Farsi", role: "Founder, Dubai, UAE", rating: 5 },
    { quote: "The redesign doubled our demo requests in the first month. Highly recommended for SaaS startups.", name: "Vikram Singh", role: "Founder, Jaipur, Rajasthan", rating: 4 },
    { quote: "Clean design, fast delivery, and great support. They made our product look enterprise-ready from day one.", name: "Neha Patel", role: "Marketing Head, Ahmedabad, Gujarat", rating: 5 },
    { quote: "Our platform looks world-class now. The micro-interactions and performance are exactly what we needed.", name: "Karthik Iyer", role: "Product Manager, Chennai, Tamil Nadu", rating: 5 },
    { quote: "They delivered beyond expectations. Our online bookings grew by 40% after the new site went live.", name: "Pooja Nair", role: "CEO, Kochi, Kerala", rating: 4 },
    { quote: "Strategic, creative, and reliable. The new marketing site has become our best sales tool.", name: "Rohit Mehta", role: "CMO, Pune, Maharashtra", rating: 5 },
    { quote: "Finally a team that gets design and business. The website is fast, beautiful, and easy to manage.", name: "Sneha Kulkarni", role: "Owner, Nagpur, Maharashtra", rating: 5 },
    { quote: "Our brand now looks credible online. The process was collaborative and the result speaks for itself.", name: "Aman Gupta", role: "Founder, Bhopal, Madhya Pradesh", rating: 4 },
    { quote: "InfoMyth Web Service nailed the UX. Customers now find what they need faster and checkout is seamless.", name: "Divya Chawla", role: "Creative Director, Chandigarh", rating: 5 },
    { quote: "Great communication and clean execution. The dashboard and public site work beautifully together.", name: "Saurabh Mishra", role: "CTO, Lucknow, Uttar Pradesh", rating: 4 },
    { quote: "They transformed our small business into a digital-first brand. Highly recommended.", name: "Meera Joshi", role: "Marketing Lead, Goa", rating: 5 },
    { quote: "The website they built is now our top source of qualified leads. Exceptional ROI.", name: "Aditya Banerjee", role: "Founder, Kolkata, West Bengal", rating: 5 },
    { quote: "InfoMyth Web Service delivered a fast, scalable site that supports our growing product line.", name: "Shivani Rao", role: "CMO, Coimbatore, Tamil Nadu", rating: 5 },
    { quote: "Our internal team can now update the site without touching code. CMS setup is perfect.", name: "Nikhil Bhatia", role: "Product Lead, Indore, Madhya Pradesh", rating: 5 },
    { quote: "Beautiful, fast, and SEO-friendly. We rank higher and look better than our competitors.", name: "Priya Menon", role: "Owner, Visakhapatnam, Andhra Pradesh", rating: 5 },
    { quote: "The best web team we have worked with. They took ownership and delivered a premium product.", name: "Arun Khanna", role: "Director, Gurgaon, Haryana", rating: 5 },
  ],
  stats: {
    launchedWebsites: "350+",
  },
  sections: {
    hero: true,
    stats: true,
    services: true,
    pricing: true,
    process: true,
    testimonials: true,
    trust: true,
    techStack: true,
    industries: true,
    whyChooseUs: true,
    faq: true,
    planComparison: true,
    timeline: true,
    dashboard: true,
    aiConsultant: true,
    costCalculator: true,
    beforeAfter: true,
    performance: true,
    successStories: true,
    freeResources: true,
    proposal: true,
    journey: true,
    progress: true,
    worldMap: true,
    recommendation: true,
    liveCalculator: true,
    websiteBuilder: true,
    liveWebsiteBuilder: true,
    roi: true,
    bookConsultation: false,
    team: false,
    newsletter: true,
  },
};
