/**
 * ==============================================================================
 * 📌 STARTER PACK CTA BANNER (src/components/home/CtaBanner.tsx)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * Closing call to action banner inviting developers to explore the dashboard.
 * ==============================================================================
 */

"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, LayoutDashboard, Lock } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-800 p-8 sm:p-12 text-white shadow-xl shadow-indigo-500/10 text-center flex flex-col items-center">
          <div className="relative z-10 max-w-2xl flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-indigo-100 mb-4 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Production-Ready Starter Pack</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-3 text-white">
              Ready to Build Your Next Web App?
            </h2>

            <p className="text-indigo-100/80 text-xs sm:text-sm leading-relaxed mb-6 max-w-lg">
              Explore the pre-built dashboard, try out the authentication flows, or start customizing components directly.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-bold text-xs px-6 py-3 rounded-xl shadow-sm hover:bg-indigo-50 transition-all hover:-translate-y-0.5"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Launch Dashboard Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/auth/signin"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold text-xs px-6 py-3 rounded-xl border border-white/20 transition-all"
              >
                <Lock className="w-4 h-4" />
                <span>Sign In Demo</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
