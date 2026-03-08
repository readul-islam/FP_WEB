import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does the hard-lock work?",
      answer:
        "When you schedule a focus session, FocusPilot activates a hard-lock on your browser and apps. It doesn't just block distracting sites — it actively redirects you back to your designated workspace. The lock is time-based and cannot be bypassed until your session completes, ensuring maximum productivity.",
    },
    {
      question: "Can I use my own voice for nudges?",
      answer:
        "Yes! With the Empire Pro plan, you can record custom voice prompts that play when you're about to context-switch. Many users find that hearing their own voice or a loved one's voice is more effective than generic alerts. You can record up to 10 custom nudges.",
    },
    {
      question: "Is the real-tree donation included in the Pro plan?",
      answer:
        "Absolutely! Every Empire Pro subscriber gets unlimited real-tree donations through our partnership with Trees for the Future. For every 25-minute focused session you complete, we plant a real tree in your name. Pro users have collectively planted over 50,000 trees!",
    },
    {
      question: "What platforms are supported?",
      answer:
        "FocusPilot works across all major platforms. Our Chrome extension integrates with your browser, and we have native apps for iOS and Android. We also offer deep integrations with VS Code, GitHub, and popular learning platforms like W3Schools.",
    },
    {
      question: "Can I try FocusPilot before subscribing?",
      answer:
        "Yes! Our Seed (Free) tier gives you access to the basic focus timer, the Forest theme, and standard web blocking. It's a great way to experience the FocusPilot difference before upgrading to Empire Pro for advanced features.",
    },
  ];

  return (
    <section className="py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to know about FocusPilot
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card border border-white/10 rounded-xl px-6 data-[state=open]:ring-1 data-[state=open]:ring-primary/50"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
