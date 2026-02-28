import { apiRequest } from "./client";
import { TotalCustomersCountResponse } from "./types";

export function getTotalCustomers() {
  return apiRequest<TotalCustomersCountResponse>("/api/customer/count", {
    method: "GET",
  });
}
