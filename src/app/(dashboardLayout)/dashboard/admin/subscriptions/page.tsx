"use client";

import { useState } from "react";
import {
  useGetSubscriptionOffersQuery,
  useCreateSubscriptionOfferMutation,
  useUpdateSubscriptionOfferMutation,
  useDeleteSubscriptionOfferMutation,
  useGetUserSubscriptionsQuery,
} from "@/redux/api/subscriptionApi";
import { SubscriptionOffer } from "@/types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  CreditCard,
  X,
  Check,
} from "lucide-react";
import { formatDate } from "@/components/dashboard/dateUtils";

interface OfferFormData {
  planName: string;
  planType: string;
  price: number;
  duration: number;
  facilities: string;
  details: string;
}

export default function AdminSubscriptionsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<SubscriptionOffer | null>(null);
  const [activeTab, setActiveTab] = useState<"offers" | "subscriptions">("offers");

  const { data: offersData, isLoading: isLoadingOffers, refetch: refetchOffers } =
    useGetSubscriptionOffersQuery({});
  const { data: subsData, isLoading: isLoadingSubs } =
    useGetUserSubscriptionsQuery({ limit: 50 });

  const [createOffer, { isLoading: isCreating }] = useCreateSubscriptionOfferMutation();
  const [updateOffer, { isLoading: isUpdating }] = useUpdateSubscriptionOfferMutation();
  const [deleteOffer, { isLoading: isDeleting }] = useDeleteSubscriptionOfferMutation();

  const offers: SubscriptionOffer[] = offersData?.data?.data ?? [];
  const userSubs = subsData?.data?.data ?? [];

  const { register, handleSubmit, reset } = useForm<OfferFormData>();

  const openCreate = () => {
    setEditingOffer(null);
    reset({ planName: "", planType: "", price: 0, duration: 30, facilities: "", details: "" });
    setShowForm(true);
  };

  const openEdit = (offer: SubscriptionOffer) => {
    setEditingOffer(offer);
    reset({
      planName: offer.planName,
      planType: offer.planType,
      price: offer.price,
      duration: offer.duration,
      facilities: offer.facilities.join(", "),
      details: offer.details ?? "",
    });
    setShowForm(true);
  };

  const onSubmit = async (data: OfferFormData) => {
    const facilities = data.facilities
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    try {
      if (editingOffer) {
        await updateOffer({ id: editingOffer.id, ...data, price: Number(data.price), duration: Number(data.duration), facilities }).unwrap();
        toast.success("Subscription plan updated!");
      } else {
        await createOffer({ ...data, price: Number(data.price), duration: Number(data.duration), facilities }).unwrap();
        toast.success("Subscription plan created!");
      }
      setShowForm(false);
      refetchOffers();
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to save plan.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this subscription plan?")) return;
    try {
      await deleteOffer(id).unwrap();
      toast.success("Plan deleted.");
      refetchOffers();
    } catch {
      toast.error("Failed to delete plan.");
    }
  };

  return (
    <div className="space-y-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Subscription Management</h1>
          <p className="text-sm text-gray-500">Manage plans and user subscriptions</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-md hover:shadow-indigo-200 transition-all"
        >
          <Plus size={16} />
          New Plan
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {(["offers", "subscriptions"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 capitalize ${
              activeTab === tab ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "offers" ? "Subscription Plans" : "User Subscriptions"}
          </button>
        ))}
      </div>

      {/* Plans Table */}
      {activeTab === "offers" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {isLoadingOffers ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={24} className="animate-spin text-indigo-500" />
            </div>
          ) : offers.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-gray-400">
              <CreditCard size={36} className="opacity-30" />
              <p className="text-sm">No plans created yet</p>
              <button onClick={openCreate} className="text-sm text-indigo-600 font-medium hover:underline">
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
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          offer.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
                        }`}>
                          {offer.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => openEdit(offer)}
                            className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50 transition-colors"
                            title="Edit"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(offer.id)}
                            disabled={isDeleting}
                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
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
      )}

      {/* User Subscriptions Table */}
      {activeTab === "subscriptions" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {isLoadingSubs ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={24} className="animate-spin text-indigo-500" />
            </div>
          ) : userSubs.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-gray-400">
              <CreditCard size={36} className="opacity-30" />
              <p className="text-sm">No user subscriptions yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">User ID</th>
                    <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Plan</th>
                    <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Status</th>
                    <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Payment</th>
                    <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Expires</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {userSubs.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3 text-xs text-gray-500 font-mono">{sub.userId.slice(-8)}</td>
                      <td className="px-5 py-3 text-sm font-medium text-gray-900">{sub.subscriptionOfferId.slice(-8)}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          sub.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" :
                          sub.status === "CANCELLED" ? "bg-red-100 text-red-700" :
                          sub.status === "EXPIRED" ? "bg-gray-100 text-gray-600" :
                          "bg-amber-100 text-amber-700"
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          sub.paymentStatus === "PAID" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
                        }`}>
                          {sub.paymentStatus}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs text-gray-500">{formatDate(sub.endDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Create/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">
                {editingOffer ? "Edit Plan" : "Create New Plan"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Plan Name *</label>
                  <input
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    {...register("planName", { required: true })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Plan Type *</label>
                  <input
                    placeholder="e.g. basic, premium"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    {...register("planType", { required: true })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    {...register("price", { required: true, min: 0 })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Duration (days) *</label>
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
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold disabled:opacity-60"
                >
                  {isCreating || isUpdating ? (
                    <><Loader2 size={14} className="animate-spin" /> Saving…</>
                  ) : (
                    <><Check size={14} /> {editingOffer ? "Update" : "Create"}</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
