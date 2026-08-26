"use client";

import { DemoChatContact } from "@/constants/demoData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";

interface ChatSidebarProps {
  contacts: DemoChatContact[];
  selectedContactId: string;
  onSelectContact: (id: string) => void;
}

export default function ChatSidebar({
  contacts,
  selectedContactId,
  onSelectContact,
}: ChatSidebarProps) {
  return (
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
            onClick={() => onSelectContact(contact.id)}
            className={`w-full p-4 flex items-start gap-3.5 text-left transition-colors cursor-pointer ${
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
  );
}
