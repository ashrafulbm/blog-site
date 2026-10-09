"use server";
// Database writes for the blog: create, edit, delete.
// These run on the server when a form is submitted.

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/session";

export type PostFormState = {
  error: string | null;
  values?: { title: string; content: string };
};

function readForm(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    content: String(formData.get("content") ?? "").trim(),
  };
}

function validate({ title, content }: { title: string; content: string }) {
  if (title.length < 3) return "Give the post a title of at least 3 characters.";
  if (title.length > 150) return "Keep the title under 150 characters.";
  if (content.length < 20) return "Write at least 20 characters in the post body.";
  return null;
}

// "My First Post!" -> "my-first-post-a1b2c3" (the suffix keeps every URL unique)
function makeSlug(title: string) {
  const base =
    title
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "post";
  return `${base}-${randomUUID().slice(0, 6)}`;
}

export async function createPost(_prev: PostFormState, formData: FormData): Promise<PostFormState> {
  const { user } = await requireSession("/blog/new");
  const values = readForm(formData);

  const error = validate(values);
  if (error) return { error, values };

  const post = await prisma.post.create({
    data: { ...values, slug: makeSlug(values.title), authorId: user.id },
  });

  revalidatePath("/blog");
  redirect(`/blog/${post.slug}`);
}

export async function updatePost(
  postId: string,
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const { user } = await requireSession("/blog");
  const values = readForm(formData);

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post || post.authorId !== user.id) {
    return { error: "You can only edit posts you wrote.", values };
  }

  const error = validate(values);
  if (error) return { error, values };

  await prisma.post.update({ where: { id: postId }, data: values });

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  redirect(`/blog/${post.slug}`);
}

export async function deletePost(postId: string, _formData: FormData) {
  const { user } = await requireSession("/blog");

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post || post.authorId !== user.id) redirect("/blog");

  await prisma.post.delete({ where: { id: postId } });

  revalidatePath("/blog");
  redirect("/blog");
}
