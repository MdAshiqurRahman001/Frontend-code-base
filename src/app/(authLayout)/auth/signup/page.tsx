import React from "react";
import type { Metadata } from "next";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Create Account | App",
  description: "Register a new account to get started.",
};

export default function SignUpPage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Create your account
        </h2>
        <p className="text-gray-500 text-sm">
          Get started for free today. No credit card required.
        </p>
      </div>
      <SignUpForm />
    </div>
  );
}
