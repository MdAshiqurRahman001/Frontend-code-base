"use client";

import { useState } from "react";
import { toast } from "sonner";
import SupportHeader from "./SupportHeader";
import SupportContactCards from "./SupportContactCards";
import FaqAccordion from "./FaqAccordion";
import SupportTicketForm, { TicketFormValues } from "./SupportTicketForm";

export default function DashboardSupportModule() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleTicketSubmit = (_data: TicketFormValues) => {
    toast.success(
      `Support ticket #${Math.floor(1000 + Math.random() * 9000)} created! Our team will reach out soon.`
    );
  };

  const handleToggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col gap-8 w-full pb-10">
      {/* 1. Header */}
      <SupportHeader />

      {/* 2. Quick Contact Cards */}
      <SupportContactCards />

      {/* 3. Grid: FAQ Accordion & Ticket Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <FaqAccordion openFaq={openFaq} onToggleFaq={handleToggleFaq} />
        <SupportTicketForm onSubmit={handleTicketSubmit} />
      </div>
    </div>
  );
}
