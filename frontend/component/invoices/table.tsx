"use client";

import Image from "next/image";
import InvoiceStatus from "@/component/invoices/status";
import { PencilIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "../button";
import { InvoiceResponse } from "@/api-client";
import { formatDateToLocal } from "@/app/lib/utils";
import { useState } from "react";
import { DeleteInvoiceModal } from "../modal/delete-invoice-modal";
import { MobileInvoiceUI } from "../mobile-UI/mobile-invoice-ui";

export const InvoicesTable = ({
  invoices,
  onDelete,
}: {
  invoices: InvoiceResponse[];
  onDelete: (id: string) => Promise<Boolean>;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(
    null,
  );

  const handleDialogOpen = (invoiceId: string) => {
    setSelectedInvoiceId(invoiceId);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedInvoiceId) return;
    const response = await onDelete(selectedInvoiceId);
    if (response === true) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <MobileInvoiceUI invoices={invoices} onDelete={handleDialogOpen} />
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Customer
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Amount
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Status
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {invoices?.map((invoice) => (
                  <tr
                    key={invoice.invoiceId}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={invoice.image_url}
                          className="rounded-full"
                          width={28}
                          height={28}
                          alt={`${invoice.customerName}'s profile picture`}
                        />
                        <p>{invoice.customerName}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {invoice.customerEmail}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {`$${invoice.amount}`}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatDateToLocal(invoice.date)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <InvoiceStatus status={invoice.status} />
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <Button
                          buttonType="link"
                          type="submit"
                          href={`/dashboard/invoices/${invoice.invoiceId}/edit`}
                          variant="secondary"
                        >
                          <PencilIcon className="w-5" color="green" />
                        </Button>
                        <Button
                          onClick={() => handleDialogOpen(invoice.invoiceId)}
                          type="submit"
                          variant="secondary"
                        >
                          <span className="sr-only">Delete</span>
                          <TrashIcon className="w-5" color="red" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isOpen && (
        <DeleteInvoiceModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onClick={handleDelete}
        />
      )}
    </>
  );
};
