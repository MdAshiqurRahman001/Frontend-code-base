"use client";

import { useGetUserListQuery } from "@/redux/api/userApi";
import { useGetUserSubscriptionsQuery } from "@/redux/api/subscriptionApi";
import { useGetAllNotificationsQuery } from "@/redux/api/notificationApi";
import StatCard from "@/components/dashboard/StatCard";
import { Users, CreditCard, Bell, UserCheck, TrendingUp, Clock } from "lucide-react";
import { formatDate } from "@/components/dashboard/dateUtils";

export default function AdminDashboardPage() {
  const { data: userData } = useGetUserListQuery({ limit: 1 });
  const { data: pendingData } = useGetUserListQuery({ isApproved: false, limit: 1 });
  const { data: subData } = useGetUserSubscriptionsQuery({ status: "ACTIVE", limit: 1 });
  const { data: recentUsersData } = useGetUserListQuery({ limit: 5, sortBy: "createdAt", sortOrder: "desc" });
  const { data: notiData } = useGetAllNotificationsQuery({ limit: 1 });

  const totalUsers = userData?.data?.meta?.total ?? 0;
  const pendingApprovals = pendingData?.data?.meta?.total ?? 0;
  const activeSubscriptions = subData?.data?.meta?.total ?? 0;
  const totalNotifications = notiData?.data?.meta?.total ?? 0;
  const recentUsers = recentUsersData?.data?.data ?? [];

  return (
    <div className="space-y-6 py-4">
      {/* Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 p-6 text-white shadow-lg">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Admin Panel</p>
            <h1 className="text-2xl font-bold">Overview Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">Platform management and analytics</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
            <TrendingUp size={16} className="text-emerald-400" />
            <span className="text-sm text-white font-medium">Live Data</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
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

      {/* Recent Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Recent Registrations</h3>
            <a href="/dashboard/admin/users" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
              View all →
            </a>
          </div>
          <div className="divide-y divide-gray-50">
            {recentUsers.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-400">No users yet</div>
            ) : (
              recentUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-white">
                      {(user.fullName ?? user.email).slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.fullName ?? user.email}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      user.isApproved
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {user.isApproved ? "Approved" : "Pending"}
                    </span>
                    <span className="text-[10px] text-gray-400">{formatDate(user.createdAt)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Manage Users", href: "/dashboard/admin/users", icon: Users, color: "from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-700" },
              { label: "Subscriptions", href: "/dashboard/admin/subscriptions", icon: CreditCard, color: "from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-700" },
              { label: "Notifications", href: "/dashboard/admin/notifications", icon: Bell, color: "from-sky-50 to-sky-100 border-sky-200 text-sky-700" },
              { label: "Approve Users", href: "/dashboard/admin/users?isApproved=false", icon: UserCheck, color: "from-amber-50 to-amber-100 border-amber-200 text-amber-700" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border bg-gradient-to-br ${item.color} hover:shadow-md transition-all duration-200`}
              >
                <item.icon size={20} />
                <span className="text-xs font-semibold text-center">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
