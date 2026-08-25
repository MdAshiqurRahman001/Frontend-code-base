/**
 * ==============================================================================
 * 📌 PAYMENTS & TRANSACTIONS PAGE (/dashboard/payments)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * This page displays incoming transactions and payment history.
 * It includes:
 *  - Metric cards for Total Revenue, Escrow Deposits, and Refund Rate
 *  - Interactive Transactions table with `@tanstack/react-table`
 *  - Receipt / Invoice View modal with download simulation
 * ==============================================================================
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { DEMO_TRANSACTIONS, DemoTransaction } from "@/constants/demoData";
import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DollarSign, ArrowDownLeft, Eye, ReceiptText } from "lucide-react";
import { toast } from "sonner";

export default function PaymentsPage() {
  const [transactions] = useState<DemoTransaction[]>(DEMO_TRANSACTIONS);
  const [selectedTxn, setSelectedTxn] = useState<DemoTransaction | null>(null);

  const columns: ColumnDef<DemoTransaction, any>[] = [
    {
      accessorKey: "id",
      header: "Transaction ID",
      cell: ({ row }) => (
        <span className="font-mono text-xs font-bold text-slate-700">
          {row.original.id}
        </span>
      ),
    },
    {
      accessorKey: "user",
      header: "Customer",
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-xs text-slate-800">{row.original.user}</p>
          <p className="text-[11px] text-slate-400">{row.original.email}</p>
        </div>
      ),
    },
    {
      accessorKey: "plan",
      header: "Description / Plan",
      cell: ({ row }) => (
        <span className="text-xs text-slate-600 font-medium">
          {row.original.plan}
        </span>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span className="font-bold text-sm text-slate-900">
          {row.original.amount}
        </span>
      ),
    },
    {
      accessorKey: "method",
      header: "Payment Method",
      cell: ({ row }) => (
        <span className="text-xs text-slate-500 font-mono">
          {row.original.method}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const s = row.original.status;
        return (
          <Badge
            className={`text-[10px] font-bold py-0.5 px-2 rounded-md ${
              s === "Completed"
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                : s === "Pending"
                ? "bg-amber-50 text-amber-600 border border-amber-200"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}
          >
            {s}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          onClick={() => setSelectedTxn(row.original)}
          variant="outline"
          size="sm"
          className="h-8 gap-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50"
        >
          <Eye className="w-3.5 h-3.5" /> View Receipt
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* 1. Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          Payment Transactions
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Monitor all customer payments, plan subscriptions, and escrow deposits.
        </p>
      </div>

      {/* 2. Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Total Processed</p>
            <p className="text-xl font-bold text-slate-800">$124,580.00</p>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <ArrowDownLeft className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">In Escrow</p>
            <p className="text-xl font-bold text-slate-800">$38,200.00</p>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <ReceiptText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">30-Day Volume</p>
            <p className="text-xl font-bold text-slate-800">421 Orders</p>
          </div>
        </div>
      </div>

      {/* 3. TanStack Data Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold text-slate-800">Recent Transactions Log</h2>
          <Button
            onClick={() => toast.success("Exported transactions as CSV!")}
            variant="outline"
            size="sm"
            className="text-xs font-semibold"
          >
            Export CSV
          </Button>
        </div>

        <NRTable columns={columns} data={transactions} />
      </div>

      {/* 4. Receipt Modal */}
      {selectedTxn && (
        <Dialog open={!!selectedTxn} onOpenChange={() => setSelectedTxn(null)}>
          <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-slate-800">
                Payment Receipt
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 font-mono">
                {selectedTxn.id} • {selectedTxn.date}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 my-3 text-xs">
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Customer</span>
                <span className="font-bold text-slate-800">{selectedTxn.user}</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Item</span>
                <span className="font-bold text-slate-800">{selectedTxn.plan}</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Method</span>
                <span className="font-mono text-slate-800">{selectedTxn.method}</span>
              </div>
              <div className="flex justify-between p-3 bg-indigo-50/50 rounded-xl text-sm">
                <span className="font-bold text-indigo-900">Total Paid</span>
                <span className="font-extrabold text-indigo-700">{selectedTxn.amount}</span>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  toast.info("Invoice PDF downloaded.");
                  setSelectedTxn(null);
                }}
              >
                Download PDF
              </Button>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                onClick={() => setSelectedTxn(null)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
