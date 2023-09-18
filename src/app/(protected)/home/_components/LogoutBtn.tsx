"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

function LogoutBtn() {
  return (
    <div className="flex" onClick={() => signOut()}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Sair</span>
    </div>
  );
}

export default LogoutBtn;
