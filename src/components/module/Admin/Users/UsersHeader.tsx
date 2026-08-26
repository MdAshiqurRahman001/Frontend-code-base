"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function UsersHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          User Directory & Accounts
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage creator and client accounts, verification statuses, and permissions.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={() => toast.success("Exported users list!")}
          variant="outline"
          className="text-xs font-semibold cursor-pointer"
        >
          Export Directory
        </Button>
      </div>
    </div>
  );
}
