"use client";

import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { setUser, setToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/hooks/redux";
import Cookies from "js-cookie";

interface SignInFormData {
  email: string;
  password: string;
  remember: boolean;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_DEV_BASE_URL || "https://code-base-beta.vercel.app/api/v1";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({ defaultValues: { remember: true } });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const res = await loginUser({
        email: data.email,
        password: data.password,
      }).unwrap();

      const { token, userId, role, email, emailVerified } = res.data;

      // If email not verified, redirect to OTP page
      if (!emailVerified) {
        toast.warning("Please verify your email first.");
        router.push(`/auth/verify-otp?email=${encodeURIComponent(email)}`);
        return;
      }

      // Store token in cookie for middleware access
      Cookies.set("auth-token", token, {
        expires: data.remember ? 60 : undefined,
        sameSite: "lax",
      });

      // Fetch full profile then store in Redux
      dispatch(setToken(token));

      // Build minimal user object from login response
      dispatch(
        setUser({
          token,
          user: {
            id: userId,
            email,
            role: role as "ADMIN" | "USER",
            fullName: null,
            userName: null,
            phoneNumber: null,
            profileImage: null,
            coverImage: null,
            status: "ACTIVE",
            isSocialLogin: false,
            emailVerified: true,
            isBlocked: false,
            isDeleted: false,
            isApproved: false,
            isProfileComplete: null,
            lat: 0,
            lon: 0,
            suspendedUntil: null,
            lastLoginAt: null,
            onBoarding: false,
            fcmToken: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        })
      );

      toast.success("Welcome back! 👋");

      if (role === "ADMIN") {
        router.push("/dashboard/admin");
      } else {
        router.push(redirect);
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string; errorCode?: string } };
      const code = error?.data?.errorCode;
      const message = error?.data?.message;

      if (code === "EMAIL_NOT_VERIFIED") {
        // Extract email from form data
        toast.warning("Email not verified. Check your inbox for an OTP.");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { email: _email } = (err as { meta?: { email?: string } })?.meta || {};
        router.push(
          `/auth/verify-otp?email=${encodeURIComponent(data.email)}`
        );
        return;
      }

      toast.error(message || "Login failed. Please check your credentials.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/auth/google?role=USER`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${BASE_URL}/auth/facebook`;
  };

  return (
    <div className="w-full">
      {/* Social Login Buttons */}
      <div className="flex flex-col gap-3 mb-6">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-all duration-200 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>
        <button
          type="button"
          onClick={handleFacebookLogin}
          className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-blue-100 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-200 text-sm font-medium text-blue-700 shadow-sm hover:shadow-md"
        >
          <FaFacebook size={20} className="text-blue-600" />
          Continue with Facebook
        </button>
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs text-gray-400">
          <span className="bg-white px-3">or sign in with email</span>
        </div>
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email address
          </label>
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              placeholder="you@example.com"
              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.email
                  ? "border-red-300 focus:ring-red-200"
                  : "border-gray-200 focus:ring-indigo-200 focus:border-indigo-400"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>
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
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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

        {/* Remember Me */}
        <div className="flex items-center gap-2">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            {...register("remember")}
          />
          <label htmlFor="remember" className="text-sm text-gray-600">
            Keep me signed in
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      {/* Sign Up Link */}
      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
