// Example of a protected page. Copy this pattern for any page that needs login.
import { requireSession } from "@/lib/session";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { siteConfig } from "@/config/site";

// Reads the session cookie, so this page renders per request (Cache Components opt-out).
export const instant = false;

export default async function DashboardPage() {
  const { user } = await requireSession("/dashboard");

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <span className="font-semibold tracking-tight">{siteConfig.name}</span>
        <SignOutButton />
      </header>
      <section className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome, {user.name}</h1>
        <p className="mt-2 text-slate-600">You&apos;re logged in as {user.email}.</p>
      </section>
    </main>
  );
}
