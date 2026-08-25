/**
 * ==============================================================================
 * 📌 STARTER PACK NAVBAR (src/components/common/Navbar/Navbar.tsx)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * The top navigation bar for the public starter pack website.
 * Includes logo, quick links, mobile drawer, and links to Auth and Dashboard.
 * ==============================================================================
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Code2,
  Layers,
  Sparkles,
  Terminal,
  Menu,
  ArrowRight,
  LayoutDashboard,
  LogIn,
} from "lucide-react";

const navigationLinks = [
  { name: "Tech Stack", href: "#stack", icon: Layers },
  { name: "Features", href: "#features", icon: Sparkles },
  { name: "Quickstart", href: "#quickstart", icon: Terminal },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* 1. Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black text-slate-900 tracking-tight flex items-center gap-1">
              Next<span className="text-indigo-600">Starter</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-400 -mt-1 tracking-wider uppercase">
              Fullstack Boilerplate
            </span>
          </div>
        </Link>

        {/* 2. Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-50 p-1 rounded-full border border-slate-100">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-4 py-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 hover:bg-white rounded-full transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* 3. Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/auth/signin"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-xl transition-colors"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-indigo-500/20 transition-all hover:-translate-y-0.5"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Demo</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </Link>
        </div>

        {/* 4. Mobile Menu Drawer */}
        <div className="sm:hidden flex items-center gap-2">
          <Link
            href="/dashboard"
            className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
          >
            Dashboard
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
                <Menu className="h-5 w-5 text-slate-700" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-white p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 pb-6 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-slate-900">NextStarter</span>
                </div>

                <nav className="flex flex-col gap-2 mt-6">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-xl transition-all"
                    >
                      <link.icon className="w-4 h-4 text-slate-400" />
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-2 pt-6 border-t border-slate-100">
                <Link
                  href="/auth/signin"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 text-center text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl border border-slate-200"
                >
                  Sign In Demo
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 text-center text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm"
                >
                  Open Dashboard
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
