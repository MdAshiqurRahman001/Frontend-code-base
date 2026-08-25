/**
 * ==============================================================================
 * 📌 STARTER PACK FEATURES (src/components/home/FeaturesSection.tsx)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * Explains the 4 core boilerplate capabilities included in this starter pack.
 * ==============================================================================
 */

"use client";

import {
  Lock,
  Database,
  FormInput,
  LayoutDashboard,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Authentication & Route Protection",
    desc: "Complete auth flow including Sign In, Sign Up, OTP Verification, Password Recovery, JWT decoding, and Next.js 16 proxy route protection.",
    icon: Lock,
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    badge: "Auth Ready",
    points: [
      "JWT cookie storage & authSlice sync",
      "Protected dashboard route guard proxy",
      "Form validation with React Hook Form",
    ],
    link: "/auth/signin",
  },
  {
    title: "Dual-Mode RTK Query API Layer",
    desc: "Centralized baseApi configured with automatic Bearer token injection, cache tag invalidation, and seamless fallback to mock data when offline.",
    icon: Database,
    color: "bg-purple-50 text-purple-600 border-purple-100",
    badge: "API Slices",
    points: [
      "baseApi with automatic token header injection",
      "Cache tags (User, Auth, Analytics)",
      "Zero crash when backend is offline",
    ],
    link: "/dashboard",
  },
  {
    title: "Reusable Form Component System",
    desc: "Build forms in seconds using <NRForm>, <NRInput>, and <NRSelect> with Zod schema validation and error feedback.",
    icon: FormInput,
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    badge: "Zod Schema",
    points: [
      "Declarative Zod schema definition",
      "Automatic error messages below inputs",
      "Unified design system across all pages",
    ],
    link: "/dashboard/admin/users",
  },
  {
    title: "Responsive Admin Dashboard UI",
    desc: "Modular dashboard with collapsible sidebar, command palette search (Cmd+K), metric KPI cards, time-series charts, and TanStack data tables.",
    icon: LayoutDashboard,
    color: "bg-sky-50 text-sky-600 border-sky-100",
    badge: "Executive UI",
    points: [
      "Electric Indigo design system",
      "Interactive TanStack data table with search",
      "Mobile drawer navigation sheet",
    ],
    link: "/dashboard",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-3 border border-indigo-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready-to-Use Boilerplate</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Everything You Need Out of the Box
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2">
            No more repetitive setup. Start coding your application features immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="p-6 sm:p-8 bg-slate-50/60 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${feat.color}`}>
                    <feat.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-5">{feat.desc}</p>

                <div className="space-y-2 pt-3 border-t border-slate-200/50 mb-6">
                  {feat.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={feat.link}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <span>View live demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
