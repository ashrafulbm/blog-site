// The page frame around the login and register forms.
// Left: project name and description (from siteConfig). Right: the form.
import { siteConfig } from "@/config/site";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <main className="min-h-screen grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] bg-white text-slate-900">
      <aside className="hidden lg:flex flex-col justify-between bg-slate-900 text-slate-100 p-12">
        <span className="text-lg font-semibold tracking-tight">{siteConfig.name}</span>
        <p className="max-w-sm text-3xl font-semibold leading-tight text-white">
          {siteConfig.description}
        </p>
        <span className="text-sm text-slate-400">
          © {new Date().getFullYear()} {siteConfig.name}
        </span>
      </aside>

      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <span className="lg:hidden block mb-10 text-lg font-semibold tracking-tight">
            {siteConfig.name}
          </span>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-8 text-sm text-slate-600">{footer}</p>
        </div>
      </section>
    </main>
  );
}
