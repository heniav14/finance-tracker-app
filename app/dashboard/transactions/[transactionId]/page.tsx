import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import NewTransactionForm from "../new/new-transaction-component";
import { getCategories } from "@/data/getCategories";
import EditTransactionForm from "./edit-transaction-form";

export default async function EditTransactionPage({
  params,
}: {
  params: Promise<{ transactionId: string }>;
}) {
  const paramsValues = await params;

  const transactionId = Number(paramsValues.transactionId);

  if (isNaN(transactionId)) {
    return (
      <div className="text-center py-10 test-lg text-muted-foreground">
        Oops! Transaction not found!
      </div>
    );
  }
  const categories = await getCategories();
  return (
    <div className="w-full py-10 px-4">
      <Breadcrumb className="max-w-4xl mx-auto">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard/transactions">Transactions</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Transaction {transactionId}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="mt-4 max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>New Transaction</CardTitle>
          <CardDescription>Fill details for new transaction</CardDescription>
        </CardHeader>
        <CardContent>
          <EditTransactionForm categories={categories} />
        </CardContent>
      </Card>
    </div>
  );
}
