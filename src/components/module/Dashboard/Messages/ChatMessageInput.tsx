"use client";

import { Button } from "@/components/ui/button";
import { Send, Smile } from "lucide-react";

interface ChatMessageInputProps {
  inputText: string;
  onInputChange: (val: string) => void;
  onSendMessage: () => void;
}

export default function ChatMessageInput({
  inputText,
  onInputChange,
  onSendMessage,
}: ChatMessageInputProps) {
  return (
    <div className="p-4 bg-white border-t border-slate-100">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSendMessage();
        }}
        className="flex items-center gap-2"
      >
        <button
          type="button"
          className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          title="Insert emoji"
        >
          <Smile className="w-5 h-5" />
        </button>

        <input
          type="text"
          placeholder="Type your message here... (Press Enter to send)"
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          className="flex-1 py-2.5 px-4 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        />

        <Button
          type="submit"
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-4 h-10 gap-1.5 shadow-sm cursor-pointer"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </Button>
      </form>
    </div>
  );
}
