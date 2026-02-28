"use client";

import { useCustomer } from "@/api-client";
import { CustomersTable, TableRowSkeleton } from "@/component";

export default function Page() {
  const { customers, isLoading } = useCustomer({ shouldDefaultFetch: true });

  if (isLoading) {
    return <TableRowSkeleton />;
  }

  return (
    <main>
      <CustomersTable customers={customers} />
    </main>
  );
}
