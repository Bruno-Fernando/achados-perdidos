"use client";

import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function RemoveFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  const statusFilter = params.get("status");

  const removeFilters = () => {
    params.delete("status");
    router.push(`/home?${params.toString()}`);
  };

  if (statusFilter) {
    return (
      <div>
        <p className="mb-2">Filtros:</p>
        <Button
          onClick={removeFilters}
          variant="outline"
          className="rounded-3xl"
        >
          <X />
          {statusFilter.toString() === "LOST" ? "Perdido" : "Encontrado"}
        </Button>
      </div>
    );
  }

  return null;
}

export default RemoveFilters;
