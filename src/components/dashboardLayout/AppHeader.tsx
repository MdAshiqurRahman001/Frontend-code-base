/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarTrigger } from "../ui/sidebar";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { selectCurrentUser, logout } from "@/redux/features/auth/authSlice";
import { useLogoutUserMutation } from "@/redux/api/authApi";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import {
  LogOut,
  Settings,
  Search,
  Plus,
  Command,
  User,
  ShieldCheck,
  FolderPlus,
  UserPlus,
  CreditCard,
} from "lucide-react";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Lazy-load notification bell
const NotificationBell = dynamic(
  () => import("@/components/dashboard/NotificationBell"),
  { ssr: false }
);

export const AppHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const [logoutUser] = useLogoutUserMutation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Human friendly page title generator based on current route
  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Overview";
    if (pathname.includes("/admin/users")) return "User Management";
    if (pathname.includes("/projects")) return "Projects Overview";
    if (pathname.includes("/packages")) return "Packages & Plans";
    if (pathname.includes("/payments")) return "Payment History";
    if (pathname.includes("/payouts")) return "Creator Payouts";
    if (pathname.includes("/messages")) return "Direct Messages";
    if (pathname.includes("/notifications")) return "Notifications";
    if (pathname.includes("/subscriptions")) return "Subscription Tiers";
    if (pathname.includes("/profile")) return "Account Settings";
    if (pathname.includes("/support")) return "Help & Support";
    return "Dashboard";
  };

  // Build initials fallback
  const initials = currentUser?.fullName
    ? currentUser.fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("")
    : (currentUser?.email?.[0]?.toUpperCase() ?? "A");

  const handleLogout = async () => {
    try {
      await logoutUser(undefined as any).unwrap();
    } catch {
      // Continue client-side logout
    }
    dispatch(logout());
    Cookies.remove("auth-token");
    toast.success("Signed out successfully.");
    router.push("/auth/signin");
  };

  const quickNavItems = [
    { title: "Dashboard Overview", url: "/dashboard", icon: Command },
    { title: "Projects Management", url: "/dashboard/projects", icon: FolderPlus },
    { title: "User Directory", url: "/dashboard/admin/users", icon: UserPlus },
    { title: "Financial Transactions", url: "/dashboard/payments", icon: CreditCard },
    { title: "Account Settings", url: "/dashboard/profile", icon: Settings },
  ];

  const filteredQuickNav = quickNavItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 transition-all">
        {/* Left: Sidebar Trigger & Breadcrumb / Title */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="-ml-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg p-2 transition-colors" />
          
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/dashboard" className="hover:text-slate-700 transition-colors">
              DevHub
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-bold tracking-tight">
              {getPageTitle()}
            </span>
          </div>
        </div>

        {/* Middle: Global Search Trigger Button */}
        <div className="flex-1 max-w-md hidden sm:block">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-slate-300 text-slate-400 text-xs transition-all shadow-2xs group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              <span>Search projects, creators, payments...</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center gap-1 font-mono text-[10px] font-bold bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-500 shadow-2xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Side: Quick Action + Notification + User Menu */}
        <div className="flex items-center gap-3">
          {/* Quick Create Action Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                className="hidden lg:flex h-9 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs gap-1.5 px-3.5 transition-all"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Create</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl p-1 shadow-lg bg-white border border-slate-100">
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/projects")}
                className="text-xs cursor-pointer py-2 rounded-lg"
              >
                <FolderPlus className="w-4 h-4 mr-2 text-indigo-600" />
                <span>New Project</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/packages")}
                className="text-xs cursor-pointer py-2 rounded-lg"
              >
                <Plus className="w-4 h-4 mr-2 text-purple-600" />
                <span>New Package</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/admin/users")}
                className="text-xs cursor-pointer py-2 rounded-lg"
              >
                <UserPlus className="w-4 h-4 mr-2 text-blue-600" />
                <span>Invite User</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications Bell */}
          <div className="flex items-center">
            <NotificationBell />
          </div>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2.5 p-1 pl-2 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer">
                <div className="hidden xl:flex flex-col text-right">
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    {currentUser?.fullName ?? "Ashiqur Rahman"}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 flex items-center justify-end gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Admin
                  </span>
                </div>
                <Avatar className="h-9 w-9 border-2 border-indigo-100 shadow-2xs">
                  <AvatarImage
                    src={currentUser?.profileImage ?? "/images/david_profile.png"}
                    alt="User avatar"
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-tr from-indigo-600 to-violet-600 text-white text-xs font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-2xl p-1.5 shadow-xl bg-white border border-slate-100">
              <DropdownMenuLabel className="p-2">
                <p className="text-xs font-bold text-slate-800">
                  {currentUser?.fullName ?? "Ashiqur Rahman"}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {currentUser?.email ?? "ashiqur@devhub.com"}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/profile")}
                className="text-xs cursor-pointer py-2 rounded-lg"
              >
                <User className="w-4 h-4 mr-2 text-slate-500" />
                <span>Account Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/subscriptions")}
                className="text-xs cursor-pointer py-2 rounded-lg"
              >
                <ShieldCheck className="w-4 h-4 mr-2 text-indigo-600" />
                <span>Subscription Plan</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/support")}
                className="text-xs cursor-pointer py-2 rounded-lg"
              >
                <Settings className="w-4 h-4 mr-2 text-slate-500" />
                <span>Help & FAQ</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer py-2 rounded-lg"
              >
                <LogOut className="w-4 h-4 mr-2 text-red-500" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Global Quick Search Command Palette Modal */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-lg bg-white rounded-2xl p-0 overflow-hidden border border-slate-100 shadow-2xl">
          <DialogHeader className="p-4 border-b border-slate-100 pb-3">
            <DialogTitle className="sr-only">Quick Search</DialogTitle>
            <div className="flex items-center gap-3">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Type to search dashboard pages or actions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-sm bg-transparent border-none outline-hidden text-slate-800 placeholder:text-slate-400"
                autoFocus
              />
            </div>
          </DialogHeader>

          <div className="p-2 max-h-72 overflow-y-auto">
            <p className="text-[10px] font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider">
              Navigation Shortcuts
            </p>
            {filteredQuickNav.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                No matching navigation items found.
              </div>
            ) : (
              filteredQuickNav.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchOpen(false);
                      router.push(item.url);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/60 text-slate-700 hover:text-indigo-700 transition-colors text-xs font-semibold"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{item.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Jump →
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppHeader;
