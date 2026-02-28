"use client";

import { useCallback, useEffect, useState } from "react";
import { getTotalCustomers } from "../customer-api";
import { TotalCustomersCountResponse } from "../types";

interface UseCustomerState {
  totalCustomers: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCustomer(): UseCustomerState {
  const [totalCustomers, setTotalCustomers] = useState<number>(0);
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

  useEffect(() => {
    fetchTotalCustomers();
  }, [fetchTotalCustomers]);

  return {
    totalCustomers,
    isLoading,
    error,
    refetch: fetchTotalCustomers,
  };
}
