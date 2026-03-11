import clsx from "clsx";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  buttonType?: "button" | "link";
  variant?: "primary" | "secondary" | "delete";
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
  href?: string;
}

const variants = {
  primary:
    "bg-blue-500 text-white hover:bg-blue-600 focus-visible:outline-blue-500",
  secondary:
    "flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200",
  delete:
    "bg-red-500 text-white hover:bg-red-600 focus-visible:outline-red-500",
};

export const Button = ({
  children,
  buttonType = "button",
  variant = "primary",
  type = "button",
  className = "",
  href = "",
  onClick,
  ...rest
}: ButtonProps) => {
  const baseClasses =
    "flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 transition";

  const classes = clsx(baseClasses, variants[variant], className);

  if (buttonType === "link" && href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  );
};
