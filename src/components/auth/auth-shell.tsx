// The page frame around the login and register forms.
// Left: project name and description (from siteConfig). Right: the form in a card.
import { siteConfig } from "@/config/site";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

function Brand({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 text-lg font-semibold tracking-tight ${className}`}>
      <span
        aria-hidden
        className="grid size-8 place-items-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm"
      >
        {siteConfig.name.charAt(0)}
      </span>
      {siteConfig.name}
    </span>
  );
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <main
      className="min-h-screen grid lg:grid-cols-2 bg-slate-50 font-sans text-slate-900
                 dark:bg-slate-950 dark:text-slate-100"
    >
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-slate-950 p-12 text-slate-100">
        {/* Decorative glow and grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0
                     bg-[radial-gradient(60%_50%_at_15%_10%,rgba(37,99,235,0.35),transparent),radial-gradient(50%_40%_at_90%_95%,rgba(99,102,241,0.25),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]
                     [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)]
                     [background-size:48px_48px]"
        />

        <Brand className="relative" />
        <p className="relative max-w-md text-4xl font-semibold leading-tight tracking-tight text-white">
          {siteConfig.description}
        </p>
        <span className="relative text-sm text-slate-400">
          © {new Date().getFullYear()} {siteConfig.name}
        </span>
      </aside>

      <section className="flex items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md">
          <Brand className="lg:hidden mb-8 justify-center" />

          <div
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10
                       dark:border-slate-800 dark:bg-slate-900"
          >
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>
            <div className="mt-8">{children}</div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">{footer}</p>
        </div>
      </section>
    </main>
  );
}
