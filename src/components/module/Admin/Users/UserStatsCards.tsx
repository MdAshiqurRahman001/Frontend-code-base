"use client";

import { Users as UsersIcon, Sparkles, Briefcase } from "lucide-react";
import { DemoUser } from "@/constants/demoData";

interface UserStatsCardsProps {
  users: DemoUser[];
}

export default function UserStatsCards({ users }: UserStatsCardsProps) {
  const totalAccounts = users.length;
  const verifiedCreators = users.filter((u) => u.role === "Creator").length;
  const enterpriseClients = users.filter((u) => u.role === "Client").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
          <UsersIcon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-semibold">Total Accounts</p>
          <p className="text-xl font-bold text-slate-800">{totalAccounts} Users</p>
        </div>
      </div>

      <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-semibold">Verified Creators</p>
          <p className="text-xl font-bold text-slate-800">{verifiedCreators} Creators</p>
        </div>
      </div>

      <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <Briefcase className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-semibold">Enterprise Clients</p>
          <p className="text-xl font-bold text-slate-800">{enterpriseClients} Clients</p>
        </div>
      </div>
    </div>
  );
}
