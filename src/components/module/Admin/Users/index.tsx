"use client";

import { useMemo, useState } from "react";
import { DEMO_USERS, DemoUser } from "@/constants/demoData";
import { NRTable } from "@/components/ui/core/NRTable";
import { toast } from "sonner";
import UsersHeader from "./UsersHeader";
import UserStatsCards from "./UserStatsCards";
import UserTableFilters, { RoleFilterType } from "./UserTableFilters";
import { getUserColumns } from "./UserTableColumns";
import UserProfileModal from "./UserProfileModal";

export default function AdminUsersModule() {
  const [users, setUsers] = useState<DemoUser[]>(DEMO_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilterType>("All");
  const [selectedUser, setSelectedUser] = useState<DemoUser | null>(null);

  // Filter users based on search term and role tab
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === "All" || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const handleToggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        const newStatus = u.status === "Active" ? "Suspended" : "Active";
        toast.info(`User ${u.name} is now ${newStatus}.`);
        return { ...u, status: newStatus };
      })
    );
    if (selectedUser && selectedUser.id === id) {
      setSelectedUser((prev) =>
        prev
          ? {
              ...prev,
              status: prev.status === "Active" ? "Suspended" : "Active",
            }
          : null
      );
    }
  };

  const handleDeleteUser = (id: string) => {
    const uToDelete = users.find((u) => u.id === id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.error(`User "${uToDelete?.name || "User"}" deleted.`);
    setSelectedUser(null);
  };

  const columns = useMemo(
    () =>
      getUserColumns({
        onSelectUser: setSelectedUser,
        onToggleStatus: handleToggleStatus,
        onDeleteUser: handleDeleteUser,
      }),
    [selectedUser]
  );

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* 1. Header */}
      <UsersHeader />

      {/* 2. Overview Stats */}
      <UserStatsCards users={users} />

      {/* 3. Search, Filter Tabs & Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <UserTableFilters
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
          search={search}
          onSearchChange={setSearch}
        />

        <NRTable columns={columns} data={filteredUsers} />
      </div>

      {/* 4. User Profile Details Modal */}
      <UserProfileModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
}
