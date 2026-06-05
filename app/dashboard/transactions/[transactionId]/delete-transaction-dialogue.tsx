"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { deleteTransaction } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteTransactionDialog({
  transactionId,
  transactionDate,
}: {
  transactionId: number;
  transactionDate: string;
}) {
  const router = useRouter();
  const handleDeleteConfirm = async () => {
    const result = await deleteTransaction(transactionId);
    if (result?.error) {
      toast.error("Error", {
        description: result.message,
        classNames: {
          toast: "!bg-red-500 !text-white !border-red-600",
        },
      });
      return;
    }
    toast.success("Success", {
      description: "Transaction has been deleted",
      classNames: {
        toast: "!bg-green-500 !text-white !border-green-600",
      },
    });
    const [year, month] = transactionDate.split("-");
    router.push(`/dashboard/transactions?month=${month}&year=${year}`);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutley sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This transaction will be permanently
            deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleDeleteConfirm} >
            {" "}
            Delete{" "}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
