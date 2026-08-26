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
import { toast } from "sonner";
import SubscriptionHeader from "./SubscriptionHeader";
import SubscriptionTabs, { SubscriptionTabType } from "./SubscriptionTabs";
import OffersTable from "./OffersTable";
import UserSubscriptionsTable from "./UserSubscriptionsTable";
import OfferFormModal from "./OfferFormModal";
import { OfferFormData } from "./types";

export default function AdminSubscriptionsModule() {
  const [showForm, setShowForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<SubscriptionOffer | null>(null);
  const [activeTab, setActiveTab] = useState<SubscriptionTabType>("offers");

  const {
    data: offersData,
    isLoading: isLoadingOffers,
    refetch: refetchOffers,
  } = useGetSubscriptionOffersQuery({});

  const { data: subsData, isLoading: isLoadingSubs } =
    useGetUserSubscriptionsQuery({ limit: 50 });

  const [createOffer, { isLoading: isCreating }] = useCreateSubscriptionOfferMutation();
  const [updateOffer, { isLoading: isUpdating }] = useUpdateSubscriptionOfferMutation();
  const [deleteOffer, { isLoading: isDeleting }] = useDeleteSubscriptionOfferMutation();

  const offers: SubscriptionOffer[] = offersData?.data?.data ?? [];
  const userSubs = subsData?.data?.data ?? [];

  const handleOpenCreate = () => {
    setEditingOffer(null);
    setShowForm(true);
  };

  const handleOpenEdit = (offer: SubscriptionOffer) => {
    setEditingOffer(offer);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingOffer(null);
  };

  const handleSubmitForm = async (data: OfferFormData) => {
    const facilities = data.facilities
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    try {
      if (editingOffer) {
        await updateOffer({
          id: editingOffer.id,
          ...data,
          price: Number(data.price),
          duration: Number(data.duration),
          facilities,
        }).unwrap();
        toast.success("Subscription plan updated!");
      } else {
        await createOffer({
          ...data,
          price: Number(data.price),
          duration: Number(data.duration),
          facilities,
        }).unwrap();
        toast.success("Subscription plan created!");
      }
      setShowForm(false);
      setEditingOffer(null);
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
      <SubscriptionHeader onNewPlan={handleOpenCreate} />

      {/* Tabs */}
      <SubscriptionTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Panels */}
      {activeTab === "offers" && (
        <OffersTable
          offers={offers}
          isLoading={isLoadingOffers}
          isDeleting={isDeleting}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
          onOpenCreate={handleOpenCreate}
        />
      )}

      {activeTab === "subscriptions" && (
        <UserSubscriptionsTable userSubs={userSubs} isLoading={isLoadingSubs} />
      )}

      {/* Form Modal */}
      <OfferFormModal
        isOpen={showForm}
        editingOffer={editingOffer}
        isSubmitting={isCreating || isUpdating}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
      />
    </div>
  );
}
