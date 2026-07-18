"use client";

import {
  useGetMyNotificationsQuery,
  useGetUnreadNotificationsQuery,
  useMarkNotificationsReadMutation,
  useDeleteNotificationMutation,
} from "@/redux/api/notificationApi";
import { AppNotification } from "@/types";
import { Bell, Check, CheckCheck, Loader2, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "@/components/dashboard/dateUtils";
import { useState } from "react";

export default function NotificationsPage() {
  const [page, setPage] = useState(1);
  const limit = 15;

  const { data, isLoading, isFetching } = useGetMyNotificationsQuery({ page, limit });
  const { data: unreadData } = useGetUnreadNotificationsQuery();
  const [markRead, { isLoading: isMarking }] = useMarkNotificationsReadMutation();
  const [deleteNotif] = useDeleteNotificationMutation();

  const notifications: AppNotification[] = data?.data?.data ?? [];
  const total = data?.data?.meta?.total ?? 0;
  const totalPages = Math.ceil(total / limit);
  const unreadCount = unreadData?.data?.length ?? 0;

  return (
    <div className="max-w-3xl mx-auto space-y-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {unreadCount > 0 ? (
              <span className="text-indigo-600 font-medium">{unreadCount} unread</span>
            ) : (
              "All caught up!"
            )}
            {" "}· {total} total
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={() => markRead()}
            disabled={isMarking}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 text-sm font-medium hover:bg-indigo-100 transition-colors disabled:opacity-60"
          >
            {isMarking ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <CheckCheck size={14} />
            )}
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="animate-spin text-indigo-500" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-gray-400">
            <Bell size={40} className="opacity-30" />
            <p className="text-sm">No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition-colors ${
                  !n.read ? "bg-indigo-50/40" : ""
                }`}
              >
                {/* Icon */}
                <div className={`flex-shrink-0 mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center ${
                  !n.read
                    ? "bg-indigo-100 text-indigo-600"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {!n.read ? <Bell size={16} /> : <Check size={16} />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold ${!n.read ? "text-gray-900" : "text-gray-700"}`}>
                      {n.title}
                    </p>
                    <span className="flex-shrink-0 text-xs text-gray-400">
                      {formatDistanceToNow(n.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{n.body}</p>
                  {!n.read && (
                    <span className="inline-block mt-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                      NEW
                    </span>
                  )}
                </div>

                {/* Delete */}
                <button
                  onClick={() => deleteNotif(n.id)}
                  className="flex-shrink-0 p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                  aria-label="Delete notification"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isFetching}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              ← Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || isFetching}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
