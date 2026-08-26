"use client";

import { useMemo } from "react";
import { DemoPayout } from "@/constants/demoData";
import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

interface PayoutsTableProps {
  payouts: DemoPayout[];
  onSelectPayout: (payout: DemoPayout) => void;
}

export default function PayoutsTable({ payouts, onSelectPayout }: PayoutsTableProps) {
  const columns = useMemo<ColumnDef<DemoPayout>[]>(
    () => [
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
                onClick={() => onSelectPayout(row.original)}
                size="sm"
                className="h-8 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer"
              >
                Review & Pay
              </Button>
            ) : (
              <span className="text-xs text-slate-400 font-semibold">Processed</span>
            )}
          </div>
        ),
      },
    ],
    [onSelectPayout]
  );

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs">
      <h2 className="text-base font-bold text-slate-800 mb-4">Payout Requests Queue</h2>
      <NRTable columns={columns} data={payouts} />
    </div>
  );
}
