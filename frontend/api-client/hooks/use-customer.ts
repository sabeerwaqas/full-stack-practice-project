"use client";

import { useCallback, useEffect, useState } from "react";
import { getAllCustomers, getTotalCustomers } from "../customer-api";
import { CustomerResponse } from "../types";

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
      const response = await getTotalCustomers();

      setTotalCustomers(response.data.totalCustomers);
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

    const response = await getAllCustomers();
    setCustomers(response.data);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (shouldDefaultFetch) {
      fetchTotalCustomers();
    }
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
