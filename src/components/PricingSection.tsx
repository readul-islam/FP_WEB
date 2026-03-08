import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Rocket, TreePine } from "lucide-react";

interface PricingSectionProps {
  onCheckout: () => void;
}

const PricingSection = ({ onCheckout }: PricingSectionProps) => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Seed",
      description: "Perfect for trying out FocusPilot",
      price: { monthly: 0, yearly: 0 },
      icon: <TreePine className="w-6 h-6" />,
      features: [
        "Basic Focus Timer",
        '"Forest" Theme only',
        "Standard Web Blocker",
        "Daily Stats",
        "Community Support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Empire",
      description: "For serious developers who ship",
      price: { monthly: 12, yearly: 99 },
      icon: <Rocket className="w-6 h-6" />,
      features: [
        "Everything in Seed",
        "All Themes (SaaS Empire, Cyberpunk)",
        "AI Voice Nudges (Anti-Jump)",
        "Scheduled Hard Locks (Auto-Navigator)",
        "VS Code & GitHub Integration",
        'Unlimited "Real Tree" Donations',
        "Priority Support",
      ],
      cta: "Join the Empire",
      popular: true,
    },
  ];

  return (
    <section id="pricing" className="py-32 section-gradient">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your <span className="text-gradient">Focus Level</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start free, upgrade when you're ready to dominate your productivity.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <span
            className={`text-sm transition-colors ${
              !isYearly ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
              isYearly ? "bg-primary" : "bg-muted"
            }`}
          >
            <motion.div
              className="absolute top-1 w-5 h-5 rounded-full bg-foreground"
              animate={{ left: isYearly ? "calc(100% - 24px)" : "4px" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span
            className={`text-sm transition-colors ${
              isYearly ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Yearly
          </span>
          {isYearly && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs bg-success/20 text-success px-2 py-1 rounded-full"
            >
              Save $45
            </motion.span>
          )}
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                className={`relative h-full rounded-2xl p-8 ${
                  plan.popular
                    ? "glass-card glow-border animate-pulse-glow"
                    : "glass-card-hover"
                }`}
                whileHover={{ y: -8 }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <motion.div
                      className="flex items-center gap-1.5 bg-primary px-4 py-1.5 rounded-full text-sm font-semibold text-primary-foreground"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-4 h-4" />
                      Most Popular
                    </motion.div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      plan.popular
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isYearly ? "yearly" : "monthly"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-baseline gap-1"
                    >
                      <span className="text-5xl font-bold">
                        ${isYearly ? plan.price.yearly : plan.price.monthly}
                      </span>
                      <span className="text-muted-foreground">
                        /{isYearly ? "year" : "mo"}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                  {plan.price.monthly > 0 && isYearly && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Just ${Math.round(plan.price.yearly / 12)}/mo billed
                      annually
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          plan.popular
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.button
                  onClick={plan.popular ? onCheckout : undefined}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "btn-primary-glow"
                      : "btn-glass hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-8 mt-12 text-muted-foreground text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span>14-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span>Cancel anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;