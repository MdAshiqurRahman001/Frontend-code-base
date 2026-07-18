"use client";

import { Bell, Check, Trash2, Loader2 } from "lucide-react";
import { useGetUnreadNotificationsQuery } from "@/redux/api/notificationApi";
import { useGetMyNotificationsQuery } from "@/redux/api/notificationApi";
import { useMarkNotificationsReadMutation } from "@/redux/api/notificationApi";
import { useDeleteNotificationMutation } from "@/redux/api/notificationApi";
import { AppNotification } from "@/types";
import { useState, useRef, useEffect } from "react";
import { formatDistanceToNow } from "@/components/dashboard/dateUtils";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { data: unreadData } = useGetUnreadNotificationsQuery(undefined, {
    pollingInterval: 30000,
  });
  const { data: notifData, isLoading } = useGetMyNotificationsQuery(
    { limit: 10 },
    { skip: !open }
  );

  const [markRead] = useMarkNotificationsReadMutation();
  const [deleteNotif] = useDeleteNotificationMutation();

  const unreadCount = unreadData?.data?.length ?? 0;
  const notifications: AppNotification[] = notifData?.data?.data ?? [];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleOpen = () => {
    setOpen((p) => !p);
    if (!open && unreadCount > 0) {
      markRead();
    }
  };

  return (
    <div className="relative" ref={ref}>
      {/* Bell button */}
      <button
        id="notification-bell"
        onClick={handleOpen}
        className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
        aria-label="Notifications"
      >
        <Bell size={20} className="text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={() => markRead()}
                className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <Check size={12} />
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 size={20} className="animate-spin text-gray-400" />
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-10 text-gray-400">
                <Bell size={32} className="opacity-30" />
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 ${
                    !n.read ? "bg-indigo-50/40" : ""
                  }`}
                >
                  {/* Unread dot */}
                  <div className="mt-1 flex-shrink-0">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        !n.read ? "bg-indigo-500" : "bg-transparent"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {n.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                      {n.body}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDistanceToNow(n.createdAt)}
                    </p>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotif(n.id);
                    }}
                    className="flex-shrink-0 p-1 rounded-lg hover:bg-red-50 hover:text-red-500 text-gray-300 transition-colors"
                    aria-label="Delete notification"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-100">
              <a
                href="/dashboard/notifications"
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
              >
                View all notifications →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
