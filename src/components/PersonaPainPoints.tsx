import { motion } from "framer-motion";
import { GraduationCap, Code2, Briefcase, ArrowRight } from "lucide-react";

const PersonaPainPoints = () => {
  const personas = [
    {
      icon: GraduationCap,
      title: "The Student",
      pain: "Stuck in Cramming Loops?",
      solution: "Micro-learning consistency beats 12-hour marathons.",
      gradient: "from-violet-500/20 to-primary/20",
      iconColor: "text-violet-400",
    },
    {
      icon: Code2,
      title: "The Developer",
      pain: "Trapped in Tutorial Hell?",
      solution: "Hard-lock your IDE. Grow your SaaS Empire while you ship real code.",
      gradient: "from-primary/20 to-cyan-500/20",
      iconColor: "text-primary",
    },
    {
      icon: Briefcase,
      title: "The Entrepreneur",
      pain: "Analysis Paralysis?",
      solution: "Voice-guided focus prevents context switching and boosts MRR growth.",
      gradient: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-400",
    },
  ];

  return (
    <section className="py-24 section-gradient">
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
            Your Struggles, Solved
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why You Are <span className="text-gradient">Stuck</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Different roles, same problem — inconsistent focus kills progress.
            Here's how FocusPilot fixes it for you.
          </p>
        </motion.div>

        {/* Persona Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {personas.map((persona, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <motion.div
                className="glass-card-hover h-full p-8 flex flex-col"
                whileHover={{ y: -8 }}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${persona.gradient} flex items-center justify-center mb-6`}
                >
                  <persona.icon className={`w-8 h-8 ${persona.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-4">{persona.title}</h3>

                {/* Pain Point */}
                <div className="mb-4">
                  <p className="text-red-400 font-medium text-lg mb-2">
                    {persona.pain}
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                    <p className="text-sm">{persona.solution}</p>
                  </div>
                </div>

                {/* CTA */}
                <motion.button
                  className="mt-auto pt-4 text-primary text-sm font-medium flex items-center gap-2 group"
                  whileHover={{ x: 5 }}
                >
                  See how it works
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonaPainPoints;
