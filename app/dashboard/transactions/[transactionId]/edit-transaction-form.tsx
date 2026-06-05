"use client";

import TransactionForm, {
  transactionFormSchema,
} from "@/components/transaction-form";
import { type Category } from "@/Types/Category";
import { useRouter } from "next/navigation";
import { editTransaction } from "./actions";
import { format } from "date-fns";
import { toast } from "sonner";
import z from "zod";

export default function EditTransactionForm({
  categories,
  transaction,
}: {
  categories: Category[];
  transaction: {
    id: number;
    categoryId: number;
    amount: string;
    description: string;
    transactionDate: string;
  };
}) {
  const router = useRouter();
  const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    const result = await editTransaction(transaction.id, {
      amount: data.amount,
      transactionDate: format(data.transactionDate, "yyyy-MM-dd"),
      description: data.description,
      categoryId: data.categoryID,
      transactionType: data.transactionType,
    });

    if (result.error) {
      toast.error("Error", {
        description: "Failed to edit transaction",
        classNames: {
          toast: "!bg-red-500 !text-white !border-red-600",
        },
      });
      return;
    }
    toast.success("Success", {
      description: "Transaction has been updated",
      classNames: {
        toast: "!bg-green-500 !text-white !border-green-600",
      },
    });
    router.push(
      `/dashboard/transactions?month=${data.transactionDate.getMonth() + 1}&year=${data.transactionDate.getFullYear()}`,
    );
  };
  return (
    <TransactionForm
      defaultValues={{
        amount: Number(transaction.amount),
        categoryID: transaction.categoryId,
        description: transaction.description,
        transactionDate: new Date(transaction.transactionDate),
        transactionType:
          categories.find((category) => category.id === transaction.categoryId)
            ?.type ?? "income",
      }}
      onSubmit={handleSubmit}
      categories={categories}
    />
  );
}
