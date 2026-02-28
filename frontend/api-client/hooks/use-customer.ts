"use client";

import { useCallback, useEffect, useState } from "react";
import { getAllCustomers, getTotalCustomers } from "../customer-api";
import { CustomerResponse, TotalCustomersCountResponse } from "../types";

interface UseCustomerState {
  totalCustomers: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  fetchCustomers: () => Promise<void>;
  shouldDefaultFetch?: boolean;
  customers: CustomerResponse[];
}

export function useCustomer({ shouldDefaultFetch = true }): UseCustomerState {
  const [totalCustomers, setTotalCustomers] = useState<number>(0);
  const [customers, setCustomers] = useState<CustomerResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTotalCustomers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response: TotalCustomersCountResponse = await getTotalCustomers();

      setTotalCustomers(response.totalCustomers);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch invoice data",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAllCustomers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response: CustomerResponse[] = await getAllCustomers();
      setCustomers(response);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch customers data",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (shouldDefaultFetch) {
      fetchTotalCustomers();
    }
    fetchAllCustomers();
  }, [fetchTotalCustomers]);

  return {
    totalCustomers,
    isLoading,
    error,
    refetch: fetchTotalCustomers,
    fetchCustomers: fetchAllCustomers,
    customers,
  };
}
