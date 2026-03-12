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

  const fetchPendingAmount = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getPendingInvoiceAmount();

      setPendingAmount(response.data.pendingAmount);
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
      const response = await getPaidInvoiceAmount();

      setPaidAmount(response.data.paidAmount);
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
      const response = await getTotalInvoices();

      setTotalInvoices(response.data.totalInvoices);
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

    const response = await getInvoices();

    if (response.success === false) {
      setError(response.message);
      setIsLoading(false);
      return;
    }

    if (response) {
      setIsLoading(false);
      return response.data;
    }
    setIsLoading(false);
  }, []);

  const fetchInvoiceById = useCallback(async (invoiceId: string) => {
    setIsLoading(true);
    setError(null);

    const response = await getInvoiceById({ invoiceId });
    if (response) {
      setIsLoading(false);
      return response.data;
    }
  }, []);

  const deleteInvoice = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    const response = await deleteInvoices({ id });

    if (response.success === false) {
      setError(response.message);
      setIsLoading(false);
      return false;
    }

    setIsLoading(false);

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

    if (response.success === false) {
      setError(response.message);
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

    if (!response.status) {
      setError(response.message);
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

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

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
