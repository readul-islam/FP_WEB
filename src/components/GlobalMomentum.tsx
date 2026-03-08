import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Users, Clock, Zap, Globe } from "lucide-react";

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const GlobalMomentum = () => {
  const [activeUsers, setActiveUsers] = useState(4281);
  const [totalHours, setTotalHours] = useState(1247832);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers((prev) => prev + Math.floor(Math.random() * 5) - 2);
      setTotalHours((prev) => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Generate global heatmap dots deterministically to avoid hydration mismatches
  const globalDots = useMemo(() => {
    const dots: Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      intensity: number;
      delay: number;
    }> = [];
    for (let i = 0; i < 200; i++) {
      const baseSeed = i * 10 + 1;
      dots.push({
        id: i,
        x: pseudoRandom(baseSeed) * 100,
        y: pseudoRandom(baseSeed + 1) * 100,
        size: pseudoRandom(baseSeed + 2) * 4 + 2,
        intensity: pseudoRandom(baseSeed + 3),
        delay: pseudoRandom(baseSeed + 4) * 2,
      });
    }
    return dots;
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M+";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K+";
    return num.toString();
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
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
            <Globe className="w-4 h-4 inline mr-2" />
            Global Momentum
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Join the <span className="text-gradient">Global Movement</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Thousands of developers building their empires right now
          </p>
        </motion.div>

        {/* Global Visualization */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="glass-card rounded-2xl overflow-hidden aspect-video relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* World map dots */}
            <div className="absolute inset-0">
              {globalDots.map((dot) => (
                <motion.div
                  key={dot.id}
                  className="absolute rounded-full"
                  style={{
                    left: `${dot.x}%`,
                    top: `${dot.y}%`,
                    width: dot.size,
                    height: dot.size,
                    backgroundColor: `hsl(217, 91%, ${50 + dot.intensity * 20}%)`,
                    boxShadow: `0 0 ${dot.size * 2}px hsl(217, 91%, 60%)`,
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 2 + pseudoRandom(dot.id + 100) * 2,
                    delay: dot.delay,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>

            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              {Array.from({ length: 20 }).map((_, i) => {
                const baseSeed = i * 20 + 1;
                const x1 = pseudoRandom(baseSeed) * 100;
                const y1 = pseudoRandom(baseSeed + 1) * 100;
                const x2 = pseudoRandom(baseSeed + 2) * 100;
                const y2 = pseudoRandom(baseSeed + 3) * 100;
                return (
                  <motion.line
                    key={i}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke="hsl(217, 91%, 60%)"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: i * 0.1 }}
                  />
                );
              })}
            </svg>

            {/* Center glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-32 h-32 rounded-full bg-primary/20 blur-3xl"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Live Ticker */}
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Active Users */}
            <div className="glass-card px-8 py-4 rounded-xl flex items-center gap-4">
              <div className="relative">
                <Users className="w-6 h-6 text-primary" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div>
                <motion.p
                  key={activeUsers}
                  className="text-2xl font-bold text-foreground"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  {activeUsers.toLocaleString()}
                </motion.p>
                <p className="text-sm text-muted-foreground">Pilots in Build Mode</p>
              </div>
            </div>

            {/* Total Hours */}
            <div className="glass-card px-8 py-4 rounded-xl flex items-center gap-4">
              <Clock className="w-6 h-6 text-primary" />
              <div>
                <motion.p
                  key={totalHours}
                  className="text-2xl font-bold text-foreground"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  {formatNumber(totalHours)}
                </motion.p>
                <p className="text-sm text-muted-foreground">Total Hours Logged</p>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="glass-card px-8 py-4 rounded-xl flex items-center gap-4">
              <Zap className="w-6 h-6 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-foreground">98.7%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GlobalMomentum;
