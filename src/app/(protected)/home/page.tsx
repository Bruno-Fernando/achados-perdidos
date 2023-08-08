import { getAuthSession } from "@/lib/auth";
import React from "react";
import LogoutBtn from "./_components/LogoutBtn";

async function page() {
  const session = await getAuthSession();

  return (
    <div>
      área logada
      <p> {session && session.user.email}</p>
      <LogoutBtn />
    </div>
  );
}

export default page;
