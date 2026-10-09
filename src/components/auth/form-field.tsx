// One labelled input, shared by the login and register forms.
type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export function FormField({ label, name, ...inputProps }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-slate-800">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm
                   placeholder:text-slate-400
                   focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
                   disabled:bg-slate-50"
        {...inputProps}
      />
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
      className="w-full rounded-md bg-blue-700 px-4 py-2.5 text-sm font-medium text-white
                 hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600
                 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
      {message}
    </p>
  );
}
