"use server";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { $Enums } from "@prisma/client";

const PER_PAGE = 5;

interface GetPostsPayload {
  page: number;
  search?: string;
  type?: $Enums.PostType;
}

export const getPosts = async ({ page, search, type }: GetPostsPayload) => {
  const session = await getAuthSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const transactionPosts = await db.$transaction([
    db.post.count({
      where: {
        deleted: false,
        OR: [
          { title: { contains: search ?? "" } },
          { description: { contains: search ?? "" } },
        ],
        AND: [{ type }],
      },
    }),
    db.post.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PER_PAGE,
      take: PER_PAGE,
      where: {
        deleted: false,
        OR: [
          { title: { contains: search ?? "" } },
          { description: { contains: search ?? "" } },
        ],
        AND: [{ type }],
      },
    }),
  ]);

  const returnObj = {
    count: transactionPosts[0],
    posts: transactionPosts[1],
  };

  return returnObj;
};

export const getPostById = async (id: string) => {
  const session = await getAuthSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const post = await db.post.findUniqueOrThrow({
    where: {
      id,
      deleted: false,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return post;
};

export const getUserPosts = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const userPosts = await db.post.findMany({
    where: {
      authorId: session.user.id,
      deleted: false,
    },
  });

  return userPosts;
};

export const getUserPostById = async (id: string) => {
  const session = await getAuthSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const post = await db.post.findUniqueOrThrow({
    where: { id, authorId: session.user.id, deleted: false },
    select: {
      id: true,
      title: true,
      description: true,
      type: true,
      imgUrl: true,
      imgKey: true,
    },
  });

  return post;
};
