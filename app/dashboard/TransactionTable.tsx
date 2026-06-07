import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import numeral from "numeral";

export default function TransactionsTable({
  transactions,
  isEditable
}: {
  transactions: {
    id: number;
    description: string;
    amount: string;
    transactionDate: string;
    category: string | null;
    transactionType: "income" | "expense" | null;
  }[],
  isEditable : boolean;
}) {
  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>
              {format(transaction.transactionDate, "do MMM yyyy")}
            </TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell className="capitalize">
              <Badge
                className={
                  transaction.transactionType === "income"
                    ? "bg-lime-500"
                    : "bg-orange-500"
                }
              >
                {transaction.transactionType}
              </Badge>
            </TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell>
              $ {numeral(transaction.amount).format("0,0[.]00")}
            </TableCell>
            {isEditable &&
            <TableCell className="text-right">
              <Button
                variant="outline"
                asChild
                size="icon"
                className="h-7 w-7"
                aria-label="Edit Transaction"
              >
                <Link href={`/dashboard/transactions/${transaction.id}`}>
                  <PencilIcon />
                </Link>
              </Button>
            </TableCell>
            }
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
