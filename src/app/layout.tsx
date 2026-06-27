import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WebCraftio — Digital Product Studio & AI Automation Agency",
  description:
    "WebCraftio is a UK-based digital product studio shipping AI, SaaS, web and mobile apps. We offer bespoke web design, custom software development, and AI automation services.",
  keywords: [
    "white label website design",
    "white label web design services",
    "white label website development",
    "white label web design",
    "white label wordpress agency",
    "white label seo company",
    "white label app development",
    "white label seo services",
    "white label seo agency",
    "white label digital marketing agency",
    "ai automation agency",
    "ai automation agency uk",
    "ai automation agency services",
    "conversational ai agency",
    "chatbot development services",
    "ai business automation",
    "generative engine optimisation services",
    "ai seo agency",
    "bespoke web design agency",
    "custom web development company",
    "custom web development agency",
    "startup website design",
    "web development agency uk",
    "website development company uk",
    "ui ux design agency",
    "website design and development",
    "software development agency",
    "custom software development company",
    "agency website design",
    "web app development",
    "mobile app development company",
    "search engine optimisation agency",
    "professional seo services",
    "seo services uk",
  ],
  openGraph: {
    title: "WebCraftio — Digital Product Studio",
    description: "We don't just build — we grow with you. A digital product studio shipping AI, SaaS, web and mobile.",
    url: "https://webcraftio.studio",
    siteName: "WebCraftio",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebCraftio — Digital Product Studio",
    description: "We don't just build — we grow with you. A digital product studio shipping AI, SaaS, web and mobile.",
  },
  alternates: {
    canonical: "https://webcraftio.studio",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "WebCraftio",
  "url": "https://webcraftio.studio",
  "logo": "https://webcraftio.studio/webcraftio.png",
  "description": "A UK-based digital product studio shipping AI, SaaS, web and mobile apps. Specializing in bespoke web design, custom software development, and AI automation services.",
  "areaServed": {
    "@type": "Country",
    "name": "United Kingdom"
  },
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "White Label Web Design & Development"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "AI Automation & Chatbot Development"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Custom Software & Web App Development"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Search Engine Optimisation Services"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
