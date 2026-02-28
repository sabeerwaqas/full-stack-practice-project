import { apiRequest } from "./client";
import { PendingInvoiceAmountResponse } from "./types";
export function getPendingInvoiceAmount() {
  return apiRequest<PendingInvoiceAmountResponse>(
    "/api/invoice/pending-amount",
    {
      method: "GET",
    },
  );
}
