/**
 * ==============================================================================
 * 📌 DASHBOARD LAYOUT SHELL
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * This layout wraps all pages inside `/dashboard/...`. It renders:
 *  - The dynamic Sidebar on the left (`<AppSidebar />`)
 *  - The Top Header on the top (`<AppHeader />`)
 *  - The main page content (`{children}`)
 *  - Global toast notifications (`<Toaster />`)
 * ==============================================================================
 */

import AppHeader from "@/components/dashboardLayout/AppHeader";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";
import { Toaster } from "sonner";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen flex overflow-hidden font-inter-tight bg-slate-50/50">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 bg-slate-50/50">
          <AppHeader />
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto w-full">
              {children}
              <Toaster richColors position="top-center" />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
