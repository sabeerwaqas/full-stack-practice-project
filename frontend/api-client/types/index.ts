export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequestOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  timeoutMs?: number;
}

export interface ApiError extends Error {
  status?: number;
  data?: unknown;
}

export interface PendingInvoiceAmountResponse {
  pendingAmount: number;
}

export interface PaidInvoiceAmountResponse {
  paidAmount: number;
}

export interface TotalInvoiceAmountResponse {
  totalInvoices: number;
}

export interface TotalCustomersAmountResponse {
  totalCustomers: number;
}
