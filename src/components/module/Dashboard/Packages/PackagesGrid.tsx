"use client";

import { DemoPackage } from "@/constants/demoData";
import { Button } from "@/components/ui/button";
import { Check, DollarSign, Eye, Trash2 } from "lucide-react";

interface PackagesGridProps {
  packages: DemoPackage[];
  onSelectPackage: (pkg: DemoPackage) => void;
  onDeletePackage: (id: number) => void;
}

export default function PackagesGrid({
  packages,
  onSelectPackage,
  onDeletePackage,
}: PackagesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <div
          key={pkg.id}
          className="p-6 bg-white rounded-3xl border border-slate-100 shadow-2xs hover:shadow-md hover:border-slate-200 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-extrabold text-lg text-slate-800">{pkg.name}</h3>
                <span className="text-xs font-semibold text-slate-400 capitalize">
                  Billed {pkg.billingPeriod}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-1 my-4">
              <span className="text-3xl font-black text-slate-900">${pkg.price}</span>
              <span className="text-xs font-semibold text-slate-400">
                / {pkg.billingPeriod === "monthly" ? "mo" : "yr"}
              </span>
            </div>

            <div className="space-y-2.5 my-6 border-t border-slate-50 pt-4">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Features Included:
              </p>
              {pkg.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                  <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-4 border-t border-slate-50">
            <Button
              onClick={() => onSelectPackage(pkg)}
              variant="outline"
              size="sm"
              className="flex-1 text-xs font-semibold h-9 rounded-xl cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 mr-1.5" /> Details
            </Button>
            <Button
              onClick={() => onDeletePackage(pkg.id)}
              variant="ghost"
              size="sm"
              className="h-9 px-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
