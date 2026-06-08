import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getAnnualCashflow } from "@/data/getAnnualCashflow";
import CashflowFilters from "../CashflowFilters";
import { getTransactionYearRange } from "@/data/getTransactionYearRange";

export default async function Cashflow({ year }: { year: number }) {
  const [cashflow, yearsRange] = await Promise.all([
    getAnnualCashflow(year),
    getTransactionYearRange(),
  ]);

  return (
    <Card className="mt-4 max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Cashflow</span>
          <CashflowFilters year={year} yearsRange={yearsRange} className=""/>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
