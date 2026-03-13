"use client";

import { ArrowPathIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { lusitana } from "@/component/fonts";
import { InvoiceResponse, useInvoice } from "@/api-client";
import { useEffect, useState } from "react";
import { LatestInvoicesSkeleton } from "../skeletons";
import { NoContentFound } from "../no-content-found";

export const LatestInvoices = () => {
  const { fetchInvoices, isLoading } = useInvoice({
    shouldDefaultFetch: false,
  });
  const [latestInvoices, setLatestInvoices] = useState<InvoiceResponse[]>([]);

  useEffect(() => {
    const loadLatestInvoices = async () => {
      const data = await fetchInvoices();
      if (data) {
        setLatestInvoices(data.slice(0, 8));
      }
    };
    loadLatestInvoices();
  }, []);

  if (isLoading) {
    return <LatestInvoicesSkeleton />;
  }

  if (latestInvoices.length === 0) {
    return (
      <div className="flex w-full flex-col md:col-span-4">
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Latest Invoices
        </h2>
        <NoContentFound
          title="No Invoices Found"
          description="You have no invoices yet. Create one to get started."
          icon={<DocumentTextIcon className="h-6 w-6 text-gray-400" />}
        />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.invoiceId}
                className={clsx(
                  "flex flex-row items-center justify-between py-4",
                  {
                    "border-t": i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={invoice.image_url}
                    alt={`${invoice.customerName}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.customerName}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.customerEmail}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
};
