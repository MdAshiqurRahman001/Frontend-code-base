"use client";

import { DemoPackage } from "@/constants/demoData";
import { Button } from "@/components/ui/button";
import { Check, CreditCard } from "lucide-react";

interface SubscriptionPlanCardsProps {
  packages: DemoPackage[];
  activePlanId: number;
  onSubscribe: (pkg: DemoPackage) => void;
}

export default function SubscriptionPlanCards({
  packages,
  activePlanId,
  onSubscribe,
}: SubscriptionPlanCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
      {packages.map((pkg) => {
        const isCurrent = activePlanId === pkg.id;

        return (
          <div
            key={pkg.id}
            className={`relative p-6 rounded-3xl border bg-white flex flex-col justify-between transition-all duration-300 ${
              isCurrent
                ? "border-indigo-600 ring-2 ring-indigo-600/10 shadow-lg shadow-indigo-100"
                : "border-slate-100 hover:border-slate-200 hover:shadow-md"
            }`}
          >
            {isCurrent && (
              <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                Your Active Plan
              </span>
            )}

            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{pkg.name}</h3>
                  <p className="text-xs text-slate-400 capitalize">
                    Billed {pkg.billingPeriod}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                  <CreditCard className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-baseline gap-1 my-4">
                <span className="text-4xl font-extrabold text-slate-900">
                  ${pkg.price}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  / {pkg.billingPeriod === "monthly" ? "month" : "year"}
                </span>
              </div>

              <div className="space-y-2.5 my-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Included Features:
                </p>
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-600">
                    <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-600">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-50">
              <Button
                onClick={() => onSubscribe(pkg)}
                disabled={isCurrent}
                className={`w-full py-5 rounded-xl font-semibold text-xs cursor-pointer ${
                  isCurrent
                    ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border border-emerald-200"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                {isCurrent ? "Active Plan ✓" : `Upgrade to ${pkg.name}`}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
