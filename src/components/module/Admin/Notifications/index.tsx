"use client";

import { useState } from "react";
import {
  useGetAllNotificationsQuery,
  useSendNotificationMutation,
  useSendGroupNotificationMutation,
  useDeleteNotificationMutation,
} from "@/redux/api/notificationApi";
import { useGetUserListQuery } from "@/redux/api/userApi";
import { AppNotification } from "@/types";
import { toast } from "sonner";
import NotificationsHeader from "./NotificationsHeader";
import NotificationTabs from "./NotificationTabs";
import SendNotificationPanel from "./SendNotificationPanel";
import NotificationHistoryList from "./NotificationHistoryList";
import { AdminNotifTab, IndividualNotifData, GroupNotifData, SendType } from "./types";

export default function AdminNotificationsModule() {
  const [activeTab, setActiveTab] = useState<AdminNotifTab>("send");
  const [sendType, setSendType] = useState<SendType>("individual");
  const [page, setPage] = useState(1);

  const { data: notiData, isLoading, refetch } = useGetAllNotificationsQuery({
    page,
    limit: 15,
  });
  const { data: usersData } = useGetUserListQuery({ limit: 100 });

  const [sendToUser, { isLoading: isSendingToUser }] = useSendNotificationMutation();
  const [sendToGroup, { isLoading: isSendingToGroup }] = useSendGroupNotificationMutation();
  const [deleteNotif] = useDeleteNotificationMutation();

  const notifications: AppNotification[] = notiData?.data?.data ?? [];
  const total = notiData?.data?.meta?.total ?? 0;
  const totalPages = Math.ceil(total / 15);
  const users = usersData?.data?.data ?? [];

  const handleSendIndividual = async (data: IndividualNotifData) => {
    try {
      await sendToUser(data).unwrap();
      toast.success("Notification sent successfully!");
      refetch();
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to send notification.");
    }
  };

  const handleSendGroup = async (data: GroupNotifData) => {
    try {
      await sendToGroup(data).unwrap();
      toast.success("Group notification sent!");
      refetch();
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to send group notification.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotif(id).unwrap();
      toast.success("Notification deleted.");
      refetch();
    } catch {
      toast.error("Failed to delete notification.");
    }
  };

  const isSending = isSendingToUser || isSendingToGroup;

  return (
    <div className="space-y-4 py-4">
      {/* Header */}
      <NotificationsHeader totalNotifications={total} />

      {/* Tabs */}
      <NotificationTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Send Notification Panel */}
      {activeTab === "send" && (
        <SendNotificationPanel
          users={users}
          sendType={sendType}
          onSendTypeChange={setSendType}
          isSending={isSending}
          onSendIndividual={handleSendIndividual}
          onSendGroup={handleSendGroup}
        />
      )}

      {/* Notification History Panel */}
      {activeTab === "history" && (
        <NotificationHistoryList
          notifications={notifications}
          isLoading={isLoading}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
