"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface PackagesHeaderProps {
  onOpenCreate: () => void;
}

export default function PackagesHeader({ onOpenCreate }: PackagesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          Service Packages & Tiers
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure pricing tiers, deliverables, and service packages.
        </p>
      </div>

      <Button
        onClick={onOpenCreate}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl gap-2 h-10 px-4 shadow-sm cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>Add New Package</span>
      </Button>
    </div>
  );
}
