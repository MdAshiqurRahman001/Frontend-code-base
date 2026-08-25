/**
 * ==============================================================================
 * 📌 STARTER PACK FOOTER (src/components/common/Footer/Footer.tsx)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * Clean developer footer with helpful links to Dashboard, Auth, and Docs.
 * ==============================================================================
 */

"use client";

import Link from "next/link";
import { Code2, Github, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-slate-100 bg-slate-900 text-slate-400 w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Code2 className="w-4 h-4" />
            </div>
            <span className="text-base font-black text-white">NextStarter</span>
          </Link>

          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold">
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/dashboard/admin/users" className="hover:text-white transition-colors">
              Users Table
            </Link>
            <Link href="/auth/signin" className="hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/auth/signup" className="hover:text-white transition-colors">
              Sign Up
            </Link>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <Link href="https://github.com" className="p-2 hover:bg-slate-800 rounded-lg hover:text-white transition-colors">
              <Github className="w-4 h-4" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://twitter.com" className="p-2 hover:bg-slate-800 rounded-lg hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NextStarter. Open-source starter pack.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Built with Next.js 16 & Redux Toolkit</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
