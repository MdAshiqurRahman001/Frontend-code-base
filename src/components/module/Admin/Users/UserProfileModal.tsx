"use client";

import { DemoUser } from "@/constants/demoData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface UserProfileModalProps {
  user: DemoUser | null;
  onClose: () => void;
  onToggleStatus: (id: string) => void;
}

export default function UserProfileModal({
  user,
  onClose,
  onToggleStatus,
}: UserProfileModalProps) {
  if (!user) return null;

  return (
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800">
            User Profile Summary
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Detailed overview of account activity
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2 text-xs">
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
            <Avatar className="h-12 w-12 border-2 border-white shadow-xs">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-indigo-600 text-white font-bold text-sm">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800">{user.name}</h3>
              <p className="text-slate-400">{user.email}</p>
              <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                {user.role} Account
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400">Account Status</span>
              <p className="font-bold text-slate-800 mt-0.5">{user.status}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400">Projects Count</span>
              <p className="font-bold text-slate-800 mt-0.5">
                {user.projectsCount || 0} Projects
              </p>
            </div>
          </div>

          <div className="p-3 bg-indigo-50/50 rounded-xl flex justify-between items-center text-sm">
            <span className="font-semibold text-indigo-900">Total Account Volume</span>
            <span className="font-extrabold text-indigo-700">
              {user.earnings || "$0.00"}
            </span>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onToggleStatus(user.id)}
            className="cursor-pointer"
          >
            {user.status === "Active" ? "Suspend Account" : "Re-activate"}
          </Button>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer"
            onClick={onClose}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
