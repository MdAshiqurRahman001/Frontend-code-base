/**
 * ==============================================================================
 * 📌 PACKAGES MANAGEMENT PAGE (/dashboard/packages)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * This page displays your subscription plans and creator service packages.
 * It includes:
 *  - Interactive package cards with pricing and feature lists
 *  - "Create New Package" dialog using `<NRForm>` and `<NRInput>`
 *  - Interactive "View Details" and "Delete" actions with toast feedback
 * ==============================================================================
 */

"use client";

import { useState } from "react";
import { DEMO_PACKAGES, DemoPackage } from "@/constants/demoData";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NRForm from "@/components/form/NRForm";
import NRInput from "@/components/form/NRInput";
import NRSelect from "@/components/form/NRSelect";
import { Plus, Check, Trash2, Package as PackageIcon, DollarSign, Users } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const packageSchema = z.object({
  name: z.string().min(2, "Package name is required"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  billingPeriod: z.string().default("monthly"),
  features: z.string().min(3, "Please enter at least one feature"),
});

export default function PackagesPage() {
  const [packages, setPackages] = useState<DemoPackage[]>(DEMO_PACKAGES);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<DemoPackage | null>(null);

  const handleCreatePackage = (data: z.infer<typeof packageSchema>) => {
    const newPkg: DemoPackage = {
      id: Date.now(),
      name: data.name,
      price: data.price,
      billingPeriod: (data.billingPeriod as "monthly" | "yearly") || "monthly",
      features: data.features.split(",").map((f) => f.trim()),
      activeSubscribers: 0,
      status: "Active",
      popular: false,
    };

    setPackages((prev) => [newPkg, ...prev]);
    setIsCreateOpen(false);
    toast.success(`Package "${data.name}" created successfully!`);
  };

  const handleDeletePackage = (id: number) => {
    const pkgToDelete = packages.find((p) => p.id === id);
    setPackages((prev) => prev.filter((p) => p.id !== id));
    toast.error(`Package "${pkgToDelete?.name || "Plan"}" has been deleted.`);
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* 1. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Subscription & Service Packages
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure pricing tiers and features for clients and creators.
          </p>
        </div>

        {/* Create Package Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl gap-2 shadow-sm">
              <Plus className="w-4 h-4" /> Add New Package
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg bg-white rounded-2xl p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-slate-800">
                Create New Package
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Fill in the details below to add a new subscription tier.
              </DialogDescription>
            </DialogHeader>

            <NRForm
              schema={packageSchema}
              onSubmit={handleCreatePackage}
              defaultValues={{
                name: "",
                price: 49,
                billingPeriod: "monthly",
                features: "Unlimited Projects, 24/7 Support, Instant Payouts",
              }}
            >
              <div className="space-y-4 my-4">
                <NRInput
                  name="name"
                  label="Package Name"
                  placeholder="e.g. Professional Creator"
                />

                <div className="grid grid-cols-2 gap-3">
                  <NRInput
                    name="price"
                    label="Price ($ USD)"
                    type="number"
                    icon={DollarSign}
                    placeholder="49"
                  />

                  <NRSelect
                    name="billingPeriod"
                    label="Billing Period"
                    options={[
                      { label: "Monthly", value: "monthly" },
                      { label: "Yearly", value: "yearly" },
                    ]}
                  />
                </div>

                <NRInput
                  name="features"
                  label="Features (comma separated)"
                  placeholder="Feature 1, Feature 2, Feature 3"
                />
              </div>

              <DialogFooter className="gap-2 sm:gap-0 mt-4">
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
                  Create Package
                </Button>
              </DialogFooter>
            </NRForm>
          </DialogContent>
        </Dialog>
      </div>

      {/* 2. Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative p-6 rounded-2xl border bg-white flex flex-col justify-between transition-all duration-300 hover:shadow-lg ${
              pkg.popular
                ? "border-indigo-600 shadow-md shadow-indigo-100 ring-2 ring-indigo-600/10"
                : "border-slate-100 hover:border-slate-200"
            }`}
          >
            {pkg.popular && (
              <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                Most Popular
              </span>
            )}

            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{pkg.name}</h3>
                  <p className="text-xs text-slate-400 font-medium capitalize">
                    Billed {pkg.billingPeriod}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                  <PackageIcon className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-baseline gap-1 my-4">
                <span className="text-4xl font-extrabold text-slate-900">
                  ${pkg.price}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  / {pkg.billingPeriod === "monthly" ? "mo" : "yr"}
                </span>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 text-slate-600 text-xs font-semibold mb-6">
                <Users className="w-4 h-4 text-slate-400" />
                <span>{pkg.activeSubscribers} active subscribers</span>
              </div>

              <div className="space-y-2.5 mb-6">
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

            <div className="flex items-center gap-2 pt-4 border-t border-slate-50">
              <Button
                onClick={() => setSelectedPackage(pkg)}
                variant="outline"
                className="flex-1 text-xs font-semibold hover:bg-slate-50"
              >
                View Details
              </Button>
              <Button
                onClick={() => handleDeletePackage(pkg.id)}
                variant="ghost"
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl"
                title="Delete package"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. View Package Details Modal */}
      {selectedPackage && (
        <Dialog open={!!selectedPackage} onOpenChange={() => setSelectedPackage(null)}>
          <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-slate-800">
                {selectedPackage.name} Details
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Active plan configuration overview
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-2 text-sm">
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Price Rate</span>
                <span className="font-bold text-slate-800">
                  ${selectedPackage.price} / {selectedPackage.billingPeriod}
                </span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Subscribers</span>
                <span className="font-bold text-slate-800">
                  {selectedPackage.activeSubscribers} users
                </span>
              </div>
              <div>
                <p className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2">
                  Features List:
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600 pl-2">
                  {selectedPackage.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      • {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={() => {
                  toast.success(`Updated package settings for ${selectedPackage.name}`);
                  setSelectedPackage(null);
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
              >
                Done
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
