"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Clock, Trophy, Sparkles, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const Consistency = () => {
  const [currentNode, setCurrentNode] = useState(7);
  const [showMilestone, setShowMilestone] = useState(false);
  const [avatarType, setAvatarType] = useState<"boy" | "girl">("boy");

  const totalNodes = 21;

  const getNodeStyle = (index: number) => {
    if (index >= 16) return "golden";
    if (index >= 8) return "silver";
    return "wooden";
  };

  const nodeStyles = {
    wooden: {
      bg: "bg-gradient-to-br from-amber-700 to-amber-900",
      border: "border-amber-600",
      glow: "",
    },
    silver: {
      bg: "bg-gradient-to-br from-slate-300 to-slate-500",
      border: "border-slate-400",
      glow: "shadow-lg shadow-slate-400/30",
    },
    golden: {
      bg: "bg-gradient-to-br from-yellow-400 to-amber-600",
      border: "border-yellow-300",
      glow: "shadow-xl shadow-yellow-400/50 animate-pulse-glow",
    },
  };

  const motivationalQuotes = [
    "Discipline is the bridge between goals and accomplishment.",
    "Success is the sum of small efforts repeated day after day.",
    "You don't have to be great to start, but you have to start to be great.",
    "The secret of your success is found in your daily routine.",
  ];

  const handleNodeClick = (index: number) => {
    if (index === currentNode + 1) {
      setCurrentNode(index);
      if (index % 7 === 0) {
        setShowMilestone(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onAuthClick={() => {}} />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              The Path to <span className="text-gradient">Mastery</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Complete daily focus sessions to unlock chronometer upgrades and
              build your unstoppable streak.
            </p>
          </motion.div>

          {/* Streak Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-8"
          >
            <div className="glass-card px-8 py-4 flex items-center gap-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
              >
                <Flame className="w-8 h-8 text-orange-500" />
              </motion.div>
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-3xl font-bold text-gradient">{currentNode} Days</p>
              </div>
            </div>
          </motion.div>

          {/* Avatar Selector */}
          <div className="flex justify-center gap-4 mb-12">
            <Button
              variant={avatarType === "boy" ? "default" : "outline"}
              onClick={() => setAvatarType("boy")}
              className="gap-2"
            >
              👦 Boy
            </Button>
            <Button
              variant={avatarType === "girl" ? "default" : "outline"}
              onClick={() => setAvatarType("girl")}
              className="gap-2"
            >
              👧 Girl
            </Button>
          </div>

          {/* Consistency Path */}
          <div className="relative max-w-3xl mx-auto">
            {/* SVG Path */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 600 1200"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M300,50 Q450,150 300,250 Q150,350 300,450 Q450,550 300,650 Q150,750 300,850 Q450,950 300,1050 Q150,1150 300,1150"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="4"
                strokeDasharray="10,10"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>

            {/* Nodes */}
            <div className="relative grid grid-cols-3 gap-y-8 py-8">
              {[...Array(totalNodes)].map((_, index) => {
                const nodeIndex = index + 1;
                const style = getNodeStyle(nodeIndex);
                const nodeConfig = nodeStyles[style];
                const isCompleted = nodeIndex <= currentNode;
                const isCurrent = nodeIndex === currentNode;
                const isNext = nodeIndex === currentNode + 1;

                // Zigzag positioning
                const col = index % 3;
                const row = Math.floor(index / 3);
                const zigzag = row % 2 === 0 ? col : 2 - col;

                return (
                  <motion.div
                    key={index}
                    className="flex justify-center"
                    style={{
                      gridColumn: zigzag + 1,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <motion.button
                      onClick={() => handleNodeClick(nodeIndex)}
                      disabled={!isNext}
                      className={`relative w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all ${
                        nodeConfig.bg
                      } ${nodeConfig.border} ${isCompleted ? nodeConfig.glow : "opacity-40"} ${
                        isNext ? "cursor-pointer hover:scale-110" : "cursor-default"
                      }`}
                      whileHover={isNext ? { scale: 1.15 } : {}}
                      whileTap={isNext ? { scale: 0.95 } : {}}
                    >
                      <Clock
                        className={`w-6 h-6 ${
                          style === "golden"
                            ? "text-yellow-100"
                            : style === "silver"
                            ? "text-slate-700"
                            : "text-amber-200"
                        }`}
                      />

                      {/* Day Number */}
                      <span className="absolute -bottom-6 text-xs text-muted-foreground">
                        Day {nodeIndex}
                      </span>

                      {/* Current Avatar */}
                      {isCurrent && (
                        <motion.div
                          className="absolute -top-8 text-2xl"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        >
                          {avatarType === "boy" ? "👦" : "👧"}
                        </motion.div>
                      )}

                      {/* Milestone Badge */}
                      {nodeIndex % 7 === 0 && (
                        <div className="absolute -right-2 -top-2">
                          <Trophy className="w-5 h-5 text-yellow-400" />
                        </div>
                      )}
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center gap-8 mt-16"
          >
            {[
              { label: "Wooden (1-7)", style: nodeStyles.wooden },
              { label: "Silver (8-15)", style: nodeStyles.silver },
              { label: "Golden (16+)", style: nodeStyles.golden },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full ${item.style.bg} ${item.style.border} border`}
                />
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Milestone Popup */}
      <AnimatePresence>
        {showMilestone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowMilestone(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative glass-card glow-border p-8 max-w-md text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowMilestone(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Sparkles */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {Array.from({ length: 12 }).map((_, i) => {
                  const baseSeed = i + 1;
                  const left = 20 + pseudoRandom(baseSeed) * 60;
                  const top = 10 + pseudoRandom(baseSeed + 50) * 80;
                  const delay = pseudoRandom(baseSeed + 100);

                  return (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${left}%`,
                        top: `${top}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay,
                      }}
                    >
                      <Sparkles className="w-4 h-4 text-primary" />
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-6xl mb-4">🚀</div>
                <h2 className="text-2xl font-bold mb-2">
                  Hey! You will be <span className="text-gradient">successful!</span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  {motivationalQuotes[currentNode % motivationalQuotes.length]}
                </p>
                <Button onClick={() => setShowMilestone(false)} className="glow-border">
                  Keep Going! 🔥
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Consistency;
