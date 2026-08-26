"use client";

import { TrendingUp } from "lucide-react";

export default function AdminHeaderBanner() {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 p-6 text-white shadow-lg">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">Admin Panel</p>
          <h1 className="text-2xl font-bold">Overview Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Platform management and analytics</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
          <TrendingUp size={16} className="text-emerald-400" />
          <span className="text-sm text-white font-medium">Live Data</span>
        </div>
      </div>
    </div>
  );
}
