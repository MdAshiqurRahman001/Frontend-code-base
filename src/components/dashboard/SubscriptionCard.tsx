/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SubscriptionOffer, UserSubscription } from "@/types";
import { CheckCircle, Star, Zap, Crown, Loader2 } from "lucide-react";
import { formatDate } from "./dateUtils";

const PLAN_ICONS: Record<string, React.ReactNode> = {
  basic: <Star size={20} />,
  standard: <Zap size={20} />,
  premium: <Crown size={20} />,
};

const PLAN_COLORS = [
  { gradient: "from-indigo-500 to-purple-600", badge: "bg-indigo-100 text-indigo-700", shadow: "shadow-indigo-200" },
  { gradient: "from-emerald-500 to-teal-600", badge: "bg-emerald-100 text-emerald-700", shadow: "shadow-emerald-200" },
  { gradient: "from-amber-500 to-orange-600", badge: "bg-amber-100 text-amber-700", shadow: "shadow-amber-200" },
];

interface SubscriptionCardProps {
  offer: SubscriptionOffer;
  index?: number;
  currentSubscription?: UserSubscription | null;
  onSubscribe?: (offerId: string) => void;
  onCancel?: (subscriptionId: string) => void;
  isSubscribing?: boolean;
  isCancelling?: boolean;
}

export default function SubscriptionCard({
  offer,
  index = 0,
  currentSubscription,
  onSubscribe,
  onCancel,
  isSubscribing,
  isCancelling,
}: SubscriptionCardProps) {
  const color = PLAN_COLORS[index % PLAN_COLORS.length];
  const icon = PLAN_ICONS[offer.planType?.toLowerCase()] ?? <Star size={20} />;

  const isCurrentPlan =
    currentSubscription?.subscriptionOfferId === offer.id &&
    currentSubscription?.status === "ACTIVE";

  const hasActivePlan =
    currentSubscription?.status === "ACTIVE";

  return (
    <div
      className={`relative rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-lg ${
        isCurrentPlan
          ? "border-indigo-300 shadow-lg shadow-indigo-100 ring-2 ring-indigo-200"
          : "border-gray-100 shadow-sm"
      }`}
    >
      {/* Current plan badge */}
      {isCurrentPlan && (
        <div className="absolute top-3 right-3 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          Current Plan
        </div>
      )}

      {/* Header */}
      <div className={`bg-gradient-to-br ${color.gradient} p-6 text-white`}>
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-white/20 rounded-xl">{icon}</div>
          <div>
            <h3 className="font-bold text-lg">{offer.planName}</h3>
            <span className="text-white/70 text-xs capitalize">{offer.planType}</span>
          </div>
        </div>
        <div className="flex items-end gap-1">
          <span className="text-4xl font-extrabold">${offer.price}</span>
          <span className="text-white/70 mb-1">/{offer.duration} days</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 bg-white">
        {offer.details && (
          <p className="text-sm text-gray-500 mb-4">{offer.details}</p>
        )}

        {/* Features */}
        <ul className="flex flex-col gap-2 mb-5">
          {(offer?.facilities || (offer as any)?.features || []).map((facility: string, i: number) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <CheckCircle size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              {facility}
            </li>
          ))}
        </ul>

        {/* Current plan info */}
        {isCurrentPlan && currentSubscription && (
          <div className="bg-indigo-50 rounded-xl p-3 mb-4 text-xs text-indigo-700">
            <p>Active since: <strong>{formatDate(currentSubscription.startDate)}</strong></p>
            <p>Expires: <strong>{formatDate(currentSubscription.endDate)}</strong></p>
          </div>
        )}

        {/* Action Button */}
        {isCurrentPlan ? (
          <button
            onClick={() => onCancel?.(currentSubscription!.id)}
            disabled={isCancelling}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border-2 border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isCancelling ? (
              <><Loader2 size={14} className="animate-spin" /> Cancelling…</>
            ) : (
              "Cancel Subscription"
            )}
          </button>
        ) : (
          <button
            onClick={() => onSubscribe?.(offer.id)}
            disabled={isSubscribing || hasActivePlan}
            className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-white text-sm font-semibold shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r ${color.gradient} ${color.shadow}`}
          >
            {isSubscribing ? (
              <><Loader2 size={14} className="animate-spin" /> Subscribing…</>
            ) : hasActivePlan ? (
              "Already Subscribed"
            ) : (
              "Subscribe Now"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
