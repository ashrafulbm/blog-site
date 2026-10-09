"use client";
// Shared form for writing a new post and editing an existing one.

import Link from "next/link";
import { useActionState } from "react";
import { FormError, FormField, SubmitButton } from "@/components/auth/form-field"; // from the template
import type { PostFormState } from "../actions";

type PostFormProps = {
  action: (state: PostFormState, formData: FormData) => Promise<PostFormState>;
  initial?: { title: string; content: string };
  submitLabel: string;
  pendingLabel: string;
  cancelHref: string;
};

export function PostForm({ action, initial, submitLabel, pendingLabel, cancelHref }: PostFormProps) {
  const [state, formAction, pending] = useActionState(action, { error: null });

  // After a failed submit, show what the user typed instead of clearing it
  const values = state.values ?? initial ?? { title: "", content: "" };

  return (
    <form action={formAction} className="space-y-6">
      <FormError message={state.error} />

      <FormField
        label="Title"
        name="title"
        defaultValue={values.title}
        maxLength={150}
        required
      />

      <div className="space-y-1.5">
        <label htmlFor="content" className="block text-sm font-medium text-slate-800">
          Post
        </label>
        <textarea
          id="content"
          name="content"
          defaultValue={values.content}
          rows={16}
          required
          placeholder="Start writing. Leave a blank line between paragraphs."
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-3 font-serif text-base leading-7
                     placeholder:text-slate-400
                     focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="w-40">
          <SubmitButton pending={pending} label={submitLabel} pendingLabel={pendingLabel} />
        </div>
        <Link href={cancelHref} className="text-sm font-medium text-slate-600 hover:text-slate-900">
          Cancel
        </Link>
      </div>
    </form>
  );
}
