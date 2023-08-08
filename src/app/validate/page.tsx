"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
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
import Image from "next/image";

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

  const { mutate: validateUfcgUser } = useMutation({
    mutationFn: (body: ValidateRegistrationCodePayload) => {
      return axios.post("/api/validate", {
        ...body,
      });
    },
    onSuccess: async () => {
      await update();
      router.replace("/home");
    },
    onError: () => {
      toast({
        title: "Houve um problema",
        description:
          "Aconteceu um problema durante o processo de verificação da matricula, tente novamente mais tarde ou entre em contato",
        variant: "destructive",
      });
      form.reset();
      setIsloading(false);
    },
  });

  const onSubmit = (values: ValidateRegistrationCodePayload) => {
    validateUfcgUser(values);
    setIsloading(true);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-5">
      <div className="rounded border border-slate-300 p-5">
        <div className="mb-8 flex items-center border-b border-white pb-3">
          <Image src="/logo.svg" alt="Logo" width={80} height={80} />
          <h2 className="mr-3 text-center text-2xl text-white">
            Achados e perdidos UFCG
          </h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="registrationCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matrícula</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite sua matrícula" {...field} />
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
      </div>
    </main>
  );
}

export default Validate;
