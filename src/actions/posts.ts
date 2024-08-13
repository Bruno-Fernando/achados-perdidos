"use server";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { $Enums } from "@prisma/client";

const PER_PAGE = 10;

interface GetPostsPayload {
  page: number;
  search?: string;
  type?: $Enums.PostType;
  date?: string;
  order?: string;
}

export const getPosts = async ({
  page,
  search,
  type,
  date,
  order,
}: GetPostsPayload) => {
  const session = await getAuthSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const initialDate = date ? new Date(date) : undefined;
  const finalDate = date ? new Date(date) : undefined;

  const transactionPosts = await db.$transaction([
    db.post.count({
      where: {
        deleted: false,
        claimUser: null,
        OR: [
          { title: { contains: search ?? "" } },
          { description: { contains: search ?? "" } },
        ],
        AND: [
          {
            type,
            createdAt: {
              gte: initialDate,
              lt: finalDate
                ? new Date(finalDate.setDate(finalDate.getDate() + 1))
                : undefined,
            },
          },
        ],
      },
    }),
    db.post.findMany({
      orderBy: {
        createdAt: order === "asc" || order === "desc" ? order : "desc",
      },
      skip: (page - 1) * PER_PAGE,
      take: PER_PAGE,
      where: {
        deleted: false,
        claimUser: null,
        OR: [
          { title: { contains: search ?? "" } },
          { description: { contains: search ?? "" } },
        ],
        AND: [
          {
            type,
            createdAt: {
              gte: initialDate,
              lt: finalDate,
            },
          },
        ],
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
      OR: [
        { claimUserId: null },
        { claimUserId: session.user.id },
        { authorId: session.user.id },
      ],
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

  const [userPosts, claimedPosts] = await db.$transaction([
    db.post.findMany({
      where: {
        deleted: false,
        authorId: session.user.id,
        claimUserId: null,
      },
    }),
    db.post.findMany({
      where: {
        deleted: false,
        OR: [
          { claimUserId: session.user.id },
          {
            authorId: session.user.id,
            claimUserId: {
              not: null,
            },
          },
        ],
      },
      include: {
        claimUser: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    }),
  ]);

  return { userPosts, claimedPosts };
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
