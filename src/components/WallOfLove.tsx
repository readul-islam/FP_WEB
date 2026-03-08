import { motion } from "framer-motion";
import { Star, CheckCircle, Quote } from "lucide-react";

const WallOfLove = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Senior Developer @ Stripe",
      avatar: "SC",
      rating: 5,
      verified: true,
      content: "FocusPilot eliminated my tutorial hell. The hard-lock feature forced me to ship real code instead of watching endless videos.",
      size: "large",
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "CS Student, MIT",
      avatar: "MJ",
      rating: 5,
      verified: true,
      content: "Went from cramming to consistent daily study. My GPA jumped from 2.8 to 3.6 in one semester.",
      size: "medium",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Indie Hacker",
      avatar: "ER",
      rating: 5,
      verified: true,
      content: "The voice nudges saved my startup. No more context switching during deep work sessions.",
      size: "small",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Full-Stack Dev",
      avatar: "DK",
      rating: 5,
      verified: true,
      content: "The VS Code integration is chef's kiss. It knows when I'm in the zone and protects that flow state.",
      size: "medium",
    },
    {
      id: 5,
      name: "Aisha Patel",
      role: "Product Manager",
      avatar: "AP",
      rating: 5,
      verified: true,
      content: "Finally a productivity tool that actually works. The empire visualization keeps me motivated!",
      size: "small",
    },
    {
      id: 6,
      name: "Tom Anderson",
      role: "Founder, DevTools Inc",
      avatar: "TA",
      rating: 5,
      verified: true,
      content: "Implemented FocusPilot across our entire team. Productivity up 40%, meetings down 60%.",
      size: "large",
    },
  ];

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2";
      case "medium":
        return "md:col-span-1 md:row-span-2";
      default:
        return "md:col-span-1 md:row-span-1";
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
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
            <Quote className="w-4 h-4 inline mr-2" />
            Wall of Love
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by <span className="text-gradient">Builders</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of developers who transformed their productivity
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              className={`glass-card-hover p-6 rounded-xl ${getSizeClasses(review.size)}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{review.name}</span>
                      {review.verified && (
                        <CheckCircle className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{review.role}</span>
                  </div>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
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

              {/* Content */}
              <p className={`text-muted-foreground leading-relaxed ${review.size === "large" ? "text-lg" : "text-sm"}`}>
                "{review.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WallOfLove;
