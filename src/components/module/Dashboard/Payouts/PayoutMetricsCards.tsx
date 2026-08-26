"use client";

import { Banknote, Check, ShieldAlert } from "lucide-react";

export default function PayoutMetricsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-4">
        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
          <Banknote className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-semibold">Pending Approval</p>
          <p className="text-xl font-bold text-slate-800">$10,570.00</p>
        </div>
      </div>

      <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-4">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
          <Check className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-semibold">Paid This Month</p>
          <p className="text-xl font-bold text-slate-800">$48,920.00</p>
        </div>
      </div>

      <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-4">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-semibold">Security Checks</p>
          <p className="text-xl font-bold text-slate-800">100% Verified</p>
        </div>
      </div>
    </div>
  );
}
