import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/newPost";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, status, description } = PostValidator.parse(body);

    const newPost = await db.post.create({
      data: {
        title,
        description,
        type: status,
        authorId: session.user.id,
      },
    });

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

    const posts = await db.post.findMany();

    return NextResponse.json(posts);
  } catch (error) {
    return new Response("Could not query posts", { status: 500 });
  }
}
