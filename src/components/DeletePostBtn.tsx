"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";
import { Button } from "./ui/Button";
import { Trash2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/RadioGroup";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/Form";
import { Textarea } from "./ui/Textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DeletePostPayload,
  DeletePostValidator,
} from "@/lib/validators/deletePost";

interface Props {
  title: string;
  lost?: boolean;
}

function DeletePostBtn({ title, lost }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<DeletePostPayload>({
    resolver: zodResolver(DeletePostValidator),
    defaultValues: {
      returned: undefined,
      feedback: "",
    },
  });

  const toggleOpen = () => {
    setOpen(!open);
  };

  const onSubmit = (values: DeletePostPayload) => {
    console.log(values);
  };

  return (
    <AlertDialog open={open} onOpenChange={toggleOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" /> Excluir
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir postagem</AlertDialogTitle>
          <AlertDialogDescription>
            Antes de deletar a postagem "{title}", gostariamos de saber se ela
            foi {lost ? "encontrada" : "devolvida"}:
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="returned"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-white">Devolvida</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      // disabled={isPending}
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Sim</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">Não</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ficaremos gratos em receber feedback sobre sua experiência usando o app"
                      className="resize-none"
                      rows={4}
                      maxLength={150}
                      {...field}
                      // disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel type="button">Cancelar</AlertDialogCancel>
              <Button
                type="submit"
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {/* {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )} */}
                Excluir
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeletePostBtn;
