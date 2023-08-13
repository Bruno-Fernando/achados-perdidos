"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import React, { useState } from "react";
import {
  UfcgRegistrationCodeValidator,
  ValidateRegistrationCodePayload,
} from "@/lib/validators/validate";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Loader2 } from "lucide-react";
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
import { useUpdateValidatedUser, useValidate } from "@/services/useValidate";

function Validate() {
  const { toast } = useToast();
  const { update } = useSession();
  const router = useRouter();

  const [loading, setIsloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<ValidateRegistrationCodePayload>({
    resolver: zodResolver(UfcgRegistrationCodeValidator),
    defaultValues: {
      registrationCode: "",
      password: "",
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
    setIsloading(false);
  };

  const { mutate: validateUser } = useValidate({
    onSuccess: () => {
      updateUser();
    },
    onError: handleError,
  });

  const { mutate: updateUser } = useUpdateValidatedUser({
    onSuccess: async () => {
      await update();
      router.replace("/home");
    },
    onError: handleError,
  });

  const onSubmit = (values: ValidateRegistrationCodePayload) => {
    validateUser(values);
    setIsloading(true);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <>
                    <Input
                      placeholder="Digite sua senha"
                      type={showPassword ? "text" : "password"}
                      {...field}
                      disabled={loading}
                    />
                    {showPassword ? (
                      <EyeOff
                        className="absolute right-2 top-8 hover:cursor-pointer"
                        onClick={toggleShowPassword}
                      />
                    ) : (
                      <Eye
                        className="absolute right-2 top-8 hover:cursor-pointer"
                        onClick={toggleShowPassword}
                      />
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

      {loading && <p className="mt-6 text-sm">Isso pode demorar um pouco...</p>}

      <InfoDialog />
    </ExtFormContainer>
  );
}

export default Validate;
