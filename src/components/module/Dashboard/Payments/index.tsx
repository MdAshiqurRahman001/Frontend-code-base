/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { DEMO_TRANSACTIONS, DemoTransaction } from "@/constants/demoData";
import { useGetTransactionsQuery } from "@/redux/api/paymentApi";
import PaymentsHeader from "./PaymentsHeader";
import PaymentMetricsCards from "./PaymentMetricsCards";
import PaymentsTable from "./PaymentsTable";
import PaymentReceiptModal from "./PaymentReceiptModal";

export default function PaymentsModule() {
  const { data: apiTxnsData } = useGetTransactionsQuery();

  const [transactions, setTransactions] = useState<DemoTransaction[]>(DEMO_TRANSACTIONS);
  const [selectedTxn, setSelectedTxn] = useState<DemoTransaction | null>(null);

  useEffect(() => {
    if (apiTxnsData) {
      const raw = Array.isArray(apiTxnsData?.data)
        ? (apiTxnsData.data as any)
        : (apiTxnsData?.data as any)?.data;
      if (raw && Array.isArray(raw)) {
        setTransactions(raw);
      }
    }
  }, [apiTxnsData]);

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* 1. Header */}
      <PaymentsHeader />

      {/* 2. Metrics Summary */}
      <PaymentMetricsCards />

      {/* 3. TanStack Data Table */}
      <PaymentsTable
        transactions={transactions}
        onSelectTxn={setSelectedTxn}
      />

      {/* 4. Receipt Modal */}
      <PaymentReceiptModal
        transaction={selectedTxn}
        onClose={() => setSelectedTxn(null)}
      />
    </div>
  );
}
