import Link from "next/link";
import type { PostWithAuthor } from "../queries";
import { excerpt, formatDate, readingMinutes } from "../utils";

export function PostCard({ post }: { post: PostWithAuthor }) {
  return (
    <article className="py-8">
      <p className="text-sm text-slate-500">
        {formatDate(post.createdAt)}, {readingMinutes(post.content)} min read
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight">
        <Link href={`/blog/${post.slug}`} className="hover:text-blue-700">
          {post.title}
        </Link>
      </h2>
      <p className="mt-2 font-serif text-slate-700 leading-relaxed">{excerpt(post.content)}</p>
      <p className="mt-3 text-sm text-slate-500">By {post.author.name}</p>
    </article>
  );
}
