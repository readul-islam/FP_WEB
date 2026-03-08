"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Target,
  Navigation,
  Send,
  ChevronRight,
  Layout,
  Moon,
  Sun,
  Smartphone,
  Laptop,
} from "lucide-react";
import FocusPilotLogo from "@/components/FocusPilotLogo";

/* ─────────────────────────────────────────────
   Brand tokens (single source of truth)
───────────────────────────────────────────── */
const BRAND = {
  green: "#10B981",
  greenHover: "#059669",
  greenDim: "rgba(16,185,129,0.15)",
  dark: "#0a0f1e",
  surface: "#111827",
  surface2: "#1e293b",
  border: "#1f2d40",
  text: "#f1f5f9",
  textMuted: "#64748b",
  amber: "#f59e0b",
  red: "#ef4444",
};

/* ─────────────────────────────────────────────
   Logo variant card data
───────────────────────────────────────────── */
type Variant = {
  id: string;
  label: string;
  bg: string;
  textColor?: string;
  outline?: boolean;
  preview: React.ReactNode;
};

const logoVariants: Variant[] = [
  {
    id: "default-light",
    label: "Default Light",
    bg: "#ffffff",
    preview: (
      <FocusPilotLogo variant="full" size={44} />
    ),
  },
  {
    id: "brand-green",
    label: "Brand Green",
    bg: BRAND.green,
    preview: (
      <FocusPilotLogo variant="full" size={44} scheme="white" />
    ),
  },
  {
    id: "dark-mode",
    label: "Dark Mode",
    bg: BRAND.dark,
    preview: (
      <FocusPilotLogo variant="full" size={44} />
    ),
  },
  {
    id: "icon-only",
    label: "Icon Only Mark",
    bg: "#f8fafc",
    preview: (
      <FocusPilotLogo variant="icon" size={72} />
    ),
  },
  {
    id: "small-header",
    label: "Small App Header",
    bg: "#ffffff",
    preview: (
      <div
        className="flex items-center px-4 py-2 rounded-full shadow-sm border"
        style={{ borderColor: "#e2e8f0", background: "#f8fafc" }}
      >
        <FocusPilotLogo variant="small" size={24} />
      </div>
    ),
  },
  {
    id: "monochrome",
    label: "Monochrome Outline",
    bg: BRAND.surface,
    preview: (
      <FocusPilotLogo variant="full" size={44} scheme="white" />
    ),
  },
  {
    id: "app-launcher",
    label: "App Launcher",
    bg: "#f8fafc",
    preview: (
      <div className="flex gap-6 items-center justify-center">
        <div
          className="w-20 h-20 rounded-[22%] shadow-lg flex items-center justify-center"
          style={{ background: "#10B981" }}
        >
          <FocusPilotLogo variant="icon" size={56} scheme="white" />
        </div>
        <div className="space-y-2">
          <div className="h-3.5 w-28 rounded-full bg-slate-200" />
          <div className="h-3 w-20 rounded-full bg-slate-100" />
        </div>
      </div>
    ),
  },
];

/* ─────────────────────────────────────────────
   Real World Use mockups
───────────────────────────────────────────── */
const RealWorldUse = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Web Navbar */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="rounded-xl overflow-hidden border shadow-sm"
      style={{ borderColor: BRAND.border, background: BRAND.surface }}
    >
      <div
        className="flex items-center justify-between px-5 py-3 border-b"
        style={{ borderColor: BRAND.border, background: BRAND.dark }}
      >
        <FocusPilotLogo variant="full" size={28} />
        <div className="flex items-center gap-5">
          {["Features", "Pricing", "Demo"].map((l) => (
            <span key={l} className="text-xs" style={{ color: BRAND.textMuted }}>
              {l}
            </span>
          ))}
          <span
            className="text-xs px-3 py-1 rounded-md font-semibold"
            style={{ background: BRAND.green, color: "#fff" }}
          >
            Get Started
          </span>
        </div>
      </div>
      <div className="px-5 py-6">
        <p className="text-[11px] font-semibold mb-1" style={{ color: BRAND.green }}>
          NAVIGATE SUCCESS
        </p>
        <p className="text-sm font-bold" style={{ color: BRAND.text }}>
          Your focus, amplified.
        </p>
        <p className="text-xs mt-1" style={{ color: BRAND.textMuted }}>
          Stay on track with deep work sessions and smart habit loops.
        </p>
      </div>
      <p className="px-5 pb-3 text-[10px] font-mono" style={{ color: BRAND.textMuted }}>
        WEB NAVBAR
      </p>
    </motion.div>

    {/* VS Code Extension */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-xl overflow-hidden border shadow-sm"
      style={{ borderColor: BRAND.border, background: BRAND.surface }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ borderColor: BRAND.border, background: BRAND.dark }}
      >
        <FocusPilotLogo variant="icon" size={22} />
        <span className="text-xs font-semibold" style={{ color: BRAND.text }}>
          FocusPilot
        </span>
        <Laptop className="w-3.5 h-3.5 ml-auto" style={{ color: BRAND.textMuted }} />
      </div>
      <div className="p-4 space-y-2">
        {[
          { label: "Session", val: "47:23", color: BRAND.green },
          { label: "Focus Score", val: "94%", color: BRAND.amber },
          { label: "Streak", val: "12 days", color: BRAND.green },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <span className="text-[11px]" style={{ color: BRAND.textMuted }}>
              {row.label}
            </span>
            <span className="text-[11px] font-mono font-semibold" style={{ color: row.color }}>
              {row.val}
            </span>
          </div>
        ))}
        <div
          className="mt-3 w-full text-center py-1.5 rounded text-[11px] font-semibold"
          style={{ background: BRAND.greenDim, color: BRAND.green, border: `1px solid ${BRAND.green}40` }}
        >
          Start Session
        </div>
      </div>
      <p className="px-4 pb-3 text-[10px] font-mono" style={{ color: BRAND.textMuted }}>
        VS CODE EXTENSION
      </p>
    </motion.div>

    {/* Mobile App */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="rounded-xl overflow-hidden border shadow-sm"
      style={{ borderColor: BRAND.border, background: BRAND.surface }}
    >
      <div className="p-5 flex flex-col items-center justify-center gap-3 min-h-[140px]" style={{ background: BRAND.dark }}>
        <FocusPilotLogo variant="icon" size={56} scheme="default" />
        <FocusPilotLogo variant="small" size={20} scheme="default" />
      </div>
      <div className="px-4 py-3 flex items-center gap-2">
        <Smartphone className="w-3.5 h-3.5" style={{ color: BRAND.textMuted }} />
        <span className="text-[11px]" style={{ color: BRAND.textMuted }}>
          Splash screen · iOS / Android
        </span>
      </div>
      <p className="px-4 pb-3 text-[10px] font-mono" style={{ color: BRAND.textMuted }}>
        MOBILE APP
      </p>
    </motion.div>

    {/* Email / Marketing */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-xl overflow-hidden border shadow-sm"
      style={{ borderColor: BRAND.border, background: BRAND.surface }}
    >
      <div
        className="flex items-center gap-3 px-5 py-4 border-b"
        style={{ borderColor: BRAND.border, background: BRAND.green }}
      >
        <FocusPilotLogo variant="icon" size={32} scheme="white" />
        <div>
          <p className="text-sm font-bold text-white leading-none">FocusPilot</p>
          <p className="text-[10px] text-white/70 font-mono tracking-widest">
            NAVIGATE SUCCESS
          </p>
        </div>
      </div>
      <div className="px-5 py-4">
        <p className="text-xs font-semibold" style={{ color: BRAND.text }}>
          Your weekly focus report is ready
        </p>
        <p className="text-[11px] mt-1" style={{ color: BRAND.textMuted }}>
          You completed 24 deep work sessions this week — that's 18% more than
          last week.
        </p>
        <div className="flex items-center gap-1 mt-3" style={{ color: BRAND.green }}>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[11px] font-semibold">View full report</span>
        </div>
      </div>
      <p className="px-5 pb-3 text-[10px] font-mono" style={{ color: BRAND.textMuted }}>
        EMAIL HEADER
      </p>
    </motion.div>
  </div>
);

/* ─────────────────────────────────────────────
   Variant Card
───────────────────────────────────────────── */
const VariantCard = ({ v, index }: { v: Variant; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.07 }}
    className="rounded-xl overflow-hidden border"
    style={{
      borderColor: v.bg === "#ffffff" || v.bg === "#f8fafc" ? "#e2e8f0" : BRAND.border,
    }}
  >
    <div
      className="flex items-center justify-center min-h-[140px]"
      style={{ background: v.bg }}
    >
      {v.preview}
    </div>
    <div
      className="px-4 py-2.5 border-t"
      style={{
        borderColor: v.bg === "#ffffff" || v.bg === "#f8fafc" ? "#e2e8f0" : BRAND.border,
        background: v.bg === "#ffffff" || v.bg === "#f8fafc" ? "#f8fafc" : BRAND.surface,
      }}
    >
      <p
        className="text-[10px] font-semibold tracking-widest text-center uppercase font-mono"
        style={{
          color:
            v.bg === "#ffffff" || v.bg === "#f8fafc"
              ? "#94a3b8"
              : BRAND.textMuted,
        }}
      >
        {v.label}
      </p>
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────
   Color Swatch
───────────────────────────────────────────── */
const swatches = [
  { name: "Emerald Primary", hex: "#10B981", role: "Brand / Actions / Links" },
  { name: "Emerald Hover",   hex: "#059669", role: "Hover state" },
  { name: "Deep Space",      hex: "#0a0f1e", role: "Background" },
  { name: "Surface",         hex: "#111827", role: "Cards / Panels" },
  { name: "Surface 2",       hex: "#1e293b", role: "Secondary surface" },
  { name: "Border",          hex: "#1f2d40", role: "Dividers / Borders" },
  { name: "Amber",           hex: "#f59e0b", role: "Warning / Highlights" },
  { name: "Red",             hex: "#ef4444", role: "Error / Destructive" },
];

/* ─────────────────────────────────────────────
   Typography section
───────────────────────────────────────────── */
const TypographySection = () => (
  <div className="space-y-6">
    <div className="rounded-xl border p-6" style={{ background: BRAND.surface, borderColor: BRAND.border }}>
      <p className="text-[10px] font-mono tracking-widest mb-4" style={{ color: BRAND.textMuted }}>
        TYPEFACES
      </p>
      <div className="space-y-4">
        <div>
          <p className="text-3xl font-bold" style={{ color: BRAND.text, fontFamily: "'Space Grotesk', sans-serif" }}>
            Space Grotesk
          </p>
          <p className="text-xs mt-0.5" style={{ color: BRAND.textMuted }}>
            Primary — headings, UI labels, body copy
          </p>
          <p className="text-sm mt-2" style={{ color: BRAND.textMuted, fontFamily: "'Space Grotesk', sans-serif" }}>
            ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
          </p>
        </div>
        <div className="border-t pt-4" style={{ borderColor: BRAND.border }}>
          <p className="text-2xl font-semibold" style={{ color: BRAND.green, fontFamily: "'JetBrains Mono', monospace" }}>
            JetBrains Mono
          </p>
          <p className="text-xs mt-0.5" style={{ color: BRAND.textMuted }}>
            Monospace — code, timers, stats, tagline
          </p>
          <p className="text-sm mt-2 font-mono" style={{ color: BRAND.textMuted }}>
            47:23 · 94% · 12 days · NAVIGATE SUCCESS
          </p>
        </div>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
const TABS = ["Logo Variants", "Real World Use", "Color System", "Typography"] as const;
type Tab = (typeof TABS)[number];

export default function BrandPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Logo Variants");

  return (
    <div className="min-h-screen" style={{ background: "#f8fafc", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              FocusPilot Brand Identity
            </h1>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              A minimalist design system built for professional productivity. The logo
              combines a navigation compass with a focus ring to symbolize directed attention.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl border bg-white shadow-sm" style={{ borderColor: "#e2e8f0" }}>
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative px-4 py-2 text-sm rounded-lg transition-colors whitespace-nowrap"
                style={{
                  color: activeTab === tab ? BRAND.green : "#94a3b8",
                  fontWeight: activeTab === tab ? 600 : 400,
                }}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: `${BRAND.green}12`, border: `1px solid ${BRAND.green}40` }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-12">
        <div className="border-t mb-8" style={{ borderColor: "#e2e8f0" }} />

        <AnimatePresence mode="wait">
          {activeTab === "Logo Variants" && (
            <motion.div
              key="variants"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {logoVariants.map((v, i) => (
                  <VariantCard key={v.id} v={v} index={i} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "Real World Use" && (
            <motion.div
              key="real-world"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <RealWorldUse />
            </motion.div>
          )}

          {activeTab === "Color System" && (
            <motion.div
              key="colors"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {swatches.map((s, i) => (
                  <motion.div
                    key={s.hex}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="rounded-xl overflow-hidden border"
                    style={{ borderColor: "#e2e8f0" }}
                  >
                    <div
                      className="h-20"
                      style={{ background: s.hex }}
                    />
                    <div className="p-3 bg-white">
                      <p className="text-xs font-semibold text-gray-800">{s.name}</p>
                      <p className="text-[10px] font-mono text-gray-400 mt-0.5">{s.hex}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{s.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "Typography" && (
            <motion.div
              key="typography"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <TypographySection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="border-t" style={{ borderColor: "#e2e8f0" }}>
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            © 2025 FocusPilot Design System. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Documentation", "Assets", "Guidelines"].map((l) => (
              <span key={l} className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
