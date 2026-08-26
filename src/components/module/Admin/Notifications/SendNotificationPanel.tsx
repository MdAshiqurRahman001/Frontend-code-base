"use client";

import { useForm } from "react-hook-form";
import { User as UserType } from "@/types";
import { IndividualNotifData, GroupNotifData, SendType } from "./types";
import { Send, Loader2, Users, User, CheckCheck } from "lucide-react";

interface SendNotificationPanelProps {
  users: UserType[];
  sendType: SendType;
  onSendTypeChange: (type: SendType) => void;
  isSending: boolean;
  onSendIndividual: (data: IndividualNotifData) => Promise<void>;
  onSendGroup: (data: GroupNotifData) => Promise<void>;
}

export default function SendNotificationPanel({
  users,
  sendType,
  onSendTypeChange,
  isSending,
  onSendIndividual,
  onSendGroup,
}: SendNotificationPanelProps) {
  const indivForm = useForm<IndividualNotifData>();
  const groupForm = useForm<GroupNotifData>();

  const handleIndivSubmit = async (data: IndividualNotifData) => {
    await onSendIndividual(data);
    indivForm.reset();
  };

  const handleGroupSubmit = async (data: GroupNotifData) => {
    await onSendGroup(data);
    groupForm.reset();
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
      {/* Send Type Toggle */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onSendTypeChange("individual")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all cursor-pointer ${
            sendType === "individual"
              ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
              : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
          }`}
        >
          <User size={15} />
          Individual
        </button>
        <button
          type="button"
          onClick={() => onSendTypeChange("group")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all cursor-pointer ${
            sendType === "group"
              ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
              : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
          }`}
        >
          <Users size={15} />
          Group Broadcast
        </button>
      </div>

      {/* Individual Form */}
      {sendType === "individual" && (
        <form onSubmit={indivForm.handleSubmit(handleIndivSubmit)} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Select User *
            </label>
            <select
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
              {...indivForm.register("userId", { required: true })}
            >
              <option value="">— Select a user —</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.fullName ?? u.email} ({u.role})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
            <input
              placeholder="Notification title"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
              {...indivForm.register("title", { required: true })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
            <textarea
              rows={3}
              placeholder="Notification body text..."
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
              {...indivForm.register("body", { required: true })}
            />
          </div>
          <button
            type="submit"
            disabled={isSending}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-md hover:shadow-indigo-200 transition-all disabled:opacity-60 cursor-pointer"
          >
            {isSending ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Send size={14} /> Send Notification
              </>
            )}
          </button>
        </form>
      )}

      {/* Group Form */}
      {sendType === "group" && (
        <form onSubmit={groupForm.handleSubmit(handleGroupSubmit)} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Target Role (optional)
            </label>
            <select
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
              {...groupForm.register("role")}
            >
              <option value="">All Users</option>
              <option value="USER">Users only</option>
              <option value="ADMIN">Admins only</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
            <input
              placeholder="Broadcast title"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
              {...groupForm.register("title", { required: true })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
            <textarea
              rows={3}
              placeholder="Broadcast message..."
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
              {...groupForm.register("body", { required: true })}
            />
          </div>
          <button
            type="submit"
            disabled={isSending}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-md hover:shadow-indigo-200 transition-all disabled:opacity-60 cursor-pointer"
          >
            {isSending ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Sending…
              </>
            ) : (
              <>
                <CheckCheck size={14} /> Broadcast to All
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
