// Wraps every /blog page with the blog header.
import { BlogHeader } from "@/features/blog/components/blog-header";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <BlogHeader />
      {children}
    </div>
  );
}
