"use client";

import { useRef, useState, KeyboardEvent, ClipboardEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, RefreshCw } from "lucide-react";
import { useVerifyOtpMutation, useResendOtpMutation } from "@/redux/api/authApi";
import { setToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/hooks/redux";
import Cookies from "js-cookie";

const OTP_LENGTH = 4;
const OTP_EXPIRY_SECONDS = 300; // 5 minutes

export default function OtpInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const dispatch = useAppDispatch();

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(OTP_EXPIRY_SECONDS);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = cleaned;
    setOtp(next);
    if (cleaned && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((ch, i) => (next[i] = ch));
    setOtp(next);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      toast.warning(`Please enter all ${OTP_LENGTH} digits.`);
      return;
    }

    try {
      const res = await verifyOtp({ email, otp: Number(code) }).unwrap();
      const token = res.data.Token;

      Cookies.set("auth-token", token, { expires: 60, sameSite: "lax" });
      dispatch(setToken(token));

      toast.success("Email verified! Welcome aboard 🎉");
      router.push("/dashboard");
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      await resendOtp({ email }).unwrap();
      setTimer(OTP_EXPIRY_SECONDS);
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
      toast.success("New OTP sent to your email!");
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to resend OTP.");
    }
  };

  const isFilled = otp.every((d) => d !== "");

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Email display */}
      <p className="text-sm text-gray-500 text-center">
        We sent a {OTP_LENGTH}-digit code to{" "}
        <span className="font-semibold text-gray-800">{email}</span>
      </p>

      {/* OTP Inputs */}
      <div className="flex gap-3">
        {Array.from({ length: OTP_LENGTH }).map((_, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otp[i]}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className="w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200"
          />
        ))}
      </div>

      {/* Timer */}
      <div className="flex items-center gap-1 text-sm text-gray-500">
        {timer > 0 ? (
          <>
            <span>Code expires in</span>
            <span className="font-semibold text-indigo-600 tabular-nums">
              {formatTime(timer)}
            </span>
          </>
        ) : (
          <span className="text-red-500">Code expired</span>
        )}
      </div>

      {/* Verify Button */}
      <button
        type="button"
        onClick={handleVerify}
        disabled={isVerifying || !isFilled}
        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold shadow-lg shadow-indigo-200 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isVerifying ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Verifying…
          </>
        ) : (
          "Verify OTP"
        )}
      </button>

      {/* Resend */}
      <button
        type="button"
        onClick={handleResend}
        disabled={isResending || timer > 0}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RefreshCw size={14} className={isResending ? "animate-spin" : ""} />
        {isResending ? "Sending…" : "Resend OTP"}
      </button>
    </div>
  );
}
