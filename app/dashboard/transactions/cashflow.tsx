import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getAnnualCashflow } from "@/data/getAnnualCashflow";
import CashflowFilters from "../CashflowFilters";
import { getTransactionYearRange } from "@/data/getTransactionYearRange";
import { CashFlowContent } from "./CashFlowContent";

export default async function Cashflow({ year }: { year: number }) {
  const [cashflow, yearsRange] = await Promise.all([
    getAnnualCashflow(year),
    getTransactionYearRange(),
  ]);

  return (
    <Card className="mt-4 max-w-4xl mx-auto mb-5 ">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Cashflow</span>
          <CashflowFilters year={year} yearsRange={yearsRange} />
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-[1fr_250px]">
        <CashFlowContent annualCashflow={cashflow}></CashFlowContent>
      </CardContent>
    </Card>
  );
}
