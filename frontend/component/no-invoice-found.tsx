import { DocumentTextIcon } from "@heroicons/react/24/outline";

export function NoInvoiceFound() {
  return (
    <div className="mt-6 flex flex-col items-center justify-center rounded-lg bg-gray-50 px-6 py-14 text-center md:px-14 h-full">
      <div className="flex p-4 items-center justify-center rounded-full bg-white shadow-sm">
        <DocumentTextIcon className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">
        No invoices found
      </h3>
      <p className="mt-2 text-sm text-gray-500">
        Get started by creating a new invoice.
      </p>
    </div>
  );
}
