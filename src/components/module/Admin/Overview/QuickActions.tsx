"use client";

import Link from "next/link";
import { Users, CreditCard, Bell, UserCheck } from "lucide-react";

interface ActionItem {
  label: string;
  href: string;
  icon: React.ElementType;
  color: string;
}

const actionItems: ActionItem[] = [
  {
    label: "Manage Users",
    href: "/dashboard/admin/users",
    icon: Users,
    color: "from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-700",
  },
  {
    label: "Subscriptions",
    href: "/dashboard/admin/subscriptions",
    icon: CreditCard,
    color: "from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-700",
  },
  {
    label: "Notifications",
    href: "/dashboard/admin/notifications",
    icon: Bell,
    color: "from-sky-50 to-sky-100 border-sky-200 text-sky-700",
  },
  {
    label: "Approve Users",
    href: "/dashboard/admin/users?isApproved=false",
    icon: UserCheck,
    color: "from-amber-50 to-amber-100 border-amber-200 text-amber-700",
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actionItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border bg-gradient-to-br ${item.color} hover:shadow-md transition-all duration-200`}
            >
              <Icon size={20} />
              <span className="text-xs font-semibold text-center">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
