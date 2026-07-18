"use client";

import { useState } from "react";
import {
  useGetUserListQuery,
  useToggleBlockMutation,
  useDeleteUserMutation,
  useApproveUserMutation,
  useRejectUserMutation,
} from "@/redux/api/userApi";
import { User } from "@/types";
import {
  Search,
  Loader2,
  ShieldOff,
  Shield,
  Trash2,
  CheckCircle,
  XCircle,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { formatDate } from "@/components/dashboard/dateUtils";
import { toast } from "sonner";
import Image from "next/image";

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [approvedFilter, setApprovedFilter] = useState<string>("");
  const limit = 10;

  const {
    data: usersData,
    isLoading,
    isFetching,
    refetch,
  } = useGetUserListQuery({
    page,
    limit,
    searchTerm: search || undefined,
    status: statusFilter || undefined,
    isApproved: approvedFilter === "true" ? true : approvedFilter === "false" ? false : undefined,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const [toggleBlock, { isLoading: isBlocking }] = useToggleBlockMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [approveUser, { isLoading: isApproving }] = useApproveUserMutation();
  const [rejectUser, { isLoading: isRejecting }] = useRejectUserMutation();

  const users: User[] = usersData?.data?.data ?? [];
  const total = usersData?.data?.meta?.total ?? 0;
  const totalPages = Math.ceil(total / limit);

  const handleToggleBlock = async (user: User) => {
    try {
      const res = await toggleBlock({ id: user.id, blockDays: 7 }).unwrap();
      toast.success(res.data.action === "BLOCKED" ? "User blocked for 7 days." : "User unblocked.");
      refetch();
    } catch {
      toast.error("Failed to update user status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user? This cannot be undone.")) return;
    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted successfully.");
      refetch();
    } catch {
      toast.error("Failed to delete user.");
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await approveUser(id).unwrap();
      toast.success("User approved successfully!");
      refetch();
    } catch {
      toast.error("Failed to approve user.");
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm("Reject and permanently delete this user?")) return;
    try {
      await rejectUser(id).unwrap();
      toast.success("User rejected.");
      refetch();
    } catch {
      toast.error("Failed to reject user.");
    }
  };

  const initials = (user: User) =>
    (user.fullName ?? user.email).split(" ").map((p) => p[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="space-y-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500">{total} registered users</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
        >
          <option value="">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="SUSPENDED">Suspended</option>
          <option value="BLOCKED">Blocked</option>
        </select>

        {/* Approval Filter */}
        <select
          value={approvedFilter}
          onChange={(e) => { setApprovedFilter(e.target.value); setPage(1); }}
          className="px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
        >
          <option value="">All Approvals</option>
          <option value="true">Approved</option>
          <option value="false">Pending</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading || isFetching ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="animate-spin text-indigo-500" />
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-gray-400">
            <Users size={40} className="opacity-30" />
            <p className="text-sm">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">User</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Role</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Approval</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Joined</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* User */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                          {user.profileImage ? (
                            <Image src={user.profileImage} alt="Avatar" fill className="object-cover" />
                          ) : (
                            <span className="text-xs font-bold text-white">{initials(user)}</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate max-w-[180px]">
                            {user.fullName ?? "—"}
                          </p>
                          <p className="text-xs text-gray-400 truncate max-w-[180px]">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        user.role === "ADMIN"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        user.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" :
                        user.status === "SUSPENDED" || user.status === "BLOCKED" ? "bg-red-100 text-red-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {user.status}
                      </span>
                    </td>

                    {/* Approval */}
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        user.isApproved
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {user.isApproved ? "Approved" : "Pending"}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="px-5 py-3.5 text-xs text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        {/* Approve / Reject */}
                        {!user.isApproved && (
                          <>
                            <button
                              onClick={() => handleApprove(user.id)}
                              disabled={isApproving}
                              title="Approve"
                              className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors disabled:opacity-50"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button
                              onClick={() => handleReject(user.id)}
                              disabled={isRejecting}
                              title="Reject"
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                            >
                              <XCircle size={16} />
                            </button>
                          </>
                        )}

                        {/* Block/Unblock */}
                        <button
                          onClick={() => handleToggleBlock(user)}
                          disabled={isBlocking}
                          title={user.isBlocked ? "Unblock" : "Block"}
                          className={`p-1.5 rounded-lg transition-colors disabled:opacity-50 ${
                            user.isBlocked
                              ? "text-emerald-600 hover:bg-emerald-50"
                              : "text-amber-600 hover:bg-amber-50"
                          }`}
                        >
                          {user.isBlocked ? <Shield size={16} /> : <ShieldOff size={16} />}
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(user.id)}
                          disabled={isDeleting}
                          title="Delete"
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isFetching}
              className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm text-gray-600 font-medium">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || isFetching}
              className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
