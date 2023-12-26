"use server";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const getPosts = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const posts = await db.post.findMany({ orderBy: { createdAt: "desc" } });
  return posts;
};
