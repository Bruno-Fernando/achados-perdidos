import { Button } from "@/components/ui/Button";
import { DialogClose, DialogFooter } from "@/components/ui/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import useQueryParams from "@/hooks/useQueryParams";
import { FilterPayload, FilterValidator } from "@/lib/validators/filterPost";
import { zodResolver } from "@hookform/resolvers/zod";
import { $Enums } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  closeDialog: () => void;
}

function FilterPostForm({ closeDialog }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { createQueryString } = useQueryParams();

  const form = useForm<FilterPayload>({
    resolver: zodResolver(FilterValidator),
    defaultValues: {
      status: (searchParams.get("status") as $Enums.PostType) ?? undefined,
    },
  });

  const onSubmit = (values: FilterPayload) => {
    router.push(`?${createQueryString("status", values.status)}`);
    closeDialog();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Tipo</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="LOST" />
                    </FormControl>
                    <FormLabel className="font-normal">Perdido</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="FOUND" />
                    </FormControl>
                    <FormLabel className="font-normal">Encontrado</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="gap-4">
          <DialogClose asChild>
            <Button variant="secondary" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit">Aplicar filtro</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default FilterPostForm;
