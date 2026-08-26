"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare, Mail, FileQuestion } from "lucide-react";
import { toast } from "sonner";

export default function SupportContactCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-800">24/7 Live Chat</h3>
            <p className="text-xs text-slate-400">Average response: 2 mins</p>
          </div>
        </div>
        <Button
          onClick={() => toast.info("Opening live chat session...")}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl cursor-pointer"
        >
          Start Live Chat
        </Button>
      </div>

      <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-800">Email Support</h3>
            <p className="text-xs text-slate-400">support@devhubstudio.com</p>
          </div>
        </div>
        <Button
          onClick={() => toast.success("Copied email to clipboard!")}
          variant="outline"
          className="w-full text-xs font-semibold rounded-xl cursor-pointer"
        >
          Copy Email
        </Button>
      </div>

      <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <FileQuestion className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-800">API Documentation</h3>
            <p className="text-xs text-slate-400">Interactive guides & SDKs</p>
          </div>
        </div>
        <Button
          onClick={() => toast.info("API Reference docs opened.")}
          variant="outline"
          className="w-full text-xs font-semibold rounded-xl cursor-pointer"
        >
          Read Docs
        </Button>
      </div>
    </div>
  );
}
