import { apiRequest } from "./client";
import { CustomerResponse, TotalCustomersCountResponse } from "./types";

export function getTotalCustomers() {
  return apiRequest<TotalCustomersCountResponse>("/api/customer/count", {
    method: "GET",
  });
}

export function getAllCustomers() {
  return apiRequest<CustomerResponse[]>("/api/customer/all", {
    method: "GET",
  });
}
 