import { ReactNode } from "react";

export function ModalHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-b px-6 py-4 ${className}`}>
      <h2 className="text-lg font-semibold">{children}</h2>
    </div>
  );
}

export function ModalContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-6 py-5 text-gray-700 ${className}`}>{children}</div>
  );
}

export function ModalFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex justify-end gap-3 border-t px-6 py-4 ${className}`}>
      {children}
    </div>
  );
}
