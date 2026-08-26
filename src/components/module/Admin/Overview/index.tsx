"use client";

import { useGetUserListQuery } from "@/redux/api/userApi";
import { useGetUserSubscriptionsQuery } from "@/redux/api/subscriptionApi";
import { useGetAllNotificationsQuery } from "@/redux/api/notificationApi";
import AdminHeaderBanner from "./AdminHeaderBanner";
import AdminStatsGrid from "./AdminStatsGrid";
import RecentUsersList from "./RecentUsersList";
import QuickActions from "./QuickActions";

export default function AdminOverviewModule() {
  const { data: userData } = useGetUserListQuery({ limit: 1 });
  const { data: pendingData } = useGetUserListQuery({ isApproved: false, limit: 1 });
  const { data: subData } = useGetUserSubscriptionsQuery({ status: "ACTIVE", limit: 1 });
  const { data: recentUsersData, isLoading: isUsersLoading } = useGetUserListQuery({
    limit: 5,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const { data: notiData } = useGetAllNotificationsQuery({ limit: 1 });

  const totalUsers = userData?.data?.meta?.total ?? 0;
  const pendingApprovals = pendingData?.data?.meta?.total ?? 0;
  const activeSubscriptions = subData?.data?.meta?.total ?? 0;
  const totalNotifications = notiData?.data?.meta?.total ?? 0;
  const recentUsers = recentUsersData?.data?.data ?? [];

  return (
    <div className="space-y-6 py-4">
      {/* Header Banner */}
      <AdminHeaderBanner />

      {/* Stats Grid */}
      <AdminStatsGrid
        totalUsers={totalUsers}
        pendingApprovals={pendingApprovals}
        activeSubscriptions={activeSubscriptions}
        totalNotifications={totalNotifications}
      />

      {/* Main Grid: Recent Registrations & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RecentUsersList recentUsers={recentUsers} isLoading={isUsersLoading} />
        <QuickActions />
      </div>
    </div>
  );
}
