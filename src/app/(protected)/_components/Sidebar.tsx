import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowDownWideNarrow, Filter, PlusCircle, Search } from "lucide-react";

function Sidebar() {
  return (
    <div className="hidden border-r md:block">
      <div className="sticky top-14">
        <div className="ml-auto flex w-full max-w-xs flex-col justify-end gap-2 px-5">
          <div>
            <Input placeholder="Pesquisar" />
            <Search className="absolute right-8 top-2.5 h-5 w-5 hover:cursor-pointer" />
          </div>

          <Button variant="ghost" className="justify-start">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="ghost" className="justify-start">
            <ArrowDownWideNarrow className="mr-2 h-4 w-4" />
            Ordenar
          </Button>

          <Button variant="default" className="mt-4 rounded-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo post
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
