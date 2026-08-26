"use client";

interface NotificationCategoryTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function NotificationCategoryTabs({
  activeTab,
  onTabChange,
}: NotificationCategoryTabsProps) {
  const tabs = [
    { id: "all", label: "All Alerts" },
    { id: "payout", label: "Payouts" },
    { id: "order", label: "Projects" },
    { id: "message", label: "Messages" },
    { id: "system", label: "System" },
  ];

  return (
    <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-100 shadow-2xs w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === tab.id
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
