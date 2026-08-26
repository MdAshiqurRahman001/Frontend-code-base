"use client";

import Link from "next/link";
import { Sparkles, FolderKanban, Users } from "lucide-react";

interface WelcomeBannerProps {
  fullName?: string | null;
}

export default function WelcomeBanner({ fullName }: WelcomeBannerProps) {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-800 p-8 text-white shadow-xl shadow-indigo-500/10">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-indigo-100 mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Production-Ready Starter Dashboard</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Welcome back, {fullName || "Admin"}! 👋
          </h1>
          <p className="text-indigo-100/80 text-sm mt-1 max-w-xl leading-relaxed">
            Here is your latest platform performance, pending creator payouts, and ongoing project updates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/projects"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:bg-indigo-50 transition-all text-sm"
          >
            <FolderKanban className="w-4 h-4" />
            View Projects
          </Link>
          <Link
            href="/dashboard/admin/users"
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white font-semibold px-4 py-2.5 rounded-xl border border-white/20 hover:bg-white/25 transition-all text-sm"
          >
            <Users className="w-4 h-4" />
            Manage Users
          </Link>
        </div>
      </div>
    </div>
  );
}
