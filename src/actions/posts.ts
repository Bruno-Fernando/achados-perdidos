"use server";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

const PER_PAGE = 5;

export const getPosts = async (page: number) => {
  const session = await getAuthSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const posts = await db.post.findMany({
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * PER_PAGE,
    take: PER_PAGE,
  });
  return posts;
};
