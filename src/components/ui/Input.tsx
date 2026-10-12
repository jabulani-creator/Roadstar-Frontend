"use client";

import {
  Children,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-11 w-full rounded-md border border-black/10 bg-white px-3 text-[var(--ink)] outline-none ring-[var(--brand)]/25 focus:ring-2";

export function Input({
  className,
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <label className="block space-y-1.5 text-sm">
      {label ? <span className="font-medium text-[var(--ink)]">{label}</span> : null}
      <input className={cn(fieldClass, className)} {...props} />
    </label>
  );
}

type OptionItem = { value: string; label: string; disabled?: boolean };

function readOptions(children: ReactNode): OptionItem[] {
  return Children.toArray(children).flatMap((child) => {
    if (!isValidElement<{ value?: string | number; children?: ReactNode; disabled?: boolean }>(child)) {
      return [];
    }
    if (child.type !== "option") return [];
    return [
      {
        value: String(child.props.value ?? ""),
        label: String(child.props.children ?? ""),
        disabled: Boolean(child.props.disabled),
      },
    ];
  });
}

export function Select({
  className,
  label,
  children,
  value,
  defaultValue,
  onChange,
  disabled,
  required,
  name,
  id,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const options = useMemo(() => readOptions(children), [children]);
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(String(defaultValue ?? ""));
  const current = isControlled ? String(value ?? "") : internal;
  const selected = options.find((o) => o.value === current) ?? options[0];

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function commit(next: string) {
    if (!isControlled) setInternal(next);
    onChange?.({
      target: { value: next, name: name ?? "" },
      currentTarget: { value: next, name: name ?? "" },
    } as React.ChangeEvent<HTMLSelectElement>);
    setOpen(false);
  }

  return (
    <div className="block space-y-1.5 text-sm" ref={rootRef}>
      {label ? (
        <label htmlFor={id} className="font-medium text-[var(--ink)]">
          {label}
        </label>
      ) : null}

      {/* Keeps native form value / required validation */}
      <select
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        name={name}
        id={id}
        required={required}
        disabled={disabled}
        value={current}
        onChange={(e) => commit(e.target.value)}
        {...props}
      >
        {children}
      </select>

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            fieldClass,
            "flex items-center justify-between gap-2 text-left accent-[var(--brand)]",
            open && "ring-2",
            disabled && "cursor-not-allowed opacity-60",
            className,
          )}
        >
          <span className={cn("truncate", !selected?.value && "text-[var(--muted)]")}>
            {selected?.label || "Select…"}
          </span>
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            className={cn("h-4 w-4 shrink-0 text-[var(--muted)] transition", open && "rotate-180")}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open ? (
          <ul
            id={listId}
            role="listbox"
            className="absolute left-0 right-0 z-30 mt-1 max-h-60 overflow-auto rounded-md border border-black/10 bg-white py-1 shadow-[var(--card-shadow)]"
          >
            {options.map((opt) => {
              const active = opt.value === current;
              return (
                <li key={`${opt.value}-${opt.label}`} role="option" aria-selected={active}>
                  <button
                    type="button"
                    disabled={opt.disabled}
                    onClick={() => commit(opt.value)}
                    className={cn(
                      "flex w-full px-3 py-2.5 text-left text-sm transition-colors",
                      active
                        ? "bg-[var(--brand)] text-white"
                        : "text-[var(--ink)] hover:bg-[var(--teal-soft)]",
                      opt.disabled && "cursor-not-allowed opacity-50",
                    )}
                  >
                    {opt.label}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export function Textarea({
  className,
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <label className="block space-y-1.5 text-sm">
      {label ? <span className="font-medium text-[var(--ink)]">{label}</span> : null}
      <textarea
        className={cn(
          "min-h-28 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-[var(--ink)] outline-none ring-[var(--brand)]/25 focus:ring-2",
          className,
        )}
        {...props}
      />
    </label>
  );
}
