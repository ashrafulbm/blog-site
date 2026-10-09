import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getSession } from "@/lib/session";

// Reads the session cookie, so this page renders per request (Cache Components opt-out).
export const instant = false;

export default async function HomePage() {
  const session = await getSession();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white px-6 text-slate-900">
      <h1 className="text-3xl font-semibold tracking-tight">{siteConfig.name}</h1>
      <div className="flex gap-3">
        {session ? (
          <Link href={siteConfig.afterLoginPath}
            className="rounded-md bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800">
            Go to dashboard
          </Link>
        ) : (
          <>
            <Link href="/login"
              className="rounded-md bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800">
              Log in
            </Link>
            <Link href="/register"
              className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-medium hover:bg-slate-50">
              Create account
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
