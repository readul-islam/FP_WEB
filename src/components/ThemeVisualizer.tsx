import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Terminal, Building2 } from "lucide-react";

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const ThemeVisualizer = () => {
  const [activeTheme, setActiveTheme] = useState(0);

  const themes = [
    {
      id: "study",
      name: "Study Hall",
      description: "Calm & focused learning environment",
      icon: BookOpen,
      colors: {
        primary: "#10b981",
        secondary: "#34d399",
        bg: "from-emerald-900/30 to-emerald-950/50",
      },
      visual: <StudyHallVisual />,
    },
    {
      id: "dev",
      name: "Dev Den",
      description: "Terminal-inspired coding sanctuary",
      icon: Terminal,
      colors: {
        primary: "#3b82f6",
        secondary: "#60a5fa",
        bg: "from-blue-900/30 to-slate-950/50",
      },
      visual: <DevDenVisual />,
    },
    {
      id: "ceo",
      name: "CEO Suite",
      description: "Executive productivity command center",
      icon: Building2,
      colors: {
        primary: "#f59e0b",
        secondary: "#fbbf24",
        bg: "from-amber-900/30 to-slate-950/50",
      },
      visual: <CEOSuiteVisual />,
    },
  ];

  return (
    <section className="py-24 section-gradient overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Personalization
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your <span className="text-gradient">Workspace</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select a theme that matches your productivity style and watch your
            empire transform.
          </p>
        </motion.div>

        {/* Theme Switcher */}
        <div className="flex justify-center gap-4 mb-12">
          {themes.map((theme, index) => (
            <motion.button
              key={theme.id}
              onClick={() => setActiveTheme(index)}
              className={`relative px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                activeTheme === index
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <theme.icon className="w-5 h-5" />
              <span className="hidden sm:inline">{theme.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Visualization Area */}
        <motion.div
          className={`relative max-w-4xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br ${themes[activeTheme].colors.bg} border border-white/10`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTheme}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {themes[activeTheme].visual}
            </motion.div>
          </AnimatePresence>

          {/* Theme Badge */}
          <motion.div
            className="absolute top-4 left-4 px-4 py-2 rounded-lg glass-card text-sm font-medium"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {themes[activeTheme].name}
          </motion.div>

          {/* Description */}
          <motion.div
            className="absolute bottom-4 left-4 right-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm text-muted-foreground">
              {themes[activeTheme].description}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Study Hall Visual - Library style
const StudyHallVisual = () => (
  <div className="flex items-end gap-3 p-8">
    {Array.from({ length: 5 }).map((_, i) => {
      const height = 60 + pseudoRandom(i + 1) * 80;
      return (
        <motion.div
          key={i}
          className="w-12 rounded-t-sm bg-gradient-to-t from-emerald-600 to-emerald-400"
          initial={{ height: 0 }}
          animate={{ height }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        />
      );
    })}
    <motion.div
      className="absolute top-1/4 left-1/2 -translate-x-1/2"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <BookOpen className="w-16 h-16 text-emerald-400 opacity-50" />
    </motion.div>
  </div>
);

// Dev Den Visual - Server rack style
const DevDenVisual = () => (
  <div className="grid grid-cols-3 gap-4 p-8">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="h-20 rounded-lg bg-gradient-to-br from-blue-600/50 to-blue-800/50 border border-blue-400/30 flex items-center justify-center gap-1"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: i * 0.1 }}
      >
        {[...Array(3)].map((_, j) => (
          <motion.div
            key={j}
            className="w-2 h-2 rounded-full bg-blue-400"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: j * 0.2 }}
          />
        ))}
      </motion.div>
    ))}
  </div>
);

// CEO Suite Visual - Skyscraper style
const CEOSuiteVisual = () => (
  <div className="flex items-end justify-center gap-4 p-8">
    {[80, 120, 160, 140, 100].map((height, i) => (
      <motion.div
        key={i}
        className="w-16 rounded-t-sm relative overflow-hidden"
        style={{
          background: `linear-gradient(to top, #78350f, #f59e0b)`,
        }}
        initial={{ height: 0 }}
        animate={{ height }}
        transition={{ duration: 0.8, delay: i * 0.15 }}
      >
        {/* Windows */}
        <div className="absolute inset-1 grid grid-cols-2 gap-1">
          {Array.from({ length: Math.floor(height / 15) }).map((_, j) => {
            const delay = pseudoRandom(i * 100 + j + 1) * 2;
            return (
              <motion.div
                key={j}
                className="bg-amber-200/80 rounded-sm"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay,
                }}
              />
            );
          })}
        </div>
      </motion.div>
    ))}
  </div>
);

export default ThemeVisualizer;
