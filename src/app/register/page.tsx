import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";
import { getSession, safeRedirectPath } from "@/lib/session";

// Reads the session cookie, so this page renders per request (Cache Components opt-out).
export const instant = false;

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const redirectTo = safeRedirectPath(next);

  if (await getSession()) redirect(redirectTo);

  const loginHref = next ? `/login?next=${encodeURIComponent(next)}` : "/login";

  return (
    <AuthShell
      title="Create an account"
      subtitle="It takes less than a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link href={loginHref} className="font-medium text-blue-700 hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <RegisterForm redirectTo={redirectTo} />
    </AuthShell>
  );
}
