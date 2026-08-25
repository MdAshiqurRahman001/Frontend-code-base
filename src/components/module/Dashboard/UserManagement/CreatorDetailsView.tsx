"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Calendar,
  MapPin,
  Phone,
  CheckCircle2,
  Ban,
  Clock,
  Camera,
  Video,
  Cpu,
} from "lucide-react";
import { mockUsers, mockCreatorDetails, CreatorDetails } from "@/components/module/Dashboard/UserManagement/mockData";
import { Button } from "@/components/ui/button";

export interface CreatorDetailsViewProps {
  user: typeof mockUsers[0];
  id: string;
}

export function CreatorDetailsView({ user, id }: CreatorDetailsViewProps) {
  // Fetch creator data, fallback if missing
  const creatorInfo: CreatorDetails = mockCreatorDetails[id] || {
    title: "Freelance Creative",
    avatarUrl: "/images/elena_profile.png",
    location: "Global / Remote",
    jobsCompleted: 12,
    averageRating: "4.5",
    responseTime: "3h",
    completionRate: "100%",
    overview: `${user.name} is an active digital creator registered on the platform, providing content and marketing assets. Details are currently being synthesized.`,
    verified: false,
    payoutSummary: {
      totalEarned: "$3,400.00",
      pendingPayout: "$450.00",
      platformFees: "$340.00",
      lastPayout: {
        date: "Jul 01, 2026",
        amount: "$800.00"
      }
    },
    portfolio: [
      "/images/portfolio_main.png",
      "/images/portfolio_geometry.png",
      "/images/portfolio_mono.png"
    ],
    equipment: ["Professional Camera Kit", "Video Equipment", "Studio Lighting"],
    serviceAreas: {
      region: "Remote Service Area",
      places: ["Global"],
      mapUrl: "/images/la_map.png"
    }
  };

  // State handles for micro-interactions
  const [isVerified, setIsVerified] = useState(creatorInfo.verified);
  const [userStatus, setUserStatus] = useState<"active" | "suspended">(user.status);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleVerification = () => {
    setIsVerified(prev => !prev);
    triggerToast(!isVerified ? "Creator verification status revoked." : "Creator verification status approved.");
  };

  const toggleSuspend = () => {
    const nextStatus = userStatus === "active" ? "suspended" : "active";
    setUserStatus(nextStatus);
    triggerToast(nextStatus === "suspended" ? "Creator account has been suspended." : "Creator account has been activated.");
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 mb-20 relative">
      {/* Toast Notification Box */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl z-50 border border-slate-800 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          {toastMessage}
        </div>
      )}

      {/* Header and Back Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/user/dashboard/users">
            <Button variant="ghost" className="p-2 bg-white border border-slate-100 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-sm cursor-pointer active:scale-90">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          {/* Avatar and name in header */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-100 shadow-sm shrink-0">
              <img
                src={creatorInfo.avatarUrl}
                alt={user.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150";
                }}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight leading-none">
                {user.name}
              </h1>
              <span className="text-xs font-bold text-slate-400 mt-1.5 leading-none">
                {creatorInfo.title} • {creatorInfo.location}
              </span>
            </div>
          </div>
        </div>

        {/* Admin profile widget */}
        <div className="flex items-center gap-3 bg-white pl-3 pr-4 py-1.5 rounded-full border border-slate-100 shadow-sm w-fit self-end md:self-auto">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xs shadow-sm border border-white">
            AU
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-700 leading-none">Admin User</span>
          </div>
        </div>
      </div>

      {/* KPI Performance Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Jobs Completed</span>
          <span className="text-2xl font-extrabold text-slate-800 mt-3 leading-none">{creatorInfo.jobsCompleted}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Average Rating</span>
          <span className="text-2xl font-extrabold text-slate-800 mt-3 leading-none">{creatorInfo.averageRating} <span className="text-xs font-semibold text-slate-400">/ 5.0</span></span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Response Time</span>
          <span className="text-2xl font-extrabold text-slate-800 mt-3 leading-none">{creatorInfo.responseTime}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Completion Rate</span>
          <span className="text-2xl font-extrabold text-slate-800 mt-3 leading-none">{creatorInfo.completionRate}</span>
        </div>
      </div>

      {/* Core Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Double-Column Side */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Profile Overview */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <h2 className="text-base font-extrabold text-slate-800 tracking-tight mb-4">Profile Overview</h2>
            <p className="text-sm font-medium text-slate-500 leading-relaxed mb-6">
              {creatorInfo.overview}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-50 pt-5">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-blue-50/50 border border-blue-50 shrink-0">
                  <MapPin className="w-4 h-4 text-blue-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">Location</span>
                  <span className="text-xs font-bold text-slate-700 mt-1 leading-none">{creatorInfo.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-indigo-50/50 border border-indigo-50 shrink-0">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">Joined Date</span>
                  <span className="text-xs font-bold text-slate-700 mt-1 leading-none">March 14, 2022</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-emerald-50/50 border border-emerald-50 shrink-0">
                  <Mail className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">Email Address</span>
                  <span className="text-xs font-bold text-slate-700 mt-1 leading-none">{user.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-purple-50/50 border border-purple-50 shrink-0">
                  <Phone className="w-4 h-4 text-purple-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">Phone Number</span>
                  <span className="text-xs font-bold text-slate-700 mt-1 leading-none">{user.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Highlights */}
          {creatorInfo.portfolio && creatorInfo.portfolio.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-base font-extrabold text-slate-800 tracking-tight mb-4">Portfolio Highlights</h2>

              <div className="grid grid-cols-3 gap-3">
                {/* Main large visual on left */}
                <div className="col-span-2 row-span-2 relative aspect-[3/4] overflow-hidden rounded-2xl shadow-inner border border-slate-100">
                  <img
                    src={creatorInfo.portfolio[0]}
                    alt="Portfolio Spotlight"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                {/* Right columns */}
                {creatorInfo.portfolio[1] && (
                  <div className="relative aspect-square overflow-hidden rounded-2xl shadow-inner border border-slate-100">
                    <img
                      src={creatorInfo.portfolio[1]}
                      alt="Portfolio Item 2"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                )}
                {creatorInfo.portfolio[2] && (
                  <div className="relative aspect-square overflow-hidden rounded-2xl shadow-inner border border-slate-100">
                    <img
                      src={creatorInfo.portfolio[2]}
                      alt="Portfolio Item 3"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                )}
                {/* Bottom row squares */}
                {creatorInfo.portfolio[3] && (
                  <div className="relative aspect-square overflow-hidden rounded-2xl shadow-inner border border-slate-100">
                    <img
                      src={creatorInfo.portfolio[3]}
                      alt="Portfolio Item 4"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                )}
                {creatorInfo.portfolio[4] && (
                  <div className="relative aspect-square overflow-hidden rounded-2xl shadow-inner border border-slate-100">
                    <img
                      src={creatorInfo.portfolio[4]}
                      alt="Portfolio Item 5"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                )}
                {creatorInfo.portfolio[5] && (
                  <div className="relative aspect-square overflow-hidden rounded-2xl shadow-inner border border-slate-100">
                    <img
                      src={creatorInfo.portfolio[5]}
                      alt="Portfolio Item 6"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Equipment Inventory */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-base font-extrabold text-slate-800 tracking-tight mb-4">Equipment Inventory</h2>
            <div className="flex flex-col gap-2">
              {creatorInfo.equipment.map((item, idx) => {
                // Return icons depending on content
                const isCamera = item.toLowerCase().includes("camera") || item.toLowerCase().includes("sony") || item.toLowerCase().includes("fujifilm") || item.toLowerCase().includes("lens");
                const isVideo = item.toLowerCase().includes("drone") || item.toLowerCase().includes("komodo") || item.toLowerCase().includes("ronin") || item.toLowerCase().includes("mic");

                return (
                  <div key={idx} className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl text-slate-700 text-xs font-bold hover:bg-slate-100/50 transition-colors">
                    {isCamera ? (
                      <Camera className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : isVideo ? (
                      <Video className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <Cpu className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Admin controls / details Column */}
        <div className="flex flex-col gap-6">

          {/* Admin Control */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">Admin Control</span>

            {/* Verification banner */}
            <div className="flex items-center justify-between p-3.5 bg-emerald-50/60 border border-emerald-100 rounded-xl mb-4 transition-all">
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 ${isVerified ? "text-emerald-500 fill-emerald-500/10" : "text-slate-300"}`} />
                <span className="text-xs font-bold text-slate-700">Verified Creator</span>
              </div>
              <Button
                variant="ghost"
                onClick={toggleVerification}
                className="px-3 py-1 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-[10px] font-extrabold text-slate-600 transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                {isVerified ? "Revoke" : "Verify"}
              </Button>
            </div>

            {/* Suspend Account Button */}
            <Button
              variant="ghost"
              onClick={toggleSuspend}
              className={`flex items-center justify-center gap-2 w-full py-3.5 border rounded-xl text-xs font-extrabold transition-all cursor-pointer active:scale-[0.98] ${userStatus === "suspended"
                ? "bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-500 shadow-md"
                : "bg-white border-rose-200 hover:border-rose-300 hover:bg-rose-50/50 text-rose-500"
                }`}
            >
              <Ban className="w-4 h-4" />
              {userStatus === "suspended" ? "Activate Creator" : "Suspend Creator"}
            </Button>
          </div>

          {/* Payout Summary */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">Payout Summary</span>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Total Earned</span>
                <span className="text-sm font-extrabold text-slate-800">{creatorInfo.payoutSummary.totalEarned}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Pending Payout</span>
                <span className="text-sm font-extrabold text-blue-600">{creatorInfo.payoutSummary.pendingPayout}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Platform Fees</span>
                <span className="text-sm font-extrabold text-slate-800">{creatorInfo.payoutSummary.platformFees}</span>
              </div>

              {/* Last Payout Block */}
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-3 rounded-xl mt-3">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-400 uppercase leading-none">Last Payout</span>
                  <span className="text-xs font-extrabold text-slate-700 mt-1 leading-none">
                    {creatorInfo.payoutSummary.lastPayout.date} • {creatorInfo.payoutSummary.lastPayout.amount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">Service Areas</span>

            {/* Map Placeholder */}
            <div className="relative w-full h-40 rounded-xl overflow-hidden border border-slate-100 mb-4 bg-slate-100 shadow-inner group">
              <img
                src={creatorInfo.serviceAreas.mapUrl}
                alt="Service Location Map"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/5 flex items-center justify-center">
                <div className="w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white ring-4 ring-blue-600/30 animate-pulse shadow-md" />
              </div>
            </div>

            {/* Region Details */}
            <span className="text-xs font-extrabold text-slate-700 leading-snug">Primary Region</span>
            <span className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">{creatorInfo.serviceAreas.region}</span>

            {/* Place Badges */}
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-50">
              {creatorInfo.serviceAreas.places.map((place, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-100 transition-colors select-none">
                  {place}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
