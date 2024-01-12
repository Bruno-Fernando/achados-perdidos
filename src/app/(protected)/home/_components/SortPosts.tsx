"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import useQueryParams from "@/hooks/useQueryParams";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function SortPosts() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { createQueryString } = useQueryParams();

  const [value, setValue] = useState<string | undefined>(
    searchParams.get("order") ?? undefined,
  );

  const updateOrder = (newValue: string) => {
    setValue(newValue);
    router.push(`/home?${createQueryString("order", newValue)}`);
  };

  return (
    <Select value={value} onValueChange={updateOrder}>
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Ordenar" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ordene por</SelectLabel>
          <SelectItem value="desc">Mais novo</SelectItem>
          <SelectItem value="asc">Mais velho</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SortPosts;
