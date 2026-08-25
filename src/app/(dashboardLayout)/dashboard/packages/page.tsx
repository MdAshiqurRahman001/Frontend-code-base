/**
 * ==============================================================================
 * 📌 PACKAGES & PRICING PLANS PAGE (/dashboard/packages)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * This page allows platform admins to view, create, edit, and delete subscription packages.
 *
 * 🛠️ DUAL-MODE DYNAMIC API INTEGRATION:
 *  - Live Mode: Connects to `packagesApi` (`getPackages`, `createPackage`, `deletePackage`)
 *  - Demo Mode: Falls back to `DEMO_PACKAGES` with instant toast simulation
 * ==============================================================================
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { DEMO_PACKAGES, DemoPackage } from "@/constants/demoData";
import {
  useGetPackagesQuery,
  useCreatePackageMutation,
  useDeletePackageMutation,
} from "@/redux/api/packagesApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NRForm from "@/components/form/NRForm";
import NRInput from "@/components/form/NRInput";
import NRSelect from "@/components/form/NRSelect";
import { Plus, Check, Trash2, Eye, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const packageSchema = z.object({
  name: z.string().min(2, "Package name is required"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  billingPeriod: z.enum(["monthly", "yearly"]),
  features: z.string().min(3, "Enter at least one feature"),
});

export default function PackagesPage() {
  const { data: apiPackagesData } = useGetPackagesQuery();
  const [createPackageApi] = useCreatePackageMutation();
  const [deletePackageApi] = useDeletePackageMutation();

  const rawPackages = Array.isArray(apiPackagesData?.data)
    ? (apiPackagesData.data as any)
    : (apiPackagesData?.data as any)?.data || DEMO_PACKAGES;

  const [packages, setPackages] = useState<DemoPackage[]>(rawPackages);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<DemoPackage | null>(null);

  const handleCreatePackage = async (data: z.infer<typeof packageSchema>) => {
    const newPkg: DemoPackage = {
      id: Date.now(),
      name: data.name,
      price: data.price,
      billingPeriod: data.billingPeriod,
      features: data.features.split(",").map((f) => f.trim()),
      activeSubscribers: 0,
      status: "Active",
    };

    setPackages((prev) => [...prev, newPkg]);
    setIsCreateOpen(false);
    toast.success(`Package "${data.name}" created successfully!`);

    try {
      await createPackageApi({
        name: data.name,
        price: data.price,
        billingPeriod: data.billingPeriod,
        features: newPkg.features,
      }).unwrap();
    } catch {
      // Graceful fallback
    }
  };

  const handleDeletePackage = async (id: number) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
    toast.error("Package deleted.");

    try {
      await deletePackageApi(id).unwrap();
    } catch {
      // Graceful fallback
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* 1. Header with Add Package CTA */}
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
          onClick={() => setIsCreateOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl gap-2 h-10 px-4 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Package</span>
        </Button>
      </div>

      {/* 2. Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="p-6 bg-white rounded-3xl border border-slate-100 shadow-2xs hover:shadow-md hover:border-slate-200 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-800">
                    {pkg.name}
                  </h3>
                  <span className="text-xs font-semibold text-slate-400 capitalize">
                    Billed {pkg.billingPeriod}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline gap-1 my-4">
                <span className="text-3xl font-black text-slate-900">
                  ${pkg.price}
                </span>
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
                onClick={() => setSelectedPackage(pkg)}
                variant="outline"
                size="sm"
                className="flex-1 text-xs font-semibold h-9 rounded-xl"
              >
                <Eye className="w-3.5 h-3.5 mr-1.5" /> Details
              </Button>
              <Button
                onClick={() => handleDeletePackage(pkg.id)}
                variant="ghost"
                size="sm"
                className="h-9 px-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Create Package Modal */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800">
              Create New Package
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Define pricing, billing cycle, and deliverables for this tier.
            </DialogDescription>
          </DialogHeader>

          <NRForm schema={packageSchema} onSubmit={handleCreatePackage}>
            <div className="space-y-4 my-2">
              <NRInput
                name="name"
                label="Package Name"
                placeholder="e.g. Enterprise Video Suite"
              />

              <div className="grid grid-cols-2 gap-3">
                <NRInput
                  name="price"
                  label="Price ($ USD)"
                  type="number"
                  placeholder="e.g. 199"
                />

                <NRSelect
                  name="billingPeriod"
                  label="Billing Cycle"
                  options={[
                    { label: "Monthly", value: "monthly" },
                    { label: "Yearly", value: "yearly" },
                  ]}
                />
              </div>

              <NRInput
                name="features"
                label="Features (comma separated)"
                placeholder="e.g. 4K Footage, Raw Assets, 48h Turnaround"
              />

              <DialogFooter className="gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                >
                  Save Package
                </Button>
              </DialogFooter>
            </div>
          </NRForm>
        </DialogContent>
      </Dialog>

      {/* 4. View Details Modal */}
      {selectedPackage && (
        <Dialog open={!!selectedPackage} onOpenChange={() => setSelectedPackage(null)}>
          <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-slate-800">
                {selectedPackage.name}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Package breakdown and pricing overview
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 my-2 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl flex justify-between items-center">
                <span className="text-slate-500">Price Rate</span>
                <span className="font-extrabold text-lg text-slate-800">
                  ${selectedPackage.price} / {selectedPackage.billingPeriod}
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                <span className="font-bold text-slate-700 block">Deliverables Checklist:</span>
                {selectedPackage.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-600">
                    <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                onClick={() => setSelectedPackage(null)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
