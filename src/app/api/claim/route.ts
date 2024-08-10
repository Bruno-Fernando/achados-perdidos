import { getAuthSession } from "@/lib/auth";
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
    const { authorEmail, message, found, authorName, postTitle } =
      ClaimValidator.parse(body);
    const msgLost = "Seu objeto foi encontrado!";
    const msgFound = "O objeto foi reivindicado!";

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: authorEmail,
      subject: found ? msgFound : msgLost,
      text: found ? msgFound : msgLost,
      html: claimTemplate({
        userName: authorName,
        postTitle,
        found,
        senderName: session.user.name,
        senderEmail: session.user.email,
        message,
      }),
    });

    return NextResponse.json({ ok: true, message: "Sucess!" });
  } catch (error) {
    return new Response("Could not send email", { status: 500 });
  }
}
