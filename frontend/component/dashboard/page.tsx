import { fetchCardData } from '@/app/lib/data';
import { Card } from '@/component/card';
import SideNav from './sidenav';
import { RevenueChart } from './revenue-chart';
import { LatestInvoices } from './latest-invoices';

export default async function Page() {
    const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers } = await fetchCardData();

    return (
        <main className='flex'>
            <SideNav />
            <div>
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
                    <RevenueChart />
                    <LatestInvoices />
                </div>
            </div>
        </main>
    );
}