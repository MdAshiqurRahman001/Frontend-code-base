/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { DEMO_CHAT_CONTACTS, DemoChatContact, DemoMessage } from "@/constants/demoData";
import { useGetConversationsQuery, useSendMessageMutation } from "@/redux/api/chatApi";
import { toast } from "sonner";
import MessagesHeader from "./MessagesHeader";
import ChatSidebar from "./ChatSidebar";
import ChatActiveHeader from "./ChatActiveHeader";
import ChatMessageList from "./ChatMessageList";
import ChatMessageInput from "./ChatMessageInput";

export default function DashboardMessagesModule() {
  const { data: apiChatData } = useGetConversationsQuery();
  const [sendMessageApi] = useSendMessageMutation();

  const [contacts, setContacts] = useState<DemoChatContact[]>(DEMO_CHAT_CONTACTS);
  const [selectedContactId, setSelectedContactId] = useState<string>(
    DEMO_CHAT_CONTACTS[0]?.id || ""
  );
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (apiChatData) {
      const raw = Array.isArray(apiChatData?.data)
        ? (apiChatData.data as any)
        : (apiChatData?.data as any)?.data;
      if (raw && Array.isArray(raw) && raw.length > 0) {
        setContacts(raw);
        setSelectedContactId((prev) => prev || raw[0].id);
      }
    }
  }, [apiChatData]);

  const activeContact =
    contacts.find((c) => c.id === selectedContactId) || contacts[0] || DEMO_CHAT_CONTACTS[0];

  const handleSendMessage = async () => {
    if (!inputText.trim() || !activeContact) return;

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

    try {
      await sendMessageApi({
        receiverId: activeContact.id,
        text: messagePayload,
      }).unwrap();
    } catch {
      // Offline simulation response
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
      <MessagesHeader />

      {/* Main Chat Box */}
      <div className="grid grid-cols-1 md:grid-cols-12 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[600px]">
        {/* Left Contact Sidebar */}
        <ChatSidebar
          contacts={contacts}
          selectedContactId={selectedContactId}
          onSelectContact={setSelectedContactId}
        />

        {/* Right Chat Window */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between bg-slate-50/30">
          <ChatActiveHeader contact={activeContact} />
          <ChatMessageList messages={activeContact.messages} />
          <ChatMessageInput
            inputText={inputText}
            onInputChange={setInputText}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}
