import { motion } from "framer-motion";
import { Mic, Building2, Lock, Code, Github, BookOpen } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <AudioWaveAnimation />,
      title: "Focus Pilot",
      subtitle: "AI Voice Nudges",
      description:
        "Intelligent voice prompts that gently redirect you when you're about to context-switch. Anti-jump technology keeps you in the zone.",
      gradient: "from-primary/20 to-cyan-500/20",
    },
    {
      icon: <BuildingGrowthAnimation />,
      title: "SaaS Empire",
      subtitle: "Progress Visualization",
      description:
        "Watch your productivity empire grow with every focused session. Gamified metrics that make deep work addictive.",
      gradient: "from-emerald-500/20 to-primary/20",
    },
    {
      icon: <IntegrationIcons />,
      title: "Smart Lock",
      subtitle: "Deep Integrations",
      description:
        "Seamlessly integrates with VS Code, GitHub, and W3Schools. Scheduled hard locks keep you productive when it matters most.",
      gradient: "from-primary/20 to-violet-500/20",
    },
  ];

  return (
    <section id="features" className="py-32 section-gradient">
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
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to
            <br />
            <span className="text-gradient">Ship Faster</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful tools designed specifically for developers who want to reclaim
            their focus and build without interruption.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                className="glass-card-hover h-full p-8 flex flex-col"
                whileHover={{ y: -8 }}
              >
                {/* Icon Container */}
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}
                >
                  {feature.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{feature.title}</h3>
                  <p className="text-primary text-sm mb-4">{feature.subtitle}</p>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Audio Wave Animation Component
const AudioWaveAnimation = () => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-primary rounded-full"
          animate={{
            height: ["8px", "20px", "8px"],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Building Growth Animation Component
const BuildingGrowthAnimation = () => {
  return (
    <div className="flex items-end gap-1">
      {[12, 18, 14, 22, 16].map((height, i) => (
        <motion.div
          key={i}
          className="w-2 bg-gradient-to-t from-emerald-500 to-primary rounded-t"
          initial={{ height: 4 }}
          animate={{ height }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
};

// Integration Icons Component
const IntegrationIcons = () => {
  return (
    <div className="flex items-center gap-1">
      <motion.div
        whileHover={{ scale: 1.2 }}
        className="text-primary"
      >
        <Code className="w-5 h-5" />
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.2 }}
        className="text-primary"
      >
        <Github className="w-5 h-5" />
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.2 }}
        className="text-primary"
      >
        <BookOpen className="w-5 h-5" />
      </motion.div>
    </div>
  );
};

export default FeaturesSection;