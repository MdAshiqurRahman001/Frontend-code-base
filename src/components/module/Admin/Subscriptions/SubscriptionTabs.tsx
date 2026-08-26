"use client";

export type SubscriptionTabType = "offers" | "subscriptions";

interface SubscriptionTabsProps {
  activeTab: SubscriptionTabType;
  onTabChange: (tab: SubscriptionTabType) => void;
}

export default function SubscriptionTabs({
  activeTab,
  onTabChange,
}: SubscriptionTabsProps) {
  const tabs: { key: SubscriptionTabType; label: string }[] = [
    { key: "offers", label: "Subscription Plans" },
    { key: "subscriptions", label: "User Subscriptions" },
  ];

  return (
    <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
            activeTab === tab.key
              ? "bg-white shadow-sm text-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
