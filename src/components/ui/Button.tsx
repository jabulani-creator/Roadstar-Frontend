import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--brand)] text-white hover:bg-[var(--brand-strong)] focus-visible:outline-[var(--brand)]",
        secondary:
          "bg-[var(--brand)] text-white hover:bg-[var(--brand-strong)] focus-visible:outline-[var(--brand)]",
        accent:
          "bg-[var(--brand)] text-white hover:bg-[var(--brand-strong)] focus-visible:outline-[var(--brand)]",
        whatsapp:
          "bg-white text-[var(--ink)] ring-1 ring-black/15 hover:bg-[var(--cream)] focus-visible:outline-[var(--ink)]",
        ghost: "text-[var(--ink)] underline-offset-4 hover:underline",
        danger: "bg-red-700 text-white hover:bg-red-800",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-11 px-5",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> &
  VariantProps<typeof buttonVariants> & {
    href?: string;
    external?: boolean;
    onClick?: React.MouseEventHandler<HTMLElement>;
  };

export function Button({
  className,
  variant,
  size,
  href,
  external,
  children,
  onClick,
  ...props
}: Props) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (href) {
    if (external) {
      return (
        <a
          className={classes}
          href={href}
          target="_blank"
          rel="noreferrer"
          onClick={onClick}
        >
          {children}
        </a>
      );
    }
    return (
      <Link className={classes} href={href} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button
      className={classes}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement> | undefined}
      {...props}
    >
      {children}
    </button>
  );
}
