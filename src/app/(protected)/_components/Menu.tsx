import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { getAuthSession } from "@/lib/auth";
import { UserCircle2 } from "lucide-react";
import LogoutBtn from "./LogoutBtn";
import ToggleDarkMode from "./ToggleDarkMode";
import Link from "next/link";

async function Menu() {
  const session = await getAuthSession();

  const avatarFallback = session?.user.name?.charAt(0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hidden md:block">
        <Avatar className="cursor-pointer">
          <AvatarImage src={session?.user.image || ""} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="capitalize">
          {session?.user.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <ToggleDarkMode />
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-destructive">
          <LogoutBtn />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Menu;
