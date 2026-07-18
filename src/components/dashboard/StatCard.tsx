"use client";

import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  color?: "indigo" | "emerald" | "amber" | "rose" | "sky";
}

const colorMap = {
  indigo: {
    bg: "bg-indigo-50",
    icon: "bg-indigo-100 text-indigo-600",
    badge: "bg-indigo-600",
    text: "text-indigo-700",
  },
  emerald: {
    bg: "bg-emerald-50",
    icon: "bg-emerald-100 text-emerald-600",
    badge: "bg-emerald-600",
    text: "text-emerald-700",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "bg-amber-100 text-amber-600",
    badge: "bg-amber-600",
    text: "text-amber-700",
  },
  rose: {
    bg: "bg-rose-50",
    icon: "bg-rose-100 text-rose-600",
    badge: "bg-rose-600",
    text: "text-rose-700",
  },
  sky: {
    bg: "bg-sky-50",
    icon: "bg-sky-100 text-sky-600",
    badge: "bg-sky-600",
    text: "text-sky-700",
  },
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "indigo",
}: StatCardProps) {
  const colors = colorMap[color];
  const isPositive = (trend?.value ?? 0) >= 0;

  return (
    <div className={`rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 bg-white`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${colors.icon}`}>
          <Icon size={20} />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
              isPositive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            {isPositive ? (
              <TrendingUp size={12} />
            ) : (
              <TrendingDown size={12} />
            )}
            {Math.abs(trend.value)}% {trend.label}
          </div>
        )}
      </div>

      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      {subtitle && (
        <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
      )}
    </div>
  );
}
