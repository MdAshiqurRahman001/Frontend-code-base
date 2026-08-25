/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { NRTable } from "@/components/ui/core/NRTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Creator {
  name: string;
  role: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
}

interface PayoutData {
  id: string;
  creator: Creator;
  amount: string;
  status: string;
}

const columns: ColumnDef<PayoutData, any>[] = [
  {
    accessorKey: "creator",
    header: "CREATOR",
    cell: ({ row }) => {
      const creator = row.original.creator;
      return (
        <div className="flex items-center gap-3 py-1">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-xs shadow-2xs shrink-0 ${creator.avatarBg} ${creator.avatarText}`}
          >
            {creator.initials}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-xs leading-tight">
              {creator.name}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 mt-0.5">
              {creator.role}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "AMOUNT",
    cell: ({ row }) => {
      return (
        <span className="font-extrabold text-slate-900 text-xs">
          {row.original.amount}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      return (
        <Badge className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    id: "action",
    header: "ACTION",
    cell: ({ row }) => {
      return (
        <Button
          onClick={() =>
            toast.success(`Approved payout of ${row.original.amount} for ${row.original.creator.name}`)
          }
          size="sm"
          className="h-7 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold rounded-lg shadow-2xs"
        >
          Quick Approve
        </Button>
      );
    },
  },
];

interface PendingPayoutsProps {
  data: PayoutData[];
}

export const PendingPayouts = ({ data = [] }: PendingPayoutsProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100/90 shadow-2xs w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
            Pending Creator Payouts
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Withdrawal requests requiring administrative clearance
          </p>
        </div>

        <Link
          href="/dashboard/payouts"
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 hover:underline"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <NRTable columns={columns} data={data} />
    </div>
  );
};

export default PendingPayouts;
