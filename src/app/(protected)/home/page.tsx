import { getAuthSession } from "@/lib/auth";
import React from "react";

async function page() {
  const session = await getAuthSession();

  return (
    <div>
      área logada
      <p> {session && session.user.email}</p>
    </div>
  );
}

export default page;
