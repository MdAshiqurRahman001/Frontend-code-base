"use client";

import { DollarSign, Users, PenTool, FileClock, TrendingUp, TrendingDown } from "lucide-react";

export interface MetricItem {
  title: string;
  value: string;
  type: "revenue" | "users" | "creators" | "applications";
  change?: string;
  isPositive?: boolean;
}

interface MetricCardsProps {
  metrics: MetricItem[];
}

const themeMap = {
  revenue: {
    icon: DollarSign,
    bg: "bg-emerald-50 text-emerald-600",
    borderGlow: "group-hover:border-emerald-200",
    accentBar: "bg-gradient-to-r from-emerald-500 to-teal-400",
    defaultChange: "+18.4%",
    isPositive: true,
  },
  users: {
    icon: Users,
    bg: "bg-blue-50 text-blue-600",
    borderGlow: "group-hover:border-blue-200",
    accentBar: "bg-gradient-to-r from-blue-500 to-indigo-400",
    defaultChange: "+12.1%",
    isPositive: true,
  },
  creators: {
    icon: PenTool,
    bg: "bg-purple-50 text-purple-600",
    borderGlow: "group-hover:border-purple-200",
    accentBar: "bg-gradient-to-r from-purple-500 to-pink-400",
    defaultChange: "+9.4%",
    isPositive: true,
  },
  applications: {
    icon: FileClock,
    bg: "bg-amber-50 text-amber-600",
    borderGlow: "group-hover:border-amber-200",
    accentBar: "bg-gradient-to-r from-amber-500 to-orange-400",
    defaultChange: "+4 new",
    isPositive: true,
  },
};

export const MetricCards = ({ metrics }: MetricCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {metrics.map((metric, idx) => {
        const theme = themeMap[metric.type] || themeMap.revenue;
        const Icon = theme.icon;
        const change = metric.change || theme.defaultChange;
        const isPositive = metric.isPositive !== undefined ? metric.isPositive : theme.isPositive;

        return (
          <div
            key={idx}
            className={`relative group bg-white p-5 rounded-2xl border border-slate-100/90 shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between ${theme.borderGlow}`}
          >
            {/* Top Accent Gradient Bar */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${theme.accentBar}`} />

            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {metric.title}
              </span>
              <div className={`p-2.5 rounded-xl ${theme.bg} transition-transform duration-300 group-hover:scale-110`}>
                <Icon className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                {metric.value}
              </div>

              {/* Trend Pill */}
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                <span
                  className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md font-bold text-[10px] ${
                    isPositive
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {change}
                </span>
                <span>vs last month</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricCards;
