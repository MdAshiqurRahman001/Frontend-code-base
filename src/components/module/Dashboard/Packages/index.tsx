/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { DEMO_PACKAGES, DemoPackage } from "@/constants/demoData";
import {
  useGetPackagesQuery,
  useCreatePackageMutation,
  useDeletePackageMutation,
} from "@/redux/api/packagesApi";
import { toast } from "sonner";
import PackagesHeader from "./PackagesHeader";
import PackagesGrid from "./PackagesGrid";
import CreatePackageModal, { PackageFormValues } from "./CreatePackageModal";
import PackageDetailsModal from "./PackageDetailsModal";

export default function PackagesModule() {
  const { data: apiPackagesData } = useGetPackagesQuery();
  const [createPackageApi] = useCreatePackageMutation();
  const [deletePackageApi] = useDeletePackageMutation();

  const [packages, setPackages] = useState<DemoPackage[]>(DEMO_PACKAGES);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<DemoPackage | null>(null);

  useEffect(() => {
    if (apiPackagesData) {
      const raw = Array.isArray(apiPackagesData?.data)
        ? (apiPackagesData.data as any)
        : (apiPackagesData?.data as any)?.data;
      if (raw && Array.isArray(raw)) {
        setPackages(raw);
      }
    }
  }, [apiPackagesData]);

  const handleCreatePackage = async (data: PackageFormValues) => {
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
      <PackagesHeader onOpenCreate={() => setIsCreateOpen(true)} />

      {/* 2. Packages Grid */}
      <PackagesGrid
        packages={packages}
        onSelectPackage={setSelectedPackage}
        onDeletePackage={handleDeletePackage}
      />

      {/* 3. Create Package Modal */}
      <CreatePackageModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreatePackage}
      />

      {/* 4. View Details Modal */}
      <PackageDetailsModal
        pkg={selectedPackage}
        onClose={() => setSelectedPackage(null)}
      />
    </div>
  );
}
