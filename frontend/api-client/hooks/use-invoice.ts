"use client";

import { useCallback, useEffect, useState } from "react";
import {
  PaidInvoiceAmountResponse,
  PendingInvoiceAmountResponse,
  TotalInvoiceAmountResponse,
} from "../types";
import {
  getPaidInvoiceAmount,
  getPendingInvoiceAmount,
  getTotalInvoices,
} from "../invoice-api";

interface UseInvoiceState {
  pendingAmount: number;
  paidAmount: number;
  totalInvoices: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useInvoice(): UseInvoiceState {
  const [pendingAmount, setPendingAmount] = useState<number>(0);
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [totalInvoices, setTotalInvoices] = useState<number>(0);
  const [totalCustomers, setTotalCustomers] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPendingAmount = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response: PendingInvoiceAmountResponse =
        await getPendingInvoiceAmount();

      setPendingAmount(response.pendingAmount);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch invoice data",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPaidAmount = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response: PaidInvoiceAmountResponse = await getPaidInvoiceAmount();

      setPaidAmount(response.paidAmount);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch invoice data",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchTotalInvoices = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response: TotalInvoiceAmountResponse = await getTotalInvoices();

      setTotalInvoices(response.totalInvoices);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch invoice data",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPendingAmount();
    fetchPaidAmount();
    fetchTotalInvoices();
  }, [fetchPendingAmount, fetchPaidAmount, fetchTotalInvoices]);

  return {
    pendingAmount,
    paidAmount,
    totalInvoices,
    isLoading,
    error,
    refetch: fetchPendingAmount,
  };
}
