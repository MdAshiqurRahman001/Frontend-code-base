/**
 * ==============================================================================
 * 📌 QUICKSTART SECTION (src/components/home/QuickstartSection.tsx)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * Step-by-step developer onboarding instructions for beginners.
 * ==============================================================================
 */

"use client";

import { Terminal, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const steps = [
  {
    step: "01",
    title: "Configure Environment",
    desc: "Copy `.env.example` to `.env` and set your backend API URL:",
    code: "cp .env.example .env",
  },
  {
    step: "02",
    title: "Install Dependencies",
    desc: "Install all packages cleanly with npm:",
    code: "npm install",
  },
  {
    step: "03",
    title: "Start Development Server",
    desc: "Run the Turbopack local development server:",
    code: "npm run dev",
  },
];

export default function QuickstartSection() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Copied command to clipboard!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section id="quickstart" className="py-16 md:py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-bold mb-3 border border-indigo-500/20">
            <Terminal className="w-3.5 h-3.5" />
            <span>Developer Quickstart</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Up and Running in 60 Seconds
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Follow these 3 simple steps to start customizing your app.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div
              key={s.step}
              className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-black text-indigo-400 block mb-2">
                  STEP {s.step}
                </span>
                <h3 className="font-extrabold text-base text-white mb-1">{s.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{s.desc}</p>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400">
                <span>{s.code}</span>
                <button
                  onClick={() => copyToClipboard(s.code)}
                  className="p-1.5 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition-colors"
                  title="Copy command"
                >
                  {copiedCode === s.code ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
