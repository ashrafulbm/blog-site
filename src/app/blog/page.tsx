// /blog: list of all posts (login required)
import Link from "next/link";
import { requireSession } from "@/lib/session";
import { getPosts } from "@/features/blog/queries";
import { PostCard } from "@/features/blog/components/post-card";

// Reads the session cookie, so this page renders per request (Cache Components opt-out).
export const instant = false;

export const metadata = { title: "Blog" };

export default async function BlogPage() {
  await requireSession("/blog");
  const posts = await getPosts();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">Latest posts</h1>
        <Link
          href="/blog/new"
          className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
        >
          Write a post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="mt-12 rounded-lg border border-dashed border-slate-300 px-6 py-16 text-center">
          <p className="text-lg font-medium">No posts yet</p>
          <p className="mt-1 text-slate-600">Write the first one and it will show up here.</p>
        </div>
      ) : (
        <ul className="mt-4 divide-y divide-slate-200">
          {posts.map((post) => (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
