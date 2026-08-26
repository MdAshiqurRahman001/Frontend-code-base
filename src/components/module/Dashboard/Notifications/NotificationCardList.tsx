"use client";

import { DemoNotification } from "@/constants/demoData";
import { Button } from "@/components/ui/button";
import { Bell, Trash2, Package, Banknote, MessageSquare, Sparkles } from "lucide-react";

interface NotificationCardListProps {
  notifications: DemoNotification[];
  onToggleRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function NotificationCardList({
  notifications,
  onToggleRead,
  onDelete,
}: NotificationCardListProps) {
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
    <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs divide-y divide-slate-50 overflow-hidden">
      {notifications.length === 0 ? (
        <div className="p-12 text-center flex flex-col items-center gap-3">
          <Bell className="w-10 h-10 text-slate-300 stroke-[1.5]" />
          <h3 className="font-bold text-sm text-slate-700">No notifications found</h3>
          <p className="text-xs text-slate-400">You are all caught up!</p>
        </div>
      ) : (
        notifications.map((notif) => (
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
                  <h3 className="font-bold text-sm text-slate-800">{notif.title}</h3>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  )}
                </div>
                <span className="text-[11px] font-semibold text-slate-400 shrink-0">
                  {notif.time}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{notif.message}</p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <Button
                onClick={() => onToggleRead(notif.id)}
                variant="ghost"
                size="sm"
                className="text-xs font-semibold text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                {notif.read ? "Mark unread" : "Mark read"}
              </Button>
              <Button
                onClick={() => onDelete(notif.id)}
                variant="ghost"
                size="sm"
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
