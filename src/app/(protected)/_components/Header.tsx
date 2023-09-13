import { Input } from "@/components/ui/Input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import Image from "next/image";
import { getAuthSession } from "@/lib/auth";

async function Header() {
  const session = await getAuthSession();

  const avatarFallback = session?.user.name?.charAt(0);

  return (
    <header className="sticky top-0 flex h-12 items-center justify-between border-b bg-background px-10">
      <Image src="/logo.svg" alt="Logo" width={50} height={50} />

      <Input className="w-1/2" />

      <Avatar>
        <AvatarImage src={session?.user.image || ""} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
    </header>
  );
}

export default Header;
