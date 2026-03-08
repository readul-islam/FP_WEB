import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

// Safe hook to get theme context, returns defaults during SSR
const useThemeSafe = () => {
  try {
    return useTheme();
  } catch {
    // Return safe defaults during SSR when ThemeProvider isn't available
    return {
      theme: "dark" as const,
      toggleTheme: () => {},
      setTheme: () => {},
    };
  }
};

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeSafe();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-muted/50 border border-white/10 flex items-center p-1 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Toggle Ball */}
      <motion.div
        className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow-lg"
        animate={{
          x: theme === "dark" ? 0 : 28,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {theme === "dark" ? (
          <Moon className="w-3 h-3 text-primary-foreground" />
        ) : (
          <Sun className="w-3 h-3 text-primary-foreground" />
        )}
      </motion.div>

      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <Moon className={`w-3 h-3 transition-opacity ${theme === "dark" ? "opacity-0" : "opacity-30"}`} />
        <Sun className={`w-3 h-3 transition-opacity ${theme === "dark" ? "opacity-30" : "opacity-0"}`} />
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
