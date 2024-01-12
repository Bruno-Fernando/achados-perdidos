"use client";

import { Button } from "@/components/ui/Button";
import { $Enums } from "@prisma/client";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function RemoveFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  const statusFilter = Object.values($Enums.PostType).includes(
    params.get("status") as $Enums.PostType,
  );
  const dateFilter = params.get("date");

  const removeStatusFilter = () => {
    params.delete("status");
    params.delete("date");
    router.push(`/home?${params.toString()}`);
  };

  const removeDateFilter = () => {
    params.delete("date");
    router.push(`/home?${params.toString()}`);
  };

  if (statusFilter || dateFilter) {
    return (
      <div>
        <p className="mb-2">Filtros:</p>
        {statusFilter && (
          <Button
            onClick={removeStatusFilter}
            variant="outline"
            className="mr-2 rounded-3xl"
          >
            <X />
            {statusFilter.toString() === "LOST" ? "Perdido" : "Encontrado"}
          </Button>
        )}
        {dateFilter && (
          <Button
            onClick={removeDateFilter}
            variant="outline"
            className="rounded-3xl"
          >
            <X />
            {new Date(dateFilter).toLocaleDateString()}
          </Button>
        )}
      </div>
    );
  }

  return null;
}

export default RemoveFilters;
