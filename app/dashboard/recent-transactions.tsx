import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRecentTransactions } from "@/data/getRecentTransactions";
import Link from "next/link";
import TransactionsTable from "./TransactionTable"

export default async function RecentTransactions() {
  const recentTransactions = await getRecentTransactions();
  console.log(recentTransactions);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Recent Transactions</span>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/dashboard/transactions">View All</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/transactions/new">Create New</Link>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TransactionsTable transactions={recentTransactions} isEditable={false}/>
      </CardContent>
    </Card>
  );
}
