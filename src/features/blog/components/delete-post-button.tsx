"use client";

import { useFormStatus } from "react-dom";

function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="text-sm font-medium text-red-700 hover:underline disabled:opacity-60"
    >
      {pending ? "Deleting…" : "Delete post"}
    </button>
  );
}

export function DeletePostButton({ action }: { action: (formData: FormData) => Promise<void> }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Delete this post? This can't be undone.")) e.preventDefault();
      }}
    >
      <Button />
    </form>
  );
}
