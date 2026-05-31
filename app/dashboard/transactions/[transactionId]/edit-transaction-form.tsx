"use client";

import TransactionForm, {
  transactionFormSchema,
} from "@/components/transaction-form";
import { type Category } from "@/Types/Category";
import { useRouter } from "next/navigation";
import { createTransaction } from "../new/actions";
import { format } from "date-fns";
import { toast } from "sonner";
import z from "zod";

export default function EditTransactionForm({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    const result = {};

    // if (result.error) {
    //   toast.error("Error", {
    //     description: "Failed to edit transaction",
    //     classNames: {
    //       toast: "!bg-red-500 !text-white !border-red-600",
    //     },
    //   });
    //   return;
    // }
    // toast.success("Success", {
    //   description: "Transaction has been updated",
    //   classNames: {
    //     toast: "!bg-green-500 !text-white !border-green-600",
    //   },
    // });
    router.push(
      `/dashboard/transactions?month=${data.transactionDate.getMonth() + 1}&year=${data.transactionDate.getFullYear()}`,
    );
  };
  return <TransactionForm onSubmit={handleSubmit} categories={categories} />;
}
