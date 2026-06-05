"use server";

import { db } from "@/db";
import { transactionsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { addDays, subYears, format } from "date-fns";
import { and, eq } from "drizzle-orm";
import z from "zod";

const transactionSchema = z.object({
  transactionType: z.enum(["income", "expense"]),
  categoryId: z.number().positive("Category ID is invalid"),
  transactionDate: z.coerce
    .date()
    .min(subYears(new Date(), 100))
    .max(addDays(new Date(), 1), "Transaction date cannot be in future"),
  amount: z.number().positive("Amount must be greater than 0"),
  description: z
    .string()
    .min(3, "Description must contain at least 3 characters")
    .max(300, "Description must contain a maximum of 300 characters"),
});

export const editTransaction = async (
  transactionId: number,
  data: {
    amount: number;
    transactionDate: string;
    description: string;
    categoryId: number;
    transactionType: "income" | "expense";
  },
) => {
  const { userId } = await auth();

  if (!userId) {
    return { error: true, message: "Unauthorized" };
  }

  const validation = transactionSchema.safeParse(data);

  if (!validation.success) {
    return { error: true, message: validation.error.issues[0].message };
  }

  const [updated] = await db
    .update(transactionsTable)
    .set({
      amount: String(validation.data.amount),
      description: validation.data.description,
      categoryId: validation.data.categoryId,
      transactionDate: format(validation.data.transactionDate, "yyyy-MM-dd"),
    })
    .where(
      and(
        eq(transactionsTable.id, transactionId),
        eq(transactionsTable.userId, userId),
      ),
    )
    .returning();

  if (!updated) {
    return { error: true, message: "Transaction not found" };
  }

  return { id: updated.id };
};

export async function deleteTransaction(transactionId: number) {
  const { userId } = await auth();
  if (!userId) {
    return { error: true, message: "Unauthorized" };
  }

  await db
    .delete(transactionsTable)
    .where(
      and(
        eq(transactionsTable.id, transactionId),
        eq(transactionsTable.userId, userId),
      ),
    );
}
