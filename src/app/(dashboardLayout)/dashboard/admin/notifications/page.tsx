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
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Bell, Send, Loader2, Trash2, Users, User, CheckCheck } from "lucide-react";
import { formatDistanceToNow } from "@/components/dashboard/dateUtils";

interface IndividualNotifData {
  userId: string;
  title: string;
  body: string;
  data?: string;
}

interface GroupNotifData {
  title: string;
  body: string;
  role?: string;
  data?: string;
}

export default function AdminNotificationsPage() {
  const [activeTab, setActiveTab] = useState<"send" | "history">("send");
  const [sendType, setSendType] = useState<"individual" | "group">("individual");
  const [page, setPage] = useState(1);

  const { data: notiData, isLoading, refetch } = useGetAllNotificationsQuery({ page, limit: 15 });
  const { data: usersData } = useGetUserListQuery({ limit: 100 });

  const [sendToUser, { isLoading: isSendingToUser }] = useSendNotificationMutation();
  const [sendToGroup, { isLoading: isSendingToGroup }] = useSendGroupNotificationMutation();
  const [deleteNotif] = useDeleteNotificationMutation();

  const notifications: AppNotification[] = notiData?.data?.data ?? [];
  const total = notiData?.data?.meta?.total ?? 0;
  const totalPages = Math.ceil(total / 15);
  const users = usersData?.data?.data ?? [];

  const indivForm = useForm<IndividualNotifData>();
  const groupForm = useForm<GroupNotifData>();

  const handleSendIndividual = async (data: IndividualNotifData) => {
    try {
      await sendToUser(data).unwrap();
      toast.success("Notification sent successfully!");
      indivForm.reset();
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
      groupForm.reset();
      refetch();
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to send group notification.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotif(id).unwrap();
      refetch();
    } catch {
      toast.error("Failed to delete.");
    }
  };

  const isSending = isSendingToUser || isSendingToGroup;

  return (
    <div className="space-y-4 py-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Notification Center</h1>
        <p className="text-sm text-gray-500">{total} total notifications sent</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {(["send", "history"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 capitalize ${
              activeTab === tab ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "send" ? "Send Notification" : "History"}
          </button>
        ))}
      </div>

      {/* Send Panel */}
      {activeTab === "send" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          {/* Send Type Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setSendType("individual")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                sendType === "individual"
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
              }`}
            >
              <User size={15} />
              Individual
            </button>
            <button
              onClick={() => setSendType("group")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                sendType === "group"
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
              }`}
            >
              <Users size={15} />
              Group Broadcast
            </button>
          </div>

          {/* Individual Form */}
          {sendType === "individual" && (
            <form onSubmit={indivForm.handleSubmit(handleSendIndividual)} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Select User *</label>
                <select
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
                  {...indivForm.register("userId", { required: true })}
                >
                  <option value="">— Select a user —</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.fullName ?? u.email} ({u.role})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
                <input
                  placeholder="Notification title"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  {...indivForm.register("title", { required: true })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                <textarea
                  rows={3}
                  placeholder="Notification body text..."
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
                  {...indivForm.register("body", { required: true })}
                />
              </div>
              <button
                type="submit"
                disabled={isSending}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-md hover:shadow-indigo-200 transition-all disabled:opacity-60"
              >
                {isSending ? <><Loader2 size={14} className="animate-spin" /> Sending…</> : <><Send size={14} /> Send Notification</>}
              </button>
            </form>
          )}

          {/* Group Form */}
          {sendType === "group" && (
            <form onSubmit={groupForm.handleSubmit(handleSendGroup)} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Target Role (optional)</label>
                <select
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
                  {...groupForm.register("role")}
                >
                  <option value="">All Users</option>
                  <option value="USER">Users only</option>
                  <option value="ADMIN">Admins only</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
                <input
                  placeholder="Broadcast title"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  {...groupForm.register("title", { required: true })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                <textarea
                  rows={3}
                  placeholder="Broadcast message..."
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
                  {...groupForm.register("body", { required: true })}
                />
              </div>
              <button
                type="submit"
                disabled={isSending}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-md hover:shadow-indigo-200 transition-all disabled:opacity-60"
              >
                {isSending ? <><Loader2 size={14} className="animate-spin" /> Sending…</> : <><CheckCheck size={14} /> Broadcast to All</>}
              </button>
            </form>
          )}
        </div>
      )}

      {/* History */}
      {activeTab === "history" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={24} className="animate-spin text-indigo-500" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-gray-400">
              <Bell size={36} className="opacity-30" />
              <p className="text-sm">No notifications sent yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {notifications.map((n) => (
                <div key={n.id} className="flex items-start gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <Bell size={14} className="text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{n.body}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] text-gray-400">{formatDistanceToNow(n.createdAt)}</span>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${n.read ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                        {n.read ? "Read" : "Unread"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(n.id)}
                    className="flex-shrink-0 p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
              <span className="text-xs text-gray-500">Page {page}/{totalPages}</span>
              <div className="flex gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50">← Prev</button>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50">Next →</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
