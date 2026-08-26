"use client";

import { AdminNotifTab } from "./types";

interface NotificationTabsProps {
  activeTab: AdminNotifTab;
  onTabChange: (tab: AdminNotifTab) => void;
}

export default function NotificationTabs({
  activeTab,
  onTabChange,
}: NotificationTabsProps) {
  const tabs: { key: AdminNotifTab; label: string }[] = [
    { key: "send", label: "Send Notification" },
    { key: "history", label: "History" },
  ];

  return (
    <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer capitalize ${
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
