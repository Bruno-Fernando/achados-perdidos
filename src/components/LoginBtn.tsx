"use client";

import { Button, buttonVariants } from "./ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

interface Props {
  isLoggedIn: boolean;
}

function LoginBtn({ isLoggedIn }: Props) {
  if (isLoggedIn) {
    return <Button onClick={() => signOut()}>Logout</Button>;
  }

  return (
    <Link href="/login" className={cn(buttonVariants({ variant: "default" }))}>
      Login
    </Link>
  );
}

export default LoginBtn;
