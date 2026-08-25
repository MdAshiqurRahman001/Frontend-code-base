/**
 * ==============================================================================
 * 📌 HERO SECTION COMPONENT
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * The high-converting hero header for the landing page with badge, headline,
 * dual CTAs, and an interactive floating SaaS dashboard preview.
 * ==============================================================================
 */

"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  FolderKanban,
  CheckCircle2,
  DollarSign,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/15 to-purple-500/15 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* 1. Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-bold mb-6 shadow-2xs animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
          <span>Next-Generation Creator & Project Escrow Platform</span>
        </div>

        {/* 2. Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight max-w-4xl leading-[1.1] mb-6">
          Powering Creator Workflows &{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 bg-clip-text text-transparent">
            Guaranteed Milestone Escrow
          </span>
        </h1>

        {/* 3. Subtitle */}
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
          The all-in-one operating system for modern brands and creative agencies. Manage milestone deliverables, direct bank payouts, and client collaborations with zero friction.
        </p>

        {/* 4. Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 mb-14">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all hover:-translate-y-0.5"
          >
            <span>Explore Dashboard Demo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/auth/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm px-7 py-3.5 rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all"
          >
            <span>Create Free Account</span>
          </Link>
        </div>

        {/* 5. Trust Metrics Pills */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500 mb-16">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>100% Escrow Protection</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Instant Bank Payouts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>RTK Query Dynamic Ready</span>
          </div>
        </div>

        {/* 6. Interactive Dashboard Mockup Card with Floating Badges */}
        <div className="relative w-full max-w-5xl rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-indigo-100/60 via-slate-100/40 to-white border border-slate-200/80 shadow-2xl shadow-indigo-950/5">
          {/* Top Mockup Header Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 rounded-2xl text-slate-300 text-xs mb-3 shadow-inner">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>https://devhub-studio.app/dashboard</span>
            </div>
            <div className="w-12 text-right text-[10px] text-slate-400 font-bold">LIVE PREVIEW</div>
          </div>

          {/* Inner Mockup Body */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm text-left">
            {/* Mock Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-indigo-600">Enterprise Workspaces</span>
                <h2 className="text-xl font-extrabold text-slate-900">Project Milestone Overview</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold border border-emerald-100">
                  ● 3 Active Escrows
                </span>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold border border-indigo-100">
                  Escrow: $38,200.00
                </span>
              </div>
            </div>

            {/* Mock Content Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-500">Commercial Video 4K</span>
                  <span className="text-xs font-bold text-indigo-600">$4,500</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-2">
                  <div className="bg-indigo-600 h-full w-3/4 rounded-full" />
                </div>
                <p className="text-[11px] text-slate-400">Milestone 3 of 4 in progress</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-500">Brand Identity & 3D</span>
                  <span className="text-xs font-bold text-emerald-600">$2,800</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-2">
                  <div className="bg-emerald-500 h-full w-full rounded-full" />
                </div>
                <p className="text-[11px] text-emerald-600 font-semibold">Ready for final payout</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-500">UI/UX Mobile Redesign</span>
                  <span className="text-xs font-bold text-purple-600">$6,200</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-2">
                  <div className="bg-purple-600 h-full w-1/2 rounded-full" />
                </div>
                <p className="text-[11px] text-slate-400">Milestone 2 awaiting review</p>
              </div>
            </div>
          </div>

          {/* Floating Live Badge 1: Top Left */}
          <div className="hidden lg:flex absolute -top-4 -left-6 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xl items-center gap-3 animate-bounce duration-1000">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Escrow Released</p>
              <p className="text-sm font-extrabold text-slate-800">+$2,800.00</p>
            </div>
          </div>

          {/* Floating Live Badge 2: Bottom Right */}
          <div className="hidden lg:flex absolute -bottom-5 -right-6 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xl items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">30-Day Volume</p>
              <p className="text-sm font-extrabold text-slate-800">$124,580.00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
