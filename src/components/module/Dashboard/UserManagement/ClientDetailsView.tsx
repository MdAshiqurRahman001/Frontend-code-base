"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Calendar, MapPin, Globe, Clock } from "lucide-react";
import { mockUsers, mockClientDetails, ClientDetails } from "@/components/module/Dashboard/UserManagement/mockData";
import { Button } from "@/components/ui/button";

export interface ClientDetailsViewProps {
  user: typeof mockUsers[0];
  id: string;
}

export function ClientDetailsView({ user, id }: ClientDetailsViewProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "activity">("profile");

  // Fetch or fallback client details
  const clientInfo: ClientDetails = mockClientDetails[id] || {
    companyName: user.name + " Corp",
    bio: "An active business enterprise working with digital creators.",
    location: "Global / Remote",
    website: `www.${user.name.toLowerCase().replace(/\s+/g, "")}.com`,
    badges: ["Standard", "Active"],
    activeProjects: 1,
    totalSpend: "$2.0k",
    successRate: "100%",
    profileInformation: `${user.name} is a valued Client in our network, bringing together business opportunities and marketing initiatives to collaborate with top creators. Detailed profile data is currently being synthesized for this record.`,
    recentActivity: [
      { id: "act-default", title: "Joined the platform", date: user.joinDate, status: "Completed" }
    ]
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 mb-20">
      {/* Header and Back Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/user/dashboard/users">
            <Button variant="ghost" className="p-2 bg-white border border-slate-100 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-sm cursor-pointer active:scale-90">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">User Detail Profile</span>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight mt-1">
              User Details: {user.name}
            </h1>
          </div>
        </div>


      </div>

      {/* Main Info Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Side Profile Card */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-start">
          {/* Logo Brand Box */}
          <div className="w-24 h-24 rounded-2xl bg-amber-950 flex flex-col items-center justify-center text-amber-500 border border-amber-900 shrink-0 select-none shadow-md">
            <span className="text-3xl font-extrabold tracking-tight">A</span>
            <span className="text-[7px] font-extrabold uppercase tracking-widest mt-1 text-amber-500/80">ABC COFFEE</span>
          </div>

          {/* Core Info */}
          <div className="flex flex-col flex-1 w-full">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h2 className="text-xl font-bold text-slate-800">{clientInfo.companyName}</h2>
              {clientInfo.badges.map((badge, idx) => {
                const colorMap: Record<string, string> = {
                  "Active": "bg-emerald-50 text-emerald-600 border-emerald-100",
                  "Partner": "bg-indigo-50 text-indigo-600 border-indigo-100",
                  "Enterprise": "bg-blue-50 text-blue-600 border-blue-100",
                  "Standard": "bg-slate-50 text-slate-600 border-slate-100",
                  "Starter": "bg-amber-50 text-amber-600 border-amber-100"
                };
                const style = colorMap[badge] || "bg-slate-50 text-slate-600 border-slate-100";
                return (
                  <span key={idx} className={`px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded border ${style}`}>
                    {badge}
                  </span>
                );
              })}
            </div>

            <p className="text-sm font-medium text-slate-500 leading-relaxed mb-4">
              {clientInfo.bio}
            </p>

            <div className="h-[1px] bg-slate-100 w-full mb-4" />

            {/* Grid of contact details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-slate-500">
                <Mail className="w-4 h-4 shrink-0 text-slate-400" />
                <span className="text-xs font-semibold text-slate-600 truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <Calendar className="w-4 h-4 shrink-0 text-slate-400" />
                <span className="text-xs font-semibold text-slate-600">Joined {clientInfo.location === "Global / Remote" ? user.joinDate : "Oct 12, 2023"}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <MapPin className="w-4 h-4 shrink-0 text-slate-400" />
                <span className="text-xs font-semibold text-slate-600">{clientInfo.location}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <Globe className="w-4 h-4 shrink-0 text-slate-400" />
                <a href={`https://${clientInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-blue-600 hover:underline">
                  {clientInfo.website}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Stats Card Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Active Projects</span>
            <span className="text-3xl font-extrabold text-blue-600 mt-4 leading-none">{clientInfo.activeProjects}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Total Spend</span>
            <span className="text-3xl font-extrabold text-slate-800 mt-4 leading-none">{clientInfo.totalSpend}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between col-span-2 xl:col-span-2">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Success Rate</span>
            <span className="text-3xl font-extrabold text-emerald-600 mt-4 leading-none">{clientInfo.successRate}</span>
          </div>
        </div>
      </div>

      {/* Profile Information & Activities Tabs */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-100">
          <Button
            variant="ghost"
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-4 text-sm font-extrabold relative transition-colors cursor-pointer rounded-none hover:bg-transparent ${activeTab === "profile" ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
              }`}
          >
            Profile Information
            {activeTab === "profile" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded" />
            )}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab("activity")}
            className={`px-6 py-4 text-sm font-extrabold relative transition-colors cursor-pointer rounded-none hover:bg-transparent ${activeTab === "activity" ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
              }`}
          >
            Recent Activity
            {activeTab === "activity" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded" />
            )}
          </Button>
        </div>

        {/* Tab Content */}
        <div className="p-6 min-h-[160px]">
          {activeTab === "profile" ? (
            <p className="text-sm font-medium text-slate-600 leading-relaxed">
              {clientInfo.profileInformation}
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {clientInfo.recentActivity.map((act) => (
                <div key={act.id} className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <Clock className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700">{act.title}</span>
                      <span className="text-[11px] font-bold text-slate-400 mt-0.5">{act.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {act.amount && (
                      <span className="text-sm font-extrabold text-slate-800">{act.amount}</span>
                    )}
                    <span className={`px-2 py-0.5 text-[9px] font-extrabold uppercase rounded ${act.status === "Completed" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-blue-50 text-blue-600 border-blue-100"
                      }`}>
                      {act.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
