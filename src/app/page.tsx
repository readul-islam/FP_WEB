import type { Metadata } from "next";

import Index from "../pages/Index";

export const metadata: Metadata = {
  title: "FocusPilot – Stay Focused, Stop Procrastinating, Get More Done",
  description:
    "Build unstoppable focus with FocusPilot. Plan deep work sessions, hard-lock distracting sites, track streaks, and stay productive across web, mobile, and Chrome.",
  alternates: {
    canonical: "/",
  },
};

// Disable static generation since this page uses AuthProvider context
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function HomePage() {
  return <Index />;
}

