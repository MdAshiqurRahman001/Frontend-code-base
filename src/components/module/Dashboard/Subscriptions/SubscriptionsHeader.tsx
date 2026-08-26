"use client";

import { Sparkles } from "lucide-react";

export default function SubscriptionsHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="p-3 bg-indigo-100 rounded-2xl">
        <Sparkles size={24} className="text-indigo-600" />
      </div>
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          Subscription & Creator Tiers
        </h1>
        <p className="text-sm text-slate-500">
          Choose the plan that fits your business needs. Upgrade or cancel anytime.
        </p>
      </div>
    </div>
  );
}
