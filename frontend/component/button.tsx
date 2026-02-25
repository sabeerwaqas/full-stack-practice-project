import clsx from "clsx";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  buttonType?: "button" | "link";
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const Button = ({
  children,
  buttonType,
  type,
  className = "",
  href = "",
  onClick,
  ...rest
}: ButtonProps) => {
  const baseClasses =
    "flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50";

  if (buttonType === "button") {
    return (
      <button
        {...rest}
        onClick={onClick}
        className={clsx(baseClasses, className)}
      >
        {children}
      </button>
    );
  }

  if (buttonType === "link" && href) {
    return (
      <Link
        {...rest}
        href={href}
        className={clsx(baseClasses, className)}
        {...rest}
      >
        {children}
      </Link>
    );
  }
};
