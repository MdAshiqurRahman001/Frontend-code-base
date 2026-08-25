/**
 * ==============================================================================
 * 📌 CORE FEATURES SECTION
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * Explains the 4 main value pillars of DevHub Studio with rich visual cards.
 * ==============================================================================
 */

"use client";

import {
  ShieldCheck,
  FolderKanban,
  CreditCard,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    id: "escrow",
    title: "Automated Milestone Escrow",
    description:
      "Eliminate payment disputes with programmatic milestone escrows. Funds are securely locked and automatically released upon client review and deliverable sign-off.",
    icon: ShieldCheck,
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    badge: "100% Guaranteed",
    points: [
      "Multi-stage milestone release locks",
      "One-click client approval triggers",
      "Automated dispute arbitration",
    ],
    link: "/dashboard/projects",
  },
  {
    id: "creators",
    title: "Global Creator Directory & Vetting",
    description:
      "Access pre-vetted video editors, 3D artists, UI designers, and copywriters. Review verified portfolios, completion rates, and client reviews.",
    icon: FolderKanban,
    color: "bg-purple-50 text-purple-600 border-purple-100",
    badge: "Pre-Screened",
    points: [
      "Detailed skill & role classifications",
      "Creator status & suspension controls",
      "Historical project track records",
    ],
    link: "/dashboard/admin/users",
  },
  {
    id: "finance",
    title: "Financial Ledger & Bank Routing",
    description:
      "Centralized transaction tracking with support for instant creator withdrawals, direct bank wires, invoice PDF generation, and automated accounting sync.",
    icon: CreditCard,
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    badge: "Instant Dispatches",
    points: [
      "TanStack data tables with CSV exports",
      "One-click creator withdrawal review",
      "Real-time revenue curves & metrics",
    ],
    link: "/dashboard/payouts",
  },
  {
    id: "collaboration",
    title: "Real-Time Chat & Deliverable Vault",
    description:
      "Direct in-app messaging with real-time WebSocket connectivity. Share high-res video assets, revisions, Figma files, and delivery packages seamlessly.",
    icon: MessageSquare,
    color: "bg-sky-50 text-sky-600 border-sky-100",
    badge: "Live Streams",
    points: [
      "Instant direct messaging & threads",
      "Online status & unread counters",
      "Integrated file uploader & vault",
    ],
    link: "/dashboard/messages",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-4 border border-indigo-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enterprise-Grade Feature Suite</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Everything Required to Scale Creative Production
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Replace fragmented spreadsheets, chat apps, and manual PayPal transfers with a single unified platform.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat) => (
            <div
              key={feat.id}
              className="p-8 bg-slate-50/70 hover:bg-white rounded-3xl border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${feat.color}`}
                  >
                    <feat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 bg-white rounded-full border border-slate-200 text-slate-700 shadow-2xs">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-3">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                  {feat.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-200/60 mb-8">
                  {feat.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={feat.link}
                className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors pt-2 group"
              >
                <span>Explore module in dashboard demo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
