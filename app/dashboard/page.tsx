import RecentTransactions from "./recent-transactions";
import Cashflow from "./transactions/cashflow";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ cfyear: string }>;
}) {
  const today = new Date;
  const searchParamValues = await searchParams;
  let cfYear = Number(searchParamValues.cfyear ?? today.getFullYear());

  if (isNaN(cfYear)){
    cfYear = today.getFullYear();
  }

  return (
    <div className="w-full py-10 px-4">
      <h1 className="text-4xl fonst-semibold pb-5">Dashboard</h1>
      <Cashflow year={cfYear}/>
      <RecentTransactions />
    </div>
  );
}

// <>
//       <Link href="/dashboard/transactions/new">New Transaction</Link>
//     </>
