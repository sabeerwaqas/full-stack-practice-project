import { apiRequest } from "./client";
import {
  PendingInvoiceAmountResponse,
  PaidInvoiceAmountResponse,
  TotalInvoiceCountResponse,
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
