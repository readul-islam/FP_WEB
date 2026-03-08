import { motion } from "framer-motion";

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const ConsistencyGapSection = () => {
  // Generate heatmap data
  const weeks = 12;
  const daysPerWeek = 7;

  const generateBrokenHeatmap = () => {
    const data: Array<{ active: boolean; intensity: number }> = [];
    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < daysPerWeek; d++) {
        const seed = w * daysPerWeek + d + 1;
        // Sparse pattern with gaps, deterministic
        const activeRandom = pseudoRandom(seed);
        const intensityRandom = pseudoRandom(seed + 100);
        const active = activeRandom > 0.7;
        const intensity = active ? intensityRandom * 0.5 + 0.1 : 0;
        data.push({ active, intensity });
      }
    }
    return data;
  };

  const generateSuccessHeatmap = () => {
    const data: Array<{ active: boolean; intensity: number }> = [];
    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < daysPerWeek; d++) {
        const seed = w * daysPerWeek + d + 1;
        // Consistent high activity pattern, deterministic
        const activeRandom = pseudoRandom(seed + 200);
        const intensityRandom = pseudoRandom(seed + 300);
        const active = activeRandom > 0.15;
        const intensity = active ? intensityRandom * 0.5 + 0.5 : 0.2;
        data.push({ active, intensity });
      }
    }
    return data;
  };

  const brokenData = generateBrokenHeatmap();
  const successData = generateSuccessHeatmap();

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            The Problem
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Consistency <span className="text-gradient">Gap</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See the difference between scattered effort and focused momentum. Which
            developer are you?
          </p>
        </motion.div>

        {/* Heatmap Comparison */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Broken Consistency */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-warning animate-pulse" />
              <h3 className="text-xl font-semibold text-warning/90">
                Broken Consistency
              </h3>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Context switching, distractions, and broken focus sessions lead to
              fragmented progress.
            </p>

            {/* Heatmap Grid */}
            <div className="flex flex-wrap gap-1">
              {brokenData.map((cell, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.008,
                  }}
                  className="w-4 h-4 rounded-sm transition-all duration-300 hover:scale-125"
                  style={{
                    backgroundColor: cell.active
                      ? `rgba(239, 68, 68, ${cell.intensity})`
                      : "rgba(255, 255, 255, 0.03)",
                    border: cell.active
                      ? "1px solid rgba(239, 68, 68, 0.3)"
                      : "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                />
              ))}
            </div>

            {/* Stats */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-warning">23%</div>
                  <div className="text-xs text-muted-foreground">Consistency</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-warning">1.2h</div>
                  <div className="text-xs text-muted-foreground">Avg Focus</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-warning">47</div>
                  <div className="text-xs text-muted-foreground">Interruptions</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FocusPilot Momentum */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 glow-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <h3 className="text-xl font-semibold text-primary">
                FocusPilot Momentum
              </h3>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Protected flow states, scheduled deep work, and AI-powered focus
              creates unstoppable progress.
            </p>

            {/* Heatmap Grid */}
            <div className="flex flex-wrap gap-1">
              {successData.map((cell, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.008,
                  }}
                  className="w-4 h-4 rounded-sm transition-all duration-300 hover:scale-125"
                  style={{
                    backgroundColor: `rgba(59, 130, 246, ${cell.intensity})`,
                    border: "1px solid rgba(59, 130, 246, 0.3)",
                    boxShadow: cell.active
                      ? `0 0 8px rgba(59, 130, 246, ${cell.intensity * 0.5})`
                      : "none",
                  }}
                />
              ))}
            </div>

            {/* Stats */}
            <div className="mt-6 pt-6 border-t border-primary/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold glow-text">94%</div>
                  <div className="text-xs text-muted-foreground">Consistency</div>
                </div>
                <div>
                  <div className="text-2xl font-bold glow-text">4.5h</div>
                  <div className="text-xs text-muted-foreground">Avg Focus</div>
                </div>
                <div>
                  <div className="text-2xl font-bold glow-text">3</div>
                  <div className="text-xs text-muted-foreground">Interruptions</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConsistencyGapSection;