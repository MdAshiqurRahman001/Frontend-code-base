"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Boxes,
  CreditCard,
  LayoutDashboard,
  Users,
  Bell,
  MessageSquare,
  LifeBuoy,
} from "lucide-react";
import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const defaultNavData = {
  user: {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Messages",
        url: "/dashboard/messages",
        icon: MessageSquare,
      },
      {
        title: "Subscriptions",
        url: "/dashboard/subscriptions",
        icon: CreditCard,
      },
      {
        title: "Notifications",
        url: "/dashboard/notifications",
        icon: Bell,
      },
      {
        title: "Support",
        url: "/dashboard/support",
        icon: LifeBuoy,
      },
    ],
  },
  admin: {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard/admin",
        icon: LayoutDashboard,
      },
      {
        title: "Users",
        url: "/dashboard/admin/users",
        icon: Users,
      },
      {
        title: "Subscriptions",
        url: "/dashboard/admin/subscriptions",
        icon: Boxes,
      },
      {
        title: "Notifications",
        url: "/dashboard/admin/notifications",
        icon: Bell,
      },
      {
        title: "Messages",
        url: "/dashboard/messages",
        icon: MessageSquare,
      },
    ],
  },
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  role?: string;
  customData?: typeof defaultNavData;
}

export function AppSidebar({
  role = "user",
  customData = defaultNavData,
  ...props
}: AppSidebarProps) {
  const currentRoleKey = (role?.toLowerCase() === "admin" ? "admin" : "user") as keyof typeof defaultNavData;
  const sidebarData = customData[currentRoleKey] || defaultNavData.user;

  return (
    <Sidebar collapsible="icon" className="border-r border-border/40" {...props}>
      <SidebarHeader className="border-b border-border/40 p-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
          <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-black">
            V
          </div>
          <span className="truncate group-data-[collapsible=icon]:hidden">
            App Dashboard
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData?.navMain} />
      </SidebarContent>
      <SidebarFooter className="border-t border-border/40">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
