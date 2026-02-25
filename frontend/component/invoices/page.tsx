import { Suspense } from "react";
import { InvoicesTableSkeleton } from "@/component/skeletons";
import { fetchInvoicesPages } from "@/app/lib/data";
import { Button } from "../button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { InvoicesTable } from "./table";
import { Pagination } from "./pagination";
import { Search } from "../search";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <Button
          href="/dashboard/invoices/create"
          buttonType="button"
          type="submit"
          className="transition-colors hover:bg-blue-500"
        >
          <span className="hidden md:block">Create Invoice</span>
          <PlusIcon className="h-5 md:ml-4" />
        </Button>
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <InvoicesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
