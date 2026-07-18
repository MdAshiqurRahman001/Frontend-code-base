"use client";

import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { useVerifyOtpMutation, useResetPasswordMutation } from "@/redux/api/authApi";

interface ResetPasswordFormData {
  otp: string;
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resetPassword, { isLoading: isResetting }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();

  // eslint-disable-next-line react-hooks/incompatible-library
  const password = watch("password");
  const isLoading = isVerifying || isResetting;

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      // Step 1: Verify OTP (this also marks emailVerified = true and clears otp)
      await verifyOtp({ email, otp: Number(data.otp) }).unwrap();

      // Step 2: Reset password
      await resetPassword({ email, password: data.password }).unwrap();

      toast.success("Password reset successfully! You can now sign in.");
      router.push("/auth/signin");
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Reset failed. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <p className="text-sm text-gray-500 mb-5 text-center">
        Enter the OTP sent to{" "}
        <span className="font-semibold text-gray-800">{email}</span> and your
        new password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* OTP */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            OTP code
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            placeholder="1234"
            className={`w-full text-center tracking-[0.5em] text-xl font-bold py-3 px-4 rounded-xl border bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.otp
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-200 focus:ring-indigo-200 focus:border-indigo-400"
            }`}
            {...register("otp", {
              required: "OTP is required",
              minLength: { value: 4, message: "Enter 4-digit OTP" },
              maxLength: { value: 4, message: "Enter 4-digit OTP" },
              pattern: { value: /^\d{4}$/, message: "OTP must be 4 digits" },
            })}
          />
          {errors.otp && (
            <p className="mt-1 text-xs text-red-500">{errors.otp.message}</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            New password
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.password
                  ? "border-red-300 focus:ring-red-200"
                  : "border-gray-200 focus:ring-indigo-200 focus:border-indigo-400"
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Confirm new password
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.confirmPassword
                  ? "border-red-300 focus:ring-red-200"
                  : "border-gray-200 focus:ring-indigo-200 focus:border-indigo-400"
              }`}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (v) => v === password || "Passwords do not match",
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((p) => !p)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold shadow-lg shadow-indigo-200 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Resetting…
            </>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        <Link
          href="/auth/forgot-password"
          className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
        >
          ← Back to forgot password
        </Link>
      </p>
    </div>
  );
}
