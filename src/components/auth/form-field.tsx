"use client";

// Inputs, buttons and messages shared by the login and register forms.
import { useState } from "react";

type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

const inputClassName =
  `w-full h-11 rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-900 shadow-xs
   placeholder:text-slate-400 transition-colors
   focus:outline-none focus:ring-4 focus:ring-blue-600/15 focus:border-blue-600
   disabled:bg-slate-50 disabled:text-slate-500
   dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500
   dark:focus:border-blue-500 dark:focus:ring-blue-500/20`;

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-800 dark:text-slate-200">
      {children}
    </label>
  );
}

export function FormField({ label, name, ...inputProps }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <input id={name} name={name} className={inputClassName} {...inputProps} />
    </div>
  );
}

// A password input with a show/hide toggle.
export function PasswordField({ label, name, ...inputProps }: Omit<FormFieldProps, "type">) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={visible ? "text" : "password"}
          className={`${inputClassName} pr-11`}
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-r-lg text-slate-400
                     hover:text-slate-700 focus:outline-none focus-visible:text-blue-600
                     dark:hover:text-slate-200"
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  );
}

export function SubmitButton({ pending, label, pendingLabel }: {
  pending: boolean;
  label: string;
  pendingLabel: string;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm
                 font-semibold text-white shadow-sm transition-colors
                 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600
                 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900
                 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending && <SpinnerIcon />}
      {pending ? pendingLabel : label}
    </button>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="flex gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700
                 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
    >
      <AlertIcon />
      <p>{message}</p>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
         strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
         strokeLinecap="round" strokeLinejoin="round" className="size-5">
      <path d="M10.6 5.1A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-2.2 3.2" />
      <path d="M6.6 6.6C3.8 8.4 2 12 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      <path d="m2 2 20 20" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" className="size-4 animate-spin">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity={0.3} strokeWidth={3} />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
         strokeLinecap="round" strokeLinejoin="round" className="mt-px size-4 shrink-0">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}
