/**
 * ==============================================================================
 * 📌 SUPPORT & HELP CENTER PAGE (/dashboard/support)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * This page provides platform documentation, FAQs, and ticket submission.
 * It includes:
 *  - Interactive FAQ accordion (expand/collapse questions)
 *  - Support Ticket Form using `<NRForm>` with Zod validation
 *  - Contact / Live Chat quick access cards
 * ==============================================================================
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { DEMO_FAQS } from "@/constants/demoData";
import NRForm from "@/components/form/NRForm";
import NRInput from "@/components/form/NRInput";
import NRSelect from "@/components/form/NRSelect";
import { Button } from "@/components/ui/button";
import {
  LifeBuoy,
  ChevronDown,
  Mail,
  MessageSquare,
  FileQuestion,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const ticketSchema = z.object({
  subject: z.string().min(3, "Subject is required"),
  category: z.string().default("general"),
  message: z.string().min(10, "Please describe your issue in more detail"),
});

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleTicketSubmit = (_data: z.infer<typeof ticketSchema>) => {
    toast.success(
      `Support ticket #${Math.floor(1000 + Math.random() * 9000)} created! Our team will reach out soon.`
    );
  };

  return (
    <div className="flex flex-col gap-8 w-full pb-10">
      {/* 1. Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          Help & Support Center
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Browse platform guides, common questions, or reach out directly to our support engineers.
        </p>
      </div>

      {/* 2. Quick Contact Cards */}
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
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl"
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
            className="w-full text-xs font-semibold rounded-xl"
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
            className="w-full text-xs font-semibold rounded-xl"
          >
            Read Docs
          </Button>
        </div>
      </div>

      {/* 3. Grid: FAQ Accordion & Ticket Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* FAQs (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <LifeBuoy className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-800">Frequently Asked Questions</h2>
          </div>

          <div className="divide-y divide-slate-100">
            {DEMO_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="py-3.5">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex justify-between items-center text-left gap-4 py-1"
                  >
                    <span className="text-xs font-bold text-slate-800">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-indigo-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <p className="text-xs text-slate-500 leading-relaxed mt-2 pt-1 pl-1">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Support Ticket Submission Form (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-800">Submit a Support Ticket</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Need technical help or custom billing? Open a ticket below.
            </p>
          </div>

          <NRForm
            schema={ticketSchema}
            onSubmit={handleTicketSubmit}
            defaultValues={{
              subject: "",
              category: "general",
              message: "",
            }}
          >
            <div className="space-y-4 my-2">
              <NRInput
                name="subject"
                label="Ticket Subject"
                placeholder="e.g. Escrow payout clarification"
              />

              <NRSelect
                name="category"
                label="Issue Category"
                options={[
                  { label: "General Inquiries", value: "general" },
                  { label: "Billing & Payouts", value: "billing" },
                  { label: "API & Webhooks", value: "technical" },
                  { label: "Account & Permissions", value: "account" },
                ]}
              />

              <NRInput
                name="message"
                label="Detailed Description"
                placeholder="Provide details about what happened..."
              />

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl gap-2 mt-2"
              >
                <span>Submit Ticket</span>
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </NRForm>
        </div>
      </div>
    </div>
  );
}
