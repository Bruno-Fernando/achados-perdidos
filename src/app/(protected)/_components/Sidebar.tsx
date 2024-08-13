import { Button } from "@/components/ui/Button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import SearchForm from "./SearchForm";
import { Icons } from "@/components/ExternalIcons";

function Sidebar() {
  return (
    <div className="hidden border-r md:block">
      <div className="sticky top-16">
        <div className="ml-auto flex w-full max-w-xs flex-col justify-end gap-2 px-5">
          <SearchForm />

          <Button asChild variant="default" className="mt-8 rounded-full">
            <Link href="/new-post">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nova Postagem
            </Link>
          </Button>

          <Button asChild variant="secondary" className="mt-2 rounded-full">
            <Link href="/manage-posts">
              <Icons.fileSliders className="mr-2 h-4 w-4" />
              Gerenciar Postagens
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
