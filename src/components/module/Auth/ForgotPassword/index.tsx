"use client";

import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordModule() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Forgot your password?
        </h2>
        <p className="text-gray-500 text-sm">
          No worries! Enter your email and we&apos;ll send you a reset OTP.
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
