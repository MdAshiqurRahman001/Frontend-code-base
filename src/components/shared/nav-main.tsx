"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: string | number;
  badgeColor?: string;
}

export interface NavSection {
  groupLabel?: string;
  items: NavItem[];
}

export function NavMain({
  sections,
  items,
}: {
  sections?: NavSection[];
  items?: NavItem[];
}) {
  const pathname = usePathname();

  // Support both legacy items array or grouped sections
  const activeSections: NavSection[] = sections || [
    {
      groupLabel: "MAIN MENU",
      items: items || [],
    },
  ];

  return (
    <div className="space-y-4">
      {activeSections.map((section, idx) => (
        <SidebarGroup key={idx} className="p-0">
          {section.groupLabel && (
            <SidebarGroupLabel className="px-3 text-[10px] font-extrabold tracking-wider text-slate-400 uppercase mb-1">
              {section.groupLabel}
            </SidebarGroupLabel>
          )}

          <SidebarMenu className="gap-1">
            {section.items.map((item) => {
              // Exact match for dashboard root, startsWith for child routes
              const isActive =
                item.url === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname === item.url ||
                    (item.url !== "/" && pathname.startsWith(item.url));

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={`h-10 px-3 rounded-xl transition-all duration-200 text-xs font-semibold ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700 hover:text-white"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <Link href={item.url} className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        {item.icon && (
                          <item.icon
                            className={`w-4 h-4 shrink-0 transition-transform ${
                              isActive ? "text-white scale-105" : "text-slate-400 group-hover:text-slate-700"
                            }`}
                          />
                        )}
                        <span className="truncate">{item.title}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                            isActive
                              ? "bg-white/20 text-white"
                              : item.badgeColor || "bg-indigo-50 text-indigo-600 border border-indigo-100"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </div>
  );
}

export default NavMain;
