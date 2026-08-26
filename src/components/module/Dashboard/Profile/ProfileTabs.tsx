"use client";

import { ProfileTab } from "./types";

interface ProfileTabsProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}

export default function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  const tabs: { key: ProfileTab; label: string }[] = [
    { key: "profile", label: "Profile Details" },
    { key: "password", label: "Change Password" },
  ];

  return (
    <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onTabChange(tab.key)}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 capitalize cursor-pointer ${
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
