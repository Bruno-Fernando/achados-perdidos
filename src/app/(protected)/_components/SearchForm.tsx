"use client";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { SearchPayload, SearchValidator } from "@/lib/validators/search";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<SearchPayload>({
    resolver: zodResolver(SearchValidator),
    defaultValues: {
      search: searchParams.get("search") ?? "",
    },
  });

  // useCallback
  const createQueryString = (name: string, value: string) => {
    // const params = new URLSearchParams(searchParams.toString())
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  const onSubmit = (values: SearchPayload) => {
    router.push(`?${createQueryString("search", values.search)}`);
  };

  const resetSearch = () => {
    form.setValue("search", "");

    if (searchParams.get("search")) {
      router.push("/home");
    }
  };

  const showResetSearch = form.watch("search") !== "";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-between gap-2"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    maxLength={50}
                    {...field}
                    placeholder="Pesquisar"
                    className="pr-10"
                  />
                  {showResetSearch && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-0 top-0 rounded-full"
                      type="button"
                      onClick={resetSearch}
                    >
                      <X />
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="icon" variant="secondary">
          <Search className="h-5 w-5" />
        </Button>
      </form>
    </Form>
  );
}

export default SearchForm;
