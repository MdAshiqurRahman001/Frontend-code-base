"use client";

import HeroSection from "@/components/home/HeroSection";
import TechStackSection from "@/components/home/TechStackSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import QuickstartSection from "@/components/home/QuickstartSection";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomeModule() {
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
