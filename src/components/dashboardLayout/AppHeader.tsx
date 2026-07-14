"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarTrigger } from "../ui/sidebar";
import { useAppSelector } from "@/hooks/redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const AppHeader = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  // Build initials fallback from the user's name (e.g. "John Doe" → "JD")
  const initials = currentUser?.name
    ? currentUser.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("")
    : "U";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 bg-[#EFEFEF] border-b border-gray-200 px-6">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border-2 border-gray-200">
          <AvatarImage
            src={currentUser?.avatar}
            alt={currentUser?.name ?? "User avatar"}
            className="object-cover"
          />
          <AvatarFallback className="bg-[#10A34B] text-white text-sm font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default AppHeader;
