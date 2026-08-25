/**
 * ==============================================================================
 * 📌 PUBLIC HOME LANDING PAGE COMPONENT
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * The complete, executive public-facing marketing page assembled with:
 *  - HeroSection (dual CTAs, interactive floating dashboard mockup)
 *  - SocialProof (agency brand logos)
 *  - FeaturesSection (4-pillar value props)
 *  - ShowcaseSection (visual deliverables gallery)
 *  - PricingSection (monthly/annual toggle calculator)
 *  - TestimonialsSection (verified client quotes)
 *  - FaqSection (expandable interactive accordion)
 *  - CtaBanner (high-conversion closing card)
 * ==============================================================================
 */

"use client";

import HeroSection from "./HeroSection";
import SocialProof from "./SocialProof";
import FeaturesSection from "./FeaturesSection";
import ShowcaseSection from "./ShowcaseSection";
import PricingSection from "./PricingSection";
import TestimonialsSection from "./TestimonialsSection";
import FaqSection from "./FaqSection";
import CtaBanner from "./CtaBanner";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white flex flex-col">
      {/* 1. Hero with Dashboard Preview */}
      <HeroSection />

      {/* 2. Brand Logos Marquee */}
      <SocialProof />

      {/* 3. Core Value Pillars */}
      <FeaturesSection />

      {/* 4. Visual Deliverables Gallery */}
      <ShowcaseSection />

      {/* 5. Interactive Pricing Calculator */}
      <PricingSection />

      {/* 6. Client Testimonials & Social Proof */}
      <TestimonialsSection />

      {/* 7. Frequently Asked Questions */}
      <FaqSection />

      {/* 8. Closing Call to Action */}
      <CtaBanner />
    </main>
  );
}
