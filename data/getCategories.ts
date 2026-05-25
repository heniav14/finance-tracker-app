import { db } from "@/db";
import { categoriesTable } from "@/db/schema";
import "server-only";
// import dotenv from "dotenv";
// import { drizzle } from "drizzle-orm/neon-http";
// import { categoriesTable, transactionsTable } from "./db/schema";

// dotenv.config({ path: ".env.local" });

// const db = drizzle(process.env.DATABASE_URL!);

// async function main() {
//   await db.
// }

export async function getCategories() {
  const categories = await db.select().from(categoriesTable);
  return categories;
}
