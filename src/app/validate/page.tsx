"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import {
  UfcgRegistrationCodeValidator,
  ValidateRegistrationCodePayload,
} from "@/lib/validators/validate";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import ExtFormContainer from "@/components/ExtFormContainer";
import InfoDialog from "./_components/InfoDialog";
import { useUpdateValidatedUser } from "@/services/useValidate";
import { Label } from "@/components/ui/Label";
import pdfToText from "react-pdftotext";

function Validate() {
  const { toast } = useToast();
  const { update } = useSession();
  const router = useRouter();

  const form = useForm<ValidateRegistrationCodePayload>({
    resolver: zodResolver(UfcgRegistrationCodeValidator),
    defaultValues: {
      registrationCode: "",
    },
  });

  const handleError = () => {
    toast({
      title: "Houve um problema",
      description:
        "Aconteceu um problema durante o processo de verificação da matricula, tente novamente mais tarde ou entre em contato",
      variant: "destructive",
    });
    form.reset();
  };

  const { mutate: updateUser, isPending: loading } = useUpdateValidatedUser({
    onSuccess: async () => {
      await update();
      router.replace("/home");
    },
    onError: handleError,
  });

  const onSubmit = async (values: ValidateRegistrationCodePayload) => {
    pdfToText(values.rdmfile[0])
      .then((text) => {
        const match = text.includes(values.registrationCode);

        if (match) {
          updateUser();
        } else {
          toast({
            title: "Erro",
            description: "Não foi possível verificar o seu número de matrícula",
            variant: "destructive",
          });
          form.reset();
        }
      })
      .catch(() => {
        toast({
          title: "Erro",
          description: "Não foi possível análisar o arquivo pdf do RDM",
          variant: "destructive",
        });
        form.reset();
      });
  };

  return (
    <ExtFormContainer>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="registrationCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Matrícula</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite sua matrícula"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <Label
              htmlFor="rdm4"
              className={form.formState.errors.rdmfile && "text-destructive"}
            >
              RDM
            </Label>
            <Input
              id="rdm4"
              type="file"
              accept=".pdf"
              {...form.register("rdmfile")}
            />
            <span className="text-sm font-medium text-destructive">
              {form.formState.errors.rdmfile?.message?.toString()}
            </span>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mx-auto flex w-1/2 font-bold"
          >
            {loading && <Loader2 className="mr-2 h-full w-4 animate-spin" />}
            Validar
          </Button>
        </form>
      </Form>

      <InfoDialog />
    </ExtFormContainer>
  );
}

export default Validate;
