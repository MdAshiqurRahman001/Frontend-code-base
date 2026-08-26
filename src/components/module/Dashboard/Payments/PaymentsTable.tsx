"use client";

import { useMemo } from "react";
import { DemoTransaction } from "@/constants/demoData";
import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { toast } from "sonner";

interface PaymentsTableProps {
  transactions: DemoTransaction[];
  onSelectTxn: (txn: DemoTransaction) => void;
}

export default function PaymentsTable({
  transactions,
  onSelectTxn,
}: PaymentsTableProps) {
  const columns = useMemo<ColumnDef<DemoTransaction>[]>(
    () => [
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
            onClick={() => onSelectTxn(row.original)}
            variant="outline"
            size="sm"
            className="h-8 gap-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" /> View Receipt
          </Button>
        ),
      },
    ],
    [onSelectTxn]
  );

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-bold text-slate-800">Recent Transactions Log</h2>
        <Button
          onClick={() => toast.success("Exported transactions as CSV!")}
          variant="outline"
          size="sm"
          className="text-xs font-semibold cursor-pointer"
        >
          Export CSV
        </Button>
      </div>

      <NRTable columns={columns} data={transactions} />
    </div>
  );
}
