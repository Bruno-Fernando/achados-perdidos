import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH() {
  try {
    const session = await getAuthSession();

    const user = await db.user.findFirst({
      where: {
        email: session?.user.email,
      },
    });

    if (!user || !session?.user.email) {
      return new Response("User not found", { status: 404 });
    }

    await db.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        ufcgLoginValidated: true,
      },
    });

    return NextResponse.json({ isAuth: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return NextResponse.json(error);
  }
}
