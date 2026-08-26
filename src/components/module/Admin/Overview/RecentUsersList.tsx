"use client";

import Link from "next/link";
import { User } from "@/types";
import { formatDate } from "@/components/dashboard/dateUtils";

interface RecentUsersListProps {
  recentUsers: User[];
  isLoading?: boolean;
}

export default function RecentUsersList({ recentUsers, isLoading }: RecentUsersListProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">Recent Registrations</h3>
        <Link
          href="/dashboard/admin/users"
          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          View all →
        </Link>
      </div>
      <div className="divide-y divide-gray-50">
        {isLoading ? (
          <div className="p-6 text-center text-sm text-gray-400">Loading registrations...</div>
        ) : recentUsers.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-400">No users yet</div>
        ) : (
          recentUsers.map((user) => (
            <div key={user.id} className="flex items-center gap-3 px-5 py-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-white">
                  {(user.fullName ?? user.email ?? "U").slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.fullName ?? user.email}
                </p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    user.isApproved
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {user.isApproved ? "Approved" : "Pending"}
                </span>
                <span className="text-[10px] text-gray-400">
                  {user.createdAt ? formatDate(user.createdAt) : ""}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
