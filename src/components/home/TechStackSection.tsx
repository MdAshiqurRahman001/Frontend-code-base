/**
 * ==============================================================================
 * 📌 TECH STACK SECTION (src/components/home/TechStackSection.tsx)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * Displays the modern, battle-tested technologies bundled in this starter pack.
 * ==============================================================================
 */

"use client";

import {
  Code2,
  Database,
  Palette,
  LayoutGrid,
  CheckSquare,
  Table,
  Layers,
} from "lucide-react";

const stack = [
  {
    name: "Next.js 16 (App Router)",
    desc: "Turbopack fast refresh, server & client components, layout grouping.",
    icon: Code2,
    badge: "Framework",
    color: "bg-black text-white",
  },
  {
    name: "Redux Toolkit & RTK Query",
    desc: "Centralized state management, API caching, and auto-revalidation tags.",
    icon: Database,
    badge: "State & API",
    color: "bg-purple-600 text-white",
  },
  {
    name: "Tailwind CSS & Design Tokens",
    desc: "Custom Electric Indigo color system, responsive utilities, and clean layouts.",
    icon: Palette,
    badge: "Styling",
    color: "bg-sky-500 text-white",
  },
  {
    name: "Shadcn UI & Radix Primitives",
    desc: "Accessible modals, dropdowns, sheets, badges, buttons, and alerts.",
    icon: LayoutGrid,
    badge: "Components",
    color: "bg-slate-800 text-white",
  },
  {
    name: "React Hook Form + Zod",
    desc: "Reusable <NRForm> wrapper with instant schema validation and error feedback.",
    icon: CheckSquare,
    badge: "Forms",
    color: "bg-indigo-600 text-white",
  },
  {
    name: "TanStack Table v8",
    desc: "Headless data table with sorting, pagination, filtering, and custom cells.",
    icon: Table,
    badge: "Data Grid",
    color: "bg-emerald-600 text-white",
  },
];

export default function TechStackSection() {
  return (
    <section id="stack" className="py-16 md:py-20 bg-slate-50/70 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-3 border border-indigo-100">
            <Layers className="w-3.5 h-3.5" />
            <span>Pre-Configured Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Bundled with Modern Best Practices
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2">
            Every library is cleanly configured and typed so you can focus on building features.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stack.map((item) => (
            <div
              key={item.name}
              className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:border-indigo-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-800 mb-1">{item.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
