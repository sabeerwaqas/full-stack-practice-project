"use client";

import { Card } from "./card";
import { useInvoice } from "@/api-client";
import { CardsSkeleton } from "./skeletons";
import { useCustomer } from "@/api-client/hooks/use-customer";

export const CardWrapper = () => {
  const { pendingAmount, paidAmount, totalInvoices, isLoading } = useInvoice();
  const { totalCustomers, isLoading: isLoadingCustomers } = useCustomer();

  if (isLoading || isLoadingCustomers) return <CardsSkeleton />;

  return (
    <>
      <Card title="Collected" value={`$${paidAmount}`} type="collected" />
      <Card title="Pending" value={`$${pendingAmount}`} type="pending" />
      <Card title="Total Invoices" value={`${totalInvoices}`} type="invoices" />
      <Card
        title="Total Customers"
        value={`${totalCustomers}`}
        type="customers"
      />
    </>
  );
};
