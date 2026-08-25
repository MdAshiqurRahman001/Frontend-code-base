/**
 * ==============================================================================
 * 📌 CLOSING CTA BANNER
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * High-conversion closing banner inspiring visitors to launch the demo or create an account.
 * ==============================================================================
 */

"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-800 p-8 sm:p-14 text-white shadow-2xl shadow-indigo-500/20 text-center flex flex-col items-center">
          {/* Subtle background radial pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 max-w-3xl flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-indigo-100 mb-6 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Ready to Supercharge Your Production?</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white">
              Start Managing Creative Projects & Escrow Payouts Today
            </h2>

            <p className="text-indigo-100/80 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
              Join thousands of creators, creative agencies, and global brands who rely on DevHub Studio for guaranteed escrow and high-output collaboration.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow-md hover:bg-indigo-50 transition-all hover:-translate-y-0.5"
              >
                <span>Launch Live Dashboard Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/auth/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-bold text-sm px-8 py-3.5 rounded-2xl border border-white/20 transition-all"
              >
                <span>Sign Up Free</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
