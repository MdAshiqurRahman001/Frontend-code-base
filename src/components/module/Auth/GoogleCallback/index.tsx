"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux";
import { setToken, setUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";

function GoogleCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      toast.error("Google login failed. No token received.");
      router.push("/auth/signin");
      return;
    }

    try {
      // Decode JWT payload to get user info
      const payload = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      );

      // Store token in cookie for middleware
      Cookies.set("auth-token", token, { expires: 60, sameSite: "lax" });
      dispatch(setToken(token));

      // Set minimal user from JWT payload
      dispatch(
        setUser({
          token,
          user: {
            id: payload.id,
            email: payload.email,
            role: payload.role as "ADMIN" | "USER",
            fullName: null,
            userName: null,
            phoneNumber: null,
            profileImage: null,
            coverImage: null,
            status: "ACTIVE",
            isSocialLogin: true,
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

      toast.success("Signed in with Google 🎉");

      if (payload.role === "ADMIN") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard");
      }
    } catch {
      toast.error("Google login failed. Invalid token.");
      router.push("/auth/signin");
    }
  }, [searchParams, router, dispatch]);

  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <Loader2 size={40} className="animate-spin text-indigo-600" />
      <p className="text-gray-500 text-sm">Completing Google sign-in…</p>
    </div>
  );
}

export default function GoogleCallbackModule() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-12">
          <Loader2 size={40} className="animate-spin text-indigo-600" />
        </div>
      }
    >
      <GoogleCallbackInner />
    </Suspense>
  );
}
