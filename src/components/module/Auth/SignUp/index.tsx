"use client";

import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpModule() {
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
