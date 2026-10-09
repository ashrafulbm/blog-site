"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { siteConfig } from "@/config/site";

export function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleClick() {
    setPending(true);
    const { error } = await signOut().catch(() => ({ error: true }));
    if (error) {
      setPending(false);
      return;
    }
    router.push(siteConfig.loginPath);
    router.refresh();
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800
                 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600
                 disabled:opacity-60"
    >
      {pending ? "Logging out…" : "Log out"}
    </button>
  );
}
