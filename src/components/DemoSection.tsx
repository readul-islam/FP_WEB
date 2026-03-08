import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Send, ChevronLeft, ChevronRight } from "lucide-react";

const DemoSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    distraction: "",
  });
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentMonth] = useState(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData, "Date:", selectedDate);
  };

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleString("default", { month: "long" });
  const year = currentMonth.getFullYear();

  // Available slots (mock data)
  const availableSlots = [3, 5, 7, 10, 12, 14, 17, 19, 21, 24, 26, 28];

  return (
    <section id="demo" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

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
            Get Started
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Book a <span className="text-gradient">Demo</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See FocusPilot in action and discover how it can transform your workflow.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Select a Date</h3>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <span className="font-semibold">
                {monthName} {year}
              </span>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs text-muted-foreground py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty cells for days before the 1st */}
              {[...Array(firstDay)].map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {/* Days of the month */}
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const isAvailable = availableSlots.includes(day);
                const isSelected = selectedDate === day;

                return (
                  <motion.button
                    key={day}
                    onClick={() => isAvailable && setSelectedDate(day)}
                    disabled={!isAvailable}
                    className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-all duration-300 ${
                      isSelected
                        ? "bg-primary text-primary-foreground glow-border"
                        : isAvailable
                        ? "bg-muted/50 hover:bg-primary/20 hover:text-primary cursor-pointer"
                        : "text-muted-foreground/30 cursor-not-allowed"
                    }`}
                    whileHover={isAvailable ? { scale: 1.1 } : {}}
                    whileTap={isAvailable ? { scale: 0.95 } : {}}
                  >
                    {day}
                  </motion.button>
                );
              })}
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-6 pt-6 border-t border-white/10"
              >
                <p className="text-sm text-muted-foreground mb-3">
                  Available times for {monthName} {selectedDate}:
                </p>
                <div className="flex flex-wrap gap-2">
                  {["10:00 AM", "2:00 PM", "4:00 PM"].map((time) => (
                    <button
                      key={time}
                      className="px-4 py-2 text-sm rounded-lg bg-muted/50 hover:bg-primary/20 hover:text-primary transition-colors"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8"
          >
            <h3 className="text-xl font-semibold mb-6">Tell Us About You</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Developer"
                  className="input-glass w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john@company.com"
                  className="input-glass w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Biggest Distraction
                </label>
                <textarea
                  value={formData.distraction}
                  onChange={(e) =>
                    setFormData({ ...formData, distraction: e.target.value })
                  }
                  placeholder="Social media, Slack notifications, YouTube..."
                  rows={4}
                  className="input-glass w-full resize-none"
                />
              </div>

              <motion.button
                type="submit"
                className="btn-primary-glow w-full py-4 rounded-xl flex items-center justify-center gap-2 font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5" />
                Request Demo
              </motion.button>

              <p className="text-xs text-muted-foreground text-center">
                We'll respond within 24 hours. No spam, ever.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;