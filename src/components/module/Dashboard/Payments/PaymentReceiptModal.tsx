"use client";

import { DemoTransaction } from "@/constants/demoData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PaymentReceiptModalProps {
  transaction: DemoTransaction | null;
  onClose: () => void;
}

export default function PaymentReceiptModal({
  transaction,
  onClose,
}: PaymentReceiptModalProps) {
  if (!transaction) return null;

  return (
    <Dialog open={!!transaction} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800">
            Payment Receipt
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 font-mono">
            {transaction.id} • {transaction.date}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 my-3 text-xs">
          <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-500">Customer</span>
            <span className="font-bold text-slate-800">{transaction.user}</span>
          </div>
          <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-500">Item</span>
            <span className="font-bold text-slate-800">{transaction.plan}</span>
          </div>
          <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-500">Method</span>
            <span className="font-mono text-slate-800">{transaction.method}</span>
          </div>
          <div className="flex justify-between p-3 bg-indigo-50/50 rounded-xl text-sm">
            <span className="font-bold text-indigo-900">Total Paid</span>
            <span className="font-extrabold text-indigo-700">{transaction.amount}</span>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => {
              toast.info("Invoice PDF downloaded.");
              onClose();
            }}
          >
            Download PDF
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
