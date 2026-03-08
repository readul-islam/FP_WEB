import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Timer, Flame, TrendingUp, Clock, Zap, Trophy } from "lucide-react";

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const CommandCenter = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

  // Generate heatmap data deterministically to avoid hydration mismatches
  const heatmapData = useMemo(() => {
    const data: { week: number; day: number; intensity: number }[] = [];
    for (let week = 0; week < 12; week++) {
      for (let day = 0; day < 7; day++) {
        const seed = week * 7 + day + 1;
        const intensity = pseudoRandom(seed);
        data.push({
          week,
          day,
          intensity,
        });
      }
    }
    return data;
  }, []);

  // Building animation for empire growth
  const BuildingVisualization = () => (
    <div className="relative h-32 flex items-end justify-center gap-1">
      {[0.4, 0.6, 0.9, 0.7, 0.85, 0.5, 0.75].map((height, i) => (
        <motion.div
          key={i}
          className="w-4 bg-gradient-to-t from-primary/40 to-primary rounded-t relative overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: `${height * 100}%` }}
          transition={{ duration: 1, delay: i * 0.1 }}
        >
          {/* Window lights */}
          <div className="absolute inset-0 flex flex-col gap-1 p-0.5">
            {Array.from({ length: Math.floor(height * 8) }).map((_, j) => (
              <motion.div
                key={j}
                className="w-1.5 h-1 bg-yellow-300/60 rounded-sm mx-auto"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, delay: (i + j) * 0.2, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>
      ))}
      {/* Glow effect */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-8 bg-primary/30 blur-xl rounded-full" />
    </div>
  );

  // Voice wave animation
  const VoiceWaveAnimation = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-full rounded-full border border-primary/30"
          animate={{
            scale: [1, 1.5 + i * 0.3],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full glass-card text-primary text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Zap className="w-4 h-4 inline mr-2" />
            Command Center
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Take Command of Your <span className="text-gradient">Empire</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your mission control for productivity. Track, analyze, and conquer.
          </p>
        </motion.div>

        {/* 3D Dashboard Container */}
        <motion.div
          style={{ rotateX, scale, opacity }}
          className="perspective-1000"
        >
          <div className="relative max-w-5xl mx-auto">
            {/* Browser Frame */}
            <div className="glass-card p-1 rounded-2xl glow-border">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-muted/50 rounded-md px-4 py-1 text-xs text-muted-foreground flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500/60" />
                    app.focuspilot.io/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 bg-background/80 rounded-b-xl">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Main Timer */}
                  <div className="lg:col-span-1">
                    <div className="glass-card p-6 rounded-xl h-full flex flex-col items-center justify-center relative">
                      <h3 className="text-sm font-medium text-muted-foreground mb-4">Focus Timer</h3>
                      
                      {/* Timer Circle */}
                      <div className="relative w-40 h-40">
                        <VoiceWaveAnimation />
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="hsl(var(--muted))"
                            strokeWidth="8"
                            fill="none"
                          />
                          <motion.circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="hsl(var(--primary))"
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={440}
                            initial={{ strokeDashoffset: 440 }}
                            animate={{ strokeDashoffset: 110 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="drop-shadow-[0_0_10px_hsl(var(--primary))]"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold text-foreground">25:00</span>
                          <span className="text-xs text-primary">IN FOCUS</span>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <motion.button
                          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Pause
                        </motion.button>
                        <motion.button
                          className="px-4 py-2 rounded-lg glass-card text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Reset
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Center - Heatmap & Empire */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Personal Heatmap */}
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Your Consistency</h3>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 12 }).map((_, weekIdx) => (
                          <div key={weekIdx} className="flex flex-col gap-0.5">
                            {heatmapData
                              .filter((d) => d.week === weekIdx)
                              .map((cell, dayIdx) => (
                                <motion.div
                                  key={dayIdx}
                                  className="w-3 h-3 rounded-sm"
                                  style={{
                                    backgroundColor: `hsl(217, 91%, ${30 + cell.intensity * 30}%)`,
                                    boxShadow: cell.intensity > 0.6 ? `0 0 6px hsl(217, 91%, 60%)` : "none",
                                  }}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: (weekIdx * 7 + dayIdx) * 0.01 }}
                                />
                              ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Empire Growth */}
                    <div className="glass-card p-4 rounded-xl">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Empire Growth</h3>
                      <BuildingVisualization />
                    </div>
                  </div>

                  {/* Stats Sidebar */}
                  <div className="lg:col-span-1 space-y-4">
                    {[
                      { icon: Clock, label: "Total Focus Hours", value: "247h", color: "text-primary" },
                      { icon: Flame, label: "Current Streak", value: "14 days", color: "text-orange-500" },
                      { icon: Trophy, label: "Empire Level", value: "Gold III", color: "text-yellow-500" },
                      { icon: TrendingUp, label: "Weekly Progress", value: "+23%", color: "text-green-500" },
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        className="glass-card p-4 rounded-xl flex items-center gap-4"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className={`p-2 rounded-lg bg-muted/50 ${stat.color}`}>
                          <stat.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                          <p className="text-lg font-bold">{stat.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Reflection/Shadow */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-primary/10 blur-3xl rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommandCenter;
