import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import { getAuthSession } from "@/lib/auth";
import {
  ArrowDownWideNarrow,
  Filter,
  Menu,
  PlusCircle,
  Search,
} from "lucide-react";
import LogoutBtn from "./LogoutBtn";
import ToggleDarkMode from "./ToggleDarkMode";
import Link from "next/link";

async function MobileDrawer() {
  const session = await getAuthSession();

  const avatarFallback = session?.user.name?.charAt(0);

  return (
    <Sheet>
      <SheetTrigger asChild className="absolute left-2 md:hidden">
        <Button variant="ghost">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Achados e Perdidos</SheetTitle>

          <SheetDescription>
            <Avatar className="mx-auto mb-2">
              <AvatarImage src={session?.user.image || ""} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <p className=" capitalize">{session?.user.name}</p>
          </SheetDescription>
        </SheetHeader>

        <Separator className="my-4" />

        <div className="relative mb-4 flex flex-col gap-4">
          <div>
            <Input placeholder="Pesquisar" />
            <Search className="absolute right-2 top-2.5 h-5 w-5 hover:cursor-pointer" />
          </div>

          <Button variant="ghost" className="justify-start">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="ghost" className="justify-start">
            <ArrowDownWideNarrow className="mr-2 h-4 w-4" />
            Ordenar
          </Button>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button asChild variant="default" className="mt-4 rounded-full">
              <Link href="new-post">
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo post
              </Link>
            </Button>
          </SheetClose>
        </SheetFooter>

        <div className="absolute bottom-20">
          <ToggleDarkMode />
        </div>

        <Button variant="secondary" className="absolute bottom-6">
          <LogoutBtn />
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export default MobileDrawer;
