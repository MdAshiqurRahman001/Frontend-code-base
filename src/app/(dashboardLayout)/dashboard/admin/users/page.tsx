/**
 * ==============================================================================
 * 📌 USER MANAGEMENT PAGE (/dashboard/admin/users)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * This page displays all registered platform users (Creators and Clients).
 * It includes:
 *  - Role Filter Tabs (All Users, Creators, Clients)
 *  - Search bar with instant filter
 *  - Interactive User Table with status badges and action buttons
 *  - "View Profile Details" dialog (showing portfolio, earnings, or client info)
 *  - Block/Unblock and Delete actions with toast notifications
 * ==============================================================================
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { DEMO_USERS, DemoUser } from "@/constants/demoData";
import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Eye,
  Shield,
  ShieldAlert,
  Trash2,
  Users as UsersIcon,
  Sparkles,
  Briefcase,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<DemoUser[]>(DEMO_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"All" | "Creator" | "Client">("All");
  const [selectedUser, setSelectedUser] = useState<DemoUser | null>(null);

  // Filter users based on search term and role tab
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleToggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        const newStatus = u.status === "Active" ? "Suspended" : "Active";
        toast.info(`User ${u.name} is now ${newStatus}.`);
        return { ...u, status: newStatus };
      })
    );
  };

  const handleDeleteUser = (id: string) => {
    const uToDelete = users.find((u) => u.id === id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.error(`User "${uToDelete?.name || "User"}" deleted.`);
    setSelectedUser(null);
  };

  const columns: ColumnDef<DemoUser, any>[] = [
    {
      accessorKey: "name",
      header: "User / Creator",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-slate-100">
            <AvatarImage src={row.original.avatar} alt={row.original.name} />
            <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold text-xs">
              {row.original.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-xs text-slate-800">{row.original.name}</p>
            <p className="text-[11px] text-slate-400">{row.original.email}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <span
          className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
            row.original.role === "Creator"
              ? "bg-purple-50 text-purple-700 border border-purple-200/50"
              : "bg-blue-50 text-blue-700 border border-blue-200/50"
          }`}
        >
          {row.original.role}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Account Status",
      cell: ({ row }) => {
        const s = row.original.status;
        return (
          <Badge
            className={`text-[10px] font-bold py-0.5 px-2 rounded-md ${
              s === "Active"
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                : s === "Pending"
                ? "bg-amber-50 text-amber-600 border border-amber-200"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}
          >
            {s}
          </Badge>
        );
      },
    },
    {
      accessorKey: "joinedDate",
      header: "Member Since",
      cell: ({ row }) => (
        <span className="text-xs text-slate-500">{row.original.joinedDate}</span>
      ),
    },
    {
      accessorKey: "earnings",
      header: "Total Volume",
      cell: ({ row }) => (
        <span className="font-bold text-xs text-slate-800">
          {row.original.earnings || "$0"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          <Button
            onClick={() => setSelectedUser(row.original)}
            size="sm"
            variant="outline"
            className="h-8 gap-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50"
          >
            <Eye className="w-3.5 h-3.5" /> Details
          </Button>

          <Button
            onClick={() => handleToggleStatus(row.original.id)}
            size="sm"
            variant="ghost"
            className="h-8 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
            title={row.original.status === "Active" ? "Suspend User" : "Activate User"}
          >
            {row.original.status === "Active" ? (
              <Shield className="w-4 h-4 text-emerald-600" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-amber-600" />
            )}
          </Button>

          <Button
            onClick={() => handleDeleteUser(row.original.id)}
            size="sm"
            variant="ghost"
            className="h-8 p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
            title="Delete User"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            User Directory & Accounts
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage creator and client accounts, verification statuses, and permissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => toast.success("Exported users list!")}
            variant="outline"
            className="text-xs font-semibold"
          >
            Export Directory
          </Button>
        </div>
      </div>

      {/* 2. Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <UsersIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Total Accounts</p>
            <p className="text-xl font-bold text-slate-800">{users.length} Users</p>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Verified Creators</p>
            <p className="text-xl font-bold text-slate-800">
              {users.filter((u) => u.role === "Creator").length} Creators
            </p>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Enterprise Clients</p>
            <p className="text-xl font-bold text-slate-800">
              {users.filter((u) => u.role === "Client").length} Clients
            </p>
          </div>
        </div>
      </div>

      {/* 3. Search & Tabs */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Role Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-fit">
            {(["All", "Creator", "Client"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setRoleFilter(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  roleFilter === tab
                    ? "bg-white text-slate-800 shadow-xs"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab === "All" ? "All Users" : `${tab}s`}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* TanStack Table */}
        <NRTable columns={columns} data={filteredUsers} />
      </div>

      {/* 4. User Profile Details Modal */}
      {selectedUser && (
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-slate-800">
                User Profile Summary
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Detailed overview of account activity
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-2 text-xs">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                <Avatar className="h-12 w-12 border-2 border-white shadow-xs">
                  <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                  <AvatarFallback className="bg-indigo-600 text-white font-bold text-sm">
                    {selectedUser.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-800">{selectedUser.name}</h3>
                  <p className="text-slate-400">{selectedUser.email}</p>
                  <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                    {selectedUser.role} Account
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400">Account Status</span>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedUser.status}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400">Projects Count</span>
                  <p className="font-bold text-slate-800 mt-0.5">
                    {selectedUser.projectsCount || 0} Projects
                  </p>
                </div>
              </div>

              <div className="p-3 bg-indigo-50/50 rounded-xl flex justify-between items-center text-sm">
                <span className="font-semibold text-indigo-900">Total Account Volume</span>
                <span className="font-extrabold text-indigo-700">
                  {selectedUser.earnings || "$0.00"}
                </span>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => handleToggleStatus(selectedUser.id)}
              >
                {selectedUser.status === "Active" ? "Suspend Account" : "Re-activate"}
              </Button>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                onClick={() => setSelectedUser(null)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
