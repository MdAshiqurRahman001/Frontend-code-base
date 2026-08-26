"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { User as UserType } from "@/types";
import { ProfileFormData } from "./types";
import { User, Mail, Phone, Loader2, Save } from "lucide-react";

interface ProfileDetailsFormProps {
  profile: Partial<UserType> | null;
  isUpdating: boolean;
  onSubmit: (data: ProfileFormData) => Promise<void>;
}

export default function ProfileDetailsForm({
  profile,
  isUpdating,
  onSubmit,
}: ProfileDetailsFormProps) {
  const { register, handleSubmit, reset } = useForm<ProfileFormData>({
    defaultValues: {
      fullName: profile?.fullName ?? "",
      phoneNumber: profile?.phoneNumber ?? "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.fullName ?? "",
        phoneNumber: profile.phoneNumber ?? "",
      });
    }
  }, [profile, reset]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 text-sm transition-all"
              {...register("fullName")}
            />
          </div>
        </div>

        {/* Email (readonly) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={profile?.email ?? ""}
              readOnly
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-sm text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone number</label>
          <div className="relative">
            <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 text-sm transition-all"
              {...register("phoneNumber")}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-md hover:shadow-indigo-200 transition-all disabled:opacity-60 cursor-pointer"
        >
          {isUpdating ? (
            <>
              <Loader2 size={15} className="animate-spin" /> Saving…
            </>
          ) : (
            <>
              <Save size={15} /> Save Changes
            </>
          )}
        </button>
      </form>
    </div>
  );
}
