import type { Metadata } from "next";

import Consistency from "../../pages/Consistency";

export const metadata: Metadata = {
  title: "Build Unbreakable Focus Streaks | FocusPilot Consistency Path",
  description:
    "Turn daily focus sessions into a visual streak with FocusPilot’s Consistency Path. See your momentum, celebrate milestones, and stay motivated to show up every day.",
  alternates: {
    canonical: "/consistency",
  },
};

// Disable static generation since this page uses AuthProvider context
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ConsistencyPage() {
  return <Consistency />;
}

