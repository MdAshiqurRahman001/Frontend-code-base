/**
 * ==============================================================================
 * 📌 PUBLIC WEB HOMEPAGE (src/components/home/Home.tsx)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * The main landing page showcasing the Next.js 16 + Redux Starter Pack.
 * ==============================================================================
 */

"use client";

import HeroSection from "./HeroSection";
import TechStackSection from "./TechStackSection";
import FeaturesSection from "./FeaturesSection";
import QuickstartSection from "./QuickstartSection";
import CtaBanner from "./CtaBanner";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white flex flex-col">
      {/* 1. Hero with Dashboard Preview */}
      <HeroSection />

      {/* 2. Tech Stack Grid */}
      <TechStackSection />

      {/* 3. Starter Boilerplate Features */}
      <FeaturesSection />

      {/* 4. Quickstart Guide */}
      <QuickstartSection />

      {/* 5. Closing CTA */}
      <CtaBanner />
    </main>
  );
}
