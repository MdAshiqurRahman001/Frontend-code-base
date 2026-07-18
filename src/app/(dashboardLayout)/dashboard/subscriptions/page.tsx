"use client";

import {
  useGetSubscriptionOffersQuery,
  useGetMyUserSubscriptionQuery,
  useCreateUserSubscriptionMutation,
  useCancelUserSubscriptionMutation,
} from "@/redux/api/subscriptionApi";
import SubscriptionCard from "@/components/dashboard/SubscriptionCard";
import { toast } from "sonner";
import { Loader2, CreditCard } from "lucide-react";

export default function SubscriptionsPage() {
  const { data: offersData, isLoading: isLoadingOffers } =
    useGetSubscriptionOffersQuery({});
  const { data: mySubData, isLoading: isLoadingMySub, refetch } =
    useGetMyUserSubscriptionQuery();

  const [subscribe, { isLoading: isSubscribing }] =
    useCreateUserSubscriptionMutation();
  const [cancel, { isLoading: isCancelling }] =
    useCancelUserSubscriptionMutation();

  const offers = offersData?.data?.data ?? [];
  const activeSubscription = mySubData?.data?.[0] ?? null;

  const handleSubscribe = async (offerId: string) => {
    try {
      // For now, use a placeholder paymentId (replace with real Stripe flow)
      await subscribe({
        subscriptionOfferId: offerId,
        paymentId: `manual_${Date.now()}`,
      }).unwrap();
      toast.success("Successfully subscribed! 🎉");
      refetch();
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to subscribe.");
    }
  };

  const handleCancel = async (subscriptionId: string) => {
    try {
      await cancel(subscriptionId).unwrap();
      toast.success("Subscription cancelled successfully.");
      refetch();
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to cancel subscription.");
    }
  };

  const isLoading = isLoadingOffers || isLoadingMySub;

  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-indigo-100 rounded-xl">
          <CreditCard size={20} className="text-indigo-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Subscription Plans</h1>
          <p className="text-sm text-gray-500">
            {activeSubscription
              ? `You have an active ${activeSubscription.subscriptionOffer?.planName ?? "plan"}`
              : "Choose a plan to unlock premium features"}
          </p>
        </div>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-indigo-500" />
        </div>
      ) : offers.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-gray-400 bg-white rounded-2xl border border-gray-100">
          <CreditCard size={40} className="opacity-30" />
          <p className="text-sm">No subscription plans available yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {offers.map((offer, i) => (
            <SubscriptionCard
              key={offer.id}
              offer={offer}
              index={i}
              currentSubscription={activeSubscription}
              onSubscribe={handleSubscribe}
              onCancel={handleCancel}
              isSubscribing={isSubscribing}
              isCancelling={isCancelling}
            />
          ))}
        </div>
      )}

      {/* FAQ */}
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Common Questions</h3>
        <div className="space-y-3">
          {[
            { q: "Can I change my plan?", a: "You must cancel your current plan first, then subscribe to a new one." },
            { q: "How do I cancel?", a: "Click 'Cancel Subscription' on your active plan. Changes take effect immediately." },
            { q: "Is there a refund policy?", a: "Please contact support for refund inquiries." },
          ].map((faq, i) => (
            <div key={i} className="border-b border-gray-200 last:border-0 pb-3 last:pb-0">
              <p className="text-sm font-medium text-gray-800">{faq.q}</p>
              <p className="text-xs text-gray-500 mt-0.5">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
