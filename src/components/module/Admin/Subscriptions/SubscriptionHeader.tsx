"use client";

import { Plus } from "lucide-react";

interface SubscriptionHeaderProps {
  onNewPlan: () => void;
}

export default function SubscriptionHeader({ onNewPlan }: SubscriptionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Subscription Management</h1>
        <p className="text-sm text-gray-500">Manage plans and user subscriptions</p>
      </div>
      <button
        onClick={onNewPlan}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-md hover:shadow-indigo-200 transition-all cursor-pointer"
      >
        <Plus size={16} />
        New Plan
      </button>
    </div>
  );
}
