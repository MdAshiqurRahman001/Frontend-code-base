import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth | App",
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex-col items-center justify-center p-12">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, #818cf8, transparent)" }}
          />
          <div
            className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }}
          />
          <div
            className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #38bdf8, transparent)" }}
          />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center max-w-md">
          {/* Logo mark */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-6 shadow-2xl">
            <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
              <rect width="32" height="32" rx="8" fill="url(#grad)" />
              <path
                d="M8 16 L16 8 L24 16 L16 24 Z"
                fill="white"
                fillOpacity="0.9"
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-white mb-3 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              AppPlatform
            </span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-10">
            Manage your account, subscriptions, and communications all in one place.
          </p>

          {/* Feature badges */}
          <div className="flex flex-col gap-3 text-left">
            {[
              { icon: "🔒", text: "Secure authentication with OTP verification" },
              { icon: "🔔", text: "Real-time notifications and messaging" },
              { icon: "💳", text: "Flexible subscription management" },
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/8 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3"
              >
                <span className="text-xl">{f.icon}</span>
                <span className="text-sm text-slate-200">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
              <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
                <path d="M8 16 L16 8 L24 16 L16 24 Z" fill="white" fillOpacity="0.9" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">AppPlatform</span>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
