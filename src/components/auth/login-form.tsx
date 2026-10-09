"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { FormError, FormField, SubmitButton } from "./form-field";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const form = new FormData(e.currentTarget);
    const { error } = await signIn
      .email({
        email: String(form.get("email")),
        password: String(form.get("password")),
      })
      .catch(() => ({ error: { message: "Couldn't reach the server. Try again." } }));

    if (error) {
      setError(error.message ?? "Couldn't log in. Check your email and password.");
      setPending(false);
      return;
    }

    router.push(redirectTo);
    router.refresh(); // reload server components so they see the new session
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormError message={error} />
      <FormField label="Email" name="email" type="email" autoComplete="email" required />
      <FormField
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
      />
      <SubmitButton pending={pending} label="Log in" pendingLabel="Logging in…" />
    </form>
  );
}
