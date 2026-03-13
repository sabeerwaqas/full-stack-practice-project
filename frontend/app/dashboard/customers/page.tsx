"use client";

import { CustomerResponse, useCustomer } from "@/api-client";
import {
  CustomersTable,
  CustomersTableSkeleton,
  lusitana,
  NoContentFound,
  Search,
} from "@/component";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { customers, fetchCustomers, isLoading } = useCustomer({
    shouldDefaultFetch: false,
  });

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const filteredCustomers =
    customers.filter((customer) =>
      customer.name.toLowerCase().includes(query.toLowerCase()),
    ) || customers;

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  function CustomerTableData({ customers }: { customers: CustomerResponse[] }) {
    if (isLoading) {
      return <CustomersTableSkeleton />;
    }

    if (customers.length === 0) {
      return (
        <NoContentFound
          title="No Customers Found"
          description="You have no customers yet. Create one to get started."
          icon={<UserGroupIcon className="h-6 w-6 text-gray-400" />}
        />
      );
    }

    return <CustomersTable customers={customers} />;
  }

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <Search placeholder="Search customers..." />
      <CustomerTableData customers={filteredCustomers} />
    </div>
  );
}
