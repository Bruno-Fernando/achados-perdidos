import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
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
import { ArrowDownWideNarrow, Menu, PlusCircle } from "lucide-react";
import LogoutBtn from "./LogoutBtn";
import ToggleDarkMode from "./ToggleDarkMode";
import Link from "next/link";
import SearchForm from "./SearchForm";

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
            <SheetClose asChild>
              <Link href="/profile">
                <Avatar className="mx-auto mb-2">
                  <AvatarImage src={session?.user.image || ""} />
                  <AvatarFallback>{avatarFallback}</AvatarFallback>
                </Avatar>
                <span className="capitalize">{session?.user.name}</span>
              </Link>
            </SheetClose>
          </SheetDescription>
        </SheetHeader>

        <Separator className="my-4" />

        <div className="relative mb-4 flex flex-col gap-4">
          <SearchForm />

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
                Nova postagem
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
