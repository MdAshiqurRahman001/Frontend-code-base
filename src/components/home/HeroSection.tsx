/**
 * ==============================================================================
 * 📌 STARTER PACK HERO (src/components/home/HeroSection.tsx)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * The main banner introducing the Next.js 16 + Redux Starter Pack.
 * ==============================================================================
 */

"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Terminal,
  LayoutDashboard,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-indigo-500/15 to-violet-500/15 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* 1. Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-6 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Next.js 16 + Redux Toolkit + RTK Query + Tailwind Starter</span>
        </div>

        {/* 2. Headline */}
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight max-w-3xl leading-[1.15] mb-5">
          The Ultimate Frontend Starter Pack for{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 bg-clip-text text-transparent">
            Modern Web Apps
          </span>
        </h1>

        {/* 3. Subtitle */}
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
          A clean, beginner-friendly architecture pre-configured with authentication, RTK Query API slices, form validations, TanStack data tables, and an executive dashboard.
        </p>

        {/* 4. Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 mb-12">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md shadow-indigo-500/20 transition-all hover:-translate-y-0.5"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Open Dashboard Demo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="#quickstart"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm px-6 py-3.5 rounded-xl border border-slate-200 shadow-2xs transition-all"
          >
            <Terminal className="w-4 h-4 text-slate-500" />
            <span>Quickstart Guide</span>
          </Link>
        </div>

        {/* 5. Feature Highlights Pills */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-slate-500 mb-14">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>TypeScript Ready</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Dual-Mode API & Fallbacks</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Zod Form System</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Zero Build Errors</span>
          </div>
        </div>

        {/* 6. Dashboard Preview Card */}
        <div className="w-full max-w-4xl rounded-2xl p-3 bg-gradient-to-b from-slate-100 to-white border border-slate-200 shadow-xl text-left">
          {/* Card Top Window Controls */}
          <div className="flex items-center justify-between px-3 py-2 bg-slate-900 rounded-xl text-slate-300 text-xs mb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <span className="text-[11px] font-mono text-slate-400">src/app/(dashboardLayout)/dashboard/page.tsx</span>
            <span className="text-[10px] font-bold text-indigo-400">STARTER PREVIEW</span>
          </div>

          {/* Quick Mock Dashboard Stats */}
          <div className="bg-white rounded-xl p-5 border border-slate-100">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { title: "Total Users", val: "8,640", sub: "+12% this month", color: "text-indigo-600" },
                { title: "Total Revenue", val: "$124,580", sub: "+18.2% growth", color: "text-emerald-600" },
                { title: "Active Sessions", val: "1,420", sub: "Live right now", color: "text-sky-600" },
                { title: "Server Health", val: "99.9%", sub: "All systems OK", color: "text-purple-600" },
              ].map((s, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[11px] font-bold text-slate-400">{s.title}</p>
                  <p className={`text-lg font-black ${s.color} mt-0.5`}>{s.val}</p>
                  <p className="text-[10px] text-slate-500">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
