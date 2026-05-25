"use server";

import { db } from "@/db";
import { transactionsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { addDays, subYears, format } from "date-fns";
import z from "zod";

const transactionSchema = z.object({
  transactionType: z.enum(["income", "expense"]),
  categoryId: z.number().positive("Category ID is invalid"), // string value is converted to number and then validated
  transactionDate: z.coerce
    .date()
    .min(subYears(new Date(), 100))
    .max(addDays(new Date(), 1), "Transaction date cannot be in future"),
  amount: z.number().positive("Amount Must be greater than 0"),
  description: z
    .string()
    .min(3, "Description must contain at least 3 characters")
    .max(300, "Description must contain a maximum of 300 characters"),
});

export const createTransaction = async (data: {
  amount: number;
  transactionDate: string;
  description: string;
  categoryId: number;
  transactionType: "income" | "expense";
}) => {
  const { userId } = await auth();

  if (!userId) {
    return {
      error: true,
      message: "unothorized",
    };
  }

  const validation = transactionSchema.safeParse(data);

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0].message,
    };
  }
  const [transaction] = await db
    .insert(transactionsTable)
    .values({
      userId,
      amount: String(validation.data.amount),
      description: validation.data.description,
      categoryId: validation.data.categoryId,
      transactionDate: format(validation.data.transactionDate, "yyyy-MM-dd"),
    })
    .returning();

  return {
    id: transaction.id,
  };
};
