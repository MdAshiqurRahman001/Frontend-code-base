"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DemoUser } from "@/constants/demoData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Shield, ShieldAlert, Trash2 } from "lucide-react";

interface GetUserColumnsProps {
  onSelectUser: (user: DemoUser) => void;
  onToggleStatus: (id: string) => void;
  onDeleteUser: (id: string) => void;
}

export function getUserColumns({
  onSelectUser,
  onToggleStatus,
  onDeleteUser,
}: GetUserColumnsProps): ColumnDef<DemoUser>[] {
  return [
    {
      accessorKey: "name",
      header: "User / Creator",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-slate-100">
            <AvatarImage src={row.original.avatar} alt={row.original.name} />
            <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold text-xs">
              {row.original.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-xs text-slate-800">{row.original.name}</p>
            <p className="text-[11px] text-slate-400">{row.original.email}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <span
          className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
            row.original.role === "Creator"
              ? "bg-purple-50 text-purple-700 border border-purple-200/50"
              : "bg-blue-50 text-blue-700 border border-blue-200/50"
          }`}
        >
          {row.original.role}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Account Status",
      cell: ({ row }) => {
        const s = row.original.status;
        return (
          <Badge
            className={`text-[10px] font-bold py-0.5 px-2 rounded-md ${
              s === "Active"
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
      accessorKey: "joinedDate",
      header: "Member Since",
      cell: ({ row }) => (
        <span className="text-xs text-slate-500">{row.original.joinedDate}</span>
      ),
    },
    {
      accessorKey: "earnings",
      header: "Total Volume",
      cell: ({ row }) => (
        <span className="font-bold text-xs text-slate-800">
          {row.original.earnings || "$0"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          <Button
            onClick={() => onSelectUser(row.original)}
            size="sm"
            variant="outline"
            className="h-8 gap-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" /> Details
          </Button>

          <Button
            onClick={() => onToggleStatus(row.original.id)}
            size="sm"
            variant="ghost"
            className="h-8 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
            title={row.original.status === "Active" ? "Suspend User" : "Activate User"}
          >
            {row.original.status === "Active" ? (
              <Shield className="w-4 h-4 text-emerald-600" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-amber-600" />
            )}
          </Button>

          <Button
            onClick={() => onDeleteUser(row.original.id)}
            size="sm"
            variant="ghost"
            className="h-8 p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
            title="Delete User"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];
}
