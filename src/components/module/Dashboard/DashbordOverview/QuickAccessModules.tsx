"use client";

import Link from "next/link";
import {
  FolderKanban,
  Package,
  CreditCard,
  MessageSquare,
  Sparkles,
  Users,
  ShieldCheck,
} from "lucide-react";

export default function QuickAccessModules() {
  const items = [
    {
      label: "Users List",
      href: "/dashboard/admin/users",
      icon: Users,
      color: "bg-blue-50 text-blue-600 hover:bg-blue-100/80 border-blue-100",
    },
    {
      label: "Projects",
      href: "/dashboard/projects",
      icon: FolderKanban,
      color: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100/80 border-indigo-100",
    },
    {
      label: "Packages",
      href: "/dashboard/packages",
      icon: Package,
      color: "bg-purple-50 text-purple-600 hover:bg-purple-100/80 border-purple-100",
    },
    {
      label: "Payments",
      href: "/dashboard/payments",
      icon: CreditCard,
      color: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100/80 border-emerald-100",
    },
    {
      label: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
      color: "bg-sky-50 text-sky-600 hover:bg-sky-100/80 border-sky-100",
    },
    {
      label: "Subscriptions",
      href: "/dashboard/subscriptions",
      icon: Sparkles,
      color: "bg-amber-50 text-amber-600 hover:bg-amber-100/80 border-amber-100",
    },
  ];

  return (
    <div>
      <h2 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-indigo-600" /> Quick Access Modules
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-2.5 p-4 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${item.color}`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-bold text-slate-700">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
