"use client";

import { motion } from "framer-motion";
import {
  Chrome,
  Smartphone,
  TabletSmartphone,
  Shield,
  Zap,
  Lock,
  ArrowRight,
  MonitorSmartphone,
  Globe,
  Clock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Tools = () => {
  const platforms = [
    {
      id: "chrome",
      name: "Chrome Extension",
      icon: Chrome,
      description:
        "The core of FocusPilot. Our intelligent browser extension that transforms how you work.",
      features: [
        "One-click hard-lock activation",
        "Smart tab management & redirection",
        "Integrated focus timer with notifications",
        "Sync across all Chrome devices",
      ],
      badge: "Most Popular",
      gradient: "from-blue-500/20 to-primary/20",
    },
    {
      id: "ios",
      name: "iOS App",
      icon: Smartphone,
      description:
        "Take your focus on the go. Native iOS app with full FocusPilot features.",
      features: [
        "Screen time integration",
        "App blocking & scheduling",
        "Widget for quick access",
        "Apple Watch companion",
      ],
      badge: "Coming Soon",
      gradient: "from-violet-500/20 to-pink-500/20",
    },
    {
      id: "android",
      name: "Android App",
      icon: TabletSmartphone,
      description:
        "Full-featured Android app for distraction-free productivity.",
      features: [
        "Digital Wellbeing integration",
        "Notification management",
        "Home screen widgets",
        "Wear OS support",
      ],
      badge: "Coming Soon",
      gradient: "from-emerald-500/20 to-teal-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onAuthClick={() => {}} />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              Tools & Extensions
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Focus <span className="text-gradient">Ecosystem</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              FocusPilot works across all your devices. Install our tools and
              unlock seamless productivity everywhere.
            </p>
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card glow-border p-8 mb-16"
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-primary" />
                  How the Pilot Works
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  FocusPilot doesn't just block — it <strong className="text-foreground">redirects</strong>.
                  When you schedule a focus session (like W3Schools at 9 PM), our
                  extension forcibly closes all distracting tabs and keeps you locked
                  on your learning path until the mission is complete.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { icon: Clock, label: "Schedule Sessions" },
                    { icon: Lock, label: "Hard-Lock Active" },
                    { icon: Globe, label: "Auto-Redirect" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                      <span>{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Extension Mockup */}
              <motion.div
                className="w-full lg:w-80 glass-card p-4"
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-semibold text-sm">FocusPilot Extension</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Session</span>
                      <span className="text-sm font-medium">25:00</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: "65%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <Button size="sm" className="w-full">
                      Start Focus Session
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Platform Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <motion.div
                  className="glass-card-hover h-full p-8 flex flex-col relative overflow-hidden"
                  whileHover={{ y: -8 }}
                >
                  {/* Badge */}
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                      platform.badge === "Most Popular"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {platform.badge}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${platform.gradient} flex items-center justify-center mb-6`}
                  >
                    <platform.icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2">{platform.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {platform.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {platform.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    className={
                      platform.badge === "Most Popular"
                        ? "glow-border"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    }
                    variant={platform.badge === "Most Popular" ? "default" : "secondary"}
                  >
                    {platform.badge === "Coming Soon" ? "Notify Me" : "Install Now"}
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* App Store Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-muted-foreground mb-6">Available on all platforms</p>
            <div className="flex justify-center gap-4 flex-wrap">
              {/* Chrome Web Store */}
              <motion.div
                className="glass-card px-6 py-3 flex items-center gap-3 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <Chrome className="w-8 h-8 text-primary" />
                <div className="text-left">
                  <p className="text-[10px] text-muted-foreground uppercase">
                    Available on
                  </p>
                  <p className="text-sm font-semibold">Chrome Web Store</p>
                </div>
              </motion.div>

              {/* App Store */}
              <motion.div
                className="glass-card px-6 py-3 flex items-center gap-3 cursor-pointer opacity-60"
                whileHover={{ scale: 1.05 }}
              >
                <MonitorSmartphone className="w-8 h-8" />
                <div className="text-left">
                  <p className="text-[10px] text-muted-foreground uppercase">
                    Coming to
                  </p>
                  <p className="text-sm font-semibold">App Store</p>
                </div>
              </motion.div>

              {/* Play Store */}
              <motion.div
                className="glass-card px-6 py-3 flex items-center gap-3 cursor-pointer opacity-60"
                whileHover={{ scale: 1.05 }}
              >
                <TabletSmartphone className="w-8 h-8" />
                <div className="text-left">
                  <p className="text-[10px] text-muted-foreground uppercase">
                    Coming to
                  </p>
                  <p className="text-sm font-semibold">Google Play</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tools;
