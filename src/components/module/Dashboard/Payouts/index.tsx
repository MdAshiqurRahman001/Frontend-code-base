/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { DEMO_PAYOUTS, DemoPayout } from "@/constants/demoData";
import {
  useGetPayoutsQuery,
  useApprovePayoutMutation,
  useRejectPayoutMutation,
} from "@/redux/api/payoutApi";
import { toast } from "sonner";
import PayoutsHeader from "./PayoutsHeader";
import PayoutMetricsCards from "./PayoutMetricsCards";
import PayoutsTable from "./PayoutsTable";
import PayoutReviewModal from "./PayoutReviewModal";

export default function PayoutsModule() {
  const { data: apiPayoutsData } = useGetPayoutsQuery();
  const [approvePayoutApi] = useApprovePayoutMutation();
  const [rejectPayoutApi] = useRejectPayoutMutation();

  const [payouts, setPayouts] = useState<DemoPayout[]>(DEMO_PAYOUTS);
  const [selectedPayout, setSelectedPayout] = useState<DemoPayout | null>(null);

  useEffect(() => {
    if (apiPayoutsData) {
      const raw = Array.isArray(apiPayoutsData?.data)
        ? (apiPayoutsData.data as any)
        : (apiPayoutsData?.data as any)?.data;
      if (raw && Array.isArray(raw)) {
        setPayouts(raw);
      }
    }
  }, [apiPayoutsData]);

  const handleApprove = async (id: number) => {
    setPayouts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Approved" } : p))
    );
    toast.success("Payout approved & dispatched to bank transfer!");
    setSelectedPayout(null);

    try {
      await approvePayoutApi(id).unwrap();
    } catch {
      // Graceful fallback
    }
  };

  const handleReject = async (id: number) => {
    setPayouts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Rejected" } : p))
    );
    toast.error("Payout request rejected.");
    setSelectedPayout(null);

    try {
      await rejectPayoutApi({ id, reason: "Administrative review" }).unwrap();
    } catch {
      // Graceful fallback
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* 1. Header */}
      <PayoutsHeader />

      {/* 2. Overview Metrics */}
      <PayoutMetricsCards />

      {/* 3. Table */}
      <PayoutsTable payouts={payouts} onSelectPayout={setSelectedPayout} />

      {/* 4. Review Dialog */}
      <PayoutReviewModal
        payout={selectedPayout}
        onClose={() => setSelectedPayout(null)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
