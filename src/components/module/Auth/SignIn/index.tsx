"use client";

import { Suspense } from "react";
import SignInForm from "@/components/auth/SignInForm";

export default function SignInModule() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Sign in to your account
        </h2>
        <p className="text-gray-500 text-sm">
          Welcome back! Please enter your details.
        </p>
      </div>
      <Suspense>
        <SignInForm />
      </Suspense>
    </div>
  );
}
