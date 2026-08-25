/**
 * ==============================================================================
 * 📌 MESSAGES & CHAT PAGE (/dashboard/messages)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * This is an interactive direct messaging & live chat interface.
 *
 * 🛠️ DUAL-MODE DYNAMIC API INTEGRATION:
 *  - Live Mode: Connects to `chatApi` (`getConversations`, `sendMessage`)
 *  - Demo Mode: Falls back to `DEMO_CHAT_CONTACTS` with auto-reply simulation
 * ==============================================================================
 */

/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/purity */
"use client";

import { useState } from "react";
import { DEMO_CHAT_CONTACTS, DemoChatContact, DemoMessage } from "@/constants/demoData";
import { useGetConversationsQuery, useSendMessageMutation } from "@/redux/api/chatApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, Send, CheckCheck, Smile } from "lucide-react";
import { toast } from "sonner";

export default function MessagesPage() {
  const { data: apiChatData } = useGetConversationsQuery();
  const [sendMessageApi] = useSendMessageMutation();

  const rawContacts = Array.isArray(apiChatData?.data)
    ? (apiChatData.data as any)
    : DEMO_CHAT_CONTACTS;

  const [contacts, setContacts] = useState<DemoChatContact[]>(rawContacts);
  const [selectedContactId, setSelectedContactId] = useState<string>(
    contacts[0]?.id || DEMO_CHAT_CONTACTS[0].id
  );
  const [inputText, setInputText] = useState("");

  const activeContact =
    contacts.find((c) => c.id === selectedContactId) || contacts[0] || DEMO_CHAT_CONTACTS[0];

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMsg: DemoMessage = {
      id: `msg_${Date.now()}`,
      senderId: "me",
      senderName: "You",
      senderAvatar: "/images/david_profile.png",
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    };

    setContacts((prevContacts) =>
      prevContacts.map((c) => {
        if (c.id !== selectedContactId) return c;
        return {
          ...c,
          messages: [...c.messages, newMsg],
          lastMessage: newMsg.text,
          lastMessageTime: newMsg.timestamp,
        };
      })
    );

    const messagePayload = inputText.trim();
    setInputText("");

    // 1. Dispatch to real API if live
    try {
      await sendMessageApi({
        receiverId: activeContact.id,
        text: messagePayload,
      }).unwrap();
    } catch {
      // 2. Demo auto-reply simulation if offline
      setTimeout(() => {
        const replyMsg: DemoMessage = {
          id: `msg_${Date.now() + 1}`,
          senderId: activeContact.id,
          senderName: activeContact.name,
          senderAvatar: activeContact.avatar,
          text: "Got it! Thanks for the update. Let me check that right away.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isMe: false,
        };

        setContacts((prev) =>
          prev.map((c) =>
            c.id === selectedContactId
              ? {
                  ...c,
                  messages: [...c.messages, replyMsg],
                  lastMessage: replyMsg.text,
                  lastMessageTime: replyMsg.timestamp,
                }
              : c
          )
        );
        toast.info(`New message from ${activeContact.name}`);
      }, 1200);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          Direct Messages & Conversations
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Communicate in real-time with creators and clients.
        </p>
      </div>

      {/* Main Chat Box */}
      <div className="grid grid-cols-1 md:grid-cols-12 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[600px]">
        {/* 1. Left Contact Sidebar (4 cols) */}
        <div className="md:col-span-5 lg:col-span-4 border-r border-slate-100 flex flex-col">
          {/* Search bar */}
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          {/* Contact list */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContactId(contact.id)}
                className={`w-full p-4 flex items-start gap-3.5 text-left transition-colors ${
                  contact.id === selectedContactId
                    ? "bg-indigo-50/60"
                    : "hover:bg-slate-50/60"
                }`}
              >
                <div className="relative">
                  <Avatar className="h-11 w-11 border border-slate-100">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold text-xs">
                      {contact.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-xs font-bold text-slate-800 truncate">
                      {contact.name}
                    </h3>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {contact.lastMessageTime}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">
                    {contact.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Right Chat Window (8 cols) */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between bg-slate-50/30">
          {/* Active Contact Header */}
          <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-slate-100">
                <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                <AvatarFallback className="bg-indigo-600 text-white font-bold text-xs">
                  {activeContact.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-sm text-slate-800">
                  {activeContact.name}
                </h3>
                <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      activeContact.online ? "bg-emerald-500" : "bg-slate-300"
                    }`}
                  />
                  {activeContact.online ? "Online" : "Offline"} • {activeContact.role}
                </p>
              </div>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[440px]">
            {activeContact.messages.map((msg) => (
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
                      {msg.senderName[0]}
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

          {/* Message Input Box */}
          <div className="p-4 bg-white border-t border-slate-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
                title="Insert emoji"
              >
                <Smile className="w-5 h-5" />
              </button>

              <input
                type="text"
                placeholder="Type your message here... (Press Enter to send)"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 py-2.5 px-4 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />

              <Button
                type="submit"
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-4 h-10 gap-1.5 shadow-sm"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
