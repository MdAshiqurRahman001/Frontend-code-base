"use client";

import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { useGetUnreadNotificationsQuery } from "@/redux/api/notificationApi";
import { useGetMyUserSubscriptionQuery } from "@/redux/api/subscriptionApi";
import StatCard from "@/components/dashboard/StatCard";
import { useAppSelector } from "@/hooks/redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { Bell, CreditCard, UserCheck, MessageSquare, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/components/dashboard/dateUtils";

export default function DashboardPage() {
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: profileData } = useGetMyProfileQuery();
  const { data: unreadData } = useGetUnreadNotificationsQuery();
  const { data: subscriptionData } = useGetMyUserSubscriptionQuery();

  const profile = profileData?.data ?? currentUser;
  const unreadCount = unreadData?.data?.length ?? 0;
  const activeSubscription = subscriptionData?.data?.[0];
  const isProfileComplete = profile?.isProfileComplete;
  const isApproved = profile?.isApproved;

  return (
    <div className="space-y-6 py-4">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-6 text-white shadow-lg shadow-indigo-200">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative z-10">
          <p className="text-indigo-200 text-sm font-medium mb-1">Welcome back 👋</p>
          <h1 className="text-2xl font-bold mb-1">
            {profile?.fullName ?? profile?.email ?? "User"}
          </h1>
          <p className="text-indigo-200 text-sm capitalize">
            {profile?.role?.toLowerCase()} account · {profile?.status?.toLowerCase()}
          </p>
        </div>
      </div>

      {/* Alerts */}
      {(!isApproved || !isProfileComplete) && (
        <div className="flex flex-col gap-3">
          {!isApproved && (
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-800">
              <AlertCircle size={18} className="text-amber-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Account Pending Approval</p>
                <p className="text-xs text-amber-600 mt-0.5">Your account is awaiting admin approval. You&apos;ll be notified once approved.</p>
              </div>
            </div>
          )}
          {!isProfileComplete && (
            <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-800">
              <AlertCircle size={18} className="text-blue-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Complete Your Profile</p>
                <p className="text-xs text-blue-600 mt-0.5">Add your details to unlock all features.</p>
              </div>
              <Link
                href="/dashboard/profile"
                className="flex-shrink-0 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-200 px-3 py-1.5 rounded-lg transition-colors"
              >
                Complete →
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Unread Notifications"
          value={unreadCount}
          icon={Bell}
          color="indigo"
          subtitle="New alerts waiting for you"
        />
        <StatCard
          title="Subscription"
          value={activeSubscription ? activeSubscription.subscriptionOffer?.planName ?? "Active" : "None"}
          icon={CreditCard}
          color={activeSubscription ? "emerald" : "amber"}
          subtitle={
            activeSubscription
              ? `Expires ${formatDate(activeSubscription.endDate)}`
              : "No active plan"
          }
        />
        <StatCard
          title="Account Status"
          value={isApproved ? "Approved" : "Pending"}
          icon={UserCheck}
          color={isApproved ? "emerald" : "amber"}
          subtitle={isApproved ? "Your account is verified" : "Waiting for admin review"}
        />
        <StatCard
          title="Messages"
          value="Chat"
          icon={MessageSquare}
          color="sky"
          subtitle="Real-time messaging"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "View Profile", href: "/dashboard/profile", icon: "👤", color: "from-indigo-50 to-indigo-100 border-indigo-200" },
            { label: "Messages", href: "/dashboard/messages", icon: "💬", color: "from-sky-50 to-sky-100 border-sky-200" },
            { label: "Subscriptions", href: "/dashboard/subscriptions", icon: "💳", color: "from-emerald-50 to-emerald-100 border-emerald-200" },
            { label: "Notifications", href: "/dashboard/notifications", icon: "🔔", color: "from-purple-50 to-purple-100 border-purple-200" },
            { label: "Support", href: "/dashboard/support", icon: "🎧", color: "from-amber-50 to-amber-100 border-amber-200" },
            { label: "Settings", href: "/dashboard/profile#settings", icon: "⚙️", color: "from-gray-50 to-gray-100 border-gray-200" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border bg-gradient-to-br ${action.color} hover:shadow-md transition-all duration-200 text-center`}
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-xs font-medium text-gray-700">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Subscription Status Detail */}
      {activeSubscription && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle2 size={20} className="text-emerald-600" />
            <h3 className="font-semibold text-gray-900">Active Subscription</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div>
              <p className="text-gray-500 text-xs">Plan</p>
              <p className="font-semibold text-gray-900">{activeSubscription.subscriptionOffer?.planName ?? "—"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Status</p>
              <p className="font-semibold text-emerald-700 capitalize">{activeSubscription.status.toLowerCase()}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Start Date</p>
              <p className="font-semibold text-gray-900">{formatDate(activeSubscription.startDate)}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Expires</p>
              <p className="font-semibold text-gray-900">{formatDate(activeSubscription.endDate)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}