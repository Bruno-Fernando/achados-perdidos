import LoginBtn from "@/components/LoginBtn";
import { getAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      home
      {session && session.user.email}
      <LoginBtn isLoggedIn={!!session} />
    </main>
  );
}
