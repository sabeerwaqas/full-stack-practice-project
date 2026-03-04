export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US",
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: { revenue: number }[]) => {
  const MAX_LABELS = 6;

  const highestRecord = Math.max(...revenue.map((m) => m.revenue), 0);

  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  const rawStep = Math.ceil(topLabel / MAX_LABELS);
  const step = Math.max(1000, Math.ceil(rawStep / 1000) * 1000);

  const yAxisLabels: string[] = [];

  for (let i = topLabel; i >= 0; i -= step) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

type Invoice = {
  amount: number;
  date: string;
  status: "paid" | "pending" | "unpaid";
};

export function calculateMonthlyRevenue(invoices: Invoice[]) {
  const months = getLast12Months();

  const revenueMap = new Map<string, number>();

  invoices
    .filter((invoice) => invoice.status === "paid")
    .forEach((invoice) => {
      const date = new Date(invoice.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;

      // cents → dollars
      revenueMap.set(key, (revenueMap.get(key) ?? 0) + invoice.amount / 100);
    });

  return months.map(({ key, label }) => ({
    month: label,
    revenue: Number((revenueMap.get(key) ?? 0).toFixed(2)),
  }));
}

// app/lib/date.ts
export function getLast12Months() {
  const months: { key: string; label: string }[] = [];

  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);

    const key = `${date.getFullYear()}-${date.getMonth()}`; // unique
    const label = date.toLocaleString("en-US", { month: "short" });

    months.push({ key, label });
  }

  return months;
}
