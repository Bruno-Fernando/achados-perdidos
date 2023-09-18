import { Input } from "@/components/ui/Input";
import Image from "next/image";
import Menu from "../home/_components/Menu";

async function Header() {
  return (
    <header className="sticky top-0 flex h-12 items-center justify-between border-b bg-background px-14">
      <Image src="/logo.svg" alt="Logo" width={50} height={50} />

      <Input className="w-1/2" />

      <Menu />
    </header>
  );
}

export default Header;
