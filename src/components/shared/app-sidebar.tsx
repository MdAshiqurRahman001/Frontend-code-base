/**
 * ==============================================================================
 * 📌 APP SIDEBAR (Main Navigation System)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * This component renders the collapsible dashboard sidebar with organized
 * category sections: CORE PLATFORM, COMMERCE & BILLING, COMMUNICATIONS, and SETTINGS.
 * ==============================================================================
 */

"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Package,
  CreditCard,
  Banknote,
  MessageSquare,
  Bell,
  Sparkles,
  UserCheck,
  LifeBuoy,
} from "lucide-react";
import Link from "next/link";
import { NavMain, NavSection } from "./nav-main";
import { NavUser } from "./nav-user";

export const sidebarSections: NavSection[] = [
  {
    groupLabel: "CORE PLATFORM",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "User Directory",
        url: "/dashboard/admin/users",
        icon: Users,
        badge: "NEW",
        badgeColor: "bg-purple-50 text-purple-700 border border-purple-100",
      },
      {
        title: "Projects",
        url: "/dashboard/projects",
        icon: FolderKanban,
      },
      {
        title: "Packages",
        url: "/dashboard/packages",
        icon: Package,
      },
    ],
  },
  {
    groupLabel: "COMMERCE & BILLING",
    items: [
      {
        title: "Payments",
        url: "/dashboard/payments",
        icon: CreditCard,
      },
      {
        title: "Payouts Review",
        url: "/dashboard/payouts",
        icon: Banknote,
        badge: "3",
        badgeColor: "bg-amber-50 text-amber-700 border border-amber-200",
      },
      {
        title: "Subscriptions",
        url: "/dashboard/subscriptions",
        icon: Sparkles,
      },
    ],
  },
  {
    groupLabel: "COMMUNICATIONS",
    items: [
      {
        title: "Direct Messages",
        url: "/dashboard/messages",
        icon: MessageSquare,
        badge: "2",
        badgeColor: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      },
      {
        title: "Notifications",
        url: "/dashboard/notifications",
        icon: Bell,
        badge: "4",
        badgeColor: "bg-indigo-50 text-indigo-700 border border-indigo-200",
      },
    ],
  },
  {
    groupLabel: "SETTINGS & HELP",
    items: [
      {
        title: "Profile Settings",
        url: "/dashboard/profile",
        icon: UserCheck,
      },
      {
        title: "Support & FAQ",
        url: "/dashboard/support",
        icon: LifeBuoy,
      },
    ],
  },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  role?: string;
}

export function AppSidebar({ ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" className="border-r border-slate-100 bg-white" {...props}>
      {/* Brand Header */}
      <SidebarHeader className="border-b border-slate-100 p-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 font-bold text-lg text-slate-800 transition-opacity hover:opacity-90"
        >
          <div className="size-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-black shadow-md shadow-indigo-500/20">
            D
          </div>
          <div className="flex flex-col truncate group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-extrabold text-slate-900 leading-none">
              DevHub Studio
            </span>
            <span className="text-[10px] text-slate-400 font-semibold leading-none mt-1">
              Enterprise Dashboard
            </span>
          </div>
        </Link>
      </SidebarHeader>

      {/* Navigation Sections */}
      <SidebarContent className="px-3 py-4">
        <NavMain sections={sidebarSections} />
      </SidebarContent>

      {/* User Footer */}
      <SidebarFooter className="border-t border-slate-100 p-2">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
