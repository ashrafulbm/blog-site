// /blog/some-post-slug/edit: only the author can open this
import { notFound, redirect } from "next/navigation";
import { requireSession } from "@/lib/session";
import { getPostBySlug } from "@/features/blog/queries";
import { updatePost } from "@/features/blog/actions";
import { PostForm } from "@/features/blog/components/post-form";

// Reads the session cookie, so this page renders per request (Cache Components opt-out).
export const instant = false;

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { user } = await requireSession(`/blog/${slug}/edit`);

  const post = await getPostBySlug(slug);
  if (!post) notFound();
  if (post.authorId !== user.id) redirect(`/blog/${slug}`);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Edit post</h1>
      <PostForm
        action={updatePost.bind(null, post.id)}
        initial={{ title: post.title, content: post.content }}
        submitLabel="Save changes"
        pendingLabel="Saving…"
        cancelHref={`/blog/${post.slug}`}
      />
    </main>
  );
}
