/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarTrigger } from "../ui/sidebar";
import { useAppSelector } from "@/hooks/redux";
import { selectCurrentUser, logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/hooks/redux";
import { useLogoutUserMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut, Settings } from "lucide-react";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import Link from "next/link";

// Lazy-load the notification bell to avoid SSR issues with dropdown
const NotificationBell = dynamic(
  () => import("@/components/dashboard/NotificationBell"),
  { ssr: false }
);

const AppHeader = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const [logoutUser] = useLogoutUserMutation();

  // Build initials fallback
  const initials = currentUser?.fullName
    ? currentUser.fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("")
    : (currentUser?.email?.[0]?.toUpperCase() ?? "U");

  const handleLogout = async () => {
    try {
      await logoutUser(undefined as any).unwrap();
    } catch {
      // Continue with client-side logout even if server call fails
    }
    dispatch(logout());
    Cookies.remove("auth-token");
    toast.success("Signed out successfully.");
    router.push("/auth/signin");
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 bg-white border-b border-gray-100 px-6 shadow-sm">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-800">
            {currentUser?.fullName ?? currentUser?.email ?? "Welcome"}
          </p>
          <p className="text-xs text-gray-400 capitalize">
            {currentUser?.role?.toLowerCase() ?? "user"} account
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <NotificationBell />

        {/* Settings */}
        <Link
          href="/dashboard/profile"
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          title="Settings"
        >
          <Settings size={18} className="text-gray-500" />
        </Link>

        {/* Avatar + Logout */}
        <div className="flex items-center gap-2 pl-2 border-l border-gray-100">
          <Avatar className="h-9 w-9 border-2 border-indigo-100">
            <AvatarImage
              src={currentUser?.profileImage ?? undefined}
              alt={currentUser?.fullName ?? "User avatar"}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <button
            onClick={handleLogout}
            title="Sign out"
            className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
