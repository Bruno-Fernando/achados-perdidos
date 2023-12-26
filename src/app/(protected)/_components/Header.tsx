import Menu from "./Menu";
import MobileDrawer from "./MobileDrawer";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";

function Header() {
  return (
    <header className="fixed z-50 flex h-12 w-full items-center justify-center border-b bg-background px-14 md:justify-between">
      <MobileDrawer />

      <Link href="home">
        <Avatar className="cursor-pointer bg-black dark:bg-transparent">
          <AvatarImage src="/logo.svg" />
        </Avatar>
      </Link>

      <Menu />
    </header>
  );
}

export default Header;
