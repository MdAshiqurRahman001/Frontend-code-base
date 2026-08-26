/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { DEMO_NOTIFICATIONS, DemoNotification } from "@/constants/demoData";
import {
  useGetMyNotificationsQuery,
  useMarkNotificationsReadMutation,
  useDeleteNotificationMutation,
} from "@/redux/api/notificationApi";
import { toast } from "sonner";
import NotificationsHeader from "./NotificationsHeader";
import NotificationCategoryTabs from "./NotificationCategoryTabs";
import NotificationCardList from "./NotificationCardList";

export default function DashboardNotificationsModule() {
  const { data: apiNotifsData } = useGetMyNotificationsQuery({});
  const [markReadApi] = useMarkNotificationsReadMutation();
  const [deleteNotificationApi] = useDeleteNotificationMutation();

  const [notifications, setNotifications] =
    useState<DemoNotification[]>(DEMO_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    if (apiNotifsData) {
      const raw = Array.isArray(apiNotifsData?.data)
        ? (apiNotifsData.data as any)
        : (apiNotifsData?.data as any)?.data;
      if (raw && Array.isArray(raw)) {
        setNotifications(raw);
      }
    }
  }, [apiNotifsData]);

  const filteredNotifications = notifications.filter(
    (n) => activeTab === "all" || n.category === activeTab
  );

  const handleMarkAllRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read!");

    try {
      await markReadApi().unwrap();
    } catch {
      // Graceful fallback
    }
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

  const handleDeleteNotification = async (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.error("Notification removed.");

    try {
      await deleteNotificationApi(id).unwrap();
    } catch {
      // Graceful fallback
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* 1. Header */}
      <NotificationsHeader
        onMarkAllRead={handleMarkAllRead}
        onClearAll={handleClearAll}
      />

      {/* 2. Filter Tabs */}
      <NotificationCategoryTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* 3. Notifications List */}
      <NotificationCardList
        notifications={filteredNotifications}
        onToggleRead={handleToggleRead}
        onDelete={handleDeleteNotification}
      />
    </div>
  );
}
