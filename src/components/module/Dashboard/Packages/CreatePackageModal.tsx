"use client";

import { z } from "zod";
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

export const packageSchema = z.object({
  name: z.string().min(2, "Package name is required"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  billingPeriod: z.enum(["monthly", "yearly"]),
  features: z.string().min(3, "Enter at least one feature"),
});

export type PackageFormValues = z.infer<typeof packageSchema>;

interface CreatePackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PackageFormValues) => Promise<void>;
}

export default function CreatePackageModal({
  isOpen,
  onClose,
  onSubmit,
}: CreatePackageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800">
            Create New Package
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Define pricing, billing cycle, and deliverables for this tier.
          </DialogDescription>
        </DialogHeader>

        <NRForm schema={packageSchema} onSubmit={onSubmit}>
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
                onClick={onClose}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer"
              >
                Save Package
              </Button>
            </DialogFooter>
          </div>
        </NRForm>
      </DialogContent>
    </Dialog>
  );
}
