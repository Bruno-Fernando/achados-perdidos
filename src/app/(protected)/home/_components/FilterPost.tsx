"use client";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Filter } from "lucide-react";
import FilterPostForm from "./FilterPostForm";
import { useState } from "react";

function FilterPost() {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={toggleOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="ml-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filtrar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filtrar postagens</DialogTitle>
        </DialogHeader>

        <FilterPostForm closeDialog={toggleOpen} />
      </DialogContent>
    </Dialog>
  );
}

export default FilterPost;
