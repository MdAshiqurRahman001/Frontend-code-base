"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { SubscriptionOffer } from "@/types";
import { OfferFormData } from "./types";
import { X, Check, Loader2 } from "lucide-react";

interface OfferFormModalProps {
  isOpen: boolean;
  editingOffer: SubscriptionOffer | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: OfferFormData) => Promise<void>;
}

export default function OfferFormModal({
  isOpen,
  editingOffer,
  isSubmitting,
  onClose,
  onSubmit,
}: OfferFormModalProps) {
  const { register, handleSubmit, reset } = useForm<OfferFormData>();

  useEffect(() => {
    if (editingOffer) {
      reset({
        planName: editingOffer.planName,
        planType: editingOffer.planType,
        price: editingOffer.price,
        duration: editingOffer.duration,
        facilities: editingOffer.facilities.join(", "),
        details: editingOffer.details ?? "",
      });
    } else {
      reset({
        planName: "",
        planType: "",
        price: 0,
        duration: 30,
        facilities: "",
        details: "",
      });
    }
  }, [editingOffer, reset, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-gray-900">
            {editingOffer ? "Edit Plan" : "Create New Plan"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Plan Name *
              </label>
              <input
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                {...register("planName", { required: true })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Plan Type *
              </label>
              <input
                placeholder="e.g. basic, premium"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                {...register("planType", { required: true })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                {...register("price", { required: true, min: 0 })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Duration (days) *
              </label>
              <input
                type="number"
                min="1"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                {...register("duration", { required: true, min: 1 })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Facilities (comma-separated)
            </label>
            <input
              placeholder="Feature 1, Feature 2, Feature 3"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
              {...register("facilities")}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Details</label>
            <textarea
              rows={2}
              placeholder="Plan description..."
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
              {...register("details")}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold disabled:opacity-60 cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Saving…
                </>
              ) : (
                <>
                  <Check size={14} /> {editingOffer ? "Update" : "Create"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
