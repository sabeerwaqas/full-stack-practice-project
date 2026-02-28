"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CustomerField,
  InvoiceRequest,
  InvoiceResponse,
  PaidInvoiceAmountResponse,
  PendingInvoiceAmountResponse,
  TotalInvoiceCountResponse,
} from "../types";
import {
  createInvoice,
  deleteInvoices,
  getInvoiceById,
  getInvoices,
  getPaidInvoiceAmount,
  getPendingInvoiceAmount,
  getTotalInvoices,
  updateInvoice,
} from "../invoice-api";

interface UseInvoiceState {
  pendingAmount: number;
  paidAmount: number;
  totalInvoices: number;
  isLoading: boolean;
  error: string | null;
  shouldDefaultFetch?: boolean;
  refetch: () => Promise<InvoiceResponse[] | void>;
  deleteInvoice: (id: string) => Promise<Boolean>;
  fetchInvoices: () => Promise<InvoiceResponse[] | void>;
  createUserInvoice: (data: CustomerField) => Promise<Boolean>;
  updateUserInvoice: (data: InvoiceRequest) => Promise<Boolean>;
  fetchInvoiceById: (invoiceId: string) => Promise<InvoiceResponse | void>;
}

export function useInvoice({ shouldDefaultFetch = false }): UseInvoiceState {
  const [pendingAmount, setPendingAmount] = useState<number>(0);
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [totalInvoices, setTotalInvoices] = useState<number>(0);
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
      const response: TotalInvoiceCountResponse = await getTotalInvoices();

      setTotalInvoices(response.totalInvoices);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch invoice data",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchInvoices = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const response: InvoiceResponse[] = await getInvoices();

    if (response) {
      setIsLoading(false);
      return response;
    }
  }, []);

  const fetchInvoiceById = useCallback(async (invoiceId: string) => {
    setIsLoading(true);
    setError(null);

    const response = await getInvoiceById({invoiceId});
    if (response) {
      setIsLoading(false);
      return response;
    }
  }, []);

  const deleteInvoice = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    const response = await deleteInvoices({ id });

    if (response.error) {
      setError(response.error);
      return false;
    }

    setIsLoading(false);

    fetchInvoices();
    return true;
  }, []);

  const createUserInvoice = useCallback(async (data: CustomerField) => {
    setIsLoading(true);
    setError(null);

    const payload = {
      customer_id: data.customer_id,
      amount: data.amount,
      status: data.status,
    };

    const response = await createInvoice({ data: payload });

    if (response.error) {
      setError(response.error);
      return false;
    }

    setIsLoading(false);

    return true;
  }, []);

  const updateUserInvoice = useCallback(async (data: InvoiceRequest) => {
    setIsLoading(true);
    setError(null);

    const payload = {
      invoiceId: data.invoiceId,
      customer_id: data.customer_id,
      amount: data.amount,
      status: data.status,
    };

    const response = await updateInvoice({ data: payload });

    if (response.error) {
      setError(response.error);
      return false;
    }

    fetchInvoices();
    setIsLoading(false);

    return true;
  }, []);

  useEffect(() => {
    if (shouldDefaultFetch) {
      fetchPendingAmount();
      fetchPaidAmount();
      fetchTotalInvoices();
    }
  }, [fetchPendingAmount, fetchPaidAmount, fetchTotalInvoices]);

  return {
    pendingAmount,
    paidAmount,
    totalInvoices,
    isLoading,
    error,
    refetch: fetchInvoices,
    deleteInvoice,
    fetchInvoices,
    createUserInvoice,
    updateUserInvoice,
    fetchInvoiceById
  };
}
