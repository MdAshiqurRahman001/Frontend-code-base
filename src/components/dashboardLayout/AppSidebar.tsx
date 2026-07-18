"use client";

import {
  Bell,
  CircleUser,
  CreditCard,
  HeadphonesIcon,
  LayoutGrid,
  MessageCircleMore,
  ShieldCheck,
  Users,
} from "lucide-react";
import type * as React from "react";

import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/hooks/redux";
import { TeamSwitcher } from "./TeamSwitch";
import { NavMain } from "./NavMain";

// ─── User Navigation ───────────────────────────────────────────────────────────

const defaultUserData = {
  main: [
    { title: "Dashboard", path: "", icon: LayoutGrid },
    { title: "Messages", path: "/messages", icon: MessageCircleMore },
    { title: "Subscriptions", path: "/subscriptions", icon: CreditCard },
    { title: "Notifications", path: "/notifications", icon: Bell },
    { title: "Profile", path: "/profile", icon: CircleUser },
  ],
  other: [
    { title: "Support", path: "/support", icon: HeadphonesIcon },
  ],
};

// ─── Admin Navigation ─────────────────────────────────────────────────────────

const adminUserData = {
  main: [
    { title: "Dashboard", path: "", icon: LayoutGrid },
    { title: "Users", path: "/users", icon: Users },
    { title: "Subscriptions", path: "/subscriptions", icon: CreditCard },
    { title: "Notifications", path: "/notifications", icon: Bell },
    { title: "Messages", path: "/messages", icon: MessageCircleMore },
  ],
  other: [
    { title: "Security", path: "", icon: ShieldCheck },
    { title: "Profile", path: "/profile", icon: CircleUser },
  ],
};

// ─── Sidebar Component ────────────────────────────────────────────────────────

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const currentUser = useAppSelector(selectCurrentUser);
  const isAdminPath = pathname.startsWith("/dashboard/admin");
  const basePath = isAdminPath ? "/dashboard/admin" : "/dashboard";
  const navigationData = isAdminPath ? adminUserData : defaultUserData;

  const buildUrl = (path: string) => (path ? `${basePath}${path}` : basePath);

  return (
    <Sidebar
      collapsible="offcanvas"
      className="[--sidebar-primary:#6366f1] [--sidebar-primary-foreground:#FFFFFF]"
      {...props}
    >
      <SidebarContent className="px-3 pt-2">
        <TeamSwitcher
          teams={[
            { name: isAdminPath ? "Admin Panel" : "My Dashboard", logo: () => null },
          ]}
          user={{
            name:
              currentUser?.fullName ??
              currentUser?.email ??
              (isAdminPath ? "Admin User" : "User"),
            email:
              currentUser?.email ??
              (isAdminPath ? "admin@app.com" : "user@app.com"),
            avatar: currentUser?.profileImage ?? undefined,
            roleLabel: currentUser?.role ?? (isAdminPath ? "ADMIN" : "USER"),
          }}
        />

        <NavMain
          title={isAdminPath ? "Admin" : "Main"}
          items={navigationData.main.map((item) => ({
            title: item.title,
            url: buildUrl(item.path),
            icon: item.icon,
          }))}
        />

        <NavMain
          title={isAdminPath ? "Management" : "Other"}
          items={navigationData.other.map((item) => ({
            title: item.title,
            url: item.path ? buildUrl(item.path) : basePath,
            icon: item.icon,
          }))}
        />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
