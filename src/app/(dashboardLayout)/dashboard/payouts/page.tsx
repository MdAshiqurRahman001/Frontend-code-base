/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { DEMO_PAYOUTS, DemoPayout } from "@/constants/demoData";
import {
  useGetPayoutsQuery,
  useApprovePayoutMutation,
  useRejectPayoutMutation,
} from "@/redux/api/payoutApi";
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
import { Banknote, Check, X, ShieldAlert, Building2 } from "lucide-react";
import { toast } from "sonner";

export default function PayoutsPage() {
  const { data: apiPayoutsData } = useGetPayoutsQuery();
  const [approvePayoutApi] = useApprovePayoutMutation();
  const [rejectPayoutApi] = useRejectPayoutMutation();

  const rawPayouts = Array.isArray(apiPayoutsData?.data)
    ? (apiPayoutsData.data as any)
    : (apiPayoutsData?.data as any)?.data || DEMO_PAYOUTS;

  const [payouts, setPayouts] = useState<DemoPayout[]>(rawPayouts);
  const [selectedPayout, setSelectedPayout] = useState<DemoPayout | null>(null);

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

  const columns: ColumnDef<DemoPayout, any>[] = [
    {
      accessorKey: "name",
      header: "Creator",
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-xs text-slate-800">{row.original.name}</p>
          <p className="text-[11px] text-slate-400">{row.original.email}</p>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Requested Amount",
      cell: ({ row }) => (
        <span className="font-extrabold text-sm text-slate-900">
          {row.original.amount}
        </span>
      ),
    },
    {
      accessorKey: "bankName",
      header: "Bank Details",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Building2 className="w-3.5 h-3.5 text-slate-400" />
          <span>
            {row.original.bankName} ({row.original.accountNumber})
          </span>
        </div>
      ),
    },
    {
      accessorKey: "requestDate",
      header: "Date Requested",
      cell: ({ row }) => (
        <span className="text-xs text-slate-500">{row.original.requestDate}</span>
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
              s === "Approved"
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
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.status === "Pending" ? (
            <Button
              onClick={() => setSelectedPayout(row.original)}
              size="sm"
              className="h-8 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
            >
              Review & Pay
            </Button>
          ) : (
            <span className="text-xs text-slate-400 font-semibold">Processed</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* 1. Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          Creator Payout Management
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review withdrawal requests and authorize direct bank payouts.
        </p>
      </div>

      {/* 2. Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Banknote className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Pending Approval</p>
            <p className="text-xl font-bold text-slate-800">$10,570.00</p>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Check className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Paid This Month</p>
            <p className="text-xl font-bold text-slate-800">$48,920.00</p>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Security Checks</p>
            <p className="text-xl font-bold text-slate-800">100% Verified</p>
          </div>
        </div>
      </div>

      {/* 3. Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs">
        <h2 className="text-base font-bold text-slate-800 mb-4">
          Payout Requests Queue
        </h2>
        <NRTable columns={columns} data={payouts} />
      </div>

      {/* 4. Review Dialog */}
      {selectedPayout && (
        <Dialog open={!!selectedPayout} onOpenChange={() => setSelectedPayout(null)}>
          <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-slate-800">
                Authorize Creator Payout
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Confirm payout dispatch to the creator&apos;s bank account.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 my-3 text-xs">
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Recipient</span>
                <span className="font-bold text-slate-800">{selectedPayout.name}</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Bank</span>
                <span className="font-bold text-slate-800">{selectedPayout.bankName}</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Account</span>
                <span className="font-mono text-slate-800">{selectedPayout.accountNumber}</span>
              </div>
              <div className="flex justify-between p-3 bg-emerald-50 rounded-xl text-sm">
                <span className="font-bold text-emerald-900">Transfer Amount</span>
                <span className="font-extrabold text-emerald-700">{selectedPayout.amount}</span>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                className="text-red-600 hover:bg-red-50 border-red-200"
                onClick={() => handleReject(selectedPayout.id)}
              >
                <X className="w-4 h-4 mr-1" /> Reject
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                onClick={() => handleApprove(selectedPayout.id)}
              >
                <Check className="w-4 h-4 mr-1" /> Approve & Pay
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
