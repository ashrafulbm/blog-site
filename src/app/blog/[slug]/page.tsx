// /blog/some-post-slug: read one post
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSession } from "@/lib/session";
import { getPostBySlug } from "@/features/blog/queries";
import { deletePost } from "@/features/blog/actions";
import { formatDate, readingMinutes } from "@/features/blog/utils";
import { PostBody } from "@/features/blog/components/post-body";
import { DeletePostButton } from "@/features/blog/components/delete-post-button";

// Reads the session cookie, so this page renders per request (Cache Components opt-out).
export const instant = false;

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { user } = await requireSession(`/blog/${slug}`);

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const isAuthor = post.authorId === user.id;

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <Link href="/blog" className="text-sm font-medium text-slate-600 hover:text-slate-900">
        All posts
      </Link>

      <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight">{post.title}</h1>
      <p className="mt-4 text-sm text-slate-500">
        By {post.author.name} on {formatDate(post.createdAt)}. {readingMinutes(post.content)} min read.
      </p>

      {isAuthor && (
        <div className="mt-4 flex items-center gap-5">
          <Link href={`/blog/${post.slug}/edit`} className="text-sm font-medium text-blue-700 hover:underline">
            Edit post
          </Link>
          <DeletePostButton action={deletePost.bind(null, post.id)} />
        </div>
      )}

      <div className="mt-10">
        <PostBody content={post.content} />
      </div>
    </main>
  );
}
