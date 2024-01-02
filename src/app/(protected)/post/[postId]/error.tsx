"use client";

import { Button, buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Error() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
      <h2>Ops! Parece que o post que você procura não existe</h2>

      <Link href="/home" className={cn(buttonVariants({ variant: "default" }))}>
        Voltar para Home
      </Link>
    </div>
  );
}
