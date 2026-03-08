"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PersonaPainPoints from "@/components/PersonaPainPoints";
import CommandCenter from "@/components/CommandCenter";
import GlobalMomentum from "@/components/GlobalMomentum";
import ThemeVisualizer from "@/components/ThemeVisualizer";
import ConsistencyGapSection from "@/components/ConsistencyGapSection";
import MobileAppPreview from "@/components/MobileAppPreview";
import WallOfLove from "@/components/WallOfLove";
import PartnerMarquee from "@/components/PartnerMarquee";
import PricingSection from "@/components/PricingSection";
import DemoSection from "@/components/DemoSection";
import AuthModal from "@/components/AuthModal";
import CheckoutModal from "@/components/CheckoutModal";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import FloatingFeedback from "@/components/FloatingFeedback";

const Index = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar onAuthClick={() => setIsAuthOpen(true)} />
      <HeroSection />
      <FeaturesSection />
      <PersonaPainPoints />
      <CommandCenter />
      <GlobalMomentum />
      <ThemeVisualizer />
      <ConsistencyGapSection />
      <MobileAppPreview />
      <WallOfLove />
      <PartnerMarquee />
      <PricingSection onCheckout={() => setIsCheckoutOpen(true)} />
      <DemoSection />
      <FAQSection />
      <Footer />

      {/* Floating Feedback Button */}
      <FloatingFeedback />

      {/* Modals */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
};

export default Index;
