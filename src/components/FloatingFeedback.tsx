import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Angry, Frown, Meh, Smile, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const FloatingFeedback = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPulse, setShowPulse] = useState(false);

  // Pulse animation every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowPulse(true);
      setTimeout(() => setShowPulse(false), 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const emojis = [
    { icon: Angry, label: "Angry", color: "text-red-500" },
    { icon: Frown, label: "Sad", color: "text-orange-500" },
    { icon: Meh, label: "Neutral", color: "text-yellow-500" },
    { icon: Smile, label: "Happy", color: "text-emerald-500" },
    { icon: Heart, label: "Love it!", color: "text-pink-500" },
  ];

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsOpen(false);
      setSelectedEmoji(null);
      setFeedback("");
    }, 2500);
  };

  return (
    <>
      {/* Floating Button - Vertical */}
      <motion.button
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 glass-card border-r-0 rounded-r-none px-2 py-6 flex flex-col items-center gap-2 glow-border"
        onClick={() => setIsOpen(true)}
        initial={{ x: 10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ x: -5, boxShadow: "0 0 30px rgba(59,130,246,0.4)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <MessageCircle className="w-5 h-5 text-primary" />
        <span 
          className="text-sm font-medium text-foreground"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
        >
          Feedback
        </span>
        
        {/* Pulse Effect */}
        <AnimatePresence>
          {showPulse && (
            <motion.div
              className="absolute inset-0 rounded-l-xl bg-primary/30"
              initial={{ opacity: 0.5, scale: 1 }}
              animate={{ opacity: 0, scale: 1.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Feedback Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="glass-card border-white/10 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              How's your experience?
            </DialogTitle>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 pt-4"
              >
                {/* Emoji Selection */}
                <div className="flex justify-center gap-4">
                  {emojis.map((emoji, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedEmoji(index)}
                      className={`p-3 rounded-xl transition-all ${
                        selectedEmoji === index
                          ? "bg-primary/20 ring-2 ring-primary"
                          : "bg-muted/50 hover:bg-muted"
                      }`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <emoji.icon
                        className={`w-8 h-8 ${
                          selectedEmoji === index ? emoji.color : "text-muted-foreground"
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>

                {/* Feedback Text */}
                <div>
                  <Textarea
                    placeholder="Tell us what's on your mind..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[120px] bg-muted/30 border-white/10 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={selectedEmoji === null}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Submit Feedback
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center"
              >
                {/* Confetti Animation */}
                <div className="relative">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute left-1/2 top-0 w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"][
                          i % 5
                        ],
                      }}
                      initial={{ x: 0, y: 0, opacity: 1 }}
                      animate={{
                        x: (Math.random() - 0.5) * 200,
                        y: (Math.random() - 0.5) * 200,
                        opacity: 0,
                        scale: [1, 1.5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "easeOut",
                        delay: i * 0.02,
                      }}
                    />
                  ))}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10, delay: 0.2 }}
                    className="text-6xl mb-4"
                  >
                    🎉
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                <p className="text-muted-foreground">
                  Your feedback helps us improve FocusPilot
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingFeedback;
