/**
 * ==============================================================================
 * 📌 NOTIFICATIONS CENTER PAGE (/dashboard/notifications)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * This page displays all platform notifications and alerts.
 * It includes:
 *  - Category filter tabs (All, Orders, Payouts, Messages, System)
 *  - "Mark All as Read" & "Clear All" batch actions
 *  - Individual notification status toggles
 * ==============================================================================
 */

"use client";

import { useState } from "react";
import { DEMO_NOTIFICATIONS, DemoNotification } from "@/constants/demoData";
import { Button } from "@/components/ui/button";
import {
  Bell,
  CheckCheck,
  Trash2,
  Package,
  Banknote,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<DemoNotification[]>(DEMO_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredNotifications = notifications.filter(
    (n) => activeTab === "all" || n.category === activeTab
  );

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read!");
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast.info("Notification inbox cleared.");
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.error("Notification removed.");
  };

  const getCategoryIcon = (cat: DemoNotification["category"]) => {
    switch (cat) {
      case "payout":
        return <Banknote className="w-5 h-5 text-emerald-600" />;
      case "order":
        return <Package className="w-5 h-5 text-indigo-600" />;
      case "message":
        return <MessageSquare className="w-5 h-5 text-sky-600" />;
      case "system":
      default:
        return <Sparkles className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Notifications Center
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Stay updated with real-time alerts, project milestones, and payout receipts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleMarkAllRead}
            variant="outline"
            size="sm"
            className="text-xs font-semibold gap-1.5"
          >
            <CheckCheck className="w-4 h-4" /> Mark All as Read
          </Button>
          <Button
            onClick={handleClearAll}
            variant="ghost"
            size="sm"
            className="text-xs font-semibold text-slate-400 hover:text-red-600 hover:bg-red-50"
          >
            Clear All
          </Button>
        </div>
      </div>

      {/* 2. Filter Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-100 shadow-xs w-fit">
        {[
          { id: "all", label: "All Alerts" },
          { id: "payout", label: "Payouts" },
          { id: "order", label: "Projects" },
          { id: "message", label: "Messages" },
          { id: "system", label: "System" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Notifications List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs divide-y divide-slate-50 overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center gap-3">
            <Bell className="w-10 h-10 text-slate-300 stroke-[1.5]" />
            <h3 className="font-bold text-sm text-slate-700">No notifications found</h3>
            <p className="text-xs text-slate-400">You are all caught up!</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-5 flex items-start gap-4 transition-colors ${
                notif.read ? "bg-white" : "bg-indigo-50/30"
              }`}
            >
              <div className="p-3 bg-slate-50 rounded-2xl shrink-0">
                {getCategoryIcon(notif.category)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-800">
                      {notif.title}
                    </h3>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                    )}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 shrink-0">
                    {notif.time}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {notif.message}
                </p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <Button
                  onClick={() => handleToggleRead(notif.id)}
                  variant="ghost"
                  size="sm"
                  className="text-xs font-semibold text-slate-400 hover:text-slate-700"
                >
                  {notif.read ? "Mark unread" : "Mark read"}
                </Button>
                <Button
                  onClick={() => handleDeleteNotification(notif.id)}
                  variant="ghost"
                  size="sm"
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
