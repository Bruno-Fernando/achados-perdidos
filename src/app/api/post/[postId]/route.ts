import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/newPost";
import { utapi } from "@/utils/uploadthing";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  req: Request,
  { params }: { params: { postId: string } },
) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const post = await db.post.findUnique({
      where: { id: params.postId, authorId: session.user.id, deleted: false },
    });

    return NextResponse.json(post);
  } catch (error) {
    return new Response("Could not query post", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { postId: string } },
) {
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
    const deleteImg = body.get("deleteImg");

    const { title, status, description } = PostValidator.parse({
      title: titleData,
      description: descriptionData,
      status: statusData,
      postImg: postImgData,
    });

    let newPost;

    const post = await db.post.findUnique({
      where: { id: params.postId, deleted: false },
    });

    if (post?.imgKey && deleteImg) {
      await utapi.deleteFiles(post.imgKey);
    }

    if (postImgData) {
      const { data } = await utapi.uploadFiles(postImgData);
      newPost = await db.post.update({
        where: {
          id: params.postId,
        },
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
      newPost = await db.post.update({
        where: {
          id: params.postId,
        },
        data: {
          title,
          description,
          type: status,
          authorId: session.user.id,
          imgKey: deleteImg ? null : post?.imgKey,
          imgUrl: deleteImg ? null : post?.imgUrl,
        },
      });
    }

    return NextResponse.json({ ok: true, postId: newPost.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not update post", { status: 500 });
  }
}
