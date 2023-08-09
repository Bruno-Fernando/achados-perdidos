import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { UfcgRegistrationCodeValidator } from "@/lib/validators/validate";
import { NextResponse } from "next/server";
// import puppeteer from "puppeteer";
import { z } from "zod";

const url = "https://pre.ufcg.edu.br:8443/ControleAcademicoOnline/";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const session = await getAuthSession();
    const { registrationCode, password } =
      UfcgRegistrationCodeValidator.parse(body);

    const user = await db.user.findFirst({
      where: {
        email: session?.user.email,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return new Response("teste de response");

    // Inicia uma nova instancia do navegador
    // const browser = await puppeteer.launch({ headless: "new" });

    // Abre uma aba
    // const page = await browser.newPage();

    // // Vai para o controle academico
    // await page.goto(url);

    // // Digita a matricula e a senha nos campos adequados
    // await page.type("#login", registrationCode);
    // await page.type("#senha", password);

    // // Submete o form contendo matricula e senha e espera o retorno da api
    // await Promise.all([
    //   page.click("button[type=submit]"),
    //   page.waitForNavigation({ waitUntil: "networkidle2" }),
    // ]);

    // // Caso o login tenha acontecido com sucesso, procura na home do
    // // controle academico o número de matricula, caso esteja igual
    // // significa que o login aconteceu com sucesso
    // // caso contrario o login não foi efetuado
    // const isAuth = await page.evaluate((reqRegistrationCode: string) => {
    //   const scrapedRegistrationCode = document
    //     .querySelector(".col-sm-9 , .col-xs-7")
    //     ?.innerHTML.split(" ")[0];

    //   if (scrapedRegistrationCode === reqRegistrationCode) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }, registrationCode);

    // // Fecha a instancia do navegador
    // await browser.close();

    // // Atualiza a entidade do usuário caso tenha conseguido
    // // autenticar com o controle academico
    // if (isAuth && session?.user.email) {
    //   await db.user.update({
    //     where: {
    //       email: session.user.email,
    //     },
    //     data: {
    //       ufcgLoginValidated: true,
    //     },
    //   });

    //   return NextResponse.json({ isAuth }, { status: 200 });
    // }

    // return NextResponse.json(
    //   {
    //     isAuth: false,
    //     errorMessage:
    //       "Não foi possível autenticar o usuário, verifique o número de matricula e senha",
    //   },
    //   {
    //     status: 422,
    //   },
    // );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return NextResponse.json(error);
  }
}
