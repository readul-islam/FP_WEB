import type { Metadata } from "next";

import Tools from "../../pages/Tools";

export const metadata: Metadata = {
  title: "FocusPilot Apps & Chrome Extension – Block Distractions Everywhere",
  description:
    "Install the FocusPilot Chrome extension and mobile apps to block distracting sites, protect focus sessions, and sync your productivity across all your devices.",
  alternates: {
    canonical: "/tools",
  },
};

// Disable static generation since this page uses AuthProvider context
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ToolsPage() {
  return <Tools />;
}

