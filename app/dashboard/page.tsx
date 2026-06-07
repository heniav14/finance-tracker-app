import RecentTransactions from "./recent-transactions";

export default function Dashboard() {
  return (
    <div className="w-full py-10 px-4">
      <h1 className="text-4xl fonst-semibold pb-5">Dashboard</h1>
      <RecentTransactions />
    </div>
  );
}

// <>
//       <Link href="/dashboard/transactions/new">New Transaction</Link>
//     </>
