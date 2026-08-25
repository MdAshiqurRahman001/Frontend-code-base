"use client";

import { User, CreditCard, Sparkles, FolderPlus } from "lucide-react";

export interface ActivityItem {
  name: string;
  action: string;
  time: string;
  avatarBg?: string;
  avatarColor?: string;
}

interface UserActivityProps {
  activities: ActivityItem[];
}

export const UserActivity = ({ activities = [] }: UserActivityProps) => {
  // Activity icon selector based on action keyword
  const getActivityIcon = (action: string) => {
    if (action.includes("subscription") || action.includes("plan")) {
      return <Sparkles className="w-3.5 h-3.5 text-purple-600" />;
    }
    if (action.includes("project") || action.includes("milestone")) {
      return <FolderPlus className="w-3.5 h-3.5 text-indigo-600" />;
    }
    if (action.includes("payout") || action.includes("payment")) {
      return <CreditCard className="w-3.5 h-3.5 text-emerald-600" />;
    }
    return <User className="w-3.5 h-3.5 text-blue-600" />;
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100/90 shadow-2xs flex flex-col h-full w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
            Live Platform Feed
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time creator & client actions
          </p>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </span>
      </div>

      <div className="relative flex-1 flex flex-col justify-between space-y-4">
        {/* Continuous timeline vertical line */}
        <div className="absolute left-[17px] top-3 bottom-3 w-[2px] bg-slate-100 -z-0" />

        {activities.map((activity, idx) => (
          <div
            key={idx}
            className="relative z-10 flex items-start gap-3.5 group transition-transform duration-200 hover:translate-x-1"
          >
            {/* Avatar / Icon circle */}
            <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center shrink-0 group-hover:border-indigo-300 transition-colors">
              {getActivityIcon(activity.action)}
            </div>

            {/* Activity Info */}
            <div className="flex-1 min-w-0">
              <div className="text-xs text-slate-600 leading-snug">
                <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {activity.name}
                </span>{" "}
                {activity.action}
              </div>
              <span className="text-[10px] font-semibold text-slate-400 mt-0.5 block">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserActivity;
