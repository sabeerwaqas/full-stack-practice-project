"use client";

import { useCallback, useEffect, useState } from "react";
import { CustomerField, InvoiceRequest, InvoiceResponse } from "../types";
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
import { useToast } from "@/context/use-context";

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

export function useInvoice({
  shouldDefaultFetch = false,
}: {
  shouldDefaultFetch?: boolean;
}): UseInvoiceState {
  const [pendingAmount, setPendingAmount] = useState<number>(0);
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [totalInvoices, setTotalInvoices] = useState<number>(0);
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

  const fetchPendingAmount = useCallback(async () => {
    const response = await handleApiCall(getPendingInvoiceAmount, "Failed to fetch pending amount");
    if (response) setPendingAmount(response.data.pendingAmount);
  }, [handleApiCall]);

  const fetchPaidAmount = useCallback(async () => {
    const response = await handleApiCall(getPaidInvoiceAmount, "Failed to fetch paid amount");
    if (response) setPaidAmount(response.data.paidAmount);
  }, [handleApiCall]);

  const fetchTotalInvoices = useCallback(async () => {
    const response = await handleApiCall(getTotalInvoices, "Failed to fetch total invoices");
    if (response) setTotalInvoices(response.data.totalInvoices);
  }, [handleApiCall]);

  const fetchInvoices = useCallback(async () => {
    const response = await handleApiCall(getInvoices, "Failed to fetch invoices");
    return response?.data;
  }, [handleApiCall]);

  const fetchInvoiceById = useCallback(async (invoiceId: string) => {
    const response = await handleApiCall(() => getInvoiceById({ invoiceId }), "Failed to fetch invoice");
    return response?.data;
  }, [handleApiCall]);

  const deleteInvoice = useCallback(async (id: string) => {
    const response = await handleApiCall(() => deleteInvoices({ id }), "Failed to delete invoice");
    return !!response;
  }, [handleApiCall]);

  const createUserInvoice = useCallback(async (data: CustomerField) => {
    const payload = {
      customer_id: data.customer_id,
      amount: data.amount,
      status: data.status,
    };
    const response = await handleApiCall(() => createInvoice({ data: payload }), "Failed to create invoice");
    return !!response;
  }, [handleApiCall]);

  const updateUserInvoice = useCallback(
    async (data: InvoiceRequest) => {
      const payload = {
        invoiceId: data.invoiceId,
        customer_id: data.customer_id,
        amount: data.amount,
        status: data.status,
      };
      const response = await handleApiCall(
        () => updateInvoice({ data: payload }),
        "Failed to update invoice",
      );
      if (response) {
        fetchInvoices();
        return true;
      }
      return false;
    },
    [handleApiCall, fetchInvoices],
  );

  useEffect(() => {
    if (shouldDefaultFetch) {
      fetchPendingAmount();
      fetchPaidAmount();
      fetchTotalInvoices();
    }
  }, [fetchPendingAmount, fetchPaidAmount, fetchTotalInvoices]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error, toast]);

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
    fetchInvoiceById,
  };
}
