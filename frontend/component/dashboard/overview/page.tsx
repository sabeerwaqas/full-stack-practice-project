import { fetchCardData, fetchRevenue } from '@/app/lib/data';
import { Card } from '@/component/dashboard/cards';
import LatestInvoices from '@/component/dashboard/latest-invoices';
import RevenueChart from '@/component/dashboard/revenue-chart';
import { RevenueChartSkeleton } from '@/component/skeletons';
import { Suspense } from 'react';
 
export default async function Page() {
  const revenue = await fetchRevenue(); 
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

 
  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
 
  return (
    <main>
      <h1 className='mb-4 text-xl md:text-2xl'>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart/>
        </Suspense>
        <LatestInvoices />
      </div>
    </main>
  );
}