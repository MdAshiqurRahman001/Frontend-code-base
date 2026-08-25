/**
 * ==============================================================================
 * 📌 SOCIAL PROOF / BRAND MARQUEE
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * Displays logos of top client brands, creative studios, and partners.
 * ==============================================================================
 */

"use client";

import { Building2, Globe2, Sparkles, Hexagon, Shield, Zap } from "lucide-react";

const brands = [
  { name: "HyperScale Media", icon: Zap },
  { name: "StudioX Global", icon: Sparkles },
  { name: "InnovateLab", icon: Hexagon },
  { name: "Apex Creative", icon: Globe2 },
  { name: "Vector Studios", icon: Shield },
  { name: "Nova Capital", icon: Building2 },
];

export default function SocialProof() {
  return (
    <section className="py-12 border-y border-slate-100 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-8">
          Trusted by leading creative agencies, production studios & global brands
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors opacity-70 hover:opacity-100 cursor-default"
            >
              <brand.icon className="w-5 h-5 text-indigo-500" />
              <span className="text-xs font-extrabold tracking-tight text-slate-700">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
