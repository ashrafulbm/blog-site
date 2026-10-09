import Link from "next/link";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { getSession } from "@/lib/session";
import { SignOutButton } from "@/components/auth/sign-out-button"; // from the template

export function BlogHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/blog" className="text-lg font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
        {/* Reads the session, so it streams in after the rest of the header */}
        <Suspense fallback={null}>
          <HeaderUser />
        </Suspense>
      </div>
    </header>
  );
}

async function HeaderUser() {
  const session = await getSession();
  if (!session) return null;

  return (
    <div className="flex items-center gap-4">
      <span className="hidden sm:inline text-sm text-slate-600">{session.user.name}</span>
      <SignOutButton />
    </div>
  );
}
