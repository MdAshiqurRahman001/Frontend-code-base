"use client";

import { DemoPackage } from "@/constants/demoData";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";

interface PackageDetailsModalProps {
  pkg: DemoPackage | null;
  onClose: () => void;
}

export default function PackageDetailsModal({
  pkg,
  onClose,
}: PackageDetailsModalProps) {
  if (!pkg) return null;

  return (
    <Dialog open={!!pkg} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800">
            {pkg.name}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Package breakdown and pricing overview
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 my-2 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl flex justify-between items-center">
            <span className="text-slate-500">Price Rate</span>
            <span className="font-extrabold text-lg text-slate-800">
              ${pkg.price} / {pkg.billingPeriod}
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl space-y-2">
            <span className="font-bold text-slate-700 block">
              Deliverables Checklist:
            </span>
            {pkg.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-600">
                <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer"
            onClick={onClose}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
