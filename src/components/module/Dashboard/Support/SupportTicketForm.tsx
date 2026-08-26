"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import NRForm from "@/components/form/NRForm";
import NRInput from "@/components/form/NRInput";
import NRSelect from "@/components/form/NRSelect";
import { Send } from "lucide-react";

export const ticketSchema = z.object({
  subject: z.string().min(3, "Subject is required"),
  category: z.string().default("general"),
  message: z.string().min(10, "Please describe your issue in more detail"),
});

export type TicketFormValues = z.infer<typeof ticketSchema>;

interface SupportTicketFormProps {
  onSubmit: (data: TicketFormValues) => void;
}

export default function SupportTicketForm({ onSubmit }: SupportTicketFormProps) {
  return (
    <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
      <div>
        <h2 className="text-base font-bold text-slate-800">Submit a Support Ticket</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Need technical help or custom billing? Open a ticket below.
        </p>
      </div>

      <NRForm
        schema={ticketSchema}
        onSubmit={onSubmit}
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
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl gap-2 mt-2 cursor-pointer"
          >
            <span>Submit Ticket</span>
            <Send className="w-3.5 h-3.5" />
          </Button>
        </div>
      </NRForm>
    </div>
  );
}
