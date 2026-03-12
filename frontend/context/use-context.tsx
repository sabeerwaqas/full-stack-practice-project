"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  success: (msg: string, duration?: number) => void;
  error: (msg: string, duration?: number) => void;
  info: (msg: string, duration?: number) => void;
  warning: (msg: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string, type: ToastType, duration = 3000) => {
      console.log("addToast");
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    },
    [],
  );

  const toastHelpers = React.useMemo<ToastContextType>(
    () => ({
      success: (msg, dur) => addToast(msg, "success", dur),
      error: (msg, dur) => addToast(msg, "error", dur),
      info: (msg, dur) => addToast(msg, "info", dur),
      warning: (msg, dur) => addToast(msg, "warning", dur),
    }),
    [addToast]
  );

  const typeStyles: Record<ToastType, string> = {
    success: "bg-emerald-100 text-emerald-900 border border-emerald-200",
    error: "bg-rose-100 text-rose-900 border border-rose-200",
    warning: "bg-amber-100 text-amber-900 border border-amber-200",
    info: "bg-sky-100 text-sky-900 border border-sky-200",
  };

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="h-6 w-6 text-emerald-600" />;
      case "error":
        return <XCircleIcon className="h-6 w-6 text-rose-600" />;
      case "warning":
        return <ExclamationTriangleIcon className="h-6 w-6 text-amber-600" />;
      case "info":
        return <InformationCircleIcon className="h-6 w-6 text-sky-600" />;
    }
  };

  return (
    <ToastContext.Provider value={toastHelpers}>
      {children}

      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${typeStyles[toast.type]} pointer-events-auto min-w-[280px] px-4 py-3 rounded-lg shadow-xl flex justify-between items-center transition-all animate-in slide-in-from-right-10 fade-in duration-300`}
          >
            <div className="flex items-center gap-3">
              {getIcon(toast.type)}
              <span className="text-sm font-semibold">{toast.message}</span>
            </div>
            <button
              onClick={() =>
                setToasts((prev) => prev.filter((t) => t.id !== toast.id))
              }
              className="ml-4 opacity-70 hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return { toast: context };
};
