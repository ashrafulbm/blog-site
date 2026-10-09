// /blog/new: write a new post
import { requireSession } from "@/lib/session";
import { createPost } from "@/features/blog/actions";
import { PostForm } from "@/features/blog/components/post-form";

// Reads the session cookie, so this page renders per request (Cache Components opt-out).
export const instant = false;

export const metadata = { title: "Write a post" };

export default async function NewPostPage() {
  await requireSession("/blog/new");

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Write a post</h1>
      <PostForm
        action={createPost}
        submitLabel="Publish"
        pendingLabel="Publishing…"
        cancelHref="/blog"
      />
    </main>
  );
}
