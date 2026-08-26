"use client";

import { UserSubscription } from "@/types";
import { CreditCard, Loader2 } from "lucide-react";
import { formatDate } from "@/components/dashboard/dateUtils";

interface UserSubscriptionsTableProps {
  userSubs: UserSubscription[];
  isLoading: boolean;
}

export default function UserSubscriptionsTable({
  userSubs,
  isLoading,
}: UserSubscriptionsTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {isLoading ? (
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
                  <td className="px-5 py-3 text-xs text-gray-500 font-mono">
                    {sub.userId?.slice(-8)}
                  </td>
                  <td className="px-5 py-3 text-sm font-medium text-gray-900">
                    {sub.subscriptionOfferId?.slice(-8)}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        sub.status === "ACTIVE"
                          ? "bg-emerald-100 text-emerald-700"
                          : sub.status === "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : sub.status === "EXPIRED"
                          ? "bg-gray-100 text-gray-600"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        sub.paymentStatus === "PAID"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {sub.paymentStatus}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-500">
                    {sub.endDate ? formatDate(sub.endDate) : "—"}
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
