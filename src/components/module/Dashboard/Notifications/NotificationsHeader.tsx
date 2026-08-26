"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";

interface NotificationsHeaderProps {
  onMarkAllRead: () => void;
  onClearAll: () => void;
}

export default function NotificationsHeader({
  onMarkAllRead,
  onClearAll,
}: NotificationsHeaderProps) {
  return (
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
          onClick={onMarkAllRead}
          variant="outline"
          size="sm"
          className="text-xs font-semibold gap-1.5 cursor-pointer"
        >
          <CheckCheck className="w-4 h-4" /> Mark All as Read
        </Button>
        <Button
          onClick={onClearAll}
          variant="ghost"
          size="sm"
          className="text-xs font-semibold text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
        >
          Clear All
        </Button>
      </div>
    </div>
  );
}
