/**
 * ==============================================================================
 * 📌 PRICING TIERS SECTION
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * Interactive pricing calculator with Monthly / Annual billing toggle (20% discount),
 * feature checklist breakdown, and direct signup links.
 * ==============================================================================
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, Zap, Crown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Starter Creator",
    description: "Ideal for freelance creators and boutique studios managing up to 3 active projects.",
    monthlyPrice: 29,
    annualPrice: 24,
    features: [
      "Up to 3 Active Project Escrows",
      "Standard Direct Bank Payouts",
      "10GB Deliverable Vault Storage",
      "Direct Client Chat & Messaging",
      "Standard Community Support",
    ],
    popular: false,
    cta: "Start Free 14-Day Trial",
    href: "/auth/signup?plan=starter",
  },
  {
    name: "Growth Agency",
    description: "For scaling agencies needing multi-seat collaboration, custom milestone terms, and prioritized payouts.",
    monthlyPrice: 79,
    annualPrice: 64,
    features: [
      "Unlimited Milestone Escrows",
      "Instant 24-Hour Bank Payouts",
      "100GB Deliverable Vault Storage",
      "Custom Contract & Milestones Terms",
      "Priority Live Chat Support",
      "CSV & Accounting Data Exports",
    ],
    popular: true,
    cta: "Launch Agency Plan",
    href: "/auth/signup?plan=growth",
  },
  {
    name: "Enterprise Studio",
    description: "Custom platform infrastructure, dedicated escrow arbitration, SLA guarantees, and API access.",
    monthlyPrice: 199,
    annualPrice: 159,
    features: [
      "Dedicated Escrow Officer & Arbitrator",
      "Same-Day Global Wire Transfers",
      "Unlimited Vault & 4K Video Streaming",
      "Custom REST API & Webhooks Access",
      "Dedicated 24/7 Account Manager",
      "Custom SLA & Compliance Reports",
    ],
    popular: false,
    cta: "Contact Enterprise Sales",
    href: "/dashboard/support",
  },
];

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-20 md:py-28 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-4 border border-indigo-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Predictable Pricing for High-Output Teams
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8">
            Start with our 14-day free trial. No credit card required. Upgrade, downgrade, or cancel anytime.
          </p>

          {/* Billing Switch Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 bg-white rounded-full border border-slate-200 shadow-2xs">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                !isAnnual
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                isAnnual
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
            return (
              <div
                key={tier.name}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  tier.popular
                    ? "bg-white border-2 border-indigo-600 shadow-xl shadow-indigo-500/10 lg:-translate-y-2"
                    : "bg-white border border-slate-200 shadow-sm hover:shadow-md"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[11px] font-black tracking-wider uppercase px-3.5 py-1 rounded-full shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-black text-slate-900">{tier.name}</h3>
                    {tier.popular ? (
                      <Zap className="w-5 h-5 text-indigo-600" />
                    ) : (
                      <Crown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  <div className="flex items-baseline gap-1 my-6 pb-6 border-b border-slate-100">
                    <span className="text-4xl sm:text-5xl font-black text-slate-900">
                      ${price}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      / month {isAnnual ? "(billed annually)" : ""}
                    </span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Included Capabilities:
                    </p>
                    {tier.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-500 stroke-[3] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={tier.href}
                  className={`w-full py-3.5 rounded-2xl text-xs font-bold text-center inline-flex items-center justify-center gap-2 transition-all ${
                    tier.popular
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/25"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200"
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
