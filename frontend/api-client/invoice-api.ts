import { apiRequest } from "./client";
import {
  PendingInvoiceAmountResponse,
  PaidInvoiceAmountResponse,
  TotalInvoiceAmountResponse,
  TotalCustomersAmountResponse,
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
  return apiRequest<TotalInvoiceAmountResponse>("/api/invoice/count", {
    method: "GET",
  });
}
