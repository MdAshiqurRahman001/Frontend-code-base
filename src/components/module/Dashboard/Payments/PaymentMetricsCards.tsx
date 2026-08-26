"use client";

import { DollarSign, ArrowDownLeft, ReceiptText } from "lucide-react";

export default function PaymentMetricsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-4">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
          <DollarSign className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-semibold">Total Processed</p>
          <p className="text-xl font-bold text-slate-800">$124,580.00</p>
        </div>
      </div>

      <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-4">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
          <ArrowDownLeft className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-semibold">In Escrow</p>
          <p className="text-xl font-bold text-slate-800">$38,200.00</p>
        </div>
      </div>

      <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-4">
        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
          <ReceiptText className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-semibold">30-Day Volume</p>
          <p className="text-xl font-bold text-slate-800">421 Orders</p>
        </div>
      </div>
    </div>
  );
}
