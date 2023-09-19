import Image from "next/image";
import Menu from "../home/_components/Menu";
import MobileDrawer from "./MobileDrawer";

async function Header() {
  return (
    <header className="fixed flex h-12 w-full items-center justify-center border-b bg-background px-14 md:justify-between">
      <MobileDrawer />

      <Image src="/logo.svg" alt="Logo" width={50} height={50} />

      <Menu />
    </header>
  );
}

export default Header;
