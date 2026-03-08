import { motion } from "framer-motion";

const PartnerMarquee = () => {
  const partners = [
    { name: "GitHub", icon: "GH" },
    { name: "VS Code", icon: "VS" },
    { name: "Notion", icon: "N" },
    { name: "Slack", icon: "SL" },
    { name: "Linear", icon: "LN" },
    { name: "Figma", icon: "FG" },
    { name: "Vercel", icon: "VR" },
    { name: "Discord", icon: "DC" },
  ];

  // Double the array for seamless loop
  const doubledPartners = [...partners, ...partners];

  return (
    <section className="py-16 relative overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-6 mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center text-muted-foreground text-sm uppercase tracking-wider"
        >
          Trusted by teams at
        </motion.p>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling Content */}
        <motion.div
          className="flex gap-16 py-4"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {doubledPartners.map((partner, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-3 shrink-0 group cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center font-bold text-muted-foreground group-hover:text-primary group-hover:border-primary/50 transition-all duration-300">
                {partner.icon}
              </div>
              <span className="text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 whitespace-nowrap">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerMarquee;
