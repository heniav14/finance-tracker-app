"use client";

import TransactionForm, { transactionFormSchema } from "@/components/transaction-form";
import { type Category } from "@/Types/Category";
import { createTransaction } from "./actions";
import { format } from "date-fns";
import { toast } from "sonner";
import z from "zod";


export default function NewTransactionForm({
  categories
}: {
  categories: Category[];
}) {

    const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    const result = await createTransaction({
      amount: data.amount,
      transactionDate: format(data.transactionDate, "yyyy-MM-dd"),
      categoryId: data.categoryID,
      description: data.description,
      transactionType: data.transactionType,
    });
    if (result.error){
      toast("Error", {description: result.message});
    }

  };
  return <TransactionForm onSubmit={handleSubmit } categories={categories} />;
}
