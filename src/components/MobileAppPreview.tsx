import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Star, Smartphone, Download } from "lucide-react";

const MobileAppPreview = () => {
  const appReviews = [
    {
      author: "CodeNinja_42",
      rating: 5,
      content: "The Lock Screen widget keeps me on track without even opening my phone!",
      platform: "App Store",
    },
    {
      author: "DevDreamer",
      rating: 5,
      content: "Best productivity app I've used. The mobile sync is flawless.",
      platform: "Google Play",
    },
    {
      author: "StartupSarah",
      rating: 5,
      content: "Voice nudges on mobile saved my deep work sessions. Game changer!",
      platform: "App Store",
    },
    {
      author: "BuilderBen",
      rating: 5,
      content: "Finally an app that respects focus time. The hard-lock is brilliant.",
      platform: "Google Play",
    },
  ];

  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimationControls();

  // Start animation on component mount
  useEffect(() => {
    controls.start({
      x: [0, -1200],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    });
  }, [controls]);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
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
            <Smartphone className="w-4 h-4 inline mr-2" />
            Mobile Experience
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your Empire, <span className="text-gradient">Anywhere</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay focused on the go with our powerful mobile apps
          </p>
        </motion.div>

        {/* Phone Mockups */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mb-16">
          {/* iPhone Mockup */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative w-64 h-[520px] rounded-[3rem] bg-gradient-to-b from-gray-800 to-gray-900 p-2 shadow-2xl">
              {/* Phone Frame */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-20" />
              
              {/* Screen */}
              <div className="w-full h-full rounded-[2.5rem] bg-background overflow-hidden relative">
                {/* Status Bar */}
                <div className="h-12 bg-card/80 flex items-center justify-between px-6">
                  <span className="text-xs text-muted-foreground">9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-2 bg-muted-foreground/50 rounded-sm" />
                    <div className="w-4 h-2 bg-muted-foreground/50 rounded-sm" />
                    <div className="w-6 h-3 bg-green-500/80 rounded-sm" />
                  </div>
                </div>

                {/* App Content */}
                <div className="p-6 flex flex-col items-center">
                  <p className="text-xs text-muted-foreground mb-4">FOCUS MODE</p>
                  
                  {/* Timer Ring */}
                  <div className="relative w-40 h-40 mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="hsl(var(--muted))"
                        strokeWidth="6"
                        fill="none"
                      />
                      <motion.circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="hsl(var(--primary))"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={440}
                        initial={{ strokeDashoffset: 440 }}
                        animate={{ strokeDashoffset: 150 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        style={{
                          filter: "drop-shadow(0 0 10px hsl(217, 91%, 60%))",
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold">18:42</span>
                      <span className="text-xs text-primary">remaining</span>
                    </div>
                    
                    {/* Glow effect */}
                    {[...Array(2)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full border border-primary/20"
                        animate={{
                          scale: [1, 1.2 + i * 0.1],
                          opacity: [0.5, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.5,
                          repeat: Infinity,
                        }}
                      />
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="glass-card p-3 rounded-xl text-center">
                      <p className="text-lg font-bold">14</p>
                      <p className="text-xs text-muted-foreground">Day Streak</p>
                    </div>
                    <div className="glass-card p-3 rounded-xl text-center">
                      <p className="text-lg font-bold">2.5h</p>
                      <p className="text-xs text-muted-foreground">Today</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge - App Store */}
            <motion.div
              className="absolute -left-8 top-1/4 glass-card px-4 py-2 rounded-full flex items-center gap-2"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Download className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">App Store</span>
            </motion.div>
          </motion.div>

          {/* Android Mockup */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative w-64 h-[520px] rounded-[2rem] bg-gradient-to-b from-gray-800 to-gray-900 p-2 shadow-2xl">
              {/* Screen */}
              <div className="w-full h-full rounded-[1.75rem] bg-background overflow-hidden relative">
                {/* Status Bar */}
                <div className="h-10 bg-card/80 flex items-center justify-between px-4">
                  <span className="text-xs text-muted-foreground">9:41</span>
                  <div className="flex gap-1 items-center">
                    <div className="w-3 h-3 border border-muted-foreground/50 rounded-full" />
                    <div className="w-4 h-2 bg-muted-foreground/50 rounded-sm" />
                  </div>
                </div>

                {/* Lock Screen Widget Preview */}
                <div className="p-4">
                  <div className="glass-card p-4 rounded-2xl mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-primary">FocusPilot</span>
                      <span className="text-xs text-muted-foreground">Widget</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <motion.div
                          className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                      <div>
                        <p className="font-bold">18:42</p>
                        <p className="text-xs text-muted-foreground">Deep Work Session</p>
                      </div>
                    </div>
                  </div>

                  {/* Today's Progress */}
                  <div className="glass-card p-4 rounded-2xl">
                    <p className="text-xs text-muted-foreground mb-3">TODAY'S PROGRESS</p>
                    <div className="flex justify-between items-end mb-2">
                      {[0.3, 0.5, 0.8, 0.6, 0.9, 0.7, 0.4].map((h, i) => (
                        <motion.div
                          key={i}
                          className="w-6 bg-primary/60 rounded-t"
                          initial={{ height: 0 }}
                          animate={{ height: `${h * 60}px` }}
                          transition={{ delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-center text-muted-foreground">2h 34m focused today</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge - Google Play */}
            <motion.div
              className="absolute -right-8 top-1/3 glass-card px-4 py-2 rounded-full flex items-center gap-2"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
            >
              <Download className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Google Play</span>
            </motion.div>
          </motion.div>
        </div>

        {/* App Store Reviews - Auto Scroll */}
        <div className="relative mt-16">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-6 py-4 cursor-pointer"
              animate={controls}
              initial={{ x: 0 }}
              onMouseEnter={() => {
                setIsPaused(true);
                controls.stop(); // Pauses the animation
              }}
              onMouseLeave={() => {
                setIsPaused(false);
                controls.start({
                  x: [null, -1200],
                  transition: {
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 30,
                      ease: "linear",
                    },
                  },
                });
              }}
            >
              {/* Render reviews 4 times for seamless loop */}
              {[...Array(4)].flatMap((_, setIndex) =>
                appReviews.map((review, idx) => (
                  <motion.div
                    key={`${setIndex}-${idx}`}
                    className="glass-card p-6 rounded-xl min-w-[300px] shrink-0"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    {/* Stars */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-500 fill-yellow-500"
                          style={{
                            filter: "drop-shadow(0 0 4px rgb(234 179 8 / 0.5))",
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">"{review.content}"</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-foreground">{review.author}</span>
                      <span className="text-xs text-primary">{review.platform}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppPreview;