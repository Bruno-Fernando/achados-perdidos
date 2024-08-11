import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { transporter } from "@/lib/nodemailer";
import { ClaimValidator } from "@/lib/validators/claim";
import { claimTemplate, unclaimTemplate } from "@/templates/claimTemplate";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { postId: string } },
) {
  try {
    const session = await getAuthSession();

    if (!session?.user || !session.user.name || !session.user.email) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { message } = ClaimValidator.parse(body);
    const msgLost = "Seu objeto foi encontrado!";
    const msgFound = "O objeto foi reivindicado!";

    const post = await db.post.findUniqueOrThrow({
      where: {
        id: params.postId,
      },
      include: {
        author: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: post.author.email!,
      subject: post.type === "FOUND" ? msgFound : msgLost,
      text: post.type === "FOUND" ? msgFound : msgLost,
      html: claimTemplate({
        userName: post.author.name!,
        postTitle: post.title,
        found: post.type === "FOUND",
        senderName: session.user.name,
        senderEmail: session.user.email,
        message,
      }),
    });

    await db.post.update({
      where: {
        id: post.id,
      },
      data: {
        claimUserId: session.user.id,
      },
    });

    return NextResponse.json({ ok: true, message: "Sucess!" });
  } catch (error) {
    return new Response("Could not send email", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } },
) {
  try {
    const session = await getAuthSession();

    if (!session?.user || !session.user.name || !session.user.email) {
      return new Response("Unauthorized", { status: 401 });
    }

    const post = await db.post.findUniqueOrThrow({
      where: {
        id: params.postId,
      },
      include: {
        author: {
          select: {
            email: true,
            name: true,
          },
        },
        claimUser: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    await db.post.update({
      where: {
        id: params.postId,
        OR: [{ authorId: session.user.id }, { claimUserId: session.user.id }],
      },
      data: {
        claimUserId: null,
      },
    });

    const toUser =
      post.authorId === session.user.id ? post.claimUser : post.author;
    const fromUser =
      post.authorId !== session.user.id ? post.claimUser : post.author;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: toUser?.email!,
      subject: "Reivindicação cancelada",
      text: "Reivindicação cancelada",
      html: unclaimTemplate({
        userName: toUser?.name!,
        postTitle: post.title,
        senderName: fromUser?.name!,
        senderEmail: fromUser?.email!,
      }),
    });

    return NextResponse.json({
      ok: true,
      message: "Sucess!",
    });
  } catch (error) {
    return new Response("Could not cancel claim", { status: 500 });
  }
}
