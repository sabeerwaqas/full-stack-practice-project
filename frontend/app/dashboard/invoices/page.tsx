"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Button,
  InvoicesTable,
  InvoicesTableSkeleton,
  Pagination,
  Search,
  lusitana,
} from "@/component";
import { InvoiceResponse, useInvoice } from "@/api-client";
import { useEffect, useState } from "react";

export default function Page() {
  const [invoices, setInvloices] = useState<InvoiceResponse[]>([]);

  const { fetchInvoices, deleteInvoice, isLoading, error, refetch } = useInvoice({
    shouldDefaultFetch: false,
  });

  const handleDelete = async (id: string) => {
    const response = await deleteInvoice(id);

    if (response) {
      refetch();
    }
  };

  useEffect(() => {
    const loadInvoices = async () => {
      const data = await fetchInvoices();
      if (data) {
        setInvloices(data);
      }
    };

    loadInvoices();
  }, [fetchInvoices]);

  if (isLoading) {
    return <InvoicesTableSkeleton />;
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />

        <Button
          buttonType="link"
          type="submit"
          className="bg-blue-600 hover:bg-blue-500"
          href="/dashboard/invoices/create"
        >
          Create Invoice
          <PlusIcon className="h-5 md:ml-4" />
        </Button>
      </div>

      <InvoicesTable invoices={invoices} onDelete={handleDelete}/>

      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div> */}
    </div>
  );
}
