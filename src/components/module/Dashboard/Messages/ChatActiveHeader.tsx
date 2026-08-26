"use client";

import { DemoChatContact } from "@/constants/demoData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatActiveHeaderProps {
  contact: DemoChatContact;
}

export default function ChatActiveHeader({ contact }: ChatActiveHeaderProps) {
  return (
    <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border border-slate-100">
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback className="bg-indigo-600 text-white font-bold text-xs">
            {contact.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-bold text-sm text-slate-800">{contact.name}</h3>
          <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                contact.online ? "bg-emerald-500" : "bg-slate-300"
              }`}
            />
            {contact.online ? "Online" : "Offline"} • {contact.role}
          </p>
        </div>
      </div>
    </div>
  );
}
