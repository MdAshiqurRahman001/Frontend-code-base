"use client";

import { Suspense } from "react";
import OtpInput from "@/components/auth/OtpInput";

export default function VerifyOtpModule() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Verify your email
        </h2>
        <p className="text-gray-500 text-sm">
          Enter the one-time code we sent to your email address.
        </p>
      </div>
      <Suspense>
        <OtpInput />
      </Suspense>
    </div>
  );
}
