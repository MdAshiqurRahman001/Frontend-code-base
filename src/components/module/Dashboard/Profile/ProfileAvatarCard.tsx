"use client";

import { useRef } from "react";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";
import { User } from "@/types";

interface ProfileAvatarCardProps {
  profile: Partial<User> | null;
  isUploading: boolean;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export default function ProfileAvatarCard({
  profile,
  isUploading,
  onPhotoChange,
}: ProfileAvatarCardProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const initials = profile?.fullName
    ? profile.fullName
        .split(" ")
        .map((p: string) => p[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : profile?.email?.[0]?.toUpperCase() ?? "U";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center gap-5">
        <div className="relative group">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center relative">
            {profile?.profileImage ? (
              <Image
                src={profile.profileImage}
                alt="Profile"
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-white">{initials}</span>
            )}
          </div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={isUploading}
            className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:opacity-50"
          >
            {isUploading ? (
              <Loader2 size={20} className="text-white animate-spin" />
            ) : (
              <Camera size={20} className="text-white" />
            )}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onPhotoChange}
          />
        </div>
        <div>
          <h2 className="font-semibold text-gray-900 text-lg">
            {profile?.fullName ?? "Your Name"}
          </h2>
          <p className="text-sm text-gray-500">{profile?.email}</p>
          <div className="flex gap-2 mt-2">
            <span className="text-xs font-medium bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full capitalize">
              {profile?.role?.toLowerCase()}
            </span>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
                profile?.isApproved
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {profile?.isApproved ? "Approved" : "Pending"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
