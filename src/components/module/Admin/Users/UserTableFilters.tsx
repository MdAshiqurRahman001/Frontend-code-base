"use client";

import { Search } from "lucide-react";

export type RoleFilterType = "All" | "Creator" | "Client";

interface UserTableFiltersProps {
  roleFilter: RoleFilterType;
  onRoleFilterChange: (role: RoleFilterType) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export default function UserTableFilters({
  roleFilter,
  onRoleFilterChange,
  search,
  onSearchChange,
}: UserTableFiltersProps) {
  const tabs: RoleFilterType[] = ["All", "Creator", "Client"];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Role Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onRoleFilterChange(tab)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        />
      </div>
    </div>
  );
}
