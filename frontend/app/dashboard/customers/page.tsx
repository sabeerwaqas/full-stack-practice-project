"use client";

import { CustomerResponse, useCustomer } from "@/api-client";
import {
  CustomersTable,
  CustomersTableSkeleton,
  lusitana,
  Search,
} from "@/component";

export default function Page() {
  const { customers, isLoading } = useCustomer({ shouldDefaultFetch: true });

  function CustomerTableData({ customers }: { customers: CustomerResponse[] }) {
    if (isLoading) {
      return <CustomersTableSkeleton />;
    }

    return <CustomersTable customers={customers} />;
  }

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <Search placeholder="Search customers..." />
      <CustomerTableData customers={customers} />
    </div>
  );
}
