import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { transporter } from "@/lib/nodemailer";
import { ClaimValidator } from "@/lib/validators/claim";
import { claimTemplate } from "@/templates/claimTemplate";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user || !session.user.name || !session.user.email) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { authorEmail, message, found, authorName, postId } =
      ClaimValidator.parse(body);
    const msgLost = "Seu objeto foi encontrado!";
    const msgFound = "O objeto foi reivindicado!";

    const post = await db.post.findUniqueOrThrow({
      where: {
        id: postId,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: authorEmail,
      subject: found ? msgFound : msgLost,
      text: found ? msgFound : msgLost,
      html: claimTemplate({
        userName: authorName,
        postTitle: post.title,
        found,
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
