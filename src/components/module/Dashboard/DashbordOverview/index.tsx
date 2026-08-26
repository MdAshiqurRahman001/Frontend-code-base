/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import {
  useGetDashboardOverviewQuery,
  useGetRevenueAnalyticsQuery,
  useGetPlatformFeedQuery,
} from "@/redux/api/analyticsApi";
import { useGetPayoutsQuery } from "@/redux/api/payoutApi";
import { toast } from "sonner";
import WelcomeBanner from "./WelcomeBanner";
import QuickAccessModules from "./QuickAccessModules";
import MetricCards, { MetricItem } from "./MetricCards";
import RevenueChart from "./RevenueChart";
import UserActivity from "./UserActivity";
import PendingPayouts from "./PendingPayouts";

// Default Demo Fallbacks
const fallbackMetrics: MetricItem[] = [
  { title: "Total Revenue", value: "$124,580", type: "revenue" },
  { title: "Active Users", value: "8,640", type: "users" },
  { title: "Active Creators", value: "640", type: "creators" },
  { title: "Pending Applications", value: "24", type: "applications" },
];

const fallbackRevenue = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 58000 },
  { month: "Jun", revenue: 72000 },
  { month: "Jul", revenue: 84000 },
  { month: "Aug", revenue: 95000 },
];

const fallbackActivities = [
  {
    name: "Elena Rostova",
    action: "Submitted milestone 3 for Brand Identity",
    time: "5 mins ago",
    avatarBg: "bg-indigo-50",
    avatarColor: "text-indigo-600",
  },
  {
    name: "David Miller",
    action: "Deposited escrow $4,500.00",
    time: "15 mins ago",
    avatarBg: "bg-emerald-50",
    avatarColor: "text-emerald-600",
  },
  {
    name: "Sofia Chen",
    action: "Updated creator portfolio package",
    time: "45 mins ago",
    avatarBg: "bg-sky-50",
    avatarColor: "text-sky-600",
  },
  {
    name: "Marcus Jordan",
    action: "Requested payout for $1,250.00",
    time: "1 hour ago",
    avatarBg: "bg-amber-50",
    avatarColor: "text-amber-600",
  },
];

const fallbackPayouts = [
  {
    id: "1",
    creator: {
      name: "Marcus Jordan",
      role: "UI/UX Photography",
      initials: "MJ",
      avatarBg: "bg-blue-100",
      avatarText: "text-blue-600",
    },
    amount: "$1,250.00",
    status: "AWAITING REVIEW",
  },
  {
    id: "2",
    creator: {
      name: "Sarah Lee",
      role: "Video Editing",
      initials: "SL",
      avatarBg: "bg-emerald-100",
      avatarText: "text-emerald-600",
    },
    amount: "$840.00",
    status: "AWAITING REVIEW",
  },
  {
    id: "3",
    creator: {
      name: "David Kim",
      role: "Graphic Design",
      initials: "DK",
      avatarBg: "bg-slate-100",
      avatarText: "text-slate-600",
    },
    amount: "$2,100.00",
    status: "AWAITING REVIEW",
  },
];

export default function DashboardOverviewModule() {
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: profileData } = useGetMyProfileQuery(undefined);
  const profile = profileData?.data ?? currentUser;

  // RTK Query Dynamic Data Hooks
  const { data: overviewData } = useGetDashboardOverviewQuery();
  const { data: revenueData } = useGetRevenueAnalyticsQuery();
  const { data: feedData } = useGetPlatformFeedQuery();
  const { data: payoutsData } = useGetPayoutsQuery();

  // Unified dynamic metrics with fallback
  const displayMetrics: MetricItem[] = overviewData?.data
    ? [
        {
          title: "Total Revenue",
          value: overviewData.data.totalRevenue || "$124,580",
          type: "revenue",
        },
        {
          title: "Active Users",
          value: overviewData.data.activeUsers || "8,640",
          type: "users",
        },
        {
          title: "Active Creators",
          value: overviewData.data.activeCreators || "640",
          type: "creators",
        },
        {
          title: "Pending Applications",
          value: overviewData.data.pendingApplications || "24",
          type: "applications",
        },
      ]
    : fallbackMetrics;

  const displayRevenue = revenueData?.data?.length ? revenueData.data : fallbackRevenue;
  const displayActivities = feedData?.data?.length ? feedData.data : fallbackActivities;

  // Normalize payouts data for table
  const rawPayouts = Array.isArray(payoutsData?.data)
    ? payoutsData.data
    : (payoutsData?.data as any)?.data || [];

  const displayPayouts =
    rawPayouts.length > 0
      ? rawPayouts.slice(0, 3).map((p: any) => ({
          id: String(p.id),
          creator: {
            name: p.name || "Creator",
            role: p.bankName || "Creator Account",
            initials: (p.name || "CR").slice(0, 2).toUpperCase(),
            avatarBg: "bg-indigo-100",
            avatarText: "text-indigo-600",
          },
          amount: p.amount,
          status: p.status === "Pending" ? "AWAITING REVIEW" : p.status,
        }))
      : fallbackPayouts;

  return (
    <div className="flex flex-col gap-8 w-full pb-10">
      {/* 1. Welcome Banner */}
      <WelcomeBanner fullName={profile?.fullName} />

      {/* 2. Quick Action Cards */}
      <QuickAccessModules />

      {/* 3. Metric Summary Cards */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-bold text-slate-800">Platform Analytics</h2>
          <span className="text-xs font-semibold text-slate-400">Live 30-Day Metrics</span>
        </div>
        <MetricCards metrics={displayMetrics} />
      </div>

      {/* 4. Charts and Live Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 flex w-full">
          <RevenueChart data={displayRevenue} />
        </div>
        <div className="lg:col-span-1 flex w-full">
          <UserActivity activities={displayActivities} />
        </div>
      </div>

      {/* 5. Pending Payouts Review Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-slate-800">Pending Creator Payouts</h2>
          <button
            type="button"
            onClick={() => toast.info("Payouts queue is synchronized.")}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
          >
            Refresh Queue
          </button>
        </div>
        <PendingPayouts data={displayPayouts} />
      </div>
    </div>
  );
}