// Database reads for the blog. Used by server components (pages).
import prisma from "@/lib/prisma";

export function getPosts() {
  return prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });
}

export function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: { author: { select: { name: true } } },
  });
}

export type PostWithAuthor = Awaited<ReturnType<typeof getPosts>>[number];
