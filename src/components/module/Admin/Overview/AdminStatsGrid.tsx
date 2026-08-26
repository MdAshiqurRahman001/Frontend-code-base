"use client";

import StatCard from "@/components/dashboard/StatCard";
import { Users, CreditCard, Bell, Clock } from "lucide-react";

interface AdminStatsGridProps {
  totalUsers: number;
  pendingApprovals: number;
  activeSubscriptions: number;
  totalNotifications: number;
}

export default function AdminStatsGrid({
  totalUsers,
  pendingApprovals,
  activeSubscriptions,
  totalNotifications,
}: AdminStatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Users"
        value={totalUsers}
        icon={Users}
        color="indigo"
        subtitle="Registered accounts"
        trend={{ value: 12, label: "this month" }}
      />
      <StatCard
        title="Pending Approvals"
        value={pendingApprovals}
        icon={Clock}
        color={pendingApprovals > 0 ? "amber" : "emerald"}
        subtitle="Awaiting review"
      />
      <StatCard
        title="Active Subscriptions"
        value={activeSubscriptions}
        icon={CreditCard}
        color="emerald"
        subtitle="Currently active plans"
      />
      <StatCard
        title="Notifications Sent"
        value={totalNotifications}
        icon={Bell}
        color="sky"
        subtitle="All time"
      />
    </div>
  );
}
