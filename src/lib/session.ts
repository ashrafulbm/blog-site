// Helpers for server components and pages.
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { siteConfig } from "@/config/site";

/** Returns the current session, or null if nobody is logged in. */
export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/**
 * Use at the top of any page that requires login.
 * Sends logged-out visitors to the login page, then back here afterwards.
 *
 *   const session = await requireSession("/blog");
 */
export async function requireSession(returnTo?: string) {
  const session = await getSession();
  if (!session) {
    const query = returnTo ? `?next=${encodeURIComponent(returnTo)}` : "";
    redirect(`${siteConfig.loginPath}${query}`);
  }
  return session;
}

/** Only allow internal paths like "/blog" as redirect targets. */
export function safeRedirectPath(path: string | undefined) {
  // Browsers treat a backslash like "/", so "/\evil.com" would leave the site
  if (path && path.startsWith("/") && !path.startsWith("//") && !path.includes("\\")) {
    return path;
  }
  return siteConfig.afterLoginPath;
}
