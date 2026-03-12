"use client";

import { useCallback, useEffect, useState } from "react";
import { getAllCustomers, getTotalCustomers } from "../customer-api";
import { CustomerResponse } from "../types";
import { useToast } from "@/context/use-context";

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
  const { toast } = useToast();

  const handleApiCall = useCallback(
    async <T,>(
      apiCall: () => Promise<T>,
      errorMessage: string,
    ): Promise<T | undefined> => {
      setIsLoading(true);
      setError(null);
      try {
        return await apiCall();
      } catch (err) {
        setError(err instanceof Error ? err.message : errorMessage);
        return undefined;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const fetchTotalCustomers = useCallback(async () => {
    const response = await handleApiCall(getTotalCustomers, "Failed to fetch total customers");
    if (response) setTotalCustomers(response.data.totalCustomers);
  }, [handleApiCall]);

  const fetchAllCustomers = useCallback(async () => {
    const response = await handleApiCall(getAllCustomers, "Failed to fetch customers");
    if (response) setCustomers(response.data);
  }, [handleApiCall]);

  useEffect(() => {
    if (shouldDefaultFetch) {
      fetchTotalCustomers();
    }
  }, [fetchTotalCustomers]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error, toast]);

  return {
    totalCustomers,
    isLoading,
    error,
    refetch: fetchTotalCustomers,
    fetchCustomers: fetchAllCustomers,
    customers,
  };
}
