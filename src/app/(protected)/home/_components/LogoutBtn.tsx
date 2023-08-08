"use client";

import { Button } from "@/components/ui/Button";
import { signOut } from "next-auth/react";

function LogoutBtn() {
  return <Button onClick={() => signOut()}>Logout</Button>;
}

export default LogoutBtn;
