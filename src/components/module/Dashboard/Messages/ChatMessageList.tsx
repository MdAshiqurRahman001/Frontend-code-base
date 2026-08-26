"use client";

import { DemoMessage } from "@/constants/demoData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCheck } from "lucide-react";

interface ChatMessageListProps {
  messages: DemoMessage[];
}

export default function ChatMessageList({ messages }: ChatMessageListProps) {
  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[440px]">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex gap-3 items-end ${
            msg.isMe ? "justify-end" : "justify-start"
          }`}
        >
          {!msg.isMe && (
            <Avatar className="h-7 w-7 mb-1">
              <AvatarImage src={msg.senderAvatar} alt={msg.senderName} />
              <AvatarFallback className="text-[10px] font-bold">
                {msg.senderName?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
          )}

          <div
            className={`max-w-[70%] p-3.5 rounded-2xl text-xs leading-relaxed ${
              msg.isMe
                ? "bg-indigo-600 text-white rounded-br-none shadow-2xs"
                : "bg-white text-slate-700 border border-slate-100 rounded-bl-none shadow-2xs"
            }`}
          >
            <p>{msg.text}</p>
            <div
              className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${
                msg.isMe ? "text-indigo-200" : "text-slate-400"
              }`}
            >
              <span>{msg.timestamp}</span>
              {msg.isMe && <CheckCheck className="w-3 h-3" />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
