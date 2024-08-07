import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 p-7 text-center md:p-24">
      <h1 className="text-2xl font-bold">UFCG Finder</h1>
      <p>Bem vindo ao achados e perdidos da UFCG!</p>
      <p>
        Este é um ambiente destinado a divugação de objetos achados ou perdidos
        no campus por pessoas vinculadas a instituição
      </p>
      <p>Clique no botão abaixo para entrar ou fazer seu cadastro</p>

      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "default" }),
          "mt-5 w-1/3 min-w-[140px] max-w-xs space-x-3",
        )}
      >
        <span>Entrar</span>
        <LogIn />
      </Link>
    </main>
  );
}
