import { apiRequest } from "./client";
import {
  PendingInvoiceAmountResponse,
  PaidInvoiceAmountResponse,
  TotalInvoiceCountResponse,
  InvoiceResponse,
  CustomerField,
  InvoiceRequest,
} from "./types";

export function getPendingInvoiceAmount() {
  return apiRequest<PendingInvoiceAmountResponse>(
    "/api/invoice/pending-amount",
    {
      method: "GET",
    },
  );
}

export function getPaidInvoiceAmount() {
  return apiRequest<PaidInvoiceAmountResponse>("/api/invoice/paid-amount", {
    method: "GET",
  });
}

export function getTotalInvoices() {
  return apiRequest<TotalInvoiceCountResponse>("/api/invoice/count", {
    method: "GET",
  });
}

export function getInvoices() {
  return apiRequest<InvoiceResponse[]>("/api/invoice", {
    method: "GET",
  });
}

export function getInvoiceById({invoiceId}: {invoiceId: string}) {
  return apiRequest<InvoiceResponse>(`/api/invoice/${invoiceId}`, {
    method: "GET",
  });
}

export function deleteInvoices({ id }: { id: string }) {
  return apiRequest<any>(`/api/invoice/${id}`, {
    method: "DELETE",
  });
}

export function createInvoice({ data }: { data: CustomerField }) {
  return apiRequest<any>("/api/invoice", {
    method: "POST",
    body: data,
  });
}

export function updateInvoice({ data }: { data: InvoiceRequest }) {
  return apiRequest<any>(`/api/invoice/`, {
    method: "PUT",
    body: data,
  });
}
