"use client";

import { SubscriptionOffer } from "@/types";
import { CreditCard, Loader2, Pencil, Trash2 } from "lucide-react";

interface OffersTableProps {
  offers: SubscriptionOffer[];
  isLoading: boolean;
  isDeleting: boolean;
  onEdit: (offer: SubscriptionOffer) => void;
  onDelete: (id: string) => void;
  onOpenCreate: () => void;
}

export default function OffersTable({
  offers,
  isLoading,
  isDeleting,
  onEdit,
  onDelete,
  onOpenCreate,
}: OffersTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={24} className="animate-spin text-indigo-500" />
        </div>
      ) : offers.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-gray-400">
          <CreditCard size={36} className="opacity-30" />
          <p className="text-sm">No plans created yet</p>
          <button
            onClick={onOpenCreate}
            className="text-sm text-indigo-600 font-medium hover:underline cursor-pointer"
          >
            Create your first plan →
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Plan</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Type</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Price</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Duration</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {offers.map((offer) => (
                <tr key={offer.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{offer.planName}</p>
                      <p className="text-xs text-gray-400 line-clamp-1">{offer.details ?? "—"}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-600 capitalize">{offer.planType}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-bold text-gray-900">${offer.price}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{offer.duration} days</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        offer.status === "ACTIVE"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {offer.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onEdit(offer)}
                        className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50 transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => onDelete(offer.id)}
                        disabled={isDeleting}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
