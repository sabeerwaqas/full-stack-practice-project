"use client";

import { useCustomer } from "@/api-client";
import { CustomersTable } from "@/component";

export default function Page() {

  const { customers } = useCustomer({ shouldDefaultFetch: true });

  return (
    <main>
      <CustomersTable customers={customers} />
    </main>
  );
}
