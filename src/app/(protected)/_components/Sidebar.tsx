import { Button } from "@/components/ui/Button";
import { ArrowDownWideNarrow, Filter, PlusCircle } from "lucide-react";
import Link from "next/link";
import SearchForm from "./SearchForm";

function Sidebar() {
  return (
    <div className="hidden border-r md:block">
      <div className="sticky top-16">
        <div className="ml-auto flex w-full max-w-xs flex-col justify-end gap-2 px-5">
          <SearchForm />

          <Button variant="ghost" className="justify-start">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="ghost" className="justify-start">
            <ArrowDownWideNarrow className="mr-2 h-4 w-4" />
            Ordenar
          </Button>

          <Button asChild variant="default" className="mt-4 rounded-full">
            <Link href="/new-post">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nova postagem
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
