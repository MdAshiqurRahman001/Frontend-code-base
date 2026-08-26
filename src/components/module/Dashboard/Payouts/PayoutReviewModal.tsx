"use client";

import { DemoPayout } from "@/constants/demoData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface PayoutReviewModalProps {
  payout: DemoPayout | null;
  onClose: () => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

export default function PayoutReviewModal({
  payout,
  onClose,
  onApprove,
  onReject,
}: PayoutReviewModalProps) {
  if (!payout) return null;

  return (
    <Dialog open={!!payout} onOpenChange={onClose}>
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
            <span className="font-bold text-slate-800">{payout.name}</span>
          </div>
          <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-500">Bank</span>
            <span className="font-bold text-slate-800">{payout.bankName}</span>
          </div>
          <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-500">Account</span>
            <span className="font-mono text-slate-800">{payout.accountNumber}</span>
          </div>
          <div className="flex justify-between p-3 bg-emerald-50 rounded-xl text-sm">
            <span className="font-bold text-emerald-900">Transfer Amount</span>
            <span className="font-extrabold text-emerald-700">{payout.amount}</span>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            className="text-red-600 hover:bg-red-50 border-red-200 cursor-pointer"
            onClick={() => onReject(payout.id)}
          >
            <X className="w-4 h-4 mr-1" /> Reject
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer"
            onClick={() => onApprove(payout.id)}
          >
            <Check className="w-4 h-4 mr-1" /> Approve & Pay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
