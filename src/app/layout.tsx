import type { ReactNode } from "react";
import type { Metadata } from "next";
import Script from "next/script";

import { Providers } from "./providers";

import "../index.css";

const siteUrl = "https://focuspilot.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FocusPilot – AI-Powered Focus & Productivity App",
    template: "%s | FocusPilot",
  },
  description:
    "FocusPilot is an AI-powered focus app that blocks distractions, protects your deep work time, and helps you build an unbreakable daily streak.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "FocusPilot – Build Unstoppable Focus & Study Habits",
    description:
      "Stay focused, beat procrastination, and turn your goals into daily action with FocusPilot’s hard-lock sessions, smart reminders, and cross‑device apps.",
    siteName: "FocusPilot",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FocusPilot – Stay focused and build unstoppable habits",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FocusPilot – Focus & Productivity Companion",
    description:
      "Block distracting apps and websites, protect your focus, and build powerful daily routines with FocusPilot.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FocusPilot",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
        <Script
          id="ld-json-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

