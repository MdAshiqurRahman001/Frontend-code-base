import React, { Suspense } from "react";
import type { Metadata } from "next";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password | App",
  description: "Enter your OTP and new password to reset your account password.",
};

export default function ResetPasswordPage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Reset your password
        </h2>
        <p className="text-gray-500 text-sm">
          Enter the OTP from your email and choose a new password.
        </p>
      </div>
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
