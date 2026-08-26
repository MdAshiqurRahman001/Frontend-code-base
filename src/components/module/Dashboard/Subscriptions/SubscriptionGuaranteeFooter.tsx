"use client";

import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function SubscriptionGuaranteeFooter() {
  return (
    <div className="p-6 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-3xl border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        <ShieldCheck className="w-8 h-8 text-indigo-600 shrink-0" />
        <div>
          <h3 className="text-sm font-bold text-slate-800">
            100% Risk-Free Guarantee
          </h3>
          <p className="text-xs text-slate-500">
            Switch plans or cancel anytime with our 14-day refund window.
          </p>
        </div>
      </div>
      <Button
        onClick={() => toast.info("Contacting billing support...")}
        variant="outline"
        className="text-xs font-semibold rounded-xl shrink-0 cursor-pointer"
      >
        Contact Enterprise Sales
      </Button>
    </div>
  );
}
