/**
 * ==============================================================================
 * 📌 DASHBOARD OVERVIEW PAGE (/dashboard)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * This is the main dashboard landing page. It displays:
 *  - High-level metric summary cards (Revenue, Active Users, Projects, Payouts)
 *  - Interactive Revenue Chart with timeframe switches (Monthly / Yearly)
 *  - Live Recent User Activity feed
 *  - Pending Payouts review queue with one-click approval actions
 *  - Quick Action shortcuts to all major sections
 *
 * 🛠️ HOW TO CUSTOMIZE:
 * The data shown below uses `DEMO_METRICS`, `dummyRevenue`, and `dummyPayouts`
 * as safe fallbacks. When your backend API is ready, simply pass your API query
 * data directly into these components!
 * ==============================================================================
 */

"use client";

import { useState } from "react";
import MetricCards, { MetricItem } from "@/components/module/Dashboard/DashbordOverview/MetricCards";
import RevenueChart from "@/components/module/Dashboard/DashbordOverview/RevenueChart";
import UserActivity from "@/components/module/Dashboard/DashbordOverview/UserActivity";
import PendingPayouts from "@/components/module/Dashboard/DashbordOverview/PendingPayouts";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import {
  FolderKanban,
  Package,
  CreditCard,
  MessageSquare,
  Sparkles,
  Users,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// Demo stats and activities
const dummyMetrics: MetricItem[] = [
  { title: "Total Revenue", value: "$124,580", type: "revenue" },
  { title: "Active Users", value: "8,640", type: "users" },
  { title: "Active Creators", value: "640", type: "creators" },
  { title: "Pending Applications", value: "24", type: "applications" },
];

const dummyRevenue = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 58000 },
  { month: "Jun", revenue: 72000 },
  { month: "Jul", revenue: 84000 },
  { month: "Aug", revenue: 95000 },
];

const dummyActivities = [
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

const initialPayouts = [
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

export default function DashboardPage() {
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: profileData } = useGetMyProfileQuery(undefined);
  const profile = profileData?.data ?? currentUser;

  const [payoutsList] = useState(initialPayouts);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* 1. Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-800 p-8 text-white shadow-xl shadow-indigo-500/10">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-indigo-100 mb-3 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Interactive Platform Dashboard</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Welcome back, {profile?.fullName || "Admin"}! 👋
            </h1>
            <p className="text-indigo-100/80 text-sm mt-1 max-w-xl leading-relaxed">
              Here is your latest platform performance, pending creator payouts, and ongoing project updates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/projects"
              className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:bg-indigo-50 transition-all text-sm"
            >
              <FolderKanban className="w-4 h-4" />
              View Projects
            </Link>
            <Link
              href="/dashboard/admin/users"
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white font-semibold px-4 py-2.5 rounded-xl border border-white/20 hover:bg-white/25 transition-all text-sm"
            >
              <Users className="w-4 h-4" />
              Manage Users
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Quick Action Cards */}
      <div>
        <h2 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-600" /> Quick Access Modules
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Users List", href: "/dashboard/admin/users", icon: Users, color: "bg-blue-50 text-blue-600 hover:bg-blue-100/80 border-blue-100" },
            { label: "Projects", href: "/dashboard/projects", icon: FolderKanban, color: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100/80 border-indigo-100" },
            { label: "Packages", href: "/dashboard/packages", icon: Package, color: "bg-purple-50 text-purple-600 hover:bg-purple-100/80 border-purple-100" },
            { label: "Payments", href: "/dashboard/payments", icon: CreditCard, color: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100/80 border-emerald-100" },
            { label: "Messages", href: "/dashboard/messages", icon: MessageSquare, color: "bg-sky-50 text-sky-600 hover:bg-sky-100/80 border-sky-100" },
            { label: "Subscriptions", href: "/dashboard/subscriptions", icon: Sparkles, color: "bg-amber-50 text-amber-600 hover:bg-amber-100/80 border-amber-100" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-2.5 p-4 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${item.color}`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-bold text-slate-700">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Metric Summary Cards */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-bold text-slate-800">Platform Analytics</h2>
          <span className="text-xs font-semibold text-slate-400">Live 30-Day Metrics</span>
        </div>
        <MetricCards metrics={dummyMetrics} />
      </div>

      {/* 4. Charts and Live Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 flex w-full">
          <RevenueChart data={dummyRevenue} />
        </div>
        <div className="lg:col-span-1 flex w-full">
          <UserActivity activities={dummyActivities} />
        </div>
      </div>

      {/* 5. Pending Payouts Review Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-slate-800">Pending Creator Payouts</h2>
          <button
            onClick={() => toast.info("All pending payouts are up to date.")}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Refresh Queue
          </button>
        </div>
        <PendingPayouts data={payoutsList} />
      </div>
    </div>
  );
}