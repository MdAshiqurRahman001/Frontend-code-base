"use client";

import { useState, useEffect, useRef } from "react";
import { useAppSelector } from "@/hooks/redux";
import { selectCurrentToken, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserListQuery } from "@/redux/api/userApi";
import { useWebSocket } from "@/hooks/useWebSocket";
import { Chat, User } from "@/types";
import { Send, MessageSquare, Loader2, Image as ImageIcon, Wifi, WifiOff } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "@/components/dashboard/dateUtils";

export default function MessagesPage() {
  const token = useAppSelector(selectCurrentToken);
  const currentUser = useAppSelector(selectCurrentUser);
  const {
    isConnected,
    messages,
    onlineUsers,
    sendMessage,
    fetchChats,
    requestOnlineUsers,
    clearMessages,
  } = useWebSocket(token);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: usersData, isLoading: isLoadingUsers } = useGetUserListQuery(
    { limit: 50 },
    { skip: !token }
  );
  const users = (usersData?.data?.data ?? []).filter((u) => u.id !== currentUser?.id);

  useEffect(() => {
    if (isConnected) {
      requestOnlineUsers();
    }
  }, [isConnected, requestOnlineUsers]);

  useEffect(() => {
    if (selectedUser && isConnected) {
      clearMessages();
      fetchChats(selectedUser.id);
    }
  }, [selectedUser, isConnected, clearMessages, fetchChats]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !selectedUser) return;
    sendMessage(selectedUser.id, input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isOnline = (userId: string) =>
    onlineUsers.some((u) => u.id === userId);

  const initials = (user: User) =>
    (user.fullName ?? user.email)
      .split(" ")
      .map((p) => p[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Contact List */}
      <div className="w-72 flex-shrink-0 border-r border-gray-100 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-semibold text-gray-900">Messages</h2>
            <div className={`flex items-center gap-1 text-xs ${isConnected ? "text-emerald-600" : "text-red-500"}`}>
              {isConnected ? <Wifi size={12} /> : <WifiOff size={12} />}
              {isConnected ? "Live" : "Offline"}
            </div>
          </div>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto">
          {isLoadingUsers ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 size={20} className="animate-spin text-gray-400" />
            </div>
          ) : users.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-400">No users found</div>
          ) : (
            users.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left ${
                  selectedUser?.id === user.id ? "bg-indigo-50 border-r-2 border-r-indigo-500" : ""
                }`}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                    {user.profileImage ? (
                      <Image src={user.profileImage} alt={user.fullName ?? "User"} fill className="object-cover" />
                    ) : (
                      <span className="text-sm font-bold text-white">{initials(user)}</span>
                    )}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${isOnline(user.id) ? "bg-emerald-500" : "bg-gray-300"}`} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.fullName ?? user.email}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {isOnline(user.id) ? "Online" : "Offline"} · {user.role?.toLowerCase()}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {!selectedUser ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-400">
            <MessageSquare size={48} className="opacity-20" />
            <p className="text-sm">Select a conversation to start messaging</p>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 bg-white">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                  {selectedUser.profileImage ? (
                    <Image src={selectedUser.profileImage} alt={selectedUser.fullName ?? "User"} fill className="object-cover" />
                  ) : (
                    <span className="text-sm font-bold text-white">{initials(selectedUser)}</span>
                  )}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${isOnline(selectedUser.id) ? "bg-emerald-500" : "bg-gray-300"}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {selectedUser.fullName ?? selectedUser.email}
                </p>
                <p className="text-xs text-gray-400">
                  {isOnline(selectedUser.id) ? "Online now" : "Offline"}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 bg-gray-50">
              {messages.length === 0 && (
                <div className="flex flex-col items-center gap-2 py-10 text-gray-400">
                  <MessageSquare size={32} className="opacity-20" />
                  <p className="text-xs">No messages yet. Say hello!</p>
                </div>
              )}
              {messages.map((msg: Chat) => {
                const isMe = msg.senderId === currentUser?.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-3.5 py-2.5 rounded-2xl text-sm shadow-sm ${
                        isMe
                          ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-sm"
                          : "bg-white text-gray-800 border border-gray-100 rounded-bl-sm"
                      }`}
                    >
                      {msg.imageUrl && (
                        <div className="relative w-48 h-32 mb-2 rounded-lg overflow-hidden">
                          <Image src={msg.imageUrl} alt="Shared image" fill className="object-cover" />
                        </div>
                      )}
                      {msg.message && <p>{msg.message}</p>}
                      <p className={`text-[10px] mt-1 ${isMe ? "text-indigo-200" : "text-gray-400"}`}>
                        {formatDistanceToNow(msg.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-2">
                <button
                  className="p-2.5 rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  title="Attach image"
                >
                  <ImageIcon size={18} />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Message ${selectedUser.fullName ?? "user"}…`}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || !isConnected}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-indigo-200 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
