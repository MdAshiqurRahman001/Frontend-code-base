/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import NRInput from "@/components/form/NRInput";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useLoginMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setCookie } from "@/utils/cookies";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type LoginFormValues = z.infer<typeof schema>;

interface CustomJwtPayload extends JwtPayload {
  role?: string;
  id?: string;
  email?: string;
}

const AdminLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = (await login(data).unwrap()) as any;

      if (res.success) {
        const token = res.data.token;
        await setCookie(token);

        const user = jwtDecode<CustomJwtPayload>(token);
        dispatch(setUser({ token, user: user as any }));

        toast.success(res.message || "Login successful!");

        if (user?.role === "Admin" || user?.role === "ADMIN") {
          router.push("/dashboard/admin");
        } else {
          router.push("/dashboard");
        }
      } else {
        toast.error(res.message || "Login failed");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/images/login.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" />

      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl z-10">
        <Link href="/" className="inline-block w-full text-center mb-6">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={120}
            height={120}
            className="mx-auto w-[90px] h-[90px] object-contain rounded-2xl"
            priority
          />
        </Link>

        <h1 className="text-center text-2xl font-bold text-gray-900 mb-2">
          Admin Portal
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Sign in to manage your platform
        </p>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <NRInput
              control={form.control}
              name="email"
              label="Email"
              icon={Mail}
              type="email"
              placeholder="admin@example.com"
            />

            <NRInput
              control={form.control}
              name="password"
              label="Password"
              icon={Lock}
              type="password"
              placeholder="••••••••"
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 mt-6 font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md transition-all"
            >
              {isLoading ? <Spinner /> : "Sign In"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AdminLogin;
