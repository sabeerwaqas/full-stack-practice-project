"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Button,
  InvoicesTable,
  InvoicesTableSkeleton,
  Search,
  lusitana,
} from "@/component";
import { InvoiceResponse, useInvoice } from "@/api-client";
import { useEffect, useState } from "react";
import { useToast } from "@/context/use-context";

export default function Page() {
  const { fetchInvoices, deleteInvoice, isLoading } = useInvoice({
    shouldDefaultFetch: false,
  });

  const [invoices, setInvoices] = useState<InvoiceResponse[]>([]);

  const { toast } = useToast();

  const loadInvoices = async () => {
    const data = await fetchInvoices();
    if (data) {
      setInvoices(data);
    }
  };

  const handleDelete = async (id: string) => {
    const response = await deleteInvoice(id);
    if (response) {
      toast.success("Invoice deleted successfully!");
      await loadInvoices();
    }
    return response;
  };

  useEffect(() => {
    loadInvoices();
  }, [fetchInvoices]);

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

      <InvoiceTableData
        invoices={invoices}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div> */}
    </div>
  );
}

function InvoiceTableData({
  invoices,
  onDelete,
  isLoading,
}: {
  invoices: InvoiceResponse[];
  onDelete: (id: string) => Promise<Boolean>;
  isLoading: boolean;
}) {
  if (isLoading) {
    return <InvoicesTableSkeleton />;
  }
  return <InvoicesTable invoices={invoices} onDelete={onDelete} />;
}
