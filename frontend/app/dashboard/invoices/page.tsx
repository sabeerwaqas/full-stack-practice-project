import Pagination from "@/component/invoices/pagination";
import Search from "@/component/search";
import Table from "@/component/invoices/table";
import { lusitana } from "@/component/fonts";
import { InvoicesTableSkeleton } from "@/component/skeletons";
import { Suspense } from "react";
import { fetchInvoicesPages } from "@/app/lib/data";
import { Metadata } from "next";
import { Button } from "@/component/button";
import { PlusIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Invoices",
};

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
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
