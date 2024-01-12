import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/newPost";
import { utapi } from "@/utils/uploadthing";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.formData();
    const titleData = body.get("title");
    const descriptionData = body.get("description");
    const statusData = body.get("status");
    const postImgData = body.get("postImg");

    const { title, status, description } = PostValidator.parse({
      title: titleData,
      description: descriptionData,
      status: statusData,
      postImg: postImgData,
    });

    let newPost;

    if (postImgData) {
      const { data } = await utapi.uploadFiles(postImgData);
      newPost = await db.post.create({
        data: {
          title,
          description,
          type: status,
          authorId: session.user.id,
          imgKey: data?.key,
          imgUrl: data?.url,
        },
      });
    } else {
      newPost = await db.post.create({
        data: {
          title,
          description,
          type: status,
          authorId: session.user.id,
        },
      });
    }

    return NextResponse.json({ ok: true, postId: newPost.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not create post", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const posts = await db.post.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        deleted: false,
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    return new Response("Could not query posts", { status: 500 });
  }
}
