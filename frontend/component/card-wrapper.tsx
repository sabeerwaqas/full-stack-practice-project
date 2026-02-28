"use client";

import { Card } from "./card";
import { useInvoice } from "@/api-client";
import { CardsSkeleton } from "./skeletons";

export const CardWrapper = () => {
  const { pendingAmount, paidAmount, totalInvoices, isLoading } = useInvoice();

  if (isLoading) return <CardsSkeleton />;

  return (
    <>
      <Card title="Collected" value={`$${paidAmount}`} type="collected" />
      <Card title="Pending" value={`$${pendingAmount}`} type="pending" />
      <Card
        title="Total Invoices"
        value={`$${totalInvoices}`}
        type="invoices"
      />
      {/* <Card
        title="Total Customers"
        value={`$ ${totalCustomers}`}
        type="customers"
      /> */}
    </>
  );
};
