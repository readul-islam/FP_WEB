import { motion } from "framer-motion";
import { Rocket, Github, Twitter, Linkedin, Check } from "lucide-react";
import FocusPilotLogo from "./FocusPilotLogo";

const Footer = () => {
  const links = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Demo", href: "#demo" },
      { label: "Roadmap", href: "#" },
    ],
    resources: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Community", href: "#" },
    ],
    company: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  };

  return (
    <footer className="border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.a
              href="#"
              className="flex items-center gap-2 group mb-4"
              whileHover={{ scale: 1.02 }}
            >
                <FocusPilotLogo variant="full" size={36} />
              {/* <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center glow-border">
                <Rocket className="w-5 h-5 text-primary" />
              </div> */}
              {/* <span className="text-xl font-bold">
                Focus<span className="text-primary">Pilot</span>
              </span> */}
            </motion.a>
            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              Your AI co-pilot for deep work. Stop context-switching, start
              shipping faster than ever before.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: <Github className="w-5 h-5" />, href: "#" },
                { icon: <Twitter className="w-5 h-5" />, href: "#" },
                { icon: <Linkedin className="w-5 h-5" />, href: "#" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 capitalize">{category}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 FocusPilot. All rights reserved.
          </p>

          {/* System Status */}
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-success/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-success"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs text-success font-medium">
              System Status: All Systems Operational
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;