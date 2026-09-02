import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlobalEffects } from "@/components/global/GlobalEffects";
import { ConfigProvider } from "@/components/ConfigProvider";
import { OfferBanner } from "@/components/OfferBanner";
import { defaultConfig, SiteConfig } from "@/lib/siteConfig";
import "./globals.css";

const CONFIG_PATH = join(process.cwd(), "data", "siteConfig.json");

async function getInitialConfig(): Promise<SiteConfig> {
  if (!existsSync(CONFIG_PATH)) {
    return defaultConfig;
  }
  const raw = await readFile(CONFIG_PATH, "utf-8");
  const saved = JSON.parse(raw) as Partial<SiteConfig>;
  return {
    ...defaultConfig,
    ...saved,
    sections: { ...defaultConfig.sections, ...(saved.sections || {}) },
  };
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://infomythweb.com"),
  title: {
    default: "InfoMyth Web Service | Web Development Agency",
    template: "%s | InfoMyth Web Service",
  },
  description:
    "We build premium, modern websites for startups, small businesses, and personal brands.",
  openGraph: {
    title: "InfoMyth Web Service | Web Development Agency",
    description:
      "Premium, modern web design and development for startups and small businesses.",
    url: "/",
    siteName: "InfoMyth Web Service",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InfoMyth Web Service | Web Development Agency",
    description:
      "Premium, modern web design and development for startups and small businesses.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialConfig = await getInitialConfig();
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${bricolage.variable} antialiased`}
      >
        <ConfigProvider initialConfig={initialConfig}>
          <OfferBanner />
          <GlobalEffects />
          <Navbar />
          {children}
          <Footer />
        </ConfigProvider>
      </body>
    </html>
  );
}
